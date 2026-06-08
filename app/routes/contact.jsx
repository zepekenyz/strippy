export function meta() {
  return [
    {title: 'Contact - STRIPPY'},
    {
      name: 'description',
      content:
        'Contactez le support STRIPPY pour une question sur votre commande, la livraison ou nos produits.',
    },
  ];
}

const contactCards = [
  {
    icon: '📧',
    title: 'Email',
    value: 'support@strippy.fr',
    text: 'Pour toute question concernant votre commande ou nos produits.',
  },
  {
    icon: '⏰',
    title: 'Temps de réponse',
    value: 'Réponse sous 24h ouvrées',
    text: 'Lundi au vendredi',
  },
  {
    icon: '📦',
    title: 'Suivi de commande',
    value: 'Vous attendez votre commande ?',
    text: 'Retrouvez rapidement les informations de livraison.',
    cta: 'Suivre ma commande',
    href: '/suivre-ma-commande',
  },
];

const faqs = [
  {
    question: 'Où est ma commande ?',
    answer:
      'Vous pouvez suivre votre commande depuis la page de suivi avec votre numéro de commande et votre adresse email. Le lien de suivi peut prendre 24 à 48h à devenir actif après expédition.',
  },
  {
    question: 'Quel est le délai de livraison ?',
    answer:
      'Les commandes sont préparées rapidement puis envoyées avec livraison suivie. Les délais exacts peuvent varier selon votre adresse et le transporteur.',
  },
  {
    question: 'Comment utiliser Strippy ?',
    answer:
      'Nettoyez et séchez votre peau, appliquez le patch sur la zone ciblée, laissez poser plusieurs heures ou toute la nuit, puis retirez, nettoyez et réutilisez.',
  },
  {
    question: 'Quelle est votre politique de remboursement ?',
    answer:
      "STRIPPY propose une garantie satisfaction. Si vous n'êtes pas satisfaite, contactez notre support avec votre numéro de commande pour être accompagnée.",
  },
  {
    question: 'Comment contacter le support ?',
    answer:
      "Envoyez-nous un message via le formulaire ou directement par email à support@strippy.fr. Notre équipe répond sous 24h ouvrées.",
  },
];

const reassuranceItems = [
  {icon: '🚚', title: 'Livraison suivie'},
  {icon: '🔒', title: 'Paiement sécurisé'},
  {icon: '💜', title: 'Support réactif'},
  {icon: '↩️', title: 'Garantie satisfait ou remboursé'},
];

export default function ContactPage() {
  return (
    <main className="support-page contact-premium-page">
      <header className="support-header">
        <a className="support-logo" href="/" aria-label="Retour à l'accueil STRIPPY">
          STRIPPY
        </a>
      </header>

      <section className="contact-hero" id="contact-top">
        <div className="contact-hero-icon" aria-hidden="true">
          ✦
        </div>
        <p className="contact-eyebrow">Support STRIPPY</p>
        <h1>Besoin d'aide ? Nous sommes là pour vous.</h1>
        <p>
          Notre équipe vous répond sous 24h ouvrées pour toute question
          concernant votre commande ou nos produits.
        </p>
        <a className="contact-primary-cta" href="#contact-form">
          Nous contacter
        </a>
      </section>

      <section className="contact-section contact-cards" aria-label="Options de contact">
        {contactCards.map((card) => (
          <article className="contact-info-card" key={card.title}>
            <span className="contact-card-icon" aria-hidden="true">
              {card.icon}
            </span>
            <h2>{card.title}</h2>
            <strong>{card.value}</strong>
            <p>{card.text}</p>
            {card.cta ? (
              <a href={card.href} className="contact-card-link">
                {card.cta}
              </a>
            ) : null}
          </article>
        ))}
      </section>

      <section className="contact-section contact-form-section" id="contact-form">
        <div className="contact-form-copy">
          <p className="contact-eyebrow">Une question ?</p>
          <h2>Envoyez-nous un message</h2>
          <p>
            Plus votre demande est precise, plus notre equipe pourra vous aider
            rapidement. Ajoutez votre numéro de commande si vous en avez un.
          </p>
        </div>

        <form className="contact-premium-form">
          <label>
            Nom
            <input type="text" name="name" placeholder="Votre nom" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="votre@email.com" />
          </label>
          <label>
            Numéro de commande <span>(optionnel)</span>
            <input type="text" name="order" placeholder="Ex : #STRIPPY1024" />
          </label>
          <label>
            Sujet
            <input type="text" name="subject" placeholder="Livraison, produit, retour..." />
          </label>
          <label className="contact-form-full">
            Message
            <textarea name="message" rows="6" placeholder="Comment pouvons-nous vous aider ?" />
          </label>
          <button className="contact-form-full" type="button">
            Envoyer mon message
          </button>
        </form>
      </section>

      <section className="contact-section contact-faq" aria-labelledby="contact-faq-title">
        <p className="contact-eyebrow">FAQ rapide</p>
        <h2 id="contact-faq-title">Les questions les plus fréquentes</h2>
        <div className="contact-faq-list">
          {faqs.map((item) => (
            <details className="contact-faq-item" key={item.question}>
              <summary>
                <span>{item.question}</span>
                <span className="contact-faq-plus" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact-section contact-reassurance" aria-label="Engagements STRIPPY">
        {reassuranceItems.map((item) => (
          <article className="contact-reassurance-card" key={item.title}>
            <span aria-hidden="true">{item.icon}</span>
            <strong>{item.title}</strong>
          </article>
        ))}
      </section>

      <section className="contact-section contact-trust">
        <h2>Chez Strippy, votre satisfaction est notre priorite.</h2>
        <p>
          Notre équipe est disponible pour répondre à toutes vos questions et
          vous accompagner avant, pendant et après votre achat.
        </p>
        <strong>★★★★★ 4.7/5 basé sur plus de 18 000 avis</strong>
      </section>
    </main>
  );
}
