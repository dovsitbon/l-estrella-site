// Affichette A5 imprimable (PDF) avec QR code vers le site : en salle, à l'accueil, sur le comptoir.
//   npm run affichette   →   print/affichette-a5.pdf
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const CREAM = hex("#F7F2E9");
const INK = hex("#1C1A18");
const NAVY = hex("#1E2B45");
const GOLD = hex("#B08A3E");
const MUTED = hex("#4F4943");

const pdf = await PDFDocument.create();
pdf.setTitle("L'Estrella : affichette A5");
pdf.setAuthor("L'Estrella");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const serif = await pdf.embedFont(StandardFonts.TimesRoman);
const serifI = await pdf.embedFont(StandardFonts.TimesRomanItalic);
const sans = await pdf.embedFont(StandardFonts.Helvetica);

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: CREAM });

// Bandeau photo : la table dans la lumière du midi
const photoH = 200;
const photo = await sharp(path.join(ROOT, "assets/hero/table-lumiere.jpg")).resize(1260, 600, { fit: "cover", position: "centre" }).jpeg({ quality: 88 }).toBuffer();
page.drawImage(await pdf.embedJpg(photo), { x: 0, y: H - photoH, width: W, height: photoH });

// Logo typographique rendu en PNG haute définition
const logoPng = await sharp(path.join(ROOT, "public/logo.svg"), { density: 500 }).resize({ width: 1200 }).png().toBuffer();
const logo = await pdf.embedPng(logoPng);
const logoW = 170;
const logoH = (logo.height / logo.width) * logoW;
let y = H - photoH - 26 - logoH;
page.drawImage(logo, { x: (W - logoW) / 2, y, width: logoW, height: logoH });

const center = (text, font, size, yy, color = INK) => page.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y: yy, size, font, color });

y -= 16;
center("RESTAURANT  ·  DURY", sans, 7.5, y, GOLD);
y -= 30;
center("Réservez votre table en ligne", serif, 20, y, NAVY);
y -= 17;
center("la carte, le menu du jour, les horaires", serifI, 12, y, MUTED);

const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: "#1E2B45", light: "#F7F2E9" }, errorCorrectionLevel: "M" });
const qrS = 96;
y -= 16 + qrS;
page.drawImage(await pdf.embedPng(qrPng), { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 14;
center(url.replace(/^https?:\/\//, ""), sans, 8, y, GOLD);

// Filet doré avec une étoile
y -= 18;
page.drawLine({ start: { x: W / 2 - 70, y }, end: { x: W / 2 - 10, y }, thickness: 0.5, color: GOLD });
page.drawLine({ start: { x: W / 2 + 10, y }, end: { x: W / 2 + 70, y }, thickness: 0.5, color: GOLD });
const pts = [];
for (let i = 0; i < 10; i++) {
  const r = i % 2 ? 2.2 : 5.2;
  const a = Math.PI / 2 + (i * Math.PI) / 5;
  pts.push([W / 2 + r * Math.cos(a), y + r * Math.sin(a)]);
}
for (let i = 0; i < 10; i++) page.drawLine({ start: { x: pts[i][0], y: pts[i][1] }, end: { x: pts[(i + 1) % 10][0], y: pts[(i + 1) % 10][1] }, thickness: 0.6, color: GOLD });

y -= 20;
center("Déjeuner du lundi au vendredi  ·  Dimanche midi", sans, 8.5, y, MUTED);
y -= 13;
center("Plateau de fruits de mer  ·  Repas de famille et de groupe", sans, 8.5, y, MUTED);
y -= 17;
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}  ·  ${site.phone}`, sans, 8.5, y, INK);

await mkdir(path.join(ROOT, "print"), { recursive: true });
await writeFile(path.join(ROOT, "print/affichette-a5.pdf"), await pdf.save());
console.log("affichette prête :", url, "· bas du texte à", Math.round(y), "pt");
