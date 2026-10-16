import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "smtp.zoho.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

const FROM_EMAIL = process.env.SMTP_USER ?? "info@tuistech.co.ke";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "info@tuistech.co.ke";

async function sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<boolean> {
  try {
    console.log(`📧 Sending email to ${to} via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT} as ${process.env.SMTP_USER}`);
    const info = await transporter.sendMail({
  from: `"Tuistech Movement" <${FROM_EMAIL}>`,
  replyTo: replyTo ?? ADMIN_EMAIL,
  to,
  subject,
  html,
});
    console.log(`✅ Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("❌ Email send error:", error);
    return false;
  }
}

interface BookingEmailData {
  clientName: string;
  clientEmail: string;
  service: string;
  date: string;
  paymentMethod: string;
  bookingId: string;
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  const { clientName, clientEmail, service, date, paymentMethod, bookingId } = data;
  await sendEmail(clientEmail, "Booking Confirmed – Tuistech Movement",
    bookingClientHtml({ clientName, service, date, paymentMethod, bookingId }));
  await sendEmail(ADMIN_EMAIL, `New Booking – ${clientName} (${service})`,
    bookingAdminHtml({ clientName, clientEmail, service, date, paymentMethod, bookingId }));
}

const baseStyle = `background:#fef8f1;font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;`;
const headerHtml = (subtitle: string) => `
  <tr>
    <td style="background:#ffffff;border-top:3px solid #a83300;padding:36px 40px;text-align:center;">
      <h1 style="margin:0;color:#a83300;font-size:26px;">Tuistech Movement</h1>
      <p style="margin:6px 0 0;color:#8c7263;font-size:11px;font-family:monospace;">ELITE ATHLETIC TRAINING &middot; NAIROBI</p>
      <p style="margin:12px 0 0;color:#d24200;font-size:11px;font-family:monospace;">${subtitle}</p>
    </td>
  </tr>`;

const footerHtml = `
  <tr>
    <td style="background:#ffffff;padding:24px 40px;border-top:1px solid rgba(224,192,175,0.3);">
      <p style="color:#8c7263;font-size:12px;margin:0 0 4px;">Tuistech Movement &middot; Nairobi, Kenya</p>
      <p style="color:#e0c0af;font-size:11px;margin:0;">+254 726 461 196 &middot; info@tuistech.co.ke</p>
    </td>
  </tr>`;

const ctaButton = (href: string, label: string) => `
  <table cellpadding="0" cellspacing="0" style="margin-top:24px;">
    <tr><td style="background:#a83300;">
      <a href="${href}" style="display:block;padding:14px 28px;color:#ffffff;font-size:12px;font-weight:bold;text-decoration:none;font-family:monospace;">${label}</a>
    </td></tr>
  </table>`;

const detailRow = (label: string, value: string) => `
  <tr>
    <td style="padding:11px 20px;border-bottom:1px solid rgba(224,192,175,0.15);width:40%;">
      <p style="margin:0;color:#8c7263;font-size:10px;font-family:monospace;">${label}</p>
    </td>
    <td style="padding:11px 20px;border-bottom:1px solid rgba(224,192,175,0.15);">
      <p style="margin:0;color:#1d1b17;font-size:13px;">${value}</p>
    </td>
  </tr>`;

const wrap = (body: string) => `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="${baseStyle}">
  <table width="100%" cellpadding="0" cellspacing="0" style="${baseStyle}padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        ${body}
        ${footerHtml}
      </table>
    </td></tr>
  </table>
</body></html>`;

function bookingClientHtml(d: { clientName: string; service: string; date: string; paymentMethod: string; bookingId: string }) {
  return wrap(`
    ${headerHtml("BOOKING CONFIRMED")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <h2 style="color:#1d1b17;font-size:22px;margin:0 0 16px;">Karibu, ${d.clientName}! Your booking confirmation fee has been received.</h2>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:24px;">
        ${detailRow("BOOKING ID", d.bookingId)}
        ${detailRow("SERVICE", d.service)}
        ${detailRow("DATE", d.date)}
        ${detailRow("PAYMENT", d.paymentMethod)}
      </table>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "https://labattsmovement.tuistech.co.ke"}/parent-portal`, "VIEW MY BOOKINGS &rarr;")}
    </td></tr>`);
}

function bookingAdminHtml(d: { clientName: string; clientEmail: string; service: string; date: string; paymentMethod: string; bookingId: string }) {
  return wrap(`
    ${headerHtml("NEW BOOKING RECEIVED")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${detailRow("BOOKING ID", d.bookingId)}
        ${detailRow("CLIENT", d.clientName)}
        ${detailRow("EMAIL", d.clientEmail)}
        ${detailRow("SERVICE", d.service)}
        ${detailRow("DATE", d.date)}
        ${detailRow("PAYMENT", d.paymentMethod)}
      </table>
      ${ctaButton(`${process.env.NEXT_PUBLIC_APP_URL ?? "https://labattsmovement.tuistech.co.ke"}/dashboard/coach`, "OPEN DASHBOARD &rarr;")}
    </td></tr>`);
}

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Returns false if the email could not be sent, so the form can tell the visitor.
export async function sendContactFormEmail(data: ContactFormData): Promise<boolean> {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const phone = escapeHtml(data.phone || "Not provided");
  const message = escapeHtml(data.message);

  const html = wrap(`
    ${headerHtml("NEW CONTACT MESSAGE")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${detailRow("NAME", name)}
        ${detailRow("EMAIL", email)}
        ${detailRow("PHONE", phone)}
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        <tr><td style="padding:16px 20px;color:#1d1b17;white-space:pre-wrap;">${message}</td></tr>
      </table>
      ${ctaButton(`mailto:${email}`, "REPLY TO " + name.toUpperCase())}
    </td></tr>`);

  // Reply-To is the visitor, so hitting Reply in the inbox answers them directly.
  return sendEmail(ADMIN_EMAIL, `New Contact Message – ${data.name.slice(0, 60)}`, html, data.email);
}

// ─── Equipment hire requests ───

interface HireRequestData {
  itemName: string;
  pricePerDay: number;
  quantity: number;
  startDate: string;
  endDate: string;
  days: number;
  estimatedTotal: number;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}

// Returns false if the email could not be sent.
export async function sendHireRequestEmail(d: HireRequestData): Promise<boolean> {
  const html = wrap(`
    ${headerHtml("NEW EQUIPMENT HIRE REQUEST")}
    <tr><td style="background:#ffffff;padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${detailRow("ITEM", escapeHtml(d.itemName))}
        ${detailRow("QUANTITY", String(d.quantity))}
        ${detailRow("FROM", escapeHtml(d.startDate))}
        ${detailRow("TO", escapeHtml(d.endDate))}
        ${detailRow("DAYS", String(d.days))}
        ${detailRow("ESTIMATE", `KSh ${d.estimatedTotal.toLocaleString()} (KSh ${d.pricePerDay.toLocaleString()}/day)`)}
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef8f1;border:1px solid #e0c0af;margin-bottom:20px;">
        ${detailRow("NAME", escapeHtml(d.name))}
        ${detailRow("EMAIL", escapeHtml(d.email))}
        ${detailRow("PHONE", escapeHtml(d.phone))}
        ${detailRow("NOTES", escapeHtml(d.notes || "None"))}
      </table>
      ${ctaButton(`mailto:${encodeURIComponent(d.email)}`, "REPLY TO " + escapeHtml(d.name.toUpperCase()))}
    </td></tr>`);

  return sendEmail(
    ADMIN_EMAIL,
    `Hire request – ${d.itemName} (${d.startDate} to ${d.endDate})`.replace(/[\r\n]+/g, " "),
    html,
    d.email
  );
}
