"use client";

import { useState, useRef, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function AthleteChatbot() {
  const { isSignedIn } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Athlete, your Labatts Movement assistant. Ask me about training programs, pricing, or how booking works.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage: ChatMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      const res = await fetch("/api/athlete-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, sessionId }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Chat request failed");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6).trim();
          if (!raw) continue;

          try {
            const parsed = JSON.parse(raw);
            if (parsed.sessionId) {
              setSessionId(parsed.sessionId);
            }
            if (parsed.text) {
              assistantText += parsed.text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "assistant", content: assistantText };
                return updated;
              });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Gemini's servers are a bit busy right now — please try asking again in a moment.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 left-6 sm:left-auto z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-full sm:w-[380px] max-w-[380px] h-[500px] bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/40 flex flex-col overflow-hidden">
          <div className="bg-primary text-on-primary px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px]">sports</span>
              <span className="font-headline-md font-bold">Athlete</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-80">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {!isSignedIn ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <span className="material-symbols-outlined text-[36px] text-primary">lock</span>
              <p className="text-on-surface-variant text-sm">
                Sign in to chat with Athlete about programs, pricing, and bookings.
              </p>
              <SignInButton mode="modal">
                <button className="bg-primary text-on-primary px-5 py-2.5 rounded-lg text-sm font-label-md hover:bg-primary-container transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm ${
                      msg.role === "user"
                        ? "self-end bg-primary text-on-primary"
                        : "self-start bg-surface-container text-on-surface"
                    }`}
                  >
                    {msg.content || (isStreaming && i === messages.length - 1 ? "..." : "")}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 border-t border-outline-variant/40 flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about programs, pricing..."
                  disabled={isStreaming}
                  className="flex-1 border border-outline-variant rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-60"
                />
                <button
                  onClick={handleSend}
                  disabled={isStreaming || !input.trim()}
                  className="bg-primary text-on-primary w-10 h-10 rounded-lg flex items-center justify-center hover:bg-primary-container transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg flex items-center justify-center hover:bg-primary-container transition-colors"
      >
        <span className="material-symbols-outlined text-[26px]">
          {isOpen ? "close" : "sports"}
        </span>
      </button>
    </div>
  );
}
