# L'Estrella : informations à demander au restaurant

À poser lors du rendez-vous ou par téléphone (03 22 95 04 44). Chaque réponse se reporte dans le fichier indiqué.

## L'histoire et l'équipe
- [ ] Le prénom du chef (et de la personne en salle), l'histoire du restaurant : depuis quand, pourquoi « L'Estrella », le lien avec le Portugal → `locales/*.json` (bloc « La cuisine »)
- [ ] Accepte-t-il une photo de l'équipe (sans clients) ?

## La carte et les prix
- [ ] La carte complète avec les prix : entrées, plats, desserts, vins → `data/carte.json` + `locales/*.json`
- [ ] Le menu du jour / l'ardoise de la semaine, et le prix des formules (entrée + plat + dessert, entrée + plat, plat + dessert) → `data/menu-du-jour.json`
- [ ] Qui met à jour l'ardoise chaque semaine, et comment nous l'envoyer (photo de l'ardoise par SMS ?)
- [ ] Le plateau de fruits de mer : composition exacte, prix « à partir de », pour combien de personnes, à commander combien de temps à l'avance ? Existe-t-il un plateau plus grand ?
- [ ] Les spécialités portugaises proposées sur demande
- [ ] Desserts maison habituels
- [ ] Vins au verre et en bouteille, prix de départ
- [ ] Allergènes : fiche disponible ?

## Les horaires
- [ ] Horaires exacts : semaine 12 h – 14 h 30 ou 12 h – 14 h ? Dimanche 12 h 30 – 15 h ? Fermé le samedi ? → `data/horaires.json`
- [ ] Ouvertures le soir ou le samedi pour les groupes ?
- [ ] Congés annuels et jours fériés → `data/annonces.json` / `data/horaires.json` (exceptions)

## Groupes et événements
- [ ] Capacité (70 couverts selon Somme Tourisme) ; salle privatisable ? Nombre maximum pour un groupe
- [ ] Menus de groupe / communion / anniversaire : prix indicatifs, acompte
- [ ] À partir de combien de personnes on parle de « groupe » (le site dit 10)

## Contact et réservations
- [ ] Un portable pour WhatsApp (activer `data/site.json → whatsapp`, format 336XXXXXXXX)
- [ ] L'adresse e-mail qui recevra les réservations (variable Vercel `BOOKING_NOTIFY_EMAIL`)
- [ ] Un nom de domaine (ex. lestrella-dury.fr) pour envoyer les e-mails depuis une adresse propre (Resend)
- [ ] Parking : sur place ? combien de places ? Accès PMR ?
- [ ] Moyens de paiement : carte, espèces, titres-restaurant, chèques ?

## Visuels
- [ ] Des photos des plats, du plateau de fruits de mer, des desserts et de la salle (ou rendez-vous photo sur place)
- [ ] Une photo de la façade sur la route Nationale
- [ ] Le logo, s'il existe un vrai logo (le site utilise un logo typographique provisoire)
- [ ] Accord pour reprendre 3 vrais avis Google sur le site

## Mentions légales
- [ ] Raison sociale, forme juridique, SIRET, nom du responsable de publication → `data/site.json → legal`
- [ ] Bons cadeaux : en propose-t-il déjà ? Validité, conditions
