import paths from "@/components/logo-paths.json";

/**
 * Logo typographique (npm run logo) : « L'ESTRELLA » en Cormorant Garamond, et une petite étoile au trait or.
 * Le nom prend la couleur du texte. Pour mettre le vrai logo : remplacer ce composant et public/logo.svg.
 */
export function Logo({ className = "h-12 w-auto", label = "L'Estrella", gold = "#B08A3E" }: { className?: string; label?: string; gold?: string }) {
  return (
    <svg viewBox={paths.viewBox} className={className} role="img" aria-label={label}>
      <path d={paths.star} fill="none" stroke={gold} strokeWidth={paths.starStroke} strokeLinejoin="round" />
      <path transform={paths.textShift} fill="currentColor" d={paths.text} />
    </svg>
  );
}

/** Étoile à cinq branches, au trait (décor, séparateurs). */
export function Star({ className = "h-3.5 w-3.5", strokeWidth = 1.2 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2L14.47 8.6L21.51 8.91L15.99 13.3L17.88 20.09L12 16.2L6.12 20.09L8.01 13.3L2.49 8.91L9.53 8.6Z" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

/** Filet doré avec une étoile au centre. */
export function StarRule({ className = "" }: { className?: string }) {
  return (
    <div className={`rule-star ${className}`} aria-hidden="true">
      <Star className="h-3 w-3" />
    </div>
  );
}
