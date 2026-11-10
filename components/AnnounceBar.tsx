"use client";

import Link from "next/link";
import { useState } from "react";
import { useMounted } from "@/lib/useMounted";
import annonces from "@/data/annonces.json";
import menu from "@/data/menu-du-jour.json";
import { CloseIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { isoDay } from "@/lib/format";

type Item = { id: string; active?: boolean; from?: string; to?: string; fr: string; en: string };

/**
 * Bandeau d'infos pratiques, refermable (mémorisé pour la session) :
 * une annonce datée de data/annonces.json (fermeture, congés…) si elle couvre la date du jour,
 * sinon « Menu du jour : … » d'après data/menu-du-jour.json.
 */
export function AnnounceBar({ buildDay }: { buildDay: string }) {
  const { lang, d } = useLocale();
  const mounted = useMounted();
  const [closed, setClosed] = useState(false);
  const today = mounted ? isoDay(new Date()) : buildDay;
  const notice = (annonces.items as Item[]).find((a) => a.active !== false && (!a.from || a.from <= today) && (!a.to || today <= a.to));
  const id = notice ? notice.id : `menu-${menu.updated}`;
  let stored = false;
  if (mounted)
    try {
      stored = sessionStorage.getItem(`estrella-bar-${id}`) === "1";
    } catch {}

  if (closed || stored) return null;
  return (
    <div className="relative z-[51] flex min-h-10 items-center justify-center bg-navy px-12 py-2 text-center text-[0.8125rem] leading-snug text-cream">
      {notice ? (
        <p>{notice[lang]}</p>
      ) : (
        <p>
          <span className="text-gold">{d.announce.today} :</span> <span className="hidden sm:inline">{menu.entree[lang]} · </span>
          <Link href={`/${lang}#menu-du-jour`} className="link-line">
            {menu.plat[lang]}
          </Link>
          <span className="hidden sm:inline"> · {menu.dessert[lang]}</span>
        </p>
      )}
      <button
        type="button"
        onClick={() => {
          setClosed(true);
          try {
            sessionStorage.setItem(`estrella-bar-${id}`, "1");
          } catch {}
        }}
        className="absolute end-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center opacity-70 transition-opacity hover:opacity-100"
        aria-label={d.announce.close}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
