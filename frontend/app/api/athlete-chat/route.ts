import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isCoach } from "@/lib/coachAuth";
import { loadRelevantAthleteData } from "@/lib/athleteChatData";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?alt=sse&key=" +
  GEMINI_API_KEY;

// ─── Get chat sessions: coaches see all, regular users see only their own ───

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ sessions: [] });
  }

  const coach = await isCoach();

  const sessions = await prisma.chatSession.findMany({
    where: coach ? {} : { clerkUserId: userId },
    include: { messages: { orderBy: { createdAt: "asc" } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ sessions });
}

// ─── Signed-in: send a message and stream Gemini response ───

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { messages, sessionId } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    // Rate limit: max 20 messages per user per hour. Each Gemini call costs
    // real money, so this protects against runaway usage/abuse. We count
    // actual stored ChatMessage rows rather than an in-memory counter, since
    // serverless functions don't reliably share memory between invocations.
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentMessageCount = await prisma.chatMessage.count({
      where: {
        role: "user",
        createdAt: { gte: oneHourAgo },
        session: { clerkUserId: userId },
      },
    });

    if (recentMessageCount >= 20) {
      return NextResponse.json(
        { error: "You've reached the hourly message limit. Please try again later." },
        { status: 429 }
      );
    }

    const lastUserMessage = messages[messages.length - 1]?.content ?? "";
    const businessData = loadRelevantAthleteData(lastUserMessage);

    const systemPrompt = `You are Athlete, the AI assistant for Labatts Movement, an elite athletic training platform based in Nairobi, Kenya. You help visitors and parents understand training programs, bookings, pricing, and safety.

Below is the complete knowledge base for Labatts Movement. Use it to answer questions accurately. If a question is outside this knowledge base, use your best judgment but stay on-brand.

=== LABATTS MOVEMENT KNOWLEDGE BASE ===

${businessData}

=== END OF KNOWLEDGE BASE ===

Guidelines:
- Tone: Energetic, encouraging, direct — like a knowledgeable coach, not a generic support bot.
- Keep responses concise (2-4 sentences) unless detail is genuinely needed.
- End with a gentle call to action where relevant (book a session, browse the activity library, contact a coach, etc.).
- For pricing, always give the exact figures from the knowledge base, never invent numbers.
- If asked about something requiring a coach's judgment (injury concerns, personalized programming), recommend booking a consultation rather than giving specific medical or training advice yourself.
- Contact: info@tuistech.co.ke, Nairobi, Kenya.`;

    const geminiContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    async function callGemini() {
      return fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: geminiContents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });
    }

    let geminiRes = await callGemini();

    // Gemini's free-tier models occasionally return 503 "high demand" errors
    // that resolve within a second or two — retry once before giving up.
    if (geminiRes.status === 503) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      geminiRes = await callGemini();
    }

    if (!geminiRes.ok || !geminiRes.body) {
      const err = await geminiRes.text();
      console.error("Gemini error:", err);
      return NextResponse.json({ error: "Gemini API error" }, { status: 500 });
    }

    let activeSessionId = sessionId;
    const userMessage = messages[messages.length - 1];

    const sessionPromise = (async () => {
      try {
        if (activeSessionId) {
          await prisma.chatMessage.create({
            data: {
              sessionId: activeSessionId,
              role: "user",
              content: userMessage.content,
            },
          });
        } else {
          const session = await prisma.chatSession.create({
            data: {
              clerkUserId: userId,
              messages: {
                create: {
                  role: "user",
                  content: userMessage.content,
                },
              },
            },
          });
          activeSessionId = session.id;
        }
      } catch (e) {
        console.error("DB session error:", e);
      }
    })();

    const encoder = new TextEncoder();
    let fullResponse = "";
    let sessionIdSent = false;

    const stream = new ReadableStream({
      async start(controller) {
        await sessionPromise;

        if (!sessionIdSent && activeSessionId) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ sessionId: activeSessionId })}\n\n`)
          );
          sessionIdSent = true;
        }

        const reader = geminiRes.body!.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const raw = line.slice(6).trim();
              if (!raw || raw === "[DONE]") continue;

              try {
                const parsed = JSON.parse(raw);
                const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
                if (text) {
                  fullResponse += text;
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
                }
              } catch {
                // skip malformed chunks
              }
            }
          }
        } finally {
          if (activeSessionId && fullResponse) {
            prisma.chatMessage
              .create({
                data: {
                  sessionId: activeSessionId,
                  role: "assistant",
                  content: fullResponse,
                },
              })
              .catch((e) => console.error("DB assistant save error:", e));
          }
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.error("Chat POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
