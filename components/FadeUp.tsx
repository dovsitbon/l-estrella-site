import type { CSSProperties, ReactNode } from "react";

/** Entrée sobre du texte du hero (CSS, globals.css → .rise) : visible même sans JavaScript, coupée si mouvement réduit. */
export function FadeUp({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`rise ${className}`} style={{ animationDelay: `${delay}s` } as CSSProperties}>
      {children}
    </div>
  );
}
