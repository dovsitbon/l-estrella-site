import site from "@/data/site.json";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay, formatTime, isoDay } from "@/lib/format";
import { addDays, isOpenDay, parisTime, slotsOn, weekday } from "@/lib/hours";

export const SERVICES = ["lunch", "sunday"] as const;
export type Service = (typeof SERVICES)[number];
export const OCCASIONS = ["none", "birthday", "communion", "family", "company", "other"] as const;
export type Occasion = (typeof OCCASIONS)[number];

export type Booking = {
  service: Service;
  date: string;
  time: string;
  guests: number;
  occasion: Occasion;
  message: string;
  name: string;
  phone: string;
  email: string;
};

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Service d'un jour : le dimanche midi, ou le déjeuner en semaine. */
export const serviceOf = (iso: string): Service => (weekday(iso) === 7 ? "sunday" : "lunch");

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

/**
 * Heures d'arrivée proposées pour un jour : toutes les 15 min dans les créneaux d'ouverture,
 * jusqu'à 45 min avant la fermeture (data/site.json → reservation). Le jour même : rien avant maintenant + 30 min.
 */
export function timesOn(iso: string, now?: Date): string[] {
  const { stepMinutes: step, lastSeatingMinutes: last } = site.reservation;
  const floor = now && iso === isoDay(now) ? toMin(parisTime(now)) + 30 : -1;
  return slotsOn(iso).flatMap(([a, b]) => {
    const out: string[] = [];
    for (let t = toMin(a); t <= toMin(b) - last; t += step) if (t >= floor) out.push(toHhmm(t));
    return out;
  });
}

/** Prochains jours ouverts pour un service, où il reste une heure d'arrivée possible. */
export function bookableDays(now: Date, service: Service, count = 45) {
  const out: string[] = [];
  let day = isoDay(now);
  for (let i = 0; i < 180 && out.length < count; i++, day = addDays(day, 1))
    if (serviceOf(day) === service && isOpenDay(day) && timesOn(day, now).length) out.push(day);
  return out;
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Nettoie une demande reçue côté serveur : null si elle est incomplète ou hors des heures d'ouverture. */
export function parseBooking(v: unknown): Booking | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const guests = Math.round(Number(o.guests));
  const date = ISO.test(str(o.date, 10)) ? str(o.date, 10) : "";
  const b: Booking = {
    service: date ? serviceOf(date) : "lunch",
    date,
    time: str(o.time, 5),
    guests: Number.isFinite(guests) ? Math.min(Math.max(guests, 1), site.reservation.maxGuests) : 0,
    occasion: (OCCASIONS as readonly string[]).includes(o.occasion as string) ? (o.occasion as Occasion) : "none",
    message: str(o.message, 1500),
    name: str(o.name, 120),
    phone: str(o.phone, 30),
    email: str(o.email, 160),
  };
  if (!b.date || !b.guests || !b.name || !isPhone(b.phone) || !isEmail(b.email)) return null;
  if (!timesOn(b.date).includes(b.time)) return null;
  return b;
}

/** Lignes de la demande (e-mails) : [libellé, valeur]. */
export function bookingRows(b: Booking, lang: Locale, d: Dict, withContact = true): [string, string][] {
  const m = d.book.mail;
  const rows: [string, string][] = [
    [m.service, d.book.services[b.service]],
    [m.when, `${formatDay(b.date, lang, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}, ${formatTime(b.time, lang)}`],
    [m.guests, String(b.guests)],
  ];
  if (b.occasion !== "none") rows.push([m.occasion, d.book.occasions[b.occasion]]);
  if (withContact) rows.push([m.name, b.name], [m.phone, b.phone], [m.email, b.email]);
  if (b.message) rows.push([m.message, b.message]);
  return rows;
}

/** Lien WhatsApp (vide tant que le restaurant n'a pas donné de portable : data/site.json → whatsapp). */
export const waLink = (text: string) => (site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : "");
