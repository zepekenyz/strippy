export function meta() {
  return [
    {title: 'Suivre ma commande - STRIPPY'},
    {
      name: 'description',
      content:
        'Suivez votre commande STRIPPY avec votre numero de commande et votre adresse email.',
    },
  ];
}

export default function SuivreCommandePage() {
  return (
    <main className="support-page">
      <header className="support-header">
        <a className="support-logo" href="/" aria-label="Retour a l'accueil STRIPPY">
          STRIPPY
        </a>
      </header>

      <section className="support-hero">
        <div className="support-card support-card-wide">
          <p className="support-eyebrow">Suivi de commande</p>
          <h1>Suivre ma commande</h1>
          <p>
            Entrez les informations de votre commande pour retrouver son statut.
            Vous pouvez aussi utiliser le lien de suivi recu par email.
          </p>

          <form className="support-form">
            <label>
              Numero de commande
              <input type="text" name="order" placeholder="Ex : #STRIPPY1024" />
            </label>
            <label>
              Adresse email
              <input type="email" name="email" placeholder="votre@email.com" />
            </label>
            <button type="button">Rechercher ma commande</button>
          </form>

          <div className="support-note">
            <strong>Besoin d'aide ?</strong>
            <span>
              Si votre numero de suivi n'est pas encore actif, patientez 24 a 48h
              apres l'expedition.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
