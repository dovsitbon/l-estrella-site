import Link from "next/link";
import site from "@/data/site.json";
import { Logo, StarRule } from "@/components/Logo";
import { HoursTable } from "@/components/HoursTable";
import { FacebookIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const linkCls = "inline-flex min-h-9 items-center transition-colors hover:text-gold";
  return (
    <footer className="bg-navy pb-24 text-cream md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr_1.1fr] md:px-10 md:py-20">
        <div>
          <Logo className="h-12 w-auto" gold="#C9A45C" />
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed font-light text-cream/80">{d.footer.tagline}</p>
          <a href={site.facebook} target="_blank" rel="noopener noreferrer" className="mt-4 -ms-1 inline-flex min-h-11 items-center gap-2 text-[0.9375rem] transition-opacity hover:opacity-70">
            <FacebookIcon />
            <span>Facebook</span>
          </a>
        </div>
        <div className="text-[0.9375rem] leading-relaxed">
          <p className="eyebrow mb-3 !text-gold">{d.infos.address}</p>
          <address className="not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={`tel:${site.phoneIntl}`} className="link-line mt-3 inline-block">
            {site.phone}
          </a>
          <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 block text-cream/80 transition-colors hover:text-gold">
            {d.infos.directions}
          </a>
        </div>
        <div className="text-[0.9375rem]">
          <p className="eyebrow mb-3 !text-gold">{d.footer.explore}</p>
          <ul className="text-cream/85">
            <li>
              <Link href={pagePath("carte", lang)} className={linkCls}>
                {d.nav.carte}
              </Link>
            </li>
            <li>
              <Link href={`/${lang}#reserver`} className={linkCls}>
                {d.nav.bookCta}
              </Link>
            </li>
            <li>
              <Link href={pagePath("seafood", lang)} className={linkCls}>
                {d.pages.seafood.title}
              </Link>
            </li>
            <li>
              <Link href={pagePath("dury", lang)} className={linkCls}>
                {d.pages.dury.title}
              </Link>
            </li>
            <li>
              <Link href={pagePath("gift", lang)} className={linkCls}>
                {d.nav.gift}
              </Link>
            </li>
            <li>
              <Link href={pagePath("legal", lang)} className={linkCls}>
                {d.footer.legal}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3 !text-gold">{d.infos.hours}</p>
          <HoursTable lang={lang} d={d} />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 pt-2 pb-8">
        <StarRule className="w-full max-w-md" />
        <p className="text-[0.8125rem] text-cream/70">{fill(d.footer.rights, { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
}
