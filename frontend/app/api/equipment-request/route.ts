import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendHireRequestEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_DAYS = 30;
const MS_DAY = 24 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot — real visitors never fill this.
    if (body.website) return NextResponse.json({ success: true });

    const itemId = String(body.itemId ?? "");
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const notes = String(body.notes ?? "").trim();
    const startDate = String(body.startDate ?? "");
    const endDate = String(body.endDate ?? "");
    const quantity = Math.floor(Number(body.quantity ?? 1));

    if (!itemId || !name || !email || !phone || !startDate || !endDate) {
      return NextResponse.json({ error: "Please fill in all the required fields." }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (name.length > 100 || email.length > 200 || phone.length > 40 || notes.length > 1000) {
      return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
    }
    if (!DATE_RE.test(startDate) || !DATE_RE.test(endDate)) {
      return NextResponse.json({ error: "Please choose valid dates." }, { status: 400 });
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 50) {
      return NextResponse.json({ error: "Quantity must be between 1 and 50." }, { status: 400 });
    }

    const start = new Date(`${startDate}T00:00:00Z`).getTime();
    const end = new Date(`${endDate}T00:00:00Z`).getTime();
    const today = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z").getTime();
    if (Number.isNaN(start) || Number.isNaN(end)) {
      return NextResponse.json({ error: "Please choose valid dates." }, { status: 400 });
    }
    if (start < today - MS_DAY) {
      return NextResponse.json({ error: "The start date can't be in the past." }, { status: 400 });
    }
    if (end < start) {
      return NextResponse.json({ error: "The end date must be on or after the start date." }, { status: 400 });
    }
    const days = Math.round((end - start) / MS_DAY) + 1;
    if (days > MAX_DAYS) {
      return NextResponse.json({ error: `Hire periods are limited to ${MAX_DAYS} days online. Contact us for longer hires.` }, { status: 400 });
    }

    // Price comes from the database, never from the browser.
    const item = await prisma.equipmentItem.findUnique({ where: { id: itemId } });
    if (!item || !item.available) {
      return NextResponse.json({ error: "Sorry, that item isn't available right now." }, { status: 404 });
    }

    const sent = await sendHireRequestEmail({
      itemName: item.name,
      pricePerDay: item.pricePerDay,
      quantity,
      startDate,
      endDate,
      days,
      estimatedTotal: item.pricePerDay * days * quantity,
      name,
      email,
      phone,
      notes,
    });
    if (!sent) {
      return NextResponse.json({ error: "We couldn't send your request. Please try again shortly." }, { status: 502 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Equipment request error:", error);
    return NextResponse.json({ error: "Failed to send your request. Please try again." }, { status: 500 });
  }
}
