# House of AS

Maison de mode masculine — vêtements, lunettes et maroquinerie d'exception.
Direction artistique **terre / brun chaud**, style moderne et éditorial.

## La landing page

La page d'accueil ouvre sur un **hero cinématographique piloté au défilement** :
une séquence d'images (extraite de la vidéo) qui **avance vers la boutique** et,
en fin de défilement, **les portes s'ouvrent** sur un texte géant de bienvenue.

- Rendu via `<canvas>` plein cadre (`cover`) + séquence d'images préchargées.
- **Filtre sombre** (scrim dégradé + vignette) pour tamiser la scène.
- Messages éditoriaux en fondu, puis **statement géant à l'ouverture des portes**.
- Animation au scroll avec **GSAP ScrollTrigger**, **fallback scroll natif**.
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
  media/hero-seq/     161 frames de la séquence (avancée vers les portes)
  img/                Photos produits + plans éditoriaux (devanture, intérieur)
```

## Lancer en local

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

> Polices (Cormorant Garamond + Jost) et GSAP sont chargés via CDN ; une connexion
> est nécessaire pour le rendu typographique et le scrub d'animation complet.

## Direction artistique

- **Palette** : terre / brun chaud — sable, camel, terracotta, espresso, crème.
- **Typographie** : Archivo (grotesk display) + Inter (UI) + Instrument Serif (accents).
- **Ton** : maison de mode moderne — matières rares, séries courtes, sans tapage.

## Pistes d'évolution

- Portage en thème **Shopify** (Liquid) : le hero canvas et les sections sont
  réutilisables tels quels dans un `section` Shopify.
- Photographie produit dédiée pour les accessoires (actuellement icônes de ligne).
- Panier réel + checkout (Shopify Storefront API ou checkout natif).
