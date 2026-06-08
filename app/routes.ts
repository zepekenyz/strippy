import {index, route, type RouteConfig} from '@react-router/dev/routes';

export default [
  index('routes/_index.jsx'),
  route('revue-peau-40-strippy', 'routes/revue-peau-40-strippy.jsx'),
  route('produit-strippy', 'routes/produit-strippy.jsx'),
  route('suivre-ma-commande', 'routes/suivre-ma-commande.jsx'),
  route('contact', 'routes/contact.jsx'),
] satisfies RouteConfig;
