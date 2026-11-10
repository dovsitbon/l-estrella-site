import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import carte from "@/data/carte.json";
import { altOf, fill, getDict, isLocale, locales, type Dict, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";
import { img } from "@/lib/media";
import { PAGE_IDS, pageOfSlug, pagePath, SLUGS, type PageId } from "@/lib/pages";
import { pageJsonLd } from "@/lib/jsonld";
import { CATEGORIES, Menu } from "@/components/Menu";
import { TodayMenu } from "@/components/TodayMenu";
import { OpenStatus } from "@/components/OpenStatus";
import { Rating } from "@/components/Rating";
import { HoursTable } from "@/components/HoursTable";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Star, StarRule } from "@/components/Logo";
import { PhoneIcon } from "@/components/icons";

export function generateStaticParams() {
  return locales.flatMap((lang) => PAGE_IDS.map((id) => ({ lang, slug: SLUGS[id][lang] })));
}
export const dynamicParams = false;

function resolve(lang: string, slug: string): { lang: Locale; id: PageId } | null {
  if (!isLocale(lang)) return null;
  const id = pageOfSlug(slug, lang);
  return id ? { lang, id } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) return {};
  const d = getDict(r.lang);
  const p = d.pages[r.id];
  const description = "metaDescription" in p ? p.metaDescription : d.meta.description;
  return {
    title: p.metaTitle,
    description,
    alternates: {
      canonical: pagePath(r.id, r.lang),
      languages: { ...Object.fromEntries(locales.map((x) => [x, pagePath(r.id, x)])), "x-default": pagePath(r.id, "fr") },
    },
    openGraph: { title: p.metaTitle, description, url: pagePath(r.id, r.lang), images: [{ url: "/og.jpg", width: 1200, height: 630 }] },
    robots: r.id === "legal" ? { index: false, follow: true } : undefined,
  };
}

function Actions({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link href={`/${lang}#reserver`} className="btn">
        {d.nav.bookCta}
      </Link>
      <a href={`tel:${site.phoneIntl}`} className="btn-line text-navy">
        <PhoneIcon />
        {site.phone}
      </a>
    </div>
  );
}

function PageHead({ eyebrow, title, lead, lang, d }: { eyebrow: string; title: string; lead: string; lang: Locale; d: Dict }) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="display mt-4 text-[3rem] text-navy md:text-[4.5rem]">{title}</h1>
      <p className="lead mt-6">{lead}</p>
      <div className="mt-6 flex flex-col gap-1.5 text-[0.9375rem] text-muted sm:flex-row sm:gap-6">
        <Rating d={d} lang={lang} />
        <OpenStatus />
      </div>
    </header>
  );
}

function Carte({ lang, d }: { lang: Locale; d: Dict }) {
  return (
    <div className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <PageHead eyebrow={d.carte.eyebrow} title={d.carte.title} lead={d.carte.lead} lang={lang} d={d} />
        <nav aria-label={d.carte.navLabel} className="no-scrollbar sticky top-16 z-30 -mx-6 mt-12 flex gap-6 overflow-x-auto border-y border-line bg-cream/95 px-6 backdrop-blur-sm md:top-[4.75rem] md:mx-0 md:px-0">
          <a href="#menu-du-jour" className="flex min-h-12 shrink-0 items-center text-[0.875rem] whitespace-nowrap transition-colors hover:text-gold-ink">
            {d.nav.today}
          </a>
          {CATEGORIES.map((c) => (
            <a key={c.id} href={`#${c.id}`} className="flex min-h-12 shrink-0 items-center text-[0.875rem] whitespace-nowrap transition-colors hover:text-gold-ink">
              {d.carte.categories[c.id]}
            </a>
          ))}
        </nav>
        <section id="menu-du-jour" className="mt-14 scroll-mt-36 grid items-center gap-10 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <h2 className="display text-[2.5rem] text-navy md:text-[3rem]">{d.today.title}</h2>
            <p className="lead mt-4">{d.today.lead}</p>
          </div>
          <TodayMenu lang={lang} d={d} />
        </section>
        <StarRule className="my-16 md:my-20" />
        <Menu lang={lang} d={d} />
        <div className="mt-16 space-y-1 text-[0.8125rem] text-muted">
          <p>{fill(d.carte.checked, { date: formatDay(carte.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
          <p>{d.carte.allergens}</p>
        </div>
        <div className="mt-10">
          <Actions lang={lang} d={d} />
        </div>
      </div>
    </div>
  );
}

/** Pages de référencement local : « Restaurant à Dury » et « Fruits de mer près d'Amiens ». */
function Local({ lang, d, id }: { lang: Locale; d: Dict; id: "dury" | "seafood" }) {
  const p = d.pages[id];
  const salle = img("/media/salle/salle-nappes-blanches.jpg");
  return (
    <div className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-12 md:grid-cols-[1.2fr_1fr] md:gap-20">
          <div>
            <PageHead eyebrow={p.eyebrow} title={p.title} lead={p.lead} lang={lang} d={d} />
            <div className="mt-9">
              <Actions lang={lang} d={d} />
            </div>
          </div>
          {id === "seafood" ? (
            <PhotoSlot label={d.photoSoon.label} caption={d.photoSoon.plateau} className="aspect-[4/5]" />
          ) : (
            <div className="relative aspect-[4/5] bg-cream-deep">
              <Image src={salle.src} alt={altOf(d, salle.src)} fill priority sizes="(min-width: 768px) 42vw, 100vw" quality={75} className="object-cover object-[45%_50%]" />
            </div>
          )}
        </div>
        <div className="mt-20 grid gap-12 border-t border-line pt-16 md:mt-28 md:grid-cols-3 md:gap-14">
          {p.sections.map((s) => (
            <section key={s.h}>
              <Star className="h-4 w-4 text-gold" />
              <h2 className="display mt-4 text-[1.875rem] text-navy">{s.h}</h2>
              <p className="mt-3 leading-relaxed font-light text-muted">{s.p}</p>
            </section>
          ))}
        </div>
        <div className="mt-20 grid gap-12 bg-paper p-8 ring-1 ring-line md:mt-28 md:grid-cols-2 md:p-12">
          <div>
            <p className="eyebrow">{d.infos.address}</p>
            <p className="display mt-3 text-[1.75rem] leading-snug text-navy">
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </p>
            <p className="mt-3 font-light text-muted">{d.infos.accessText}</p>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-4 inline-block text-[0.9375rem]">
              {d.infos.directions}
            </a>
          </div>
          <div>
            <p className="eyebrow">{d.infos.hours}</p>
            <HoursTable lang={lang} d={d} className="mt-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Gift({ lang, d }: { lang: Locale; d: Dict }) {
  const p = d.pages.gift;
  return (
    <div className="px-6 pt-14 pb-24 md:px-10 md:pt-20 md:pb-32">
      <div className="mx-auto max-w-5xl text-center">
        <Star className="mx-auto h-8 w-8 text-gold" strokeWidth={0.9} />
        <p className="eyebrow mt-6">{p.eyebrow}</p>
        <h1 className="display mt-4 text-[3rem] text-navy md:text-[4.5rem]">{p.title}</h1>
        <p className="lead mx-auto mt-6 max-w-2xl">{p.lead}</p>
        <ol className="mt-16 grid gap-px bg-line text-start ring-1 ring-line md:grid-cols-3">
          {p.steps.map((s, i) => (
            <li key={s.h} className="bg-paper p-8">
              <span className="display text-[2.5rem] leading-none text-gold-ink">{i + 1}</span>
              <h2 className="display mt-4 text-[1.75rem] text-navy">{s.h}</h2>
              <p className="mt-2 font-light text-muted">{s.p}</p>
            </li>
          ))}
        </ol>
        <a href={`tel:${site.phoneIntl}`} className="btn mt-12">
          <PhoneIcon />
          {p.cta} · {site.phone}
        </a>
        <p className="mt-6 text-[0.8125rem] text-muted">{p.note}</p>
        <p className="mt-2 text-[0.8125rem]">
          <Link href={`/${lang}`} className="link-line">
            L&rsquo;Estrella
          </Link>
        </p>
      </div>
    </div>
  );
}

function Legal({ d }: { d: Dict }) {
  const p = d.pages.legal;
  const pending = <em className="text-muted not-italic">{p.pending}</em>;
  const blocks: [string, React.ReactNode][] = [
    [p.editor, p.editorText],
    [p.company, site.legal.company || pending],
    [p.siret, site.legal.siret || pending],
    [p.host, site.legal.host],
    [p.data, p.dataText],
    [p.cookies, p.cookiesText],
    [p.photos, p.photosText],
  ];
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <h1 className="display text-[3rem] text-navy md:text-[3.75rem]">{p.title}</h1>
      {blocks.map(([title, body]) => (
        <section key={title} className="mt-10">
          <h2 className="eyebrow">{title}</h2>
          <p className="mt-2 leading-relaxed">{body}</p>
        </section>
      ))}
    </div>
  );
}

export default async function Page({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang: l, slug } = await params;
  const r = resolve(l, slug);
  if (!r) notFound();
  const d = getDict(r.lang);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd(r.lang, r.id)) }} />
      {r.id === "carte" && <Carte lang={r.lang} d={d} />}
      {(r.id === "dury" || r.id === "seafood") && <Local lang={r.lang} d={d} id={r.id} />}
      {r.id === "gift" && <Gift lang={r.lang} d={d} />}
      {r.id === "legal" && <Legal d={d} />}
    </>
  );
}
