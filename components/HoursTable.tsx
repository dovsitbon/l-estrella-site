import { formatTime } from "@/lib/format";
import { weekHours, type Slot } from "@/lib/hours";
import type { Dict, Locale } from "@/lib/i18n";

/** Horaires de la semaine (data/horaires.json), du lundi au dimanche. */
export function HoursTable({ lang, d, week = weekHours(), className = "" }: { lang: Locale; d: Dict; week?: Slot[][]; className?: string }) {
  return (
    <table className={`w-full text-[0.9375rem] ${className}`}>
      <tbody>
        {week.map((slots, i) => (
          <tr key={i} className="border-b border-current/10 last:border-0">
            <th scope="row" className="py-2 pe-4 text-start font-normal">
              {d.infos.days[i]}
            </th>
            <td className={`py-2 text-end tabular-nums ${slots.length ? "" : "opacity-75"}`} dir="ltr">
              {slots.length ? slots.map(([a, b]) => `${formatTime(a, lang)} – ${formatTime(b, lang)}`).join(", ") : d.infos.closed}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
