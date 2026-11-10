# L'Estrella : contenu du site, pour validation

Tous les textes en français et en anglais, la carte et les prix. Les points **À REMPLIR** / **À VALIDER** sont à confirmer avec le restaurant.
Fichier généré par `npm run contenu` à partir de `locales/*.json` et `data/*.json` : modifiez ces fichiers, pas celui-ci.

## À valider en priorité

- **Prix** : aucun prix n'est connu. Toute la carte et les formules affichent « à l'ardoise » en attendant (`data/carte.json`, `data/menu-du-jour.json`).
- **Plats** : croissant au saumon fumé et mozzarella, risotto de Saint-Jacques aux écrevisses, pavé de morue frit (fondue d'oignon, chips), couscous royal, bacalhau à brás : repris de la fiche Somme Tourisme du restaurant. À confirmer, compléter ou remplacer par la vraie carte.
- **Plateau de fruits de mer** : composition (huîtres, crevettes, bulots, pain de seigle, beurre demi-sel, mayonnaise maison) et « plateau royal » **supposés**. Prix « à partir de … par personne » à remplir.
- **Menu du jour** : l'ardoise affichée est un **exemple** (plats réellement servis, pas ceux de cette semaine). À mettre à jour chaque semaine dans `data/menu-du-jour.json` (passer `example` à `false`).
- **Horaires** : du lundi au vendredi 12 h – 14 h 30, dimanche 12 h 30 – 15 h, fermé le samedi (donnés dans la commande). Pages Jaunes indique 12 h – 14 h en semaine.
- **Parking** : « parking à disposition » (Yelp le mentionne). À confirmer.
- **Paiement** : carte bancaire et espèces ; titres-restaurant « à demander ». À confirmer.
- **Bon cadeau** : la page existe (lien dans le menu) ; validité et conditions à préciser.
- **Avis** : aucun avis affiché. Emplacements prêts (`data/avis.json`), à remplir avec de vrais avis Google, avec l'accord du restaurant.
- **Note Google** : 4.5/5 sur 122 avis, relevée le 2026-11-10.

## Titre du hero : 3 propositions

1. **« Le déjeuner, version étoile »** (retenu) · EN : « Lunch, the star version »
2. « Une cuisine qui fait briller vos repas » · EN : « Cooking that makes every meal shine »
3. « Le restaurant des repas de famille » · EN : « The restaurant for family meals »

## Horaires

| Jour | Horaires |
|---|---|
| Lundi | 12:00 – 14:30 |
| Mardi | 12:00 – 14:30 |
| Mercredi | 12:00 – 14:30 |
| Jeudi | 12:00 – 14:30 |
| Vendredi | 12:00 – 14:30 |
| Samedi | Fermé |
| Dimanche | 12:30 – 15:00 |

## Menu du jour (ardoise)

- Entrée : Croissant au saumon fumé et mozzarella / Croissant with smoked salmon and mozzarella
- Plat : Pavé de morue frit, fondue d'oignon et chips de pomme de terre / Fried cod steak, melted onions and potato crisps
- Dessert : Dessert du jour / Dessert of the day
- Entrée, plat et dessert : **À REMPLIR**
- Entrée et plat : **À REMPLIR**
- Plat et dessert : **À REMPLIR**

## Carte et prix

### Entrées · Starters

_L'entrée du jour, et quelques classiques de la maison._

| Plat (fr) | Description | Prix | English |
|---|---|---|---|
| Entrée du jour | Selon le marché, à découvrir sur l'ardoise | **À REMPLIR** | Starter of the day |
| Croissant au saumon fumé et mozzarella _(exemple)_ | — | **À REMPLIR** | Croissant with smoked salmon and mozzarella |

### Plats · Mains

_Le plat du jour, du poisson, de la viande : selon le marché._

| Plat (fr) | Description | Prix | English |
|---|---|---|---|
| Plat du jour | Selon le marché, à découvrir sur l'ardoise | **À REMPLIR** | Main of the day |
| Risotto de Saint-Jacques aux écrevisses _(exemple)_ | — | **À REMPLIR** | Scallop risotto with crayfish |
| Pavé de morue frit _(exemple)_ | Fondue d'oignon, chips de pomme de terre | **À REMPLIR** | Fried cod steak |
| Couscous royal _(exemple)_ | — | **À REMPLIR** | Couscous royal |

### Fruits de mer · Seafood

_Selon l'arrivage. À demander en réservant._

| Plat (fr) | Description | Prix | English |
|---|---|---|---|
| Plateau de fruits de mer | Huîtres, crevettes, bulots, selon l'arrivage | **À REMPLIR** | Seafood platter |
| Plateau royal | Le grand plateau, avec crustacés, à partager | **À REMPLIR** | Royal platter |

### Spécialités portugaises · Portuguese specialities

_La cuisine du Portugal, sur demande._

| Plat (fr) | Description | Prix | English |
|---|---|---|---|
| Bacalhau à brás _(exemple)_ | Morue effilochée, pommes paille, œuf et olives | **À REMPLIR** | Bacalhau à brás |
| Autres spécialités portugaises | Sur demande, en réservant | **À REMPLIR** | Other Portuguese specialities |

### Desserts · Desserts

_Faits maison._

| Plat (fr) | Description | Prix | English |
|---|---|---|---|
| Dessert du jour | À découvrir sur l'ardoise | **À REMPLIR** | Dessert of the day |
| Desserts maison | La sélection du moment | **À REMPLIR** | Homemade desserts |

### Vins · Wine

_Une sélection au verre et en bouteille._

| Plat (fr) | Description | Prix | English |
|---|---|---|---|
| Vin au verre | Blanc, rouge, rosé | **À REMPLIR** | Wine by the glass |
| Vin en bouteille | Demandez la carte des vins | **À REMPLIR** | Wine by the bottle |

## Tous les textes (fr / en)

### meta

- `meta.title` : Restaurant à Dury, près d'Amiens – cuisine et fruits de mer | L'Estrella
  - EN : Restaurant in Dury, near Amiens – French cooking and seafood | L'Estrella
- `meta.description` : L'Estrella, restaurant au 103 route Nationale à Dury, au sud d'Amiens : cuisine maison de produits frais, ardoise du jour, plateau de fruits de mer, dimanche midi et repas de famille. Réservez votre table.
  - EN : L'Estrella, a restaurant at 103 route Nationale in Dury, just south of Amiens: home cooking with fresh produce, a daily set menu, seafood platters, Sunday lunch and family meals. Book your table.
- `meta.ogAlt` : Table dressée en pleine lumière au restaurant L'Estrella, à Dury
  - EN : A table set in the midday light at L'Estrella restaurant in Dury

### nav

- `nav.skip` : Aller au contenu
  - EN : Skip to content
- `nav.menu` : Menu
  - EN : Menu
- `nav.close` : Fermer
  - EN : Close
- `nav.home` : L'Estrella, accueil
  - EN : L'Estrella, home
- `nav.carte` : La carte
  - EN : Menu
- `nav.today` : Menu du jour
  - EN : Today's menu
- `nav.groups` : Groupes
  - EN : Groups
- `nav.book` : Réserver
  - EN : Book
- `nav.infos` : Infos
  - EN : Visit
- `nav.gift` : Bon cadeau
  - EN : Gift voucher
- `nav.call` : Appeler
  - EN : Call
- `nav.lang` : Langue
  - EN : Language
- `nav.bookCta` : Réserver une table
  - EN : Book a table
- `nav.facebook` : L'Estrella sur Facebook
  - EN : L'Estrella on Facebook

### intro

- `intro.skip` : Passer
  - EN : Skip

### announce

- `announce.close` : Fermer l'annonce
  - EN : Close announcement
- `announce.today` : Menu du jour
  - EN : Today's menu
- `announce.week` : À l'ardoise cette semaine
  - EN : On the board this week

### hero

- `hero.eyebrow` : Restaurant · Route Nationale, Dury
  - EN : Restaurant · Route Nationale, Dury
- `hero.title` : Le déjeuner, version étoile
  - EN : Lunch, the star version
- `hero.lead` : Une cuisine de produits frais, une ardoise qui change chaque semaine et un plateau de fruits de mer à partager. À dix minutes d'Amiens.
  - EN : Cooking with fresh produce, a set menu that changes every week and a seafood platter to share. Ten minutes from Amiens.
- `hero.ctaBook` : Réserver une table
  - EN : Book a table
- `hero.ctaMenu` : Voir la carte
  - EN : See the menu
- `hero.rating` : {value}/5 sur Google
  - EN : {value}/5 on Google
- `hero.ratingCount` : {count} avis
  - EN : {count} reviews
- `hero.imageAlt` : Une table de L'Estrella dans la lumière du midi : verres à pied, nappe blanche et deux tulipes
  - EN : A table at L'Estrella in the midday light: wine glasses, white tablecloth and two tulips

### tiles

- `tiles.title` : À table
  - EN : At the table
- `tiles.items.today.label` : Menu du jour
  - EN : Today's menu
- `tiles.items.today.text` : L'ardoise de la semaine
  - EN : This week's board
- `tiles.items.entrees.label` : Entrées
  - EN : Starters
- `tiles.items.entrees.text` : Pour bien commencer
  - EN : A good beginning
- `tiles.items.plats.label` : Plats
  - EN : Mains
- `tiles.items.plats.text` : Cuissons justes, produits frais
  - EN : Fresh produce, cooked right
- `tiles.items.seafood.label` : Fruits de mer
  - EN : Seafood
- `tiles.items.seafood.text` : Le plateau à partager
  - EN : The platter to share
- `tiles.items.desserts.label` : Desserts
  - EN : Desserts
- `tiles.items.desserts.text` : Faits maison
  - EN : Homemade
- `tiles.items.vins.label` : Vins
  - EN : Wine
- `tiles.items.vins.text` : Au verre ou en bouteille
  - EN : By the glass or bottle

### services

- `services.title` : Nos services
  - EN : What we offer
- `services.lunch.title` : Déjeuner en semaine
  - EN : Weekday lunch
- `services.lunch.text` : Du lundi au vendredi, midi
  - EN : Monday to Friday, midday
- `services.sunday.title` : Dimanche midi
  - EN : Sunday lunch
- `services.sunday.text` : Le repas qu'on prend le temps de partager
  - EN : The meal you take time to share
- `services.groups.title` : Groupes et familles
  - EN : Groups and families
- `services.groups.text` : Jusqu'à {n} couverts
  - EN : Up to {n} guests
- `services.parking.title` : Parking
  - EN : Parking
- `services.parking.text` : Sur place, pour se garer sans chercher
  - EN : On site, no need to hunt for a space

### today

- `today.eyebrow` : L'ardoise
  - EN : The board
- `today.title` : Le menu du jour
  - EN : Today's menu
- `today.lead` : Chaque semaine, une entrée, un plat et un dessert du jour, servis tous les midis. Les plats changent au fil du marché.
  - EN : Every week, a starter, a main and a dessert of the day, served every lunchtime. Dishes change with the market.
- `today.entree` : Entrée
  - EN : Starter
- `today.plat` : Plat
  - EN : Main
- `today.dessert` : Dessert
  - EN : Dessert
- `today.formulas.entree-plat-dessert` : Entrée, plat et dessert
  - EN : Starter, main and dessert
- `today.formulas.entree-plat` : Entrée et plat
  - EN : Starter and main
- `today.formulas.plat-dessert` : Plat et dessert
  - EN : Main and dessert
- `today.priceTbc` : à l'ardoise
  - EN : see the board
- `today.example` : Exemple d'ardoise. Le menu de la semaine est mis à jour ici chaque lundi.
  - EN : Sample board. This week's menu is updated here every Monday.
- `today.updated` : Mis à jour le {date}
  - EN : Updated on {date}
- `today.cta` : Réserver pour le déjeuner
  - EN : Book for lunch

### offers

- `offers.eyebrow` : Quand venir
  - EN : When to come
- `offers.title` : Trois façons de s'attabler
  - EN : Three ways to sit down with us
- `offers.lunch.title` : Le déjeuner
  - EN : Lunch
- `offers.lunch.when` : Du lundi au vendredi
  - EN : Monday to Friday
- `offers.lunch.text` : L'ardoise du jour pour une vraie pause, ou la carte si vous avez le temps.
  - EN : Today's board for a proper break, or the full menu if you have time.
- `offers.lunch.cta` : Voir le menu du jour
  - EN : See today's menu
- `offers.sunday.title` : Le dimanche midi
  - EN : Sunday lunch
- `offers.sunday.when` : Le dimanche, à partir de {time}
  - EN : Sundays, from {time}
- `offers.sunday.text` : Le plateau de fruits de mer, un bon plat, et personne ne regarde l'heure.
  - EN : The seafood platter, a good main course, and nobody checking the time.
- `offers.sunday.cta` : Réserver un dimanche
  - EN : Book a Sunday
- `offers.groups.title` : Les repas de groupe
  - EN : Group meals
- `offers.groups.when` : Sur réservation
  - EN : By reservation
- `offers.groups.text` : Anniversaires, communions, baptêmes, repas d'entreprise : un menu préparé avec vous.
  - EN : Birthdays, communions, christenings, company lunches: a menu we put together with you.
- `offers.groups.cta` : Demander un devis
  - EN : Request a quote

### blocks

- `blocks.cuisine.eyebrow` : La cuisine
  - EN : The kitchen
- `blocks.cuisine.title` : Des produits frais, des cuissons justes
  - EN : Fresh produce, cooked just right
- `blocks.cuisine.text` : Tout part du produit : du poisson, de bonnes viandes, des légumes de saison. En cuisine, on prend le temps de la bonne cuisson, celle qui fait revenir les habitués. La carte est française, avec des clins d'œil au Portugal, comme le bacalhau à brás.
  - EN : It all starts with the produce: fish, good meat, seasonal vegetables. In the kitchen we take the time to cook things properly, which is what keeps regulars coming back. The menu is French, with a nod to Portugal, like bacalhau à brás.
- `blocks.cuisine.cta` : Voir la carte
  - EN : See the menu
- `blocks.seafood.eyebrow` : Le plateau
  - EN : The platter
- `blocks.seafood.title` : Le plateau de fruits de mer
  - EN : The seafood platter
- `blocks.seafood.text` : Huîtres, crevettes, bulots et ce que l'arrivage apporte de mieux, servis sur glace avec pain de seigle et beurre demi-sel. Un plateau qui se partage, idéal le dimanche. Pensez à le demander en réservant.
  - EN : Oysters, prawns, whelks and the best of the day's catch, served on ice with rye bread and salted butter. A platter for sharing, perfect on a Sunday. Ask for it when you book.
- `blocks.seafood.cta` : Réserver
  - EN : Book
- `blocks.family.eyebrow` : En famille
  - EN : Family
- `blocks.family.title` : Les repas de famille et de groupe
  - EN : Family and group meals
- `blocks.family.text` : La salle accueille jusqu'à {n} convives, nappes blanches et service attentif. Pour un anniversaire, une communion ou les retrouvailles du dimanche, on prépare avec vous un menu à votre goût.
  - EN : The dining room seats up to {n} guests, with white tablecloths and attentive service. For a birthday, a communion or a Sunday get-together, we'll put together a menu you'll love.
- `blocks.family.cta` : Demander un devis
  - EN : Request a quote

### photoSoon

- `photoSoon.label` : Photo à venir
  - EN : Photo coming soon
- `photoSoon.plat` : Un plat de la carte
  - EN : A dish from the menu
- `photoSoon.plateau` : Le plateau de fruits de mer
  - EN : The seafood platter
- `photoSoon.facade` : La façade, route Nationale
  - EN : The front, on route Nationale
- `photoSoon.dessert` : Un dessert maison
  - EN : A homemade dessert

### book

- `book.eyebrow` : Réservation
  - EN : Reservations
- `book.title` : Réserver une table
  - EN : Book a table
- `book.lead` : Choisissez le service, le jour et l'heure. Nous vous rappelons ou vous écrivons pour confirmer. Pour le jour même, le plus simple reste de nous appeler.
  - EN : Choose the service, the day and the time. We'll call or email you to confirm. For a same-day table, the easiest is to give us a call.
- `book.service` : Service
  - EN : Service
- `book.services.lunch` : Déjeuner (lundi – vendredi)
  - EN : Lunch (Monday – Friday)
- `book.services.sunday` : Dimanche midi
  - EN : Sunday lunch
- `book.date` : Date
  - EN : Date
- `book.chooseDate` : Choisir un jour
  - EN : Choose a day
- `book.time` : Heure d'arrivée
  - EN : Arrival time
- `book.chooseTime` : Choisir une heure
  - EN : Choose a time
- `book.noTimes` : Plus de créneau ce jour-là. Choisissez un autre jour.
  - EN : No times left that day. Please choose another day.
- `book.guests` : Nombre de personnes
  - EN : Number of guests
- `book.occasion` : Occasion
  - EN : Occasion
- `book.occasions.none` : Pas d'occasion particulière
  - EN : No special occasion
- `book.occasions.birthday` : Anniversaire
  - EN : Birthday
- `book.occasions.communion` : Communion, baptême
  - EN : Communion, christening
- `book.occasions.family` : Repas de famille
  - EN : Family meal
- `book.occasions.company` : Repas d'entreprise
  - EN : Company meal
- `book.occasions.other` : Autre
  - EN : Other
- `book.groupHint` : À partir de {n} personnes, nous vous contactons pour préparer le menu avec vous.
  - EN : From {n} guests, we'll get in touch to plan the menu with you.
- `book.message` : Message
  - EN : Message
- `book.messagePh` : Plateau de fruits de mer, allergie, chaise haute, gâteau d'anniversaire…
  - EN : Seafood platter, allergies, high chair, birthday cake…
- `book.name` : Nom
  - EN : Name
- `book.phone` : Téléphone
  - EN : Phone
- `book.email` : E-mail
  - EN : Email
- `book.submit` : Envoyer la demande
  - EN : Send request
- `book.sending` : Envoi…
  - EN : Sending…
- `book.callInstead` : ou appelez le
  - EN : or call
- `book.privacy` : Vos coordonnées servent uniquement à traiter votre réservation.
  - EN : Your details are only used to handle your booking.
- `book.errors.date` : Choisissez un jour.
  - EN : Please choose a day.
- `book.errors.time` : Choisissez une heure d'arrivée.
  - EN : Please choose an arrival time.
- `book.errors.name` : Indiquez votre nom.
  - EN : Please enter your name.
- `book.errors.phone` : Indiquez un numéro de téléphone valide.
  - EN : Please enter a valid phone number.
- `book.errors.email` : Indiquez une adresse e-mail valide.
  - EN : Please enter a valid email address.
- `book.errors.server` : L'envoi n'a pas abouti. Réessayez, ou appelez-nous au 03 22 95 04 44.
  - EN : Something went wrong. Please try again, or call us on +33 3 22 95 04 44.
- `book.done.title` : Demande bien reçue
  - EN : Request received
- `book.done.text` : Merci {name}. Votre demande pour le {when} est arrivée au restaurant.
  - EN : Thank you {name}. Your request for {when} has reached the restaurant.
- `book.done.mail` : Un e-mail récapitulatif vient de vous être envoyé. La table est confirmée dès notre réponse.
  - EN : We've just emailed you a summary. Your table is confirmed once we reply.
- `book.done.notSent` : La réservation en ligne est en cours de mise en place : appelez-nous pour confirmer votre table.
  - EN : Online booking is being set up: please call us to confirm your table.
- `book.done.again` : Nouvelle demande
  - EN : New request
- `book.mail.subject` : Demande de réservation
  - EN : Booking request
- `book.mail.title` : Nouvelle demande de réservation
  - EN : New booking request
- `book.mail.service` : Service
  - EN : Service
- `book.mail.when` : Jour et heure
  - EN : Day and time
- `book.mail.guests` : Personnes
  - EN : Guests
- `book.mail.occasion` : Occasion
  - EN : Occasion
- `book.mail.name` : Nom
  - EN : Name
- `book.mail.phone` : Téléphone
  - EN : Phone
- `book.mail.email` : E-mail
  - EN : Email
- `book.mail.message` : Message
  - EN : Message
- `book.mail.lang` : Langue du client
  - EN : Guest's language
- `book.mail.replyHint` : Répondez directement à cet e-mail pour écrire au client.
  - EN : Reply to this email to write to the guest.
- `book.mail.confirmSubject` : Votre demande de réservation à L'Estrella
  - EN : Your booking request at L'Estrella
- `book.mail.confirmIntro` : Bonjour {name}, nous avons bien reçu votre demande de réservation.
  - EN : Hello {name}, we've received your booking request.
- `book.mail.confirmOutro` : Votre table est confirmée dès notre réponse, par téléphone ou par e-mail. Pour toute modification, appelez-nous au 03 22 95 04 44. À très bientôt, L'Estrella.
  - EN : Your table is confirmed once we reply, by phone or email. To change anything, call us on +33 3 22 95 04 44. See you soon, L'Estrella.

### reviews

- `reviews.eyebrow` : Ils en parlent
  - EN : What people say
- `reviews.title` : Ce qu'en disent nos clients
  - EN : What our guests say
- `reviews.count` : {count} avis Google
  - EN : {count} Google reviews
- `reviews.checked` : Note relevée le {date}
  - EN : Rating checked on {date}
- `reviews.themes` : La qualité des produits · Les entrées · Les cuissons · Les repas de famille · Le plateau de fruits de mer
  - EN : Quality of the produce · The starters · Cooking done right · Family meals · The seafood platter
- `reviews.themesLabel` : Ce qui revient le plus souvent
  - EN : What comes up most often
- `reviews.cta` : Lire les avis sur Google
  - EN : Read the reviews on Google

### infos

- `infos.eyebrow` : Infos pratiques
  - EN : Visit
- `infos.title` : Nous trouver
  - EN : Finding us
- `infos.address` : Adresse
  - EN : Address
- `infos.directions` : Itinéraire
  - EN : Directions
- `infos.phone` : Téléphone
  - EN : Phone
- `infos.hours` : Horaires
  - EN : Opening hours
- `infos.hoursNote` : Service le midi uniquement. Fermetures exceptionnelles annoncées en haut du site.
  - EN : Lunch service only. Exceptional closures are announced at the top of the site.
- `infos.access` : Accès
  - EN : Getting here
- `infos.accessText` : Sur la route Nationale à Dury, à moins de 10 km du centre d'Amiens.
  - EN : On route Nationale in Dury, less than 10 km from central Amiens.
- `infos.parking` : Stationnement
  - EN : Parking
- `infos.parkingText` : Parking à disposition au restaurant.
  - EN : Parking available at the restaurant.
- `infos.capacity` : Capacité
  - EN : Capacity
- `infos.capacityText` : {n} couverts
  - EN : {n} covers
- `infos.days` : Lundi · Mardi · Mercredi · Jeudi · Vendredi · Samedi · Dimanche
  - EN : Monday · Tuesday · Wednesday · Thursday · Friday · Saturday · Sunday
- `infos.closed` : Fermé
  - EN : Closed
- `infos.mapTitle` : Plan d'accès à L'Estrella, 103 route Nationale à Dury
  - EN : Map to L'Estrella, 103 route Nationale in Dury

### faq

- `faq.eyebrow` : Questions fréquentes
  - EN : FAQ
- `faq.title` : Bon à savoir
  - EN : Good to know
- `faq.items[0].q` : Quels sont vos horaires ?
  - EN : What are your opening hours?
- `faq.items[0].a` : Nous servons le midi : du lundi au vendredi de 12 h à 14 h 30, et le dimanche de 12 h 30 à 15 h. Le restaurant est fermé le samedi.
  - EN : We serve lunch: Monday to Friday from 12 pm to 2:30 pm, and Sunday from 12:30 pm to 3 pm. The restaurant is closed on Saturdays.
- `faq.items[1].q` : Faut-il réserver ?
  - EN : Do I need to book?
- `faq.items[1].a` : C'est conseillé, surtout le dimanche midi et pour les tables de plus de six personnes. Réservez en ligne ou appelez le 03 22 95 04 44.
  - EN : It's a good idea, especially for Sunday lunch and tables of more than six. Book online or call +33 3 22 95 04 44.
- `faq.items[2].q` : Le plateau de fruits de mer est-il servi tous les jours ?
  - EN : Is the seafood platter served every day?
- `faq.items[2].a` : Il dépend de l'arrivage. Le plus sûr est de le demander en réservant : nous le préparons pour votre venue.
  - EN : It depends on the catch. The safest is to ask for it when you book: we'll have it ready for you.
- `faq.items[3].q` : Organisez-vous des repas de groupe ?
  - EN : Do you host group meals?
- `faq.items[3].a` : Oui. La salle compte 70 couverts. Anniversaires, communions, baptêmes, repas d'entreprise : nous préparons un menu avec vous, sur devis.
  - EN : Yes. The dining room seats 70. Birthdays, communions, christenings, company meals: we plan a menu with you, with a quote.
- `faq.items[4].q` : Proposez-vous de la cuisine portugaise ?
  - EN : Do you serve Portuguese food?
- `faq.items[4].a` : Oui, sur demande : bacalhau à brás et d'autres spécialités. Dites-le nous en réservant.
  - EN : Yes, on request: bacalhau à brás and other specialities. Just let us know when you book.
- `faq.items[5].q` : Quels moyens de paiement acceptez-vous ?
  - EN : How can I pay?
- `faq.items[5].a` : Carte bancaire et espèces. Pour les titres-restaurant, demandez-nous au moment de réserver.
  - EN : Card and cash. For meal vouchers (titres-restaurant), ask us when you book.

### footer

- `footer.tagline` : Restaurant à Dury, au sud d'Amiens. Cuisine de produits frais, ardoise du jour et fruits de mer.
  - EN : A restaurant in Dury, just south of Amiens. Fresh produce, a daily board and seafood.
- `footer.explore` : Découvrir
  - EN : Explore
- `footer.legal` : Mentions légales
  - EN : Legal notice
- `footer.rights` : © {year} L'Estrella, Dury
  - EN : © {year} L'Estrella, Dury

### status

- `status.open` : Ouvert maintenant
  - EN : Open now
- `status.closed` : Fermé
  - EN : Closed
- `status.until` : jusqu'à {time}
  - EN : until {time}
- `status.opens` : ouvre {day} à {time}
  - EN : opens {day} at {time}
- `status.today` : aujourd'hui
  - EN : today
- `status.tomorrow` : demain
  - EN : tomorrow

### pages

- `pages.carte.title` : La carte
  - EN : The menu
- `pages.carte.metaTitle` : La carte et les prix | L'Estrella, restaurant à Dury
  - EN : Menu and prices | L'Estrella, restaurant in Dury
- `pages.carte.metaDescription` : Entrées, plats, plateau de fruits de mer, spécialités portugaises, desserts et vins : la carte de L'Estrella à Dury, près d'Amiens, et le menu du jour.
  - EN : Starters, mains, seafood platter, Portuguese specialities, desserts and wine: the menu at L'Estrella in Dury, near Amiens, plus today's set menu.
- `pages.dury.title` : Restaurant à Dury
  - EN : Restaurant in Dury
- `pages.dury.eyebrow` : Dury · Amiens sud
  - EN : Dury · South of Amiens
- `pages.dury.metaTitle` : Restaurant à Dury, au sud d'Amiens | L'Estrella
  - EN : Restaurant in Dury, just south of Amiens | L'Estrella
- `pages.dury.metaDescription` : Un restaurant à Dury, sur la route Nationale, à 10 minutes d'Amiens : déjeuner en semaine, dimanche midi, repas de famille. Parking, 70 couverts.
  - EN : A restaurant in Dury on route Nationale, 10 minutes from Amiens: weekday lunch, Sunday lunch, family meals. Parking, 70 covers.
- `pages.dury.lead` : Au 103 route Nationale, L'Estrella reçoit pour le déjeuner du lundi au vendredi et le dimanche midi. Une adresse simple à trouver depuis Amiens, avec de quoi se garer.
  - EN : At 103 route Nationale, L'Estrella serves lunch Monday to Friday and on Sundays. Easy to find from Amiens, with somewhere to park.
- `pages.dury.sections[0].h` : Un déjeuner à deux pas d'Amiens
  - EN : Lunch just outside Amiens
- `pages.dury.sections[0].p` : Dury est à moins de 10 km du centre d'Amiens, par la route Nationale. Pour une pause du midi au calme, loin des parkings du centre, l'ardoise du jour change chaque semaine : une entrée, un plat, un dessert.
  - EN : Dury is less than 10 km from central Amiens along route Nationale. For a quiet lunch break away from city-centre parking, the board changes every week: a starter, a main, a dessert.
- `pages.dury.sections[1].h` : Le dimanche midi en famille
  - EN : Sunday lunch with the family
- `pages.dury.sections[1].p` : Le dimanche, la salle se remplit de familles. Nappes blanches, plats qu'on partage, plateau de fruits de mer pour ceux qui l'ont commandé : réservez pour être sûr d'avoir votre table.
  - EN : On Sundays the dining room fills with families. White tablecloths, dishes to share, a seafood platter for those who ordered one: book ahead to be sure of your table.
- `pages.dury.sections[2].h` : Pour vos événements
  - EN : For your events
- `pages.dury.sections[2].p` : Avec 70 couverts, L'Estrella accueille anniversaires, communions, baptêmes et repas d'entreprise. On établit le menu avec vous.
  - EN : With 70 covers, L'Estrella hosts birthdays, communions, christenings and company meals. We plan the menu with you.
- `pages.seafood.title` : Fruits de mer près d'Amiens
  - EN : Seafood near Amiens
- `pages.seafood.eyebrow` : Le plateau
  - EN : The platter
- `pages.seafood.metaTitle` : Plateau de fruits de mer près d'Amiens, à Dury | L'Estrella
  - EN : Seafood platter near Amiens, in Dury | L'Estrella
- `pages.seafood.metaDescription` : Un plateau de fruits de mer à partager à Dury, à 10 minutes d'Amiens : huîtres, crevettes, bulots selon l'arrivage. À demander en réservant, idéal le dimanche midi.
  - EN : A seafood platter to share in Dury, 10 minutes from Amiens: oysters, prawns, whelks depending on the catch. Ask when you book, perfect for Sunday lunch.
- `pages.seafood.lead` : À Dury, à 10 minutes d'Amiens, L'Estrella prépare un plateau de fruits de mer à partager, selon l'arrivage. Le meilleur moyen d'en profiter : le demander en réservant.
  - EN : In Dury, 10 minutes from Amiens, L'Estrella prepares a seafood platter to share, depending on the catch. The best way to enjoy it: ask for it when you book.
- `pages.seafood.sections[0].h` : Ce que l'on met sur le plateau
  - EN : What goes on the platter
- `pages.seafood.sections[0].p` : Huîtres, crevettes, bulots, et ce que l'arrivage apporte de mieux. Servi sur glace, avec pain de seigle, beurre demi-sel, citron et mayonnaise maison. La composition exacte vous est donnée en réservant.
  - EN : Oysters, prawns, whelks and the best of the day's catch. Served on ice, with rye bread, salted butter, lemon and homemade mayonnaise. We'll give you the exact selection when you book.
- `pages.seafood.sections[1].h` : Le commander
  - EN : How to order it
- `pages.seafood.sections[1].p` : Le plateau se prépare à l'avance. Précisez-le dans votre réservation, ou appelez-nous au 03 22 95 04 44 : nous vous confirmons la composition et le prix du jour.
  - EN : The platter is prepared in advance. Mention it in your booking, or call us on +33 3 22 95 04 44: we'll confirm the selection and the day's price.
- `pages.seafood.sections[2].h` : Et du poisson toute la semaine
  - EN : And fish all week long
- `pages.seafood.sections[2].p` : Risotto de Saint-Jacques aux écrevisses, pavé de morue frit, bacalhau à brás : le poisson tient une belle place à la carte et à l'ardoise.
  - EN : Scallop risotto with crayfish, fried cod steak, bacalhau à brás: fish has pride of place on the menu and on the board.
- `pages.gift.title` : Offrir un repas à L'Estrella
  - EN : Give a meal at L'Estrella
- `pages.gift.eyebrow` : Bon cadeau
  - EN : Gift voucher
- `pages.gift.metaTitle` : Bon cadeau restaurant à Dury, près d'Amiens | L'Estrella
  - EN : Restaurant gift voucher in Dury, near Amiens | L'Estrella
- `pages.gift.metaDescription` : Offrez un déjeuner ou un plateau de fruits de mer à L'Estrella, à Dury. Bons cadeaux disponibles au restaurant.
  - EN : Give a lunch or a seafood platter at L'Estrella in Dury. Gift vouchers available at the restaurant.
- `pages.gift.lead` : Un déjeuner, un dimanche midi, un plateau de fruits de mer à partager : offrez un bon moment à table. Les bons cadeaux se préparent au restaurant, au montant de votre choix.
  - EN : A lunch, a Sunday meal, a seafood platter to share: give someone a lovely time at the table. Vouchers are prepared at the restaurant, for the amount of your choice.
- `pages.gift.steps[0].h` : Choisissez
  - EN : Choose
- `pages.gift.steps[0].p` : Un montant libre, ou un menu à offrir.
  - EN : Any amount, or a set menu to offer.
- `pages.gift.steps[1].h` : Appelez ou passez
  - EN : Call or drop by
- `pages.gift.steps[1].p` : Nous préparons le bon, prêt à offrir, au restaurant.
  - EN : We prepare the voucher, ready to give, at the restaurant.
- `pages.gift.steps[2].h` : Offrez
  - EN : Give it
- `pages.gift.steps[2].p` : La personne réserve sa table quand elle le souhaite.
  - EN : They book their table whenever they like.
- `pages.gift.note` : Durée de validité et conditions : à préciser par le restaurant.
  - EN : Validity and terms: to be confirmed by the restaurant.
- `pages.gift.cta` : Appeler pour un bon cadeau
  - EN : Call about a gift voucher
- `pages.legal.title` : Mentions légales
  - EN : Legal notice
- `pages.legal.metaTitle` : Mentions légales | L'Estrella
  - EN : Legal notice | L'Estrella
- `pages.legal.pending` : À compléter
  - EN : To be completed
- `pages.legal.editor` : Éditeur du site
  - EN : Publisher
- `pages.legal.editorText` : L'Estrella, 103 route Nationale, 80480 Dury. Téléphone : 03 22 95 04 44.
  - EN : L'Estrella, 103 route Nationale, 80480 Dury, France. Phone: +33 3 22 95 04 44.
- `pages.legal.company` : Raison sociale
  - EN : Company name
- `pages.legal.siret` : SIRET
  - EN : SIRET
- `pages.legal.host` : Hébergeur
  - EN : Hosting
- `pages.legal.data` : Données personnelles
  - EN : Personal data
- `pages.legal.dataText` : Les informations envoyées par le formulaire de réservation servent uniquement à traiter votre demande. Elles ne sont ni revendues ni utilisées à des fins publicitaires. Vous pouvez demander leur suppression en appelant le restaurant.
  - EN : Information sent through the booking form is only used to handle your request. It is never sold or used for advertising. You can ask for it to be deleted by calling the restaurant.
- `pages.legal.cookies` : Cookies
  - EN : Cookies
- `pages.legal.cookiesText` : Le site n'utilise aucun cookie publicitaire ni outil de mesure d'audience. Seuls votre choix de langue et la fermeture de l'annonce sont gardés dans votre navigateur.
  - EN : This site uses no advertising cookies and no analytics. Only your language choice and the closed announcement are stored in your browser.
- `pages.legal.photos` : Photos
  - EN : Photos
- `pages.legal.photosText` : Photos : © L'Estrella.
  - EN : Photos: © L'Estrella.

## Textes alternatifs des photos

- `table-lumiere` : Une table de L'Estrella dans la lumière du midi : verres à pied, nappe blanche et deux tulipes / A table at L'Estrella in the midday light: wine glasses, white tablecloth and two tulips
- `salle-nappes-blanches` : La salle de L'Estrella : tables aux nappes blanches, chaises en cuir noir, parquet clair / The dining room at L'Estrella: white tablecloths, black leather chairs, pale wooden floor
- `bar-suspensions` : Le bar de L'Estrella, suspensions dorées et mur de briques / The bar at L'Estrella, with golden pendant lights and a brick wall
