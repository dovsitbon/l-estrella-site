import carte from "@/data/carte.json";
import { Star } from "@/components/Logo";
import type { Dict, Locale } from "@/lib/i18n";
import { price } from "@/lib/format";

type Item = { price: number | null; from?: boolean; perPerson?: boolean; image: string | null; example?: boolean };
type CatId = keyof Dict["carte"]["categories"];
const items = carte.items as Record<string, Item>;
export const CATEGORIES = carte.categories as { id: CatId; items: string[] }[];

/** Prix d'une ligne : « 24 € », « à partir de 32 € par personne », ou « à l'ardoise » tant qu'il n'est pas renseigné. */
export function Price({ it, lang, d }: { it: Item; lang: Locale; d: Dict }) {
  if (it.price === null) return <span className="text-[0.875rem] text-muted italic">{d.carte.priceTbc}</span>;
  return (
    <span className="tabular-nums">
      {it.from && <span className="me-1 text-[0.8125rem] text-muted">{d.carte.from}</span>}
      {price(it.price, lang)}
      {it.perPerson && <span className="ms-1 text-[0.8125rem] text-muted">{d.carte.perPerson}</span>}
    </span>
  );
}

/**
 * La carte, en vraie page HTML : rubriques (entrées, plats, fruits de mer, Portugal, desserts, vins),
 * chaque ligne « nom … prix ». Données : data/carte.json + locales/*.json → carte.items.
 */
export function Menu({ lang, d, headingLevel = 2, only }: { lang: Locale; d: Dict; headingLevel?: 2 | 3; only?: CatId[] }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const cats = only ? CATEGORIES.filter((c) => only.includes(c.id)) : CATEGORIES;
  return (
    <div className="grid gap-x-20 gap-y-16 md:grid-cols-2">
      {cats.map((c) => (
        <section key={c.id} id={c.id} className="scroll-mt-32">
          <H className="display flex items-center gap-3 text-[2rem] text-navy">
            <Star className="h-3.5 w-3.5 shrink-0 text-gold" />
            {d.carte.categories[c.id]}
          </H>
          <p className="mt-2 text-[0.9375rem] font-light text-muted">{d.carte.intro[c.id]}</p>
          <ul className="mt-6 space-y-5">
            {c.items.map((id) => {
              const it = items[id];
              const t = d.carte.items[id as keyof Dict["carte"]["items"]];
              return (
                <li key={id}>
                  <p className="flex items-baseline gap-3">
                    <span className="display text-[1.3125rem] leading-snug">{t.name}</span>
                    <span className="dots" aria-hidden="true" />
                    <span className="shrink-0 text-end">
                      <Price it={it} lang={lang} d={d} />
                    </span>
                  </p>
                  {t.desc && <p className="mt-0.5 text-[0.875rem] font-light text-muted">{t.desc}</p>}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
