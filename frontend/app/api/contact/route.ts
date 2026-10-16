import { NextRequest, NextResponse } from "next/server";
import { sendContactFormEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();
    const website = String(body.website ?? ""); // honeypot — real visitors leave it empty

    // Bots fill the hidden field; pretend success so they don't retry.
    if (website) return NextResponse.json({ success: true });

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || phone.length > 40 || message.length > 3000) {
      return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }

    const sent = await sendContactFormEmail({ name, email, phone, message });
    if (!sent) {
      return NextResponse.json({ error: "We couldn't send your message. Please try again shortly." }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
