"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import site from "@/data/site.json";
import { Logo, StarRule } from "@/components/Logo";
import { LangSwitch } from "@/components/LangSwitch";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { pagePath } from "@/lib/pages";

export function Header() {
  const { lang, d } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (menu) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menu]);

  const home = `/${lang}`;
  const book = `${home}#reserver`;
  const links = [
    { href: pagePath("carte", lang), label: d.nav.carte },
    { href: `${home}#menu-du-jour`, label: d.nav.today },
    { href: `${home}#groupes`, label: d.nav.groups },
    { href: book, label: d.nav.book },
    { href: `${home}#infos`, label: d.nav.infos },
  ];
  const gift = { href: pagePath("gift", lang), label: d.nav.gift };
  const phoneIntl = `tel:${site.phoneIntl}`;

  return (
    <>
      <header className={`sticky top-0 z-50 border-b bg-cream/95 backdrop-blur-sm transition-colors duration-500 ${scrolled ? "border-line" : "border-transparent"}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-10 focus:bg-cream focus:px-4 focus:py-2">
          {d.nav.skip}
        </a>
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 md:h-[4.75rem] md:px-8">
          <div className="flex items-center">
            <button type="button" className="-ms-2 flex h-11 w-11 items-center justify-center xl:hidden" onClick={() => setMenu(true)} aria-label={d.nav.menu} aria-expanded={menu}>
              <MenuIcon />
            </button>
            <nav className="hidden items-center gap-6 xl:flex" aria-label={d.nav.menu}>
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="text-[0.875rem] whitespace-nowrap transition-colors hover:text-gold-ink">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href={home} aria-label={d.nav.home} className="text-navy">
            <Logo className="h-9 w-auto md:h-11" />
          </Link>

          <div className="flex items-center justify-end gap-2 lg:gap-5">
            <Link href={gift.href} className="hidden text-[0.875rem] whitespace-nowrap transition-colors hover:text-gold-ink 2xl:inline">
              {gift.label}
            </Link>
            <LangSwitch lang={lang} label={d.nav.lang} className="hidden lg:flex" />
            <a href={phoneIntl} className="hidden items-center gap-2 text-[0.875rem] whitespace-nowrap transition-colors hover:text-gold-ink lg:inline-flex">
              <PhoneIcon className="h-4 w-4" />
              {site.phone}
            </a>
            <a href={phoneIntl} className="-me-2 flex h-11 w-11 items-center justify-center md:hidden" aria-label={`${d.nav.call} ${site.phone}`}>
              <PhoneIcon />
            </a>
            <Link href={book} className="btn hidden !min-h-11 !px-5 md:inline-flex">
              {d.nav.bookCta}
            </Link>
          </div>
        </div>
      </header>

      {menu && (
        <div className="fade-in fixed inset-0 z-[60] flex flex-col overscroll-contain bg-cream text-ink" role="dialog" aria-modal="true" aria-label={d.nav.menu}>
          <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center px-4 md:h-[4.75rem] md:px-8">
            <button type="button" className="-ms-2 flex h-11 w-11 items-center justify-center justify-self-start" onClick={() => setMenu(false)} aria-label={d.nav.close}>
              <CloseIcon />
            </button>
            <span className="text-navy">
              <Logo className="h-9 w-auto md:h-11" />
            </span>
            <span />
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center gap-3" aria-label={d.nav.menu}>
            {[...links, gift].map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.22, 0.61, 0.36, 1] }}>
                <Link href={l.href} onClick={() => setMenu(false)} className="display text-[2.125rem]">
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <StarRule className="mt-6 w-40" />
            <a href={phoneIntl} className="link-line mt-4 text-[0.9375rem]">
              {site.phone}
            </a>
          </nav>
          <div className="flex items-center justify-between border-t border-line px-6 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
            <LangSwitch lang={lang} label={d.nav.lang} />
            <Link href={book} onClick={() => setMenu(false)} className="btn !min-h-11 !px-5">
              {d.nav.bookCta}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

/** Barre fixée en bas de l'écran sur mobile : « Réserver une table » toujours à portée de pouce, et l'appel. */
export function MobileBookBar() {
  const { lang, d } = useLocale();
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-cream/95 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <Link href={`/${lang}#reserver`} className="btn flex-1">
        {d.nav.bookCta}
      </Link>
      <a href={`tel:${site.phoneIntl}`} className="btn-line px-5">
        <PhoneIcon />
        {d.nav.call}
      </a>
    </div>
  );
}
