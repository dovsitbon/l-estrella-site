import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import site from "@/data/site.json";
import avis from "@/data/avis.json";
import { altOf, fill, getDict, isLocale, type Dict, type Locale } from "@/lib/i18n";
import { formatDay, formatTime } from "@/lib/format";
import { weekHours } from "@/lib/hours";
import { img } from "@/lib/media";
import { pagePath } from "@/lib/pages";
import { homeJsonLd } from "@/lib/jsonld";
import { Reveal } from "@/components/Reveal";
import { Rating } from "@/components/Rating";
import { FadeUp } from "@/components/FadeUp";
import { OpenStatus } from "@/components/OpenStatus";
import { BookingForm } from "@/components/BookingForm";
import { HoursTable } from "@/components/HoursTable";
import { TodayMenu } from "@/components/TodayMenu";
import { PhotoSlot } from "@/components/PhotoSlot";
import { Star, StarRule } from "@/components/Logo";
import { ArrowIcon, ClockIcon, DineIcon, ParkingIcon, PhoneIcon, PinIcon, UsersIcon } from "@/components/icons";

function SectionHead({ eyebrow, title, lead, center = false, id }: { eyebrow: string; title: string; lead?: string; center?: boolean; id?: string }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display mt-4 text-[2.5rem] text-navy md:text-[3.5rem]">
        {title}
      </h2>
      {lead && <p className="lead mt-5">{lead}</p>}
    </div>
  );
}

/** Bloc alterné : photo (ou emplacement) + texte court + un seul bouton. */
function Alt({ media, eyebrow, title, text, cta, href, reverse = false, id }: { media: React.ReactNode; eyebrow: string; title: string; text: string; cta: string; href: string; reverse?: boolean; id?: string }) {
  return (
    <section id={id} className="scroll-mt-24 px-6 md:px-10">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-20">
        <Reveal className={reverse ? "md:order-2" : ""}>{media}</Reveal>
        <Reveal delay={0.1} className="max-w-lg">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display mt-4 text-[2.25rem] text-navy md:text-[3rem]">{title}</h2>
          <p className="lead mt-6">{text}</p>
          <Link href={href} className="btn mt-9">
            {cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang: l } = await params;
  if (!isLocale(l)) notFound();
  const lang: Locale = l;
  const d = getDict(lang);
  const carteHref = pagePath("carte", lang);
  const home = `/${lang}`;

  const hero = img("/media/hero/table-lumiere.jpg");
  const salle = img("/media/salle/salle-nappes-blanches.jpg");
  const bar = img("/media/salle/bar-suspensions.jpg");
  const sundayStart = weekHours()[6][0]?.[0] ?? "12:30";

  const tiles: { id: keyof Dict["tiles"]["items"]; href: string }[] = [
    { id: "today", href: `${home}#menu-du-jour` },
    { id: "entrees", href: `${carteHref}#entrees` },
    { id: "plats", href: `${carteHref}#plats` },
    { id: "seafood", href: `${carteHref}#fruits-de-mer` },
    { id: "desserts", href: `${carteHref}#desserts` },
    { id: "vins", href: `${carteHref}#vins` },
  ];
  const services = [
    { k: "lunch", Icon: ClockIcon },
    { k: "sunday", Icon: DineIcon },
    { k: "groups", Icon: UsersIcon },
    { k: "parking", Icon: ParkingIcon },
  ] as const;
  const offers = [
    { k: "lunch", when: d.offers.lunch.when, href: `${home}#menu-du-jour` },
    { k: "sunday", when: fill(d.offers.sunday.when, { time: formatTime(sundayStart, lang) }), href: `${home}?service=sunday#reserver` },
    { k: "groups", when: d.offers.groups.when, href: `${home}?groupe=1#reserver` },
  ] as const;
  const quotes = avis.items as { name: string; date: string; text: Record<Locale, string> }[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />

      {/* 1. Hero plein écran : la table dans la lumière du midi */}
      <section className="relative flex min-h-[calc(100svh-6.5rem)] items-end overflow-hidden bg-navy-deep md:min-h-[calc(100svh-7.25rem)]">
        <Image src={hero.src} alt={d.hero.imageAlt} fill priority sizes="100vw" quality={80} className="object-cover object-[30%_50%]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/60 to-navy-deep/15 md:bg-gradient-to-r md:from-navy-deep/90 md:via-navy-deep/60 md:to-navy-deep/5" aria-hidden="true" />
        <div className="relative w-full px-6 pt-32 pb-12 text-cream md:px-12 md:pb-20 lg:px-20">
          <div className="max-w-2xl">
            <p className="text-[0.6875rem] tracking-[0.26em] text-gold uppercase">{d.hero.eyebrow}</p>
            <h1 className="display mt-5 text-[3.25rem] md:text-[5rem] xl:text-[5.75rem]">{d.hero.title}</h1>
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed font-light text-cream/90">{d.hero.lead}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={`${home}#reserver`} className="btn btn-light">
                  {d.hero.ctaBook}
                </Link>
                <Link href={carteHref} className="btn-line text-cream">
                  {d.hero.ctaMenu}
                </Link>
              </div>
              <div className="mt-7 flex flex-col gap-1.5 text-[0.875rem] text-cream/85 sm:flex-row sm:items-center sm:gap-6">
                <Rating d={d} lang={lang} />
                <OpenStatus />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* 2. Tuiles de catégories */}
      <section aria-labelledby="tuiles" className="px-6 pt-20 md:px-10 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <h2 id="tuiles" className="sr-only">
            {d.tiles.title}
          </h2>
          <ul className="grid grid-cols-2 border-s border-t border-line sm:grid-cols-3 xl:grid-cols-6">
            {tiles.map((t, i) => (
              <Reveal as="li" key={t.id} delay={i * 0.04} className="border-e border-b border-line">
                <Link href={t.href} className="group flex h-full min-h-40 flex-col justify-between p-5 transition-colors hover:bg-paper md:min-h-48 md:p-6">
                  <Star className="h-4 w-4 text-gold transition-transform duration-500 group-hover:rotate-[36deg]" />
                  <span>
                    <span className="display block text-[1.625rem] text-navy">{d.tiles.items[t.id].label}</span>
                    <span className="mt-1 flex items-center gap-2 text-[0.8125rem] font-light text-muted">
                      {d.tiles.items[t.id].text}
                      <ArrowIcon className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Bande de services en 4 pictos */}
      <section aria-label={d.services.title} className="px-6 pt-16 md:px-10 md:pt-20">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 md:grid-cols-4">
          {services.map(({ k, Icon }) => (
            <li key={k} className="flex flex-col items-center gap-3 px-3 text-center">
              <Icon className="h-7 w-7 text-gold-ink" />
              <p className="display text-[1.375rem] text-navy">{d.services[k].title}</p>
              <p className="text-[0.875rem] font-light text-muted">{fill(d.services[k].text, { n: site.capacity })}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Le menu du jour : l'ardoise */}
      <section id="menu-du-jour" className="scroll-mt-24 px-6 pt-24 md:px-10 md:pt-36">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <SectionHead eyebrow={d.today.eyebrow} title={d.today.title} lead={d.today.lead} />
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link href={`${home}#reserver`} className="btn">
                {d.today.cta}
              </Link>
              <Link href={carteHref} className="link-line text-[0.9375rem]">
                {d.carte.seeAll}
              </Link>
            </div>
          </div>
          <Reveal>
            <TodayMenu lang={lang} d={d} />
          </Reveal>
        </div>
      </section>

      {/* 5. Grille : déjeuner, dimanche, groupes */}
      <section aria-labelledby="quand" className="px-6 pt-24 md:px-10 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={d.offers.eyebrow} title={d.offers.title} id="quand" center />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {offers.map((o, i) => (
              <Reveal as="li" key={o.k} delay={i * 0.06} className="flex flex-col bg-paper p-8 ring-1 ring-line md:p-10">
                <p className="text-[0.75rem] tracking-[0.18em] text-gold-ink uppercase">{o.when}</p>
                <h3 className="display mt-4 text-[2.125rem] text-navy">{d.offers[o.k].title}</h3>
                <p className="mt-4 flex-1 font-light text-muted">{d.offers[o.k].text}</p>
                <Link href={o.href} className="btn-line mt-8 self-start text-navy">
                  {d.offers[o.k].cta}
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Trois blocs alternés */}
      <div className="space-y-24 pt-24 md:space-y-36 md:pt-36">
        <Alt
          media={<PhotoSlot label={d.photoSoon.label} caption={d.photoSoon.plat} className="aspect-[4/5] md:aspect-[5/6]" />}
          eyebrow={d.blocks.cuisine.eyebrow}
          title={d.blocks.cuisine.title}
          text={d.blocks.cuisine.text}
          cta={d.blocks.cuisine.cta}
          href={carteHref}
        />
        <Alt
          media={<PhotoSlot label={d.photoSoon.label} caption={d.photoSoon.plateau} tone="cream" className="aspect-[4/5] md:aspect-[5/6]" />}
          eyebrow={d.blocks.seafood.eyebrow}
          title={d.blocks.seafood.title}
          text={d.blocks.seafood.text}
          cta={d.blocks.seafood.cta}
          href={`${home}#reserver`}
          reverse
        />
        <Alt
          id="groupes"
          media={
            <div className="zoom aspect-[4/5] bg-cream-deep md:aspect-[5/6]">
              <Image src={salle.src} alt={altOf(d, salle.src)} fill sizes="(min-width: 768px) 46vw, 100vw" quality={70} className="object-cover object-[45%_50%]" />
            </div>
          }
          eyebrow={d.blocks.family.eyebrow}
          title={d.blocks.family.title}
          text={fill(d.blocks.family.text, { n: site.capacity })}
          cta={d.blocks.family.cta}
          href={`${home}?groupe=1#reserver`}
        />
      </div>

      {/* 7. Réserver une table */}
      <section id="reserver" className="scroll-mt-20 px-6 pt-24 md:px-10 md:pt-36">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[2fr_3fr] md:gap-20">
          <div>
            <SectionHead eyebrow={d.book.eyebrow} title={d.book.title} lead={d.book.lead} />
            <div className="mt-8 space-y-2 text-[0.9375rem] text-muted">
              <Rating d={d} lang={lang} />
              <OpenStatus />
            </div>
            <a href={`tel:${site.phoneIntl}`} className="btn-line mt-8 text-navy">
              <PhoneIcon />
              {d.nav.call} · {site.phone}
            </a>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* 8. Avis */}
      <section aria-labelledby="avis" className="px-6 pt-24 md:px-10 md:pt-36">
        <div className="mx-auto max-w-7xl border-y border-line py-16 text-center md:py-24">
          <p className="eyebrow">{d.reviews.eyebrow}</p>
          <h2 id="avis" className="display mt-4 text-[2.5rem] text-navy md:text-[3.5rem]">
            {d.reviews.title}
          </h2>
          <p className="display mt-8 text-[5rem] leading-none text-navy md:text-[6.5rem]">
            {site.rating.value.toLocaleString(lang === "en" ? "en-GB" : "fr-FR")}
            <span className="text-[0.35em] text-muted">/5</span>
          </p>
          <p className="mt-3 text-[1rem]">{fill(d.reviews.count, { count: site.rating.count })}</p>
          <p className="mt-1 text-[0.8125rem] text-muted">{fill(d.reviews.checked, { date: formatDay(site.rating.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>
          <p className="mt-10 text-[0.75rem] tracking-[0.18em] text-gold-ink uppercase">{d.reviews.themesLabel}</p>
          <ul className="mx-auto mt-4 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2">
            {d.reviews.themes.map((t) => (
              <li key={t} className="display flex items-center gap-2.5 text-[1.375rem] text-navy italic">
                <Star className="h-2.5 w-2.5 text-gold" />
                {t}
              </li>
            ))}
          </ul>
          {/* Emplacements des avis : uniquement de vrais avis Google, avec l'accord du restaurant (data/avis.json) */}
          <div dangerouslySetInnerHTML={{ __html: "<!-- À REMPLIR avec de vrais avis clients (data/avis.json) -->" }} hidden />
          {quotes.length > 0 && (
            <ul className="mx-auto mt-14 grid max-w-5xl gap-5 text-start md:grid-cols-3">
              {quotes.slice(0, 3).map((q) => (
                <li key={q.name + q.date} className="bg-paper p-7 ring-1 ring-line">
                  <blockquote className="display text-[1.25rem] leading-snug">« {q.text[lang]} »</blockquote>
                  <p className="mt-4 text-[0.875rem] text-muted">{q.name}</p>
                </li>
              ))}
            </ul>
          )}
          <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className="btn-line mt-12 text-navy">
            {d.reviews.cta}
          </a>
        </div>
      </section>

      {/* 9. Infos pratiques */}
      <section id="infos" className="scroll-mt-20 px-6 pt-24 md:px-10 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow={d.infos.eyebrow} title={d.infos.title} />
          <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.25fr]">
            <dl className="space-y-7 text-[1rem]">
              <div>
                <dt className="flex items-center gap-2 text-[0.75rem] tracking-[0.18em] text-gold-ink uppercase">
                  <PinIcon className="h-4 w-4" />
                  {d.infos.address}
                </dt>
                <dd className="display mt-2 text-[1.5rem] leading-snug text-navy">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </dd>
                <dd>
                  <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-line mt-2 inline-block text-[0.9375rem]">
                    {d.infos.directions}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-2 text-[0.75rem] tracking-[0.18em] text-gold-ink uppercase">
                  <PhoneIcon className="h-4 w-4" />
                  {d.infos.phone}
                </dt>
                <dd className="mt-2">
                  <a href={`tel:${site.phoneIntl}`} className="display text-[1.5rem] text-navy">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.75rem] tracking-[0.18em] text-gold-ink uppercase">{d.infos.access}</dt>
                <dd className="mt-1.5 font-light text-muted">{d.infos.accessText}</dd>
              </div>
              <div>
                <dt className="text-[0.75rem] tracking-[0.18em] text-gold-ink uppercase">{d.infos.parking}</dt>
                <dd className="mt-1.5 font-light text-muted">{d.infos.parkingText}</dd>
              </div>
              <div>
                <dt className="text-[0.75rem] tracking-[0.18em] text-gold-ink uppercase">{d.infos.capacity}</dt>
                <dd className="mt-1.5 font-light text-muted">{fill(d.infos.capacityText, { n: site.capacity })}</dd>
              </div>
            </dl>
            <div>
              <p className="text-[0.75rem] tracking-[0.18em] text-gold-ink uppercase">{d.infos.hours}</p>
              <OpenStatus className="mt-3 text-[0.9375rem]" />
              <HoursTable lang={lang} d={d} className="mt-3" />
              <p className="mt-4 text-[0.8125rem] text-muted">{d.infos.hoursNote}</p>
            </div>
            <div className="grid gap-4 md:col-span-2 lg:col-span-1">
              <div className="zoom relative aspect-[4/3] bg-cream-deep">
                <Image src={bar.src} alt={altOf(d, bar.src)} fill sizes="(min-width: 1024px) 34vw, 100vw" quality={70} className="object-cover" />
              </div>
              <iframe title={d.infos.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full border-0 bg-cream-deep grayscale-[40%]" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section aria-labelledby="faq" className="px-6 pt-24 pb-24 md:px-10 md:pt-36 md:pb-36">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_2fr]">
          <div>
            <p className="eyebrow">{d.faq.eyebrow}</p>
            <h2 id="faq" className="display mt-4 text-[2.5rem] text-navy md:text-[3.5rem]">
              {d.faq.title}
            </h2>
            <StarRule className="mt-8 max-w-48" />
          </div>
          <div className="border-t border-line">
            {d.faq.items.map((f) => (
              <details key={f.q} className="border-b border-line">
                <summary className="flex min-h-16 items-center justify-between gap-6 py-4 text-[1.0625rem]">
                  {f.q}
                  <span className="faq-plus shrink-0 text-[1.5rem] leading-none font-light text-gold-ink" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed font-light text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
