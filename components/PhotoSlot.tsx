import { Star } from "@/components/Logo";

/**
 * Emplacement réservé à une vraie photo (à prendre sur place) : un panneau sobre, une étoile au trait, une légende.
 * Aucune fausse photo. Dès que la photo existe : la mettre dans assets/, npm run media, et remplacer ce composant par <Image>.
 */
export function PhotoSlot({ label, caption, tone = "navy", className = "" }: { label: string; caption: string; tone?: "navy" | "cream"; className?: string }) {
  const navy = tone === "navy";
  return (
    <div
      role="img"
      aria-label={`${label} : ${caption}`}
      className={`relative flex flex-col items-center justify-center overflow-hidden text-center ${navy ? "bg-navy text-cream" : "bg-cream-deep text-navy"} ${className}`}
    >
      <div className={`absolute inset-3 border md:inset-4 ${navy ? "border-gold/35" : "border-gold/60"}`} aria-hidden="true" />
      <Star className={`h-9 w-9 ${navy ? "text-gold" : "text-gold-ink"}`} strokeWidth={0.8} />
      <p className="display mt-5 px-8 text-[1.5rem] italic md:text-[1.75rem]">{caption}</p>
      <p className={`mt-2 text-[0.6875rem] tracking-[0.22em] uppercase ${navy ? "text-cream/70" : "text-muted"}`}>{label}</p>
    </div>
  );
}
