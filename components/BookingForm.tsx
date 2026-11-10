"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import site from "@/data/site.json";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { fill } from "@/lib/i18n";
import { formatDay, formatTime } from "@/lib/format";
import { useMounted } from "@/lib/useMounted";
import { bookableDays, isEmail, isPhone, OCCASIONS, SERVICES, timesOn, waLink, type Occasion, type Service } from "@/lib/reservation";

type Errors = Partial<Record<"date" | "time" | "name" | "phone" | "email", string>>;

/**
 * Réservation : service (déjeuner en semaine / dimanche midi), jour (seulement les jours ouverts de ce service),
 * heure d'arrivée, personnes, occasion, coordonnées, message. Envoi par e-mail via /api/reservation (Resend) :
 * notification au restaurant + confirmation au client. Sans Resend configuré, on invite à appeler : rien ne se perd.
 * Les liens « ?groupe=1#reserver » (devis groupe) préremplissent l'occasion et le nombre de personnes.
 */
export function BookingForm() {
  const { lang, d } = useLocale();
  const b = d.book;
  const { groupFrom, maxGuests } = site.reservation;
  const mounted = useMounted();
  const now = useMemo(() => (mounted ? new Date() : null), [mounted]);

  const [service, setService] = useState<Service>("lunch");
  const [rawDate, setDate] = useState("");
  const [rawTime, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [occasion, setOccasion] = useState<Occasion>("none");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [done, setDone] = useState<null | { notified: boolean; confirmed: boolean; when: string; name: string }>(null);

  // Liens « Demander un devis » : ?groupe=1 → repas de famille, 12 personnes ; ?service=sunday → dimanche midi
  useEffect(() => {
    const read = () => {
      const q = new URLSearchParams(location.search);
      if (q.get("groupe") === "1") {
        setOccasion("family");
        setGuests((g) => Math.max(g, 12));
      }
      if (q.get("service") === "sunday") setService("sunday");
    };
    read();
    window.addEventListener("popstate", read);
    return () => window.removeEventListener("popstate", read);
  }, []);

  const days = useMemo(() => (now ? bookableDays(now, service) : []), [now, service]);
  const date = days.includes(rawDate) ? rawDate : "";
  const times = useMemo(() => (date && now ? timesOn(date, now) : []), [date, now]);
  const time = times.includes(rawTime) ? rawTime : "";
  const isGroup = guests >= groupFrom;

  async function submit(e: FormEvent) {
    e.preventDefault();
    const err: Errors = {};
    if (!date) err.date = b.errors.date;
    if (!time) err.time = b.errors.time;
    if (!name.trim()) err.name = b.errors.name;
    if (!isPhone(phone)) err.phone = b.errors.phone;
    if (!isEmail(email)) err.email = b.errors.email;
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`bk-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ lang, booking: { service, date, time, guests, occasion, message, name, phone, email } }),
      });
      const json = (await res.json()) as { ok: boolean; notified?: boolean; confirmed?: boolean };
      if (!res.ok || !json.ok) throw new Error("server");
      setDone({ notified: !!json.notified, confirmed: !!json.confirmed, name: name.trim(), when: `${formatDay(date, lang)}, ${formatTime(time, lang)}` });
      setState("idle");
    } catch {
      setState("error");
    }
  }

  const call = (
    <a href={`tel:${site.phoneIntl}`} className="btn">
      <PhoneIcon />
      {d.nav.call} · {site.phone}
    </a>
  );
  const wa = waLink(`${b.title} · ${name}`);

  if (done)
    return (
      <div className="fade-in border border-line bg-paper p-6 md:p-10" role="status" aria-live="polite">
        <span className="flex size-11 items-center justify-center rounded-full bg-navy text-cream">
          <CheckIcon className="h-5 w-5" />
        </span>
        <h3 className="display mt-5 text-[2rem]">{b.done.title}</h3>
        <p className="lead mt-3">{fill(b.done.text, { name: done.name, when: done.when })}</p>
        <p className="mt-3 text-muted">{done.notified ? (done.confirmed ? b.done.mail : "") : b.done.notSent}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          {!done.notified && call}
          <button type="button" className="btn-line" onClick={() => setDone(null)}>
            {b.done.again}
          </button>
        </div>
      </div>
    );

  const fieldErr = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`bk-${k}-err`} className="mt-1.5 text-[0.875rem] text-coral-ink">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Errors) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `bk-${k}-err` : undefined });

  return (
    <form onSubmit={submit} noValidate className="border border-line bg-paper p-6 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset className="sm:col-span-2">
          <legend className="label">{b.service}</legend>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <label key={s} className="seg">
                <input type="radio" name="service" className="sr-only" checked={service === s} onChange={() => setService(s)} />
                {b.services[s]}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label htmlFor="bk-date" className="label">
            {b.date}
          </label>
          <select id="bk-date" className="field" value={date} onChange={(e) => setDate(e.target.value)} {...aria("date")}>
            <option value="">{b.chooseDate}</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {formatDay(day, lang)}
              </option>
            ))}
          </select>
          {fieldErr("date")}
        </div>
        <div>
          <label htmlFor="bk-time" className="label">
            {b.time}
          </label>
          <select id="bk-time" className="field tabular-nums" value={time} onChange={(e) => setTime(e.target.value)} disabled={!date} {...aria("time")}>
            <option value="">{b.chooseTime}</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {formatTime(t, lang)}
              </option>
            ))}
          </select>
          {date && !times.length && <p className="mt-1.5 text-[0.875rem] text-muted">{b.noTimes}</p>}
          {fieldErr("time")}
        </div>
        <div>
          <label htmlFor="bk-guests" className="label">
            {b.guests}
          </label>
          <select id="bk-guests" className="field tabular-nums" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bk-occasion" className="label">
            {b.occasion}
          </label>
          <select id="bk-occasion" className="field" value={occasion} onChange={(e) => setOccasion(e.target.value as Occasion)}>
            {OCCASIONS.map((o) => (
              <option key={o} value={o}>
                {b.occasions[o]}
              </option>
            ))}
          </select>
        </div>
        {isGroup && <p className="text-[0.875rem] text-gold-ink sm:col-span-2">{fill(b.groupHint, { n: groupFrom })}</p>}
        <div className="sm:col-span-2">
          <label htmlFor="bk-name" className="label">
            {b.name}
          </label>
          <input id="bk-name" className="field" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} {...aria("name")} />
          {fieldErr("name")}
        </div>
        <div>
          <label htmlFor="bk-phone" className="label">
            {b.phone}
          </label>
          <input id="bk-phone" className="field" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} {...aria("phone")} />
          {fieldErr("phone")}
        </div>
        <div>
          <label htmlFor="bk-email" className="label">
            {b.email}
          </label>
          <input id="bk-email" className="field" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} {...aria("email")} />
          {fieldErr("email")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="bk-message" className="label">
            {b.message}
          </label>
          <textarea id="bk-message" className="field min-h-24" rows={3} placeholder={b.messagePh} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? b.sending : b.submit}
        </button>
        <span className="text-[0.875rem] text-muted">{b.callInstead}</span>
        <a href={`tel:${site.phoneIntl}`} className="link-line text-[0.9375rem]">
          {site.phone}
        </a>
        {wa && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[0.9375rem] text-sage">
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        )}
      </div>
      {state === "error" && (
        <p className="mt-4 text-coral-ink" role="alert">
          {b.errors.server}
        </p>
      )}
      <p className="mt-5 text-[0.8125rem] text-muted">{b.privacy}</p>
    </form>
  );
}
