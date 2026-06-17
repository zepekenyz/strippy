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

## Tracking Meta Pixel + Conversions API

Stack détectée :
- Front : Hydrogen / React Router en SPA
- Backend : fonctions serverless Vercel dans `api/*`
- Checkout : Shopify headless via Storefront API

### Variables d'environnement

Dans Vercel, ajoute ces variables en Production :

```bash
VITE_META_PIXEL_ID=3380661015449071
META_PIXEL_ID=3380661015449071
META_CAPI_ACCESS_TOKEN=ton_token_meta_capi
META_GRAPH_API_VERSION=v22.0
META_TEST_EVENT_CODE=optionnel_pour_test_events_manager
SHOPIFY_WEBHOOK_SECRET=secret_du_webhook_shopify
```

Important :
- `VITE_META_PIXEL_ID` est public, il charge le Pixel navigateur.
- `META_CAPI_ACCESS_TOKEN` et `SHOPIFY_WEBHOOK_SECRET` sont server-only.
- Ne jamais exposer `META_CAPI_ACCESS_TOKEN` dans le front.

### Webhook Shopify Purchase

Dans Shopify Admin :

1. Va dans `Settings` -> `Notifications` -> `Webhooks`.
2. Crée un webhook `Order payment` (`orders/paid`) en JSON.
3. URL :

```bash
https://www.strippy.fr/api/shopify-meta-purchase
```

4. Copie le signing secret Shopify dans `SHOPIFY_WEBHOOK_SECRET` sur Vercel.

Le webhook vérifie la signature HMAC Shopify, puis envoie `Purchase` à Meta CAPI avec :
- `event_id = purchase_<order_id>`
- montant payé
- devise
- lignes de commande
- données client hashées SHA-256
- `_fbp` / `_fbc` si disponibles

### Events suivis

Navigateur :
- `PageView`
- `ViewContent`
- `AddToCart`
- `InitiateCheckout`
- `Purchase` si une page retour `/commande-confirmee?order_id=...` est utilisée

Serveur CAPI :
- `ViewContent`
- `AddToCart`
- `InitiateCheckout`
- `Purchase` via webhook Shopify

Les events navigateur et serveur utilisent `eventID` / `event_id` pour la déduplication.

### Tester dans Meta Events Manager

1. Mets temporairement `META_TEST_EVENT_CODE` dans Vercel.
2. Redéploie.
3. Va dans Meta Events Manager -> Pixel -> `Tester les événements`.
4. Ouvre `https://www.strippy.fr`.
5. Teste :
   - PageView en arrivant sur le site
   - ViewContent sur `/produit-strippy`
   - AddToCart en ajoutant une offre
   - InitiateCheckout en cliquant sur checkout
   - Purchase après achat test Shopify

Le Purchase doit apparaître avec source serveur CAPI. Si tu configures une page retour Shopify vers `/commande-confirmee?order_id=<id>`, il apparaît aussi navigateur + serveur, dédupliqué par `purchase_<order_id>`.

## Vérification des routes Shopify standard

```bash
npm run check
```

La landing actuelle est une page unique. Hydrogen signale donc les routes Shopify standard manquantes (`/cart`, `/products/:handle`, etc.). Elles peuvent être ajoutées ensuite si tu veux une boutique headless complète multi-pages.
