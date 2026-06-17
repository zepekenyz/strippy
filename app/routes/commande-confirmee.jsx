import {useEffect} from 'react';
import {Link, useSearchParams} from 'react-router';
import {trackPurchase} from '../../src/lib/tracking/metaPixel';

export function meta() {
  return [
    {title: 'Commande confirmee - STRIPPY'},
    {
      name: 'description',
      content: 'Confirmation de commande STRIPPY.',
    },
  ];
}

export default function CommandeConfirmee() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const orderId =
      searchParams.get('order_id') ||
      searchParams.get('order') ||
      searchParams.get('shopify_order_id');
    if (!orderId) return;

    const value = Number(searchParams.get('value'));
    const currency = searchParams.get('currency') || 'EUR';

    trackPurchase({
      order_id: orderId,
      event_id: `purchase_${orderId}`,
      value: Number.isFinite(value) ? value : undefined,
      currency,
    });
  }, [searchParams]);

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-icon" aria-hidden="true">✓</div>
        <p className="contact-kicker">Commande confirmee</p>
        <h1>Merci pour votre commande.</h1>
        <p>
          Votre commande STRIPPY est bien prise en compte. Vous recevrez les
          informations de suivi par email des que l'expedition sera preparee.
        </p>
        <Link className="contact-hero-cta" to="/">Retour a l'accueil</Link>
      </section>
    </main>
  );
}
