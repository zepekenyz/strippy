import {useEffect} from 'react';
import {connectStrippyProductPage} from '../strippy-interactions.js';

export function meta() {
  return [
    {title: 'STRIPPY - Patchs Silicone Medical'},
    {
      name: 'description',
      content:
        "Commandez STRIPPY, les patchs en silicone medical reutilisables pour aider a lisser l'apparence des rides et marques visibles.",
    },
  ];
}

const galleryImages = [
  '/images/premier-page-produit-nouveau.png',
  '/images/2.png',
  '/images/5.png',
  '/images/4.png',
  '/images/6.png',
];

export default function ProductStrippyPage() {
  useEffect(() => {
    return connectStrippyProductPage();
  }, []);

  return (
    <main className="strippy-product-page">
      <header className="product-site-header">
        <div className="promo-banner compact-promo" aria-label="Offre STRIPPY limitée">
          <span className="compact-promo-label">L'offre spéciale se termine dans</span>
          <span className="timer-boxes promo-countdown compact-promo-countdown" aria-live="polite">
            <span className="timer-box"><span data-countdown-hours>00</span><small>HRS</small></span>
            <span className="timer-separator">:</span>
            <span className="timer-box"><span data-countdown-minutes>55</span><small>MIN</small></span>
            <span className="timer-separator">:</span>
            <span className="timer-box"><span data-countdown-seconds>01</span><small>SEC</small></span>
          </span>
        </div>

        <nav className="product-nav" aria-label="Navigation STRIPPY">
          <button className="menu-toggle product-menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" data-product-menu-toggle>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="product-nav-links" data-product-site-menu>
            <a className="product-nav-sale" href="/produit-strippy">Offre speciale</a>
            <a href="/suivre-ma-commande">Suivre ma commande</a>
            <a href="/contact">Contact</a>
          </div>
          <a className="product-logo" href="/" aria-label="Accueil STRIPPY">
            STRIPPY
          </a>
          <div className="product-nav-icons" aria-label="Compte et panier">
            <a href="#compte" aria-label="Compte client">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 21a8 8 0 0 0-16 0"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>
            <a className="product-cart-icon" href="#panier" aria-label="Panier" data-cart-open>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 8h12l1 13H5L6 8Z"></path>
                <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
              </svg>
              <span data-cart-count>0</span>
            </a>
          </div>
        </nav>

      </header>

      <section className="strippy-product-shell" id="produit" aria-label="Produit STRIPPY">
        <div className="strippy-product-gallery">
          <div className="strippy-product-main">
            <img
              src={galleryImages[0]}
              alt="STRIPPY Silicone Beauty Patches"
              data-product-page-main
            />
          </div>

          <div className="strippy-product-thumbs" data-product-page-thumbs>
            <button type="button" aria-label="Image precedente">
              ‹
            </button>
            {galleryImages.map((image, index) => (
              <button
                className={`strippy-product-thumb${index === 0 ? ' active' : ''}`}
                type="button"
                data-product-page-image={image}
                aria-label={`Afficher l'image produit ${index + 1}`}
                aria-current={index === 0 ? 'true' : 'false'}
                key={image}
              >
                <img src={image} alt="" />
              </button>
            ))}
            <button type="button" aria-label="Image suivante">
              ›
            </button>
          </div>
        </div>

        <div className="strippy-product-info">
          <div className="strippy-product-rating">
            <span className="stars-img-wrap rating-47" aria-hidden="true">
              <img className="stars-img" src="/images/stars-5.png" alt="" />
            </span>
            <p>Excellent 4.5 | 412 avis</p>
          </div>

          <div className="strippy-title-proofs" aria-label="Preuves de confiance">
            <span>💜 +800 clientes satisfaites</span>
            <span>💜 Recommandé par des dermatologues</span>
          </div>

          <p className="strippy-brand-label">STRIPPY</p>

          <h1>Patchs anti-rides naturels</h1>

          <p className="strippy-product-badge">
            ✨ INNOVATION SKINCARE 2026
          </p>

          <p className="strippy-product-kicker">
            Pour rides, cicatrices & marques visibles
          </p>

          <div className="strippy-product-price">
            <strong>€29,99 EUR</strong>
            <span>€42,99 EUR</span>
            <em>-30%</em>
          </div>

          <p className="strippy-price-urgency">🔥 Offre -30% se termine bientôt</p>

          <p className="strippy-product-subtitle">
            Les patchs en silicone médical réutilisables qui aident à lisser
            l'apparence des rides, cicatrices et marques visibles pendant la nuit.
          </p>

          <div className="strippy-benefit-panel">
            <div><span>✨</span><p>Lisse visiblement les rides</p></div>
            <div><span>✨</span><p>Atténue les marques visibles</p></div>
            <div><span>✨</span><p>Réutilisable jusqu'à 30 nuits</p></div>
            <div><span>✨</span><p>Aide à réduire les ridules</p></div>
            <div><span>✨</span><p>Extra doux pour la peau</p></div>
            <div><span>✨</span><p>Maintient l'hydratation</p></div>
          </div>

          <div className="strippy-pack-options" role="radiogroup" aria-label="Choisir un pack">
            <button className="strippy-pack" type="button" role="radio" aria-checked="false" data-pack-name="1 Pack" data-pack-size="1 Pack" data-pack-price="29,99 €" data-pack-old-price="42,99 €" data-pack-discount="13,00 €" data-pack-image="/images/1 pack.png">
              <span className="strippy-pack-media"><img src="/images/1 pack.png" alt="" /></span>
              <span className="strippy-pack-copy"><span><strong>1 PACK</strong><b>30 nuits d'utilisation</b></span><i>Vous économisez 13€</i></span>
              <span className="strippy-pack-price"><strong>29,99€</strong><small>42,99€</small></span>
            </button>

            <button className="strippy-pack popular active" type="button" role="radio" aria-checked="true" data-shopify-variant-id="gid://shopify/ProductVariant/56815940567364" data-pack-name="2 Pack" data-pack-size="2-Pack" data-pack-price="39,99 €" data-pack-old-price="56,99 €" data-pack-discount="17,00 €" data-pack-image="/images/2 pack.png">
              <span className="strippy-pack-media"><img src="/images/2 pack.png" alt="" /></span>
              <span className="strippy-pack-copy"><span><strong>2 PACKS</strong><b>60 nuits d'utilisation</b></span><i>Vous économisez 17€</i></span>
              <span className="strippy-pack-price"><strong>39,99€</strong><small>56,99€</small></span>
              <em>⭐⭐ Plus populaire</em>
            </button>

            <button className="strippy-pack value" type="button" role="radio" aria-checked="false" data-shopify-variant-id="gid://shopify/ProductVariant/56815940895044" data-pack-name="3 Pack + 1 offert" data-pack-size="3-Pack + 1 offert" data-pack-price="59,99 €" data-pack-old-price="85,99 €" data-pack-discount="26,00 €" data-pack-image="/images/3 pack.png">
              <span className="strippy-pack-media"><img src="/images/3 pack.png" alt="" /></span>
              <span className="strippy-pack-copy"><span><strong>3 PACKS + 1 OFFERT</strong><b>120 nuits d'utilisation</b></span><i>Vous économisez 26€</i></span>
              <span className="strippy-pack-price"><strong>59,99€</strong><small>85,99€</small></span>
              <em>Meilleure valeur</em>
            </button>
          </div>

          <button className="strippy-product-cart" type="button" data-direct-checkout>
            🛒 Acheter
          </button>
          <button className="strippy-shop-pay" type="button" data-cart-add>Payer avec <strong>shop</strong></button>

          <div className="strippy-reassurance-grid" aria-label="Garanties STRIPPY">
            <span>🚚 Livraison gratuite</span>
            <span>🔒 Résultat garanti ou remboursé</span>
            <span>💜 Retour gratuit sous 30 jours</span>
            <span>🛡️ Qualité testée et approuvée</span>
          </div>

          <div className="strippy-product-social-proof" aria-label="Preuve sociale">
            <p>👥 12 personnes consultent ce produit</p>
            <div><span>Stock actuel :</span><strong aria-label="Stock actuel 84 pourcent"><i /></strong><em>84%</em></div>
            <p>⭐⭐⭐⭐⭐ 4.5/5 (412 avis)</p>
          </div>
          <p className="strippy-payment-note">
            <span data-delivery-estimate>
              Commandez maintenant pour le recevoir sous 5 à 8 jours
            </span>
          </p>

          <div className="strippy-payments" aria-label="Moyens de paiement">
            <span className="payment-logo payment-logo-img" aria-label="Visa"><img src="/images/visa.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="Mastercard"><img src="/images/mastercard.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="American Express"><img src="/images/american-express.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="Apple Pay"><img src="/images/apple-pay.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="Google Pay"><img src="/images/google-pay.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="PayPal"><img src="/images/paypal.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="Shopify Pay"><img src="/images/shopify-pay.png" alt="" /></span>
          </div>
        </div>
      </section>

      <section className="product-press-band" aria-label="Tendances beaute">
        <p>Vu dans :</p>
        <div className="product-press-logos">
          {[0, 1, 2].map((group) => (
            <div className="product-press-logo-group" key={group}>
              <img src="/images/cosmopolitan.png" alt="Cosmopolitan" />
              <img src="/images/vogue.png" alt="Vogue" />
              <img src="/images/elle.png" alt="Elle" />
            </div>
          ))}
        </div>
      </section>

      <div className="product-purple-strip" data-sticky-offer-trigger>
        Comme une alternative douce, mais bien plus accessible
      </div>

      <div className="product-bottom-cart" data-product-sticky-cart aria-hidden="true">
        <div className="product-bottom-cart-inner">
          <div className="product-bottom-cart-copy">
            <strong>STRIPPY Patchs naturels anti-rides</strong>
            <span>
              <b>29,99 €</b>
              <s>42,99 €</s>
              <em>-30%</em>
            </span>
          </div>
          <button className="product-bottom-cart-button" type="button" data-direct-checkout>
            🛒 Acheter
          </button>
        </div>
      </div>

      <section className="strippy-before-section" aria-label="Resultats visibles STRIPPY">
        <div className="strippy-before-image">
          <img
            src="/images/produit1.png"
            alt="Avant apres STRIPPY sur l'apparence des rides visibles"
          />
        </div>

        <div className="strippy-before-copy">
          <p className="strippy-before-eyebrow">
            Apres 7 nuits avec STRIPPY
          </p>
          <h2>
            Lissez l'apparence des rides du regard,{' '}
            <em>naturellement</em>
          </h2>
          <p>
            Pas de traitement agressif, pas d'aiguilles. Juste la confiance de
            se reveiller avec une peau qui parait plus douce, plus lisse et plus
            fraiche, nuit apres nuit.
          </p>
        </div>
      </section>

      <section className="strippy-smile-section" aria-label="Rides du sourire">
        <div className="strippy-smile-copy">
          <p className="strippy-before-eyebrow">Rides du sourire adoucies</p>
          <h2>
            Retrouvez le sourire, <span>pas les lignes</span>
          </h2>
          <p>
            STRIPPY agit pendant la nuit pour aider a adoucir l'apparence des
            plis installes, afin que vous puissiez continuer a sourire en vous
            sentant davantage vous-meme chaque jour.
          </p>
        </div>

        <div className="strippy-smile-image">
          <img
            src="/images/produit2.png"
            alt="Avant apres STRIPPY sur les rides d'expression"
          />
        </div>
      </section>

      <section className="strippy-scar-section" aria-label="Marques visibles et cicatrices">
        <div className="strippy-scar-image">
          <img
            src="/images/produit3.png"
            alt="Zones de cicatrices et marques visibles que STRIPPY peut aider a attenuer"
          />
        </div>

        <div className="strippy-scar-copy">
          <p className="strippy-before-eyebrow">Peau plus lisse & marques attenuees</p>
          <h2>
            Une bande.
            <br />
            Deux resultats
          </h2>
          <p>
            Grace au silicone medical reutilisable, STRIPPY aide a lisser
            l'apparence des rides et des marques visibles en maintenant
            l'hydratation de surface et en protegeant la zone ciblee.
          </p>
        </div>
      </section>

      <section className="strippy-facebook-review" aria-label="Avis cliente type reseau social">
        <button className="strippy-facebook-nav prev" type="button" data-facebook-prev aria-label="Avis precedent">‹</button>
        <div className="strippy-facebook-track" data-facebook-track>
        <article className="strippy-facebook-card">
          <div className="strippy-facebook-head">
            <img
              className="strippy-facebook-avatar"
              src="/images/faux post facebook/photo de profile 4.png"
              alt=""
            />
            <div className="strippy-facebook-author">
              <strong>Claire Martin</strong>
              <span>6 j · Nantes · 🌐</span>
            </div>
            <button className="strippy-facebook-menu" type="button" aria-label="Options du post">•••</button>
          </div>

          <p className="strippy-facebook-text">
            Petit retour apres 7 nuits avec STRIPPY parce que plusieurs m'ont
            demande en message privé. J'etais sceptique au début, surtout apres
            avoir teste beaucoup de soins. Je l'ai mis le soir sur les rides du
            sourire et une petite marque pres du menton.
            <br />
            <br />
            Au reveil, ma peau parait plus lisse, mieux hydratee, et le patch ne
            tire pas comme je l'imaginais. Ce n'est pas magique, mais je vois une
            vraie difference quand je suis reguliere.
          </p>

          <div className="strippy-facebook-photo" aria-label="Resultat partage par une cliente">
            <img src="/images/faux post facebook/post 1.png" alt="Avis cliente partage dans un post social STRIPPY" />
          </div>

          <div className="strippy-facebook-meta">
            <span className="strippy-facebook-reactions">
              <i><img src="/images/faux post facebook/like.png" alt="" /></i>
              <i><img src="/images/faux post facebook/coeur.png" alt="" /></i>
              <i><img src="/images/faux post facebook/choque.png" alt="" /></i>
              248
            </span>
            <span>37 commentaires · 18 partages</span>
          </div>

          <div className="strippy-facebook-comments">
            <button className="strippy-facebook-more" type="button">Voir les commentaires precedents</button>

            {[
              ['Sophie L.', 'Tu les portes toute la nuit ? J’hesite a tester pour le front.', '2 j', '/images/faux post facebook/photo de profile 1.png'],
              ['Claire Martin', 'Oui, sur peau propre et seche. Franchement je les oublie assez vite.', '2 j', '/images/faux post facebook/photo de profile 2.png'],
              ['Marion D.', 'Je confirme, ca aide surtout quand on est reguliere le soir.', '1 j', '/images/faux post facebook/photo de profile 3.png'],
            ].map(([name, comment, time, avatar]) => (
              <div className="strippy-facebook-comment" key={name}>
                <img className="strippy-facebook-comment-avatar" src={avatar} alt="" />
                <div>
                  <strong>{name}</strong>
                  <p>{comment}</p>
                  <small>J'aime · Repondre · {time}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="strippy-facebook-card">
          <div className="strippy-facebook-head">
            <img
              className="strippy-facebook-avatar"
              src="/images/faux post facebook/photo de profile post numero 1.png"
              alt=""
            />
            <div className="strippy-facebook-author">
              <strong>Nathalie R.</strong>
              <span>3 j · Lyon · 🌐</span>
            </div>
            <button className="strippy-facebook-menu" type="button" aria-label="Options du post">•••</button>
          </div>

          <p className="strippy-facebook-text">
            Je voulais attendre quelques jours avant de donner mon avis. J'utilise
            STRIPPY le soir sur le front et pres des yeux. C'est simple, ca ne
            pique pas, et surtout ma peau a l'air moins marquee au reveil.
            <br />
            <br />
            Je vous mettrai mes photos exactes ici, mais pour l'instant je suis
            vraiment surprise du confort.
          </p>

          <div className="strippy-facebook-photo" aria-label="Resultat partage par une cliente">
            <img src="/images/faux post facebook/post 2.png" alt="Deuxieme avis cliente partage dans un post social STRIPPY" />
          </div>

          <div className="strippy-facebook-meta">
            <span className="strippy-facebook-reactions">
              <i><img src="/images/faux post facebook/like.png" alt="" /></i>
              <i><img src="/images/faux post facebook/coeur.png" alt="" /></i>
              <i><img src="/images/faux post facebook/choque.png" alt="" /></i>
              193
            </span>
            <span>22 commentaires · 9 partages</span>
          </div>

          <div className="strippy-facebook-comments">
            <button className="strippy-facebook-more" type="button">Voir les commentaires precedents</button>

            {[
              ['Amelie P.', 'Tu as pris quel pack ? Je pensais prendre le 2 packs.', '1 j', '/images/faux post facebook/photo de profile 5.png'],
              ['Nathalie R.', 'J’ai pris le 2 packs, je voulais en avoir assez pour etre reguliere.', '1 j', '/images/faux post facebook/photo de profile 4.png'],
              ['Celine A.', 'Merci pour ton retour, ca fait plus naturel que les injections.', '12 h', '/images/faux post facebook/photo de profile 6.png'],
            ].map(([name, comment, time, avatar]) => (
              <div className="strippy-facebook-comment" key={name}>
                <img className="strippy-facebook-comment-avatar" src={avatar} alt="" />
                <div>
                  <strong>{name}</strong>
                  <p>{comment}</p>
                  <small>J'aime · Repondre · {time}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="strippy-facebook-card">
          <div className="strippy-facebook-head">
            <img
              className="strippy-facebook-avatar"
              src="/images/faux post facebook/photo de profile 7.png"
              alt=""
            />
            <div className="strippy-facebook-author">
              <strong>Isabelle V.</strong>
              <span>1 j · Bordeaux · 🌐</span>
            </div>
            <button className="strippy-facebook-menu" type="button" aria-label="Options du post">•••</button>
          </div>

          <p className="strippy-facebook-text">
            Je pensais que les patchs allaient etre compliques a utiliser, mais
            c'est devenu tres vite automatique dans ma routine du soir. Je les
            applique apres avoir nettoye ma peau, et je les retire le matin.
            <br />
            <br />
            Ce que j'aime surtout, c'est que ma peau garde un aspect naturel.
            Les ridules paraissent plus douces, sans effet fige.
          </p>

          <div className="strippy-facebook-photo" aria-label="Resultat partage par une cliente">
            <img src="/images/faux post facebook/post 3.png" alt="Troisieme avis cliente partage dans un post social STRIPPY" />
          </div>

          <div className="strippy-facebook-meta">
            <span className="strippy-facebook-reactions">
              <i><img src="/images/faux post facebook/like.png" alt="" /></i>
              <i><img src="/images/faux post facebook/coeur.png" alt="" /></i>
              <i><img src="/images/faux post facebook/choque.png" alt="" /></i>
              171
            </span>
            <span>19 commentaires · 7 partages</span>
          </div>

          <div className="strippy-facebook-comments">
            <button className="strippy-facebook-more" type="button">Voir les commentaires precedents</button>

            {[
              ['Laura N.', 'Ca tient vraiment pendant la nuit ?', '18 h', '/images/faux post facebook/photo de profile 8.png'],
              ['Isabelle V.', 'Oui, sur peau bien seche ca tient tres bien chez moi.', '17 h', '/images/faux post facebook/photo de profile 7.png'],
              ['Karine B.', 'Merci pour ton retour, je cherchais justement quelque chose de doux.', '9 h', '/images/faux post facebook/photo de profile 9.png'],
            ].map(([name, comment, time, avatar]) => (
              <div className="strippy-facebook-comment" key={name}>
                <img className="strippy-facebook-comment-avatar" src={avatar} alt="" />
                <div>
                  <strong>{name}</strong>
                  <p>{comment}</p>
                  <small>J'aime · Repondre · {time}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
        </div>
        <button className="strippy-facebook-nav next" type="button" data-facebook-next aria-label="Avis suivant">›</button>
      </section>

      <section className="strippy-why-section" aria-label="Pourquoi STRIPPY">
        <div className="strippy-why-copy">
          <h2>
            Pourquoi <em>STRIPPY ?</em>
          </h2>
          <p>
            Obtenez une routine double action pour aider a lisser l'apparence des
            rides et des marques visibles, <strong>tout en une seule bande.</strong>
          </p>

          <ul>
            <li>Recommande pour les routines peau sensible</li>
            <li>Pas d'odeur etrange</li>
            <li>Silicone medical reutilisable</li>
            <li>Adopte par des clientes qui veulent eviter les injections</li>
          </ul>
        </div>

        <div className="strippy-compare-table" role="table" aria-label="Comparaison STRIPPY et autres marques">
          <div className="strippy-compare-head" role="row">
            <span role="columnheader" />
            <strong role="columnheader">STRIPPY</strong>
            <strong role="columnheader">Autres marques</strong>
          </div>

          {[
            ['Rides et marques visibles', '✓', '×'],
            ['Silicone medical', '✓', '×'],
            ['Reusable', '✓', '×'],
            ['Doux pour la majorite des types de peau', '✓', '×'],
            ['Qualite controlee', '✓', '×'],
            ['Tient pendant la nuit', '✓', '×'],
            ['Laisse un effet platre dur', 'Jamais', 'Oui'],
          ].map(([label, strippy, other]) => (
            <div className="strippy-compare-row" role="row" key={label}>
              <span role="rowheader">{label}</span>
              <strong role="cell">{strippy}</strong>
              <strong role="cell">{other}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="strippy-results-stats" aria-label="Resultats clientes STRIPPY">
        <h2>
          Voyez la difference en 30 jours ou{' '}
          <span>contactez notre support</span>
        </h2>

        <div className="strippy-stat-row">
          <div className="strippy-stat-circle" style={{'--percent': 98}}>98%</div>
          <p>
            Ont remarque une <strong>peau d'apparence plus lisse</strong> et des
            ridules visiblement adoucies des les premieres utilisations.
          </p>
        </div>

        <div className="strippy-stat-row">
          <div className="strippy-stat-circle" style={{'--percent': 95}}>95%</div>
          <p>
            Ont trouve STRIPPY <strong>plus simple a utiliser</strong> que les
            routines longues a base de cremes anti-rides.
          </p>
        </div>

        <div className="strippy-stat-row">
          <div className="strippy-stat-circle" style={{'--percent': 91}}>91%</div>
          <p>
            Ont rapporte des <strong>marques visiblement plus douces</strong> et
            une texture de peau plus reguliere avec une utilisation reguliere.
          </p>
        </div>
      </section>

      <section className="section reviews-section product-reviews-section" aria-labelledby="product-reviews-title">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Avis clients verifies</p>
            <h2 id="product-reviews-title">Nos clientes en parlent mieux que nous</h2>
            <div className="reviews-score" aria-label="Excellent 4.5 sur 5, base sur 412 avis clients">
              <strong>
                Excellent 4.5 / 5{' '}
                <span className="stars-img-wrap rating-47" aria-hidden="true">
                  <img className="stars-img" src="/images/stars-5.png" alt="" />
                </span>
              </strong>
              <span>Base sur 412 avis clients</span>
            </div>
          </div>

          <div className="reviews-carousel" aria-label="Carrousel d'avis clients">
            <div className="reviews-track" data-review-track tabIndex="0">
              {[
                ['Mes ridules sont beaucoup moins visibles', "Je l'utilise surtout sur le front et les petites marques du sourire. La peau parait plus reposee le matin, sans routine compliquee.", 'Christine K.'],
                ["Meme ma dermatologue m'a demande ce que j'avais change", "Je voulais quelque chose de doux. Les patchs tiennent bien et ma peau a l'air plus lisse quand je suis reguliere.", 'Stacy K.'],
                ["J'aurais du commander sur le site officiel des le debut", "La qualite est meilleure que les patchs que j'avais testes ailleurs. Le toucher est agreable et le packaging fait tres propre.", 'Sarah T.'],
                ['Simple, doux et agreable a porter', "Je le pose apres avoir nettoye ma peau et je l'oublie. Pas de sensation genante pendant la nuit.", 'Anais M.'],
                ["Je l'utilise tous les soirs", "C'est devenu un petit reflexe. Les zones ciblees paraissent plus souples, surtout quand je dors peu.", 'Claire B.'],
                ['Tres bonne alternative aux routines compliquees', "Je n'ai pas la patience pour multiplier les soins. La, c'est rapide, cible et facile a garder dans le temps.", 'Julie R.'],
                ['Ma peau parait plus lisse au reveil', "J'aime surtout l'effet au reveil sur les ridules de sommeil. C'est discret, confortable et facile a integrer.", 'Marion L.'],
                ["J'aime le cote reutilisable", 'Le fait de pouvoir les nettoyer et les remettre plusieurs fois est un vrai plus. Routine simple et moins de gaspillage.', 'Sophie D.'],
              ].map(([title, text, author]) => (
                <article className="review-card" key={title}>
                  <img className="stars-img" src="/images/stars-5.png" alt="5 etoiles" />
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <div className="review-meta">
                    <span className="review-author">{author}</span>
                    <span className="verified-badge">Avis verifie</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="reviews-controls">
              <button className="review-arrow" type="button" data-review-prev aria-label="Afficher les avis precedents">
                ‹
              </button>
              <div className="review-dots" data-review-dots aria-label="Pagination des avis" />
              <button className="review-arrow" type="button" data-review-next aria-label="Afficher les avis suivants">
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section soft product-faq-section" id="faq" aria-labelledby="product-faq-title">
        <div className="container">
          <div className="faq-section-head">
            <p className="eyebrow">FAQ - TOUT CE QUE VOUS DEVEZ SAVOIR</p>
            <h2 id="product-faq-title">Vos Questions, Nos Reponses</h2>
          </div>

          <div className="faq">
            {[
              [
                'Quelle est la difference entre Strippy et les patchs anti-rides classiques ?',
                "Strippy utilise du silicone medical reutilisable qui aide a lisser visiblement l'apparence des rides et des marques visibles tout en maintenant l'hydratation de surface.",
              ],
              [
                'Strippy fonctionne-t-il pour les rides et les cicatrices ?',
                "Strippy peut etre utilise sur les rides du front, les rides d'expression et certaines marques visibles. Les resultats peuvent varier selon les personnes et la regularite d'utilisation.",
              ],
              [
                'Quand vais-je voir les premiers resultats ?',
                "Certaines clientes remarquent une peau plus lisse au reveil. Pour un resultat plus visible, nous recommandons une utilisation reguliere pendant plusieurs nuits.",
              ],
              [
                'Convient-il aux peaux sensibles ?',
                "Le silicone medical est doux pour la peau et convient a la majorite des types de peau. En cas d'irritation ou de doute, arretez l'utilisation et demandez conseil a un professionnel.",
              ],
              [
                'Combien de temps dois-je le porter ?',
                'Pour de meilleurs resultats, portez Strippy plusieurs heures ou toute la nuit sur une peau propre et seche.',
              ],
              [
                'Combien de temps dure un rouleau ?',
                "Cela depend de la frequence d'utilisation et de la taille des decoupes, mais un rouleau peut durer plusieurs semaines.",
              ],
              [
                'Tiendra-t-il pendant mon sommeil ?',
                'Oui. Strippy est concu pour rester en place pendant la nuit lorsqu il est applique sur une peau propre, seche et sans creme grasse.',
              ],
              [
                "Sur quelles zones puis-je l'utiliser ?",
                "Front, contour des yeux, rides du sourire, cou et certaines marques visibles sur le corps. Evitez les plaies ouvertes et les zones irritees.",
              ],
              [
                "Pourquoi choisir Strippy plutot qu'un ruban moins cher ?",
                'Strippy utilise un silicone medical de qualite, pense pour etre confortable, reutilisable et adapte a une routine beaute ciblee.',
              ],
              [
                'Proposez-vous une garantie ?',
                "Oui. Nous proposons une garantie satisfaction pour vous permettre d'essayer Strippy avec plus de confiance.",
              ],
            ].map(([question, answer]) => (
              <div className="faq-item" key={question}>
                <button className="faq-question" type="button" aria-expanded="false">
                  <span>{question}</span>
                  <span className="faq-icon" aria-hidden="true">+</span>
                </button>
                <div className="faq-answer">
                  <p>{answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cart-drawer-overlay" data-cart-overlay aria-hidden="true" />
      <aside className="cart-drawer" id="panier" data-cart-drawer aria-hidden="true" aria-label="Mon panier">
        <div className="cart-drawer-head">
          <h2>Mon Panier</h2>
          <button type="button" data-cart-close aria-label="Fermer le panier">
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="cart-reserve">
          Panier reserve pendant <strong data-cart-timer>05:00</strong> minutes !
        </div>

        <div className="cart-free-shipping">
          <strong>Bravo ! Vous profitez de la livraison offerte !</strong>
          <div>
            <span></span>
          </div>
        </div>

        <div className="cart-empty" data-cart-empty>
          <h3>Ton panier est vide !</h3>
          <button type="button" data-cart-continue>
            Continuer vos achats
          </button>
          <div>
            <strong>Vous avez un compte ?</strong>
            <p>Connectez-vous pour commander plus vite.</p>
          </div>
        </div>

        <div className="cart-items" data-cart-items />

        <div className="cart-summary">
          <div>
            <span>Remises :</span>
            <strong>-<span data-cart-discount>47,00 €</span></strong>
          </div>
          <div>
            <span>Total :</span>
            <strong data-cart-total>32,95 €</strong>
          </div>
          <button className="cart-checkout" type="button" data-cart-checkout>
            <span aria-hidden="true">▣</span>
            Finaliser ma commande
          </button>
          <div className="strippy-payments cart-payments" aria-label="Moyens de paiement acceptes">
            <span className="payment-logo payment-logo-img" aria-label="Visa"><img src="/images/visa.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="Mastercard"><img src="/images/mastercard.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="American Express"><img src="/images/american-express.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="Apple Pay"><img src="/images/apple-pay.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="Google Pay"><img src="/images/google-pay.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="PayPal"><img src="/images/paypal.png" alt="" /></span>
            <span className="payment-logo payment-logo-img" aria-label="Shopify Pay"><img src="/images/shopify-pay.png" alt="" /></span>
          </div>
        </div>
      </aside>
    </main>
  );
}
