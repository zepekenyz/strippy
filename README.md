# STRIPPY Hydrogen

Boutique STRIPPY migrée en storefront Shopify Headless avec Hydrogen.

## Installation

```bash
npm install
```

## Variables Shopify

Copier `.env.example` vers `.env` puis remplir :

```bash
VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
VITE_SHOPIFY_API_VERSION=2026-01
VITE_SHOPIFY_VARIANT_ID=gid://shopify/ProductVariant/00000000000000
```

`VITE_SHOPIFY_VARIANT_ID` doit être l'ID Storefront API de la variante que le bouton `AJOUTER AU PANIER` doit envoyer au checkout.

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Vérification des routes Shopify standard

```bash
npm run check
```

La landing actuelle est une page unique. Hydrogen signale donc les routes Shopify standard manquantes (`/cart`, `/products/:handle`, etc.). Elles peuvent être ajoutées ensuite si tu veux une boutique headless complète multi-pages.
