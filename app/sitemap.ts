import type { MetadataRoute } from "next";
import site from "@/data/site.json";
import { defaultLocale, locales, type Locale } from "@/lib/locales";
import { pagePath, type PageId } from "@/lib/pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const alt = (path: (l: Locale) => string) => ({ languages: { ...Object.fromEntries(locales.map((l) => [l, `${site.url}${path(l)}`])), "x-default": `${site.url}${path(defaultLocale)}` } });
  const home = locales.map((lang) => ({ url: `${site.url}/${lang}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: lang === defaultLocale ? 1 : 0.8, alternates: alt((l) => `/${l}`) }));
  const pages: [PageId, number][] = [
    ["carte", 0.9],
    ["dury", 0.8],
    ["seafood", 0.8],
    ["gift", 0.5],
  ];
  const rest = pages.flatMap(([id, prio]) =>
    locales.map((lang) => ({ url: `${site.url}${pagePath(id, lang)}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: lang === defaultLocale ? prio : prio - 0.1, alternates: alt((l) => pagePath(id, l)) })),
  );
  return [...home, ...rest];
}
