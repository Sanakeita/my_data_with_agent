# SmartCV AI — Landing page

Landing page de présentation de l'application SmartCV AI : gestion du profil
professionnel, analyse intelligente du CV et adaptation du CV à une offre d'emploi.

## Fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | Structure complète de la landing page (7 sections du cahier des charges) |
| `styles.css` | Style : palette stricte 3 couleurs, Georgia + sans-serif, responsive |
| `script.js` | Navigation mobile, chatbot, modale connexion/inscription, animations |
| `assets/logo.png` | Logo original SmartCV AI (fond transparent, pour la vidéo/haute définition) |
| `assets/logo-nav.png` | Version optimisée pour la navigation et le footer |
| `assets/logo-512.png` | Version redimensionnée (512 px) |

## Palette (stricte, aucune autre couleur)

- Bleu nuit : `#142B45` — navigation, titres, textes, éléments structurants
- Vert émeraude : `#20A58A` — boutons d'action, icônes actives, accents
- Blanc froid : `#F5F7FA` — fonds de sections et surfaces

Seules des variations de transparence de ces trois couleurs sont utilisées.

## Typographie

- **Georgia** : titres (hero, sections, cartes).
- **Sans-serif** (Inter / fallback Arial, Helvetica) : paragraphes, boutons,
  navigation, formulaires, chatbot.

## Icônes

Bibliothèque **Lucide Icons** chargée via CDN (`unpkg.com`), icône présente sur
chaque bouton, avec `aria-label` pour les boutons uniquement iconographiques.

## Chatbot IA

Assistant flottant limité strictement aux deux missions du cahier des charges :

1. Questions sur le fonctionnement et l'utilisation de l'application.
2. Conseils sur la rédaction, la présentation et l'amélioration d'un CV.

Les réponses proviennent d'une base de connaissances locale (fonction
`KNOWLEDGE_BASE` / `findAnswer` dans `script.js`) : **aucun service IA n'est
simulé comme connecté**. Pour brancher un vrai service IA, remplacer le corps de
`findAnswer(userText)` par un appel à votre API dans `chatbotForm` handler.

## Intégration à l'application réelle

Dans `script.js`, renseignez la constante :

```js
const APP_URL = "https://votre-application.example.com";
```

Les boutons « Connexion » et « Créer un compte » (barre de navigation, section
finale, footer) ouvriront alors une modale de redirection vers :

- `APP_URL + /connexion`
- `APP_URL + /inscription`

Adaptez ces chemins dans le gestionnaire `authModalContinue` si votre
application utilise d'autres routes.

## Lancer en local

Aucune dépendance ni compilation :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```
