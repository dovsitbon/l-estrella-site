import { Resend } from "resend";
import { bookingRows, parseBooking } from "@/lib/reservation";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";

// Demande de réservation. Le restaurant n'a qu'une ligne fixe : la demande part par e-mail (Resend).
//  1. notification au restaurant (en français, tableau lisible, « Répondre » écrit directement au client) ;
//  2. confirmation de réception au client, dans sa langue.
// Variables Vercel : RESEND_API_KEY, BOOKING_NOTIFY_EMAIL (adresse du restaurant), RESEND_FROM (domaine vérifié dans Resend,
// ex. « L'Estrella <reservation@mondomaine.fr> » ; sans domaine vérifié, Resend n'envoie qu'à l'adresse du compte).
// Sans ces variables, la route répond { notified: false } et le site invite le client à appeler pour confirmer.

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function html(title: string, intro: string, rows: [string, string][], outro: string) {
  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:10px 16px 10px 0;border-bottom:1px solid #E2D8C5;color:#7F5F22;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:10px 0;border-bottom:1px solid #E2D8C5;font-size:15px">${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");
  return `<div style="background:#F7F2E9;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#FCFAF5;border:1px solid #E2D8C5;padding:36px 32px;font-family:Georgia,serif;color:#1C1A18;line-height:1.6">
<p style="margin:0;text-align:center;color:#B08A3E;font-size:18px">&#9734;</p>
<p style="margin:4px 0 0;text-align:center;letter-spacing:4px;font-size:13px;color:#1E2B45">L&#8217;ESTRELLA</p>
<h1 style="margin:24px 0 8px;font-weight:normal;font-size:24px;color:#1E2B45">${esc(title)}</h1>
${intro ? `<p style="margin:0 0 20px;font-size:15px">${esc(intro)}</p>` : ""}
<table role="presentation" style="width:100%;border-collapse:collapse;font-family:Arial,sans-serif">${table}</table>
${outro ? `<p style="margin:24px 0 0;font-size:14px;color:#4F4943">${esc(outro)}</p>` : ""}
<p style="margin:28px 0 0;font-size:12px;color:#4F4943;font-family:Arial,sans-serif">L&#8217;Estrella · 103 route Nationale, 80480 Dury · 03 22 95 04 44</p></div></div>`;
}
const text = (title: string, intro: string, rows: [string, string][], outro: string) => [title, intro, rows.map(([k, v]) => `${k} : ${v}`).join("\n"), outro].filter(Boolean).join("\n\n");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const b = parseBooking(body.booking);
  if (!b) return Response.json({ ok: false }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_NOTIFY_EMAIL;
  if (!key || !to) return Response.json({ ok: true, notified: false, confirmed: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "L'Estrella <onboarding@resend.dev>";
  const fr = getDict("fr");
  const rows = bookingRows(b, "fr", fr);
  if (lang !== "fr") rows.push([fr.book.mail.lang, lang.toUpperCase()]);
  const group = b.guests >= 10 || b.occasion !== "none";
  const subject = `${group ? "[Groupe] " : ""}${fr.book.mail.subject} · ${b.name} · ${b.date} ${b.time} · ${b.guests} pers.`;

  let notified = false;
  let confirmed = false;
  try {
    const r = await resend.emails.send({ from, to, replyTo: b.email, subject, html: html(fr.book.mail.title, "", rows, fr.book.mail.replyHint), text: text(fr.book.mail.title, "", rows, fr.book.mail.replyHint) });
    notified = !r.error;
  } catch {}

  if (notified) {
    const d = getDict(lang);
    const m = d.book.mail;
    const intro = fill(m.confirmIntro, { name: b.name });
    const own = bookingRows(b, lang, d, false);
    try {
      const r = await resend.emails.send({ from, to: b.email, replyTo: to, subject: m.confirmSubject, html: html(m.confirmSubject, intro, own, m.confirmOutro), text: text(m.confirmSubject, intro, own, m.confirmOutro) });
      confirmed = !r.error;
    } catch {}
  }
  return Response.json({ ok: true, notified, confirmed });
}
