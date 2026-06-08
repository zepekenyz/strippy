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
  '/images/premier-page-produit.png',
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
        <div className="promo-banner" aria-label="Promotion STRIPPY -60%">
          <div className="promo-main">
            <span className="promo-exclusive">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13.2 13.2 4H20v6.8L10.8 20 4 13.2Z"></path><path d="M16.5 7.5h.01"></path></svg>
              Offre exclusive
            </span>
            <div className="promo-offer">
              <span>Notre plus grande offre !</span>
              <strong>-60%</strong>
            </div>
            <a className="promo-cta" href="#produit">Je profite de l'offre</a>
            <div className="promo-limited">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 7v5l3 2"></path></svg>
              <span>Offre limitée !</span>
            </div>
            <span className="timer-boxes promo-countdown" aria-live="polite">
              <span className="timer-box"><span data-countdown-hours>00</span><small>HRS</small></span>
              <span className="timer-separator">:</span>
              <span className="timer-box"><span data-countdown-minutes>54</span><small>MIN</small></span>
              <span className="timer-separator">:</span>
              <span className="timer-box"><span data-countdown-seconds>59</span><small>SEC</small></span>
            </span>
          </div>
          <div className="promo-proof">
            <span className="promo-proof-icon" aria-hidden="true">✓</span>
            <span>Des milliers de clientes satisfaites font déjà confiance à notre solution</span>
            <span className="promo-stars" aria-hidden="true">★★★★★</span>
            <strong>4,7/5</strong>
          </div>
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

        <div className="product-trust-ticker" aria-label="Preuves de confiance STRIPPY">
          <div className="product-trust-track">
            {[
              'Adore par 73 000+ clientes',
              'Garantie sans risque 99 jours',
              'Silicone medical reutilisable',
              'Livraison rapide suivie',
              'Adore par 73 000+ clientes',
              'Garantie sans risque 99 jours',
              'Silicone medical reutilisable',
              'Livraison rapide suivie',
            ].map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

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
            <p>Excellent 4.7 | 18 067 avis</p>
          </div>

          <div className="strippy-title-proofs" aria-label="Preuves de confiance">
            <span>💜 50 000+ clientes satisfaites</span>
            <span>💜 Recommandé par des experts skincare</span>
          </div>

          <h1>STRIPPY™ Patchs Beauté en Silicone</h1>

          <p className="strippy-product-badge">
            NOUVEAU : innovation skincare 2025 pour rides et marques visibles
          </p>

          <div className="strippy-product-price">
            <strong>€23,95 EUR</strong>
            <span>€60,95 EUR</span>
            <em>-60%</em>
          </div>

          <p className="strippy-price-urgency">🔥 Offre -60% se termine bientôt</p>

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
            <button className="strippy-pack" type="button" role="radio" aria-checked="false" data-pack-name="1 Pack" data-pack-size="1 Pack" data-pack-price="23,95 €" data-pack-old-price="60,95 €" data-pack-discount="37,00 €" data-pack-image="/images/1 pack.png">
              <span className="strippy-pack-media"><img src="/images/1 pack.png" alt="" /></span>
              <span className="strippy-pack-copy"><span><strong>1 PACK</strong><b>24€ / pack</b></span><small>Garantie satisfait ou remboursé</small><i>Vous économisez 37€</i></span>
              <span className="strippy-pack-price"><strong>€24</strong><small>€61</small></span>
            </button>

            <button className="strippy-pack popular active" type="button" role="radio" aria-checked="true" data-shopify-variant-id="gid://shopify/ProductVariant/56815940567364" data-pack-name="2 Pack" data-pack-size="2-Pack" data-pack-price="32,95 €" data-pack-old-price="79,95 €" data-pack-discount="47,00 €" data-pack-image="/images/2 pack.png">
              <span className="strippy-pack-media"><img src="/images/2 pack.png" alt="" /></span>
              <span className="strippy-pack-copy"><span><strong>2 PACKS</strong><b>19€ / pack</b></span><small>Livraison offerte</small><i>Vous économisez 27€</i></span>
              <span className="strippy-pack-price"><strong>€33</strong><small>€80</small></span>
              <em>⭐⭐ Plus populaire</em>
            </button>

            <button className="strippy-pack value" type="button" role="radio" aria-checked="false" data-shopify-variant-id="gid://shopify/ProductVariant/56815940895044" data-pack-name="3 Pack" data-pack-size="3-Pack" data-pack-price="39,95 €" data-pack-old-price="102,00 €" data-pack-discount="62,05 €" data-pack-image="/images/3 pack.png">
              <span className="strippy-pack-media"><img src="/images/3 pack.png" alt="" /></span>
              <span className="strippy-pack-copy"><span><strong>3 PACKS</strong><b>15€ / pack</b></span><small>Meilleure valeur</small><i>Vous économisez 62€</i></span>
              <span className="strippy-pack-price"><strong>€40</strong><small>€102</small></span>
              <em>Meilleure valeur</em>
            </button>
          </div>

          <div className="strippy-purchase-type" role="radiogroup" aria-label="Type d'achat">
            <button className="active" type="button" role="radio" aria-checked="true">Achat unique</button>
            <button type="button" role="radio" aria-checked="false"><strong>Abonnement économique</strong><span>25% de plus</span><small>Sans engagement</small></button>
          </div>

          <button className="strippy-product-cart" type="button" data-cart-add>🛒 Ajouter au panier • 33€</button>
          <button className="strippy-shop-pay" type="button" data-cart-add>Payer avec <strong>shop</strong></button>

          <div className="strippy-reassurance-grid" aria-label="Garanties STRIPPY">
            <span>🚚 Livraison suivie</span>
            <span>🔒 Paiement sécurisé</span>
            <span>💜 Support réactif</span>
            <span>↩️ Garantie satisfait ou remboursé</span>
          </div>

          <div className="strippy-product-social-proof" aria-label="Preuve sociale">
            <p>👥 82 personnes consultent ce produit</p>
            <div><span>Stock actuel :</span><strong aria-label="Stock actuel 84 pourcent"><i /></strong><em>84%</em></div>
            <p>⭐⭐⭐⭐⭐ 4.7/5 (18 067 avis)</p>
          </div>
          <p className="strippy-payment-note">
            Commandez maintenant pour le recevoir d'ici vendredi 05 juin
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
            <strong>STRIPPY™ Patchs Beaute en Silicone</strong>
            <span>
              <b>23,95 €</b>
              <s>60,95 €</s>
              <em>-60%</em>
            </span>
          </div>
          <button className="product-bottom-cart-button" type="button" data-cart-add>
            Ajouter au panier
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

      <section className="strippy-why-section" aria-label="Pourquoi STRIPPY">
        <div className="strippy-why-copy">
          <h2>
            Pourquoi <em>STRIPPY™ ?</em>
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
            <strong role="columnheader">STRIPPY™</strong>
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
          <div className="strippy-stat-circle">98%</div>
          <p>
            Ont remarque une <strong>peau d'apparence plus lisse</strong> et des
            ridules visiblement adoucies des les premieres utilisations.
          </p>
        </div>

        <div className="strippy-stat-row">
          <div className="strippy-stat-circle">95%</div>
          <p>
            Ont trouve STRIPPY™ <strong>plus simple a utiliser</strong> que les
            routines longues a base de cremes anti-rides.
          </p>
        </div>

        <div className="strippy-stat-row">
          <div className="strippy-stat-circle">91%</div>
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
            <div className="reviews-score" aria-label="Excellent 4.7 sur 5, base sur 18 067 avis clients">
              <strong>
                Excellent 4.7 / 5{' '}
                <span className="stars-img-wrap rating-47" aria-hidden="true">
                  <img className="stars-img" src="/images/stars-5.png" alt="" />
                </span>
              </strong>
              <span>Base sur 18 067 avis clients</span>
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
