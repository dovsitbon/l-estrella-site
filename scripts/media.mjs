// Classe les vraies photos de L'Estrella (assets/raw/) dans assets/<catégorie>/ et les prépare pour le web
// dans public/media/<catégorie>/ (next/image sert ensuite AVIF/WebP à la bonne taille).
//   npm run media
//
// Source : les 3 photos publiées par le restaurant sur sa fiche Somme Tourisme (© L'Estrella).
// Pas encore de photo de plats, du plateau de fruits de mer ni de la façade : le site affiche des emplacements élégants.
// Pour ajouter vos photos prises sur place : déposez le fichier dans assets/raw/, ajoutez une ligne dans PICKS
// (source, catégorie, nom), relancez npm run media, puis indiquez le chemin /media/<catégorie>/<nom>.jpg
// dans data/carte.json (image) ou dans lib/photos.ts (emplacements de l'accueil).
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");

// [source (dans assets/), catégorie, nom, recadrage éventuel { left, top, width, height }]
const PICKS = [
  ["raw/estrella_tourisme_estr.jpg", "hero", "table-lumiere"],
  // la photo de salle a des bandes noires en haut et en bas : on les retire
  ["raw/estrella_tourisme_l-estrella1.jpg", "salle", "salle-nappes-blanches", { left: 0, top: 50, width: 1075, height: 588 }],
  ["raw/estrella_tourisme_l-estrella.jpg", "salle", "bar-suspensions"],
];

const sizes = {};
for (const [src, cat, name, crop] of PICKS) {
  const file = path.join(ROOT, "assets", src);
  await mkdir(path.join(ROOT, "assets", cat), { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  let pipe = sharp(file).rotate();
  if (crop) pipe = pipe.extract(crop);
  const buf = await pipe.toBuffer();
  await sharp(buf).jpeg({ quality: 92 }).toFile(path.join(ROOT, "assets", cat, `${name}.jpg`));
  const info = await sharp(buf)
    .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
  sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
}
// Emplacements prévus pour les photos à prendre sur place
for (const dir of ["plats", "fruits-de-mer", "facade", "equipe"]) {
  await mkdir(path.join(ROOT, "assets", dir), { recursive: true });
  await writeFile(path.join(ROOT, "assets", dir, "LISEZMOI.txt"), `Déposez ici les photos « ${dir} » prises sur place (JPG, au moins 1600 px de large), puis voir scripts/media.mjs.\n`);
}

// Image de partage (Open Graph) 1200 × 630 : la table en lumière à droite, texte sur crème à gauche
const photo = await sharp(path.join(ROOT, "assets/raw/estrella_tourisme_estr.jpg")).resize(600, 630, { fit: "cover", position: "centre" }).toBuffer();
const s = (cx, cy, R) => {
  const p = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? R * 0.42 : R;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    p.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${p.join("L")}Z`;
};
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="630">
  <path d="${s(70, 170, 14)}" fill="none" stroke="#B08A3E" stroke-width="1.6" stroke-linejoin="round"/>
  <text x="60" y="236" font-family="Georgia, serif" font-size="20" letter-spacing="5" fill="#8A6A2C">RESTAURANT · DURY · AMIENS SUD</text>
  <text x="60" y="318" font-family="Georgia, serif" font-size="64" fill="#1E2B45">L’Estrella</text>
  <text x="60" y="380" font-family="Georgia, serif" font-style="italic" font-size="30" fill="#1C1A18">Cuisine soignée et fruits de mer</text>
  <text x="60" y="462" font-family="Arial, sans-serif" font-size="21" fill="#4A4540">103 route Nationale, 80480 Dury</text>
  <text x="60" y="494" font-family="Arial, sans-serif" font-size="21" fill="#4A4540">Déjeuner en semaine et dimanche midi</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#F7F2E9" } })
  .composite([
    { input: photo, left: 600, top: 0 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${PICKS.length} images prêtes`);
