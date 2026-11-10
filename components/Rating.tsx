import site from "@/data/site.json";
import { StarIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";

/** Note Google (data/site.json → rating), à placer près des boutons. */
export function Rating({ d, lang, className = "" }: { d: Dict; lang: Locale; className?: string }) {
  return (
    <a href={site.reviewsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-6 items-center gap-2 transition-opacity hover:opacity-75 ${className}`}>
      <span className="flex text-gold" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} className={`h-3.5 w-3.5 ${i === 4 ? "opacity-50" : ""}`} />
        ))}
      </span>
      <span>
        {fill(d.hero.rating, { value: site.rating.value.toLocaleString(lang === "en" ? "en-GB" : "fr-FR") })} · {fill(d.hero.ratingCount, { count: site.rating.count })}
      </span>
    </a>
  );
}
