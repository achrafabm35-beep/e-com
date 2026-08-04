# The Eyes Chico

Maison de mode masculine old money. **« Le regard ne ment jamais »** —
_Oculi numquam mentiuntur_. Identité, palette et univers issus du brand book
« Édition Old Money ».

## Identité

- **Logo** — « L'Œil botanique » (Concept A du brand book) : œil en amande,
  iris cerclé, pupille point d'or, paupière prolongée en rameau d'olivier.
  Dessiné en **SVG** (net à toute taille), inline dans le site. Sur la page
  d'accueil, la pupille suit le regard du visiteur et le rameau se dessine au
  chargement.
- **Palette** — Ivoire papier `#F4EFE3` · Vert anglais `#224233` ·
  Encre sépia `#3A3128` · Or ancien `#A98A52` · Bordeaux héritage `#6E3B34`.
  Dominante beige / marron old money, vert anglais en signature, or en fil.
- **Typographie** — Cormorant Garamond (titres & logotype) + EB Garamond
  (textes & italiques). Capitales espacées, filets doubles, or jamais criard.

## Structure

```
index.html        Accueil — emblème animé, manifeste & 3 piliers,
                  Édition N°1, citation, Le Cercle, footer blason
collection.html   La Boutique — Édition N°1, grille filtrable
product.html      Fiche produit — Les Solaires « Le Regard »
assets/
  css/style.css   Design system (charte The Eyes Chico)
  js/main.js      Nav, reveals, « le regard » (pupille), panier, Cercle
  img/            Photos produits (polo, solaires)
```

## Collection inaugurale — Édition N°1 « Premier Regard »

Les Solaires « Le Regard » · Polo maille « Le Court » · Pull « L'Héritier » ·
Oxford « La Correspondance » · Casquette « Le Club » · Foulard « Riviera ».

## Lancer en local

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

> Les polices (Cormorant Garamond + EB Garamond) sont chargées via CDN.

## Pistes d'évolution

- Portage **Shopify** (Liquid) — l'emblème et les sections sont réutilisables.
- Photographie produit dédiée pour les pièces « bientôt ».
- Panier / checkout réel (Shopify Storefront API).
