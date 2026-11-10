// Génère CONTENU.md : tous les textes du site (fr, en), la carte, le menu du jour et les horaires, pour validation.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const load = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const L = { fr: await load("locales/fr.json"), en: await load("locales/en.json") };
const carte = await load("data/carte.json");
const menu = await load("data/menu-du-jour.json");
const site = await load("data/site.json");
const horaires = await load("data/horaires.json");

const out = [];
const p = (s = "") => out.push(s);
const eur = (it) => (it.price === null ? "**À REMPLIR**" : `${it.from ? "à partir de " : ""}${it.price.toFixed(2).replace(".", ",")} €${it.perPerson ? " / pers." : ""}`);
const DAYS = L.fr.infos.days;

p("# L'Estrella : contenu du site, pour validation");
p();
p("Tous les textes en français et en anglais, la carte et les prix. Les points **À REMPLIR** / **À VALIDER** sont à confirmer avec le restaurant.");
p("Fichier généré par `npm run contenu` à partir de `locales/*.json` et `data/*.json` : modifiez ces fichiers, pas celui-ci.");
p();
p("## À valider en priorité");
p();
p("- **Prix** : aucun prix n'est connu. Toute la carte et les formules affichent « à l'ardoise » en attendant (`data/carte.json`, `data/menu-du-jour.json`).");
p("- **Plats** : croissant au saumon fumé et mozzarella, risotto de Saint-Jacques aux écrevisses, pavé de morue frit (fondue d'oignon, chips), couscous royal, bacalhau à brás : repris de la fiche Somme Tourisme du restaurant. À confirmer, compléter ou remplacer par la vraie carte.");
p("- **Plateau de fruits de mer** : composition (huîtres, crevettes, bulots, pain de seigle, beurre demi-sel, mayonnaise maison) et « plateau royal » **supposés**. Prix « à partir de … par personne » à remplir.");
p("- **Menu du jour** : l'ardoise affichée est un **exemple** (plats réellement servis, pas ceux de cette semaine). À mettre à jour chaque semaine dans `data/menu-du-jour.json` (passer `example` à `false`).");
p("- **Horaires** : du lundi au vendredi 12 h – 14 h 30, dimanche 12 h 30 – 15 h, fermé le samedi (donnés dans la commande). Pages Jaunes indique 12 h – 14 h en semaine.");
p("- **Parking** : « parking à disposition » (Yelp le mentionne). À confirmer.");
p("- **Paiement** : carte bancaire et espèces ; titres-restaurant « à demander ». À confirmer.");
p("- **Bon cadeau** : la page existe (lien dans le menu) ; validité et conditions à préciser.");
p("- **Avis** : aucun avis affiché. Emplacements prêts (`data/avis.json`), à remplir avec de vrais avis Google, avec l'accord du restaurant.");
p(`- **Note Google** : ${site.rating.value}/5 sur ${site.rating.count} avis, relevée le ${site.rating.checked}.`);
p();
p("## Titre du hero : 3 propositions");
p();
p(`1. **« ${L.fr.hero.title} »** (retenu) · EN : « ${L.en.hero.title} »`);
p("2. « Une cuisine qui fait briller vos repas » · EN : « Cooking that makes every meal shine »");
p("3. « Le restaurant des repas de famille » · EN : « The restaurant for family meals »");
p();

p("## Horaires");
p();
p("| Jour | Horaires |");
p("|---|---|");
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)];
  p(`| ${DAYS[i - 1]} | ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "Fermé"} |`);
}
p();

p("## Menu du jour (ardoise)");
p();
p(`- Entrée : ${menu.entree.fr} / ${menu.entree.en}`);
p(`- Plat : ${menu.plat.fr} / ${menu.plat.en}`);
p(`- Dessert : ${menu.dessert.fr} / ${menu.dessert.en}`);
for (const f of menu.formulas) p(`- ${L.fr.today.formulas[f.id]} : ${eur(f)}`);
p();

p("## Carte et prix");
p();
for (const c of carte.categories) {
  p(`### ${L.fr.carte.categories[c.id]} · ${L.en.carte.categories[c.id]}`);
  p();
  p(`_${L.fr.carte.intro[c.id]}_`);
  p();
  p("| Plat (fr) | Description | Prix | English |");
  p("|---|---|---|---|");
  for (const id of c.items) {
    const it = carte.items[id];
    const fr = L.fr.carte.items[id];
    p(`| ${fr.name}${it.example ? " _(exemple)_" : ""} | ${fr.desc || "—"} | ${eur(it)} | ${L.en.carte.items[id].name} |`);
  }
  p();
}

// Tous les textes, clé par clé
p("## Tous les textes (fr / en)");
p();
const walk = (a, b, pre = "") => {
  for (const k of Object.keys(a)) {
    if (["carte", "alt"].includes(k) && !pre) continue;
    const key = pre ? `${pre}.${k}` : k;
    if (typeof a[k] === "string") p(`- \`${key}\` : ${a[k]}\n  - EN : ${b?.[k] ?? "—"}`);
    else if (Array.isArray(a[k]) && typeof a[k][0] === "string") p(`- \`${key}\` : ${a[k].join(" · ")}\n  - EN : ${(b?.[k] ?? []).join(" · ")}`);
    else if (Array.isArray(a[k])) a[k].forEach((x, i) => walk(x, b?.[k]?.[i], `${key}[${i}]`));
    else walk(a[k], b?.[k], key);
  }
};
for (const section of Object.keys(L.fr)) {
  if (["carte", "alt"].includes(section)) continue;
  p(`### ${section}`);
  p();
  walk(L.fr[section], L.en[section], section);
  p();
}

p("## Textes alternatifs des photos");
p();
for (const k of Object.keys(L.fr.alt)) p(`- \`${k}\` : ${L.fr.alt[k]} / ${L.en.alt[k]}`);
p();

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n"));
console.log("CONTENU.md :", out.length, "lignes");
