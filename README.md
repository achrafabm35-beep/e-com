# House of AS

Boutique e-commerce **old money** pour homme — vêtements et accessoires (lunettes,
portefeuilles, coques, bijoux). Thème studio gris, direction artistique sobre et
intemporelle.

## La landing page

La page d'accueil ouvre sur un **hero piloté au défilement** : une séquence d'images
(extraite de la vidéo de campagne) où le mannequin **s'habille progressivement** au
fur et à mesure que l'on scrolle, avec des messages éditoriaux qui apparaissent en
fondu à chaque étape de la tenue.

- Rendu via `<canvas>` + séquence d'images préchargées (fluide, fiable sur mobile).
- Animation au scroll avec **GSAP ScrollTrigger**, et un **fallback scroll natif**
  si GSAP n'est pas disponible.
- Bords adoucis (CSS `mask`) pour fondre la figure dans le fond gris studio.
- Respecte `prefers-reduced-motion` (composition statique de repli).

## Structure

```
index.html        Landing — hero d'habillage au scroll + sections (manifeste,
                  vêtements, éditorial, accessoires, Le Cercle, footer)
collection.html   Boutique — grille de produits filtrable (vêtements / accessoires)
product.html      Fiche produit — galerie, couleurs, tailles, panier, accordéons
assets/
  css/style.css       Design system (thème gris, tokens OKLCH, typographie)
  js/hero-scroll.js   Moteur du hero (canvas + séquence + messages)
  js/main.js          Nav, reveals au scroll, panier, newsletter
  media/hero-seq/     181 frames de la séquence d'habillage
  img/                Visuels éditoriaux de campagne
```

## Lancer en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

> Polices (Cormorant Garamond + Jost) et GSAP sont chargés via CDN ; une connexion
> est nécessaire pour le rendu typographique et le scrub d'animation complet.

## Direction artistique

- **Palette** : gris studio, crème, espresso (lin), cuir tan, laiton sourd.
- **Typographie** : Cormorant Garamond (display serif) + Jost (sans géométrique).
- **Ton** : luxe discret, sans logo ni tapage — « l'élégance ne se crie pas ».

## Pistes d'évolution

- Portage en thème **Shopify** (Liquid) : le hero canvas et les sections sont
  réutilisables tels quels dans un `section` Shopify.
- Photographie produit dédiée pour les accessoires (actuellement icônes de ligne).
- Panier réel + checkout (Shopify Storefront API ou checkout natif).
