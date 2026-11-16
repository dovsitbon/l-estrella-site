import Image from "next/image";
import { altOf, type Dict } from "@/lib/i18n";
import { img } from "@/lib/media";

/** Les photos libres de droits (Unsplash) : signalées « Photo d'illustration », jamais présentées comme le restaurant. */
export const isIllustration = (src: string) => src.includes("/illustration-");

/**
 * Photo de public/media en plein cadre (next/image : AVIF/WebP, tailles adaptées, lazy loading),
 * avec son texte alternatif (locales → alt) et la mention « Photo d'illustration » si c'est une image de banque.
 */
export function Photo({ src, d, sizes, className = "", imgClassName = "object-cover", priority = false }: { src: string; d: Dict; sizes: string; className?: string; imgClassName?: string; priority?: boolean }) {
  const p = img(src);
  return (
    <div className={`zoom relative bg-cream-deep ${className}`}>
      <Image src={p.src} alt={altOf(d, p.src)} fill sizes={sizes} quality={70} priority={priority} className={imgClassName} />
      {isIllustration(src) && <span className="absolute end-2 bottom-2 bg-ink/60 px-2 py-0.5 text-[0.6875rem] text-cream">{d.photoSoon.illustration}</span>}
    </div>
  );
}
