import menu from "@/data/menu-du-jour.json";
import { Star, StarRule } from "@/components/Logo";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { formatDay, price } from "@/lib/format";

type FormulaId = keyof Dict["today"]["formulas"];

/** L'ardoise : entrée, plat, dessert du jour et les formules (data/menu-du-jour.json). */
export function TodayMenu({ lang, d }: { lang: Locale; d: Dict }) {
  const courses = [
    [d.today.entree, menu.entree[lang]],
    [d.today.plat, menu.plat[lang]],
    [d.today.dessert, menu.dessert[lang]],
  ] as const;
  return (
    <div className="relative bg-navy px-7 py-10 text-cream md:px-12 md:py-14">
      <div className="pointer-events-none absolute inset-3 border border-gold/30 md:inset-4" aria-hidden="true" />
      <p className="flex items-center justify-center gap-3 text-center text-[0.6875rem] tracking-[0.24em] text-gold uppercase">
        <Star className="h-3 w-3" />
        {d.announce.week}
        <Star className="h-3 w-3" />
      </p>
      <dl className="mt-8 space-y-7 text-center">
        {courses.map(([label, dish]) => (
          <div key={label}>
            <dt className="text-[0.75rem] tracking-[0.2em] text-cream/65 uppercase">{label}</dt>
            <dd className="display mt-1.5 text-[1.625rem] leading-tight md:text-[1.875rem]">{dish}</dd>
          </div>
        ))}
      </dl>
      <StarRule className="mx-auto mt-9 max-w-xs" />
      <ul className="mx-auto mt-7 max-w-sm space-y-2.5 text-[0.9375rem]">
        {menu.formulas.map((f) => (
          <li key={f.id} className="flex items-baseline gap-3">
            <span className="font-light">{d.today.formulas[f.id as FormulaId]}</span>
            <span className="flex-1 translate-y-[-0.3em] border-b border-dotted border-cream/30" aria-hidden="true" />
            <span className="tabular-nums">{f.price === null ? <em className="text-cream/70">{d.today.priceTbc}</em> : price(f.price, lang)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-center text-[0.75rem] text-cream/60">{menu.example ? d.today.example : fill(d.today.updated, { date: formatDay(menu.updated, lang, { day: "numeric", month: "long" }) })}</p>
    </div>
  );
}
