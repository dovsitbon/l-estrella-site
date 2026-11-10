import type { Locale } from "@/lib/locales";

// Pages secondaires et leurs adresses dans chaque langue
export const PAGE_IDS = ["carte", "dury", "seafood", "gift", "legal"] as const;
export type PageId = (typeof PAGE_IDS)[number];

export const SLUGS: Record<PageId, Record<Locale, string>> = {
  carte: { fr: "carte", en: "menu" },
  dury: { fr: "restaurant-dury", en: "restaurant-dury-amiens" },
  seafood: { fr: "fruits-de-mer-amiens", en: "seafood-near-amiens" },
  gift: { fr: "bon-cadeau", en: "gift-voucher" },
  legal: { fr: "mentions-legales", en: "legal" },
};

export const pagePath = (id: PageId, lang: Locale) => `/${lang}/${SLUGS[id][lang]}`;

export const pageOfSlug = (slug: string, lang: Locale) => PAGE_IDS.find((id) => SLUGS[id][lang] === slug) ?? null;
