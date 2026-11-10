"use client";

import { useEffect, useState } from "react";

const KEY = "estrella-intro";
const STAR = "M60 6L67.4 25.8L88.5 26.7L72 39.9L77.6 60.3L60 48.6L42.4 60.3L48 39.9L31.5 26.7L52.6 25.8Z";

/**
 * Ouverture (1,2 s, une fois par session), en CSS (globals.css) : fond crème, une étoile se dessine au trait or,
 * « L'ESTRELLA » apparaît, puis « RESTAURANT · DURY », fondu sur le hero.
 * Bouton « Passer » ; rien du tout si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  return (
    <div className="intro-curtain flex flex-col items-center justify-center text-navy">
      <svg viewBox="0 0 120 66" className="h-16 w-auto md:h-20" aria-hidden="true">
        <path className="intro-star" pathLength={1} d={STAR} fill="none" stroke="#C9A45C" strokeWidth="1.3" strokeLinejoin="round" />
      </svg>
      <p className="intro-name mt-5 ps-[0.2em] text-center font-[family-name:var(--font-cormorant)] text-[clamp(1.6rem,6vw,2.4rem)] font-medium" translate="no" aria-hidden="true">
        L&rsquo;ESTRELLA
      </p>
      <p className="intro-sub mt-2 ps-[0.3em] text-[0.6875rem] tracking-[0.3em] text-muted" aria-hidden="true">
        RESTAURANT · DURY
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="absolute end-4 bottom-4 min-h-11 px-4 text-[0.875rem] text-muted transition-colors hover:text-ink"
      >
        {skipLabel}
      </button>
    </div>
  );
}
