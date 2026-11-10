// Logo typographique de L'Estrella : « L'ESTRELLA » en Cormorant Garamond, converti en tracés (aucune police requise),
// et une petite étoile à cinq branches au trait or. Pas de logo officiel connu : à remplacer par le vrai s'il existe.
//   npm run logo   →   components/logo-paths.json, public/logo.svg, public/logo-blanc.svg, app/icon.svg, app/apple-icon.png
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const buf = await readFile(path.join(ROOT, "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff"));
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));

// Mot-symbole : capitales espacées (tracking 0.14 em), apostrophe typographique
function word(text, size, tracking) {
  let x = 0;
  const parts = [];
  for (const ch of text) {
    const g = font.charToGlyph(ch);
    parts.push(g.getPath(x, size, size).toPathData(2));
    x += (g.advanceWidth / font.unitsPerEm) * size + tracking * size;
  }
  return { d: parts.join(""), width: x - tracking * size };
}
const SIZE = 40;
const w = word("L’ESTRELLA", SIZE, 0.14);
const capH = (font.tables.os2.sCapHeight / font.unitsPerEm) * SIZE; // hauteur des capitales
const textTop = SIZE - capH;

// Étoile à cinq branches, pointe en haut, branches fines (rayon intérieur 0,42)
export function star(cx, cy, R, ratio = 0.42) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? R * ratio : R;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}Z`;
}

// Version empilée : étoile au-dessus du nom
const R = 7;
const pad = 2;
const W = Math.ceil(w.width + pad * 2);
const starCy = pad + R;
const shiftY = starCy + R + 7 - textTop;
const H = Math.ceil(shiftY + SIZE + pad);
const starD = star(W / 2, starCy, R);
const paths = { viewBox: `0 0 ${W} ${H}`, text: w.d, textShift: `translate(${pad} ${shiftY.toFixed(2)})`, star: starD, starStroke: 1.1 };
await writeFile(path.join(ROOT, "components/logo-paths.json"), JSON.stringify(paths) + "\n");

const svg = (ink, gold) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${paths.viewBox}" role="img" aria-label="L'Estrella">
<path d="${starD}" fill="none" stroke="${gold}" stroke-width="1.1" stroke-linejoin="round"/>
<path transform="${paths.textShift}" fill="${ink}" d="${w.d}"/>
</svg>
`;
await writeFile(path.join(ROOT, "public/logo.svg"), svg("#1E2B45", "#B08A3E"));
await writeFile(path.join(ROOT, "public/logo-blanc.svg"), svg("#F7F2E9", "#C9A45C"));

// Favicon : étoile or au trait sur bleu marine
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1E2B45"/><path d="${star(32, 34, 21, 0.42)}" fill="none" stroke="#C9A45C" stroke-width="3" stroke-linejoin="round"/></svg>
`;
await writeFile(path.join(ROOT, "app/icon.svg"), icon);
await sharp(Buffer.from(icon.replace('rx="14"', 'rx="0"')), { density: 600 }).resize(180, 180).png().toFile(path.join(ROOT, "app/apple-icon.png"));
console.log("logo prêt", paths.viewBox);
