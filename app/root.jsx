import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from 'react-router';
import {MetaPixelProvider} from '../src/components/tracking/MetaPixelProvider';
import styles from './styles/app.css?url';

export function links() {
  return [{rel: 'stylesheet', href: styles}];
}

export function meta() {
  return [
    {title: 'STRIPPY - Patchs naturels anti-rides'},
    {
      name: 'description',
      content:
        "Strippy propose des patchs en silicone médical réutilisables pour aider à lisser l'apparence des rides, ridules, cicatrices et marques visibles pendant la nuit.",
    },
  ];
}

export default function App() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <MetaPixelProvider>
          <Outlet />
        </MetaPixelProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
