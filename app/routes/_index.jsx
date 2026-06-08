import {useEffect} from 'react';
import {connectStrippyInteractions} from '../strippy-interactions.js';

const landingMarkup = String.raw`
<div class="page">
    <!-- Sticky header with conversion CTA -->
    <header class="site-header">
      <div class="promo-banner" aria-label="Promotion STRIPPY -60%">
        <div class="promo-main">
          <span class="promo-exclusive">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 13.2 13.2 4H20v6.8L10.8 20 4 13.2Z"></path><path d="M16.5 7.5h.01"></path></svg>
            Offre exclusive
          </span>
          <div class="promo-offer">
            <span>Notre plus grande offre !</span>
            <strong>-60%</strong>
          </div>
          <a class="promo-cta" href="#offre">Je profite de l'offre</a>
          <div class="promo-limited">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 7v5l3 2"></path></svg>
            <span>Offre limitée !</span>
          </div>
          <span class="timer-boxes promo-countdown" aria-live="polite">
            <span class="timer-box"><span data-countdown-hours>00</span><small>HRS</small></span>
            <span class="timer-separator">:</span>
            <span class="timer-box"><span data-countdown-minutes>55</span><small>MIN</small></span>
            <span class="timer-separator">:</span>
            <span class="timer-box"><span data-countdown-seconds>01</span><small>SEC</small></span>
          </span>
        </div>
        <div class="promo-proof">
          <span class="promo-proof-icon" aria-hidden="true">✓</span>
          <span>Des milliers de clientes satisfaites font déjà confiance à notre solution</span>
          <span class="promo-stars" aria-hidden="true">★★★★★</span>
          <strong>4,7/5</strong>
        </div>
      </div>
      <nav class="container nav" aria-label="Navigation principale">
        <button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false" data-menu-toggle>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="menu" aria-label="Sections" data-site-menu>
          <a href="/produit-strippy">Offre spéciale</a>
          <a href="/suivre-ma-commande">Suivre ma commande</a>
          <a href="/contact">Contact</a>
        </div>
        <a class="logo" href="#top" aria-label="Accueil STRIPPY">STRIPPY</a>
        <div class="nav-actions" aria-label="Panier">
          <a class="nav-icon" href="/produit-strippy#panier" aria-label="Acceder au panier">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 8h12l1 13H5L6 8Z"></path>
              <path d="M9 8V6a3 3 0 0 1 6 0v2"></path>
            </svg>
          </a>
        </div>
      </nav>
    </header>

    <main id="top">
      <!-- Hero: primary value proposition and product visual placeholder -->
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-bg" aria-hidden="true">
          <picture>
            <source media="(max-width: 640px)" srcset="/images/hero-mobile-clean.png">
            <img src="/images/hero.png" alt="">
          </picture>
        </div>
        <div class="container hero-grid">
          <div class="hero-copy">
            <div class="hero-badge">Lauréat Prix Beauté 2025</div>
            <h1 id="hero-title">Lissez vos rides pendant votre sommeil</h1>
            <div class="rating" aria-label="Noté 4.7 sur 5 par plus de 18 067 clientes">
              <span class="stars-img-wrap rating-47" aria-hidden="true"><img class="stars-img" src="/images/stars-5.png" alt="" /></span>
              <span>Noté 4.7/5 par 18 067+ avis</span>
            </div>
            <p>Le ruban en silicone médical recommandé comme alternative douce au Botox.</p>
            <div class="cta-row">
              <a class="btn" href="#offre">Profiter des -60% <span aria-hidden="true">&rarr;</span></a>
            </div>
            <div class="hero-guarantees" aria-label="Garanties STRIPPY">
              <span><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v5c0 4.6-2.8 8.6-7 10-4.2-1.4-7-5.4-7-10V6l7-3Z"></path><path d="M9 12l2 2 4-4"></path></svg>Garantie satisfait ou remboursé 99 jours</span>
            </div>
          </div>
        </div>
      </section>
      <div class="press-strip" aria-label="Mentions presse">
        <div class="press-logos" aria-hidden="true">
          <div class="press-logo-group">
            <span class="press-logo">VOGUE</span>
            <span class="press-logo">BAZAAR</span>
            <span class="press-logo small">COSMOPOLITAN</span>
            <span class="press-logo">ELLE</span>
          </div>
          <div class="press-logo-group">
            <span class="press-logo">VOGUE</span>
            <span class="press-logo">BAZAAR</span>
            <span class="press-logo small">COSMOPOLITAN</span>
            <span class="press-logo">ELLE</span>
          </div>
          <div class="press-logo-group">
            <span class="press-logo">VOGUE</span>
            <span class="press-logo">BAZAAR</span>
            <span class="press-logo small">COSMOPOLITAN</span>
            <span class="press-logo">ELLE</span>
          </div>
        </div>
      </div>

      <section class="section reviews-section" id="avis" aria-labelledby="reviews-title">
        <div class="container">
          <div class="section-head">
            <p class="eyebrow">Avis clients vérifiés</p>
            <h2 id="reviews-title">Nos clientes en parlent mieux que nous</h2>
            <div class="reviews-score" aria-label="Excellent 4.7 sur 5, basé sur 18 067 avis clients">
              <strong>Excellent 4.7 / 5 <span class="stars-img-wrap rating-47" aria-hidden="true"><img class="stars-img" src="/images/stars-5.png" alt="" /></span></strong>
              <span class="reviews-count-desktop">Basé sur 18 067 avis clients</span>
              <span class="reviews-count-mobile">based on 18,067 reviews</span>
            </div>
          </div>
          <article class="mobile-feature-review" aria-label="Avis client mis en avant">
            <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
            <h3>Saw a Dermatologist Recommend these</h3>
            <p>Je ne voulais rien d’agressif. Les patchs sont doux, tiennent bien, et ma peau a l’air plus lisse quand je suis régulière.</p>
            <a href="#avis" aria-label="Voir plus d'avis clients">View More</a>
            <strong>Stacy K.</strong>
          </article>
          <div class="reviews-carousel" aria-label="Carrousel d'avis clients">
            <div class="reviews-track" data-review-track tabindex="0">
              <article class="review-card">
                <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
                <h3>Mes ridules sont beaucoup moins visibles</h3>
                <p>Je l’utilise surtout sur le front et les petites marques du sourire. La peau paraît plus reposée le matin, sans ajouter dix étapes à ma routine.</p>
                <div class="review-meta"><span class="review-author">Christine K.</span><span class="verified-badge">Avis vérifié</span></div>
              </article>
              <article class="review-card">
                <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
                <h3>Même ma dermatologue m’a demandé ce que j’avais changé</h3>
                <p>Je ne voulais rien d’agressif. Les patchs sont doux, tiennent bien, et ma peau a l’air plus lisse quand je suis régulière.</p>
                <div class="review-meta"><span class="review-author">Stacy K.</span><span class="verified-badge">Avis vérifié</span></div>
              </article>
              <article class="review-card">
                <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
                <h3>J’aurais dû commander sur le site officiel dès le début</h3>
                <p>La qualité est bien meilleure que les patchs que j’avais testés ailleurs. Le toucher est agréable et le packaging fait très propre.</p>
                <div class="review-meta"><span class="review-author">Sarah T.</span><span class="verified-badge">Avis vérifié</span></div>
              </article>
              <article class="review-card">
                <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
                <h3>Simple, doux et agréable à porter</h3>
                <p>Je le pose après avoir nettoyé ma peau et je l’oublie. Pas de sensation gênante pendant la nuit, c’est exactement ce que je cherchais.</p>
                <div class="review-meta"><span class="review-author">Anaïs M.</span><span class="verified-badge">Avis vérifié</span></div>
              </article>
              <article class="review-card">
                <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
                <h3>Je l’utilise tous les soirs</h3>
                <p>C’est devenu un petit réflexe. Je trouve que les zones ciblées paraissent plus souples, surtout quand je dors peu.</p>
                <div class="review-meta"><span class="review-author">Claire B.</span><span class="verified-badge">Avis vérifié</span></div>
              </article>
              <article class="review-card">
                <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
                <h3>Très bonne alternative aux routines compliquées</h3>
                <p>Je n’ai pas la patience pour multiplier les soins. Là, c’est rapide, ciblé, et facile à garder dans le temps.</p>
                <div class="review-meta"><span class="review-author">Julie R.</span><span class="verified-badge">Avis vérifié</span></div>
              </article>
              <article class="review-card">
                <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
                <h3>Ma peau paraît plus lisse au réveil</h3>
                <p>J’aime surtout l’effet au réveil sur les ridules de sommeil. C’est discret, confortable et ça s’intègre facilement.</p>
                <div class="review-meta"><span class="review-author">Marion L.</span><span class="verified-badge">Avis vérifié</span></div>
              </article>
              <article class="review-card">
                <img class="stars-img" src="/images/stars-5.png" alt="5 étoiles" />
                <h3>J’aime le côté réutilisable</h3>
                <p>Le fait de pouvoir les nettoyer et les remettre plusieurs fois est un vrai plus. Ça donne une routine plus simple et moins gaspillage.</p>
                <div class="review-meta"><span class="review-author">Sophie D.</span><span class="verified-badge">Avis vérifié</span></div>
              </article>
            </div>
            <div class="reviews-controls">
              <button class="review-arrow" type="button" data-review-prev aria-label="Afficher les avis précédents">‹</button>
              <div class="review-dots" data-review-dots aria-label="Pagination des avis"></div>
              <button class="review-arrow" type="button" data-review-next aria-label="Afficher les avis suivants">›</button>
            </div>
          </div>
        </div>
      </section>
      <section class="section product-showcase" id="offre" aria-labelledby="product-title">
        <div class="container">
          <div class="product-buy-grid">
            <div class="product-gallery" aria-label="Galerie produit STRIPPY">
              <div class="product-main">
                <img class="product-main-image" data-product-main-image src="/images/1.png" alt="STRIPPY Patchs Beauté en Silicone - image produit 1">
              </div>
              <div class="product-thumbs" aria-label="Miniatures produit">
                <button class="thumb-arrow" type="button" data-product-prev aria-label="Image précédente">‹</button>
                <div class="thumb-track" data-product-thumbs>
                  <button class="thumb active" type="button" data-product-image="/images/1.png" aria-label="Afficher l’image produit 1"><img src="/images/1.png" alt="Miniature produit STRIPPY 1"></button>
                  <button class="thumb" type="button" data-product-image="/images/2.png" aria-label="Afficher l’image produit 2"><img src="/images/2.png" alt="Miniature produit STRIPPY 2"></button>
                  <button class="thumb" type="button" data-product-image="/images/3.png" aria-label="Afficher l’image produit 3"><img src="/images/3.png" alt="Miniature produit STRIPPY 3"></button>
                  <button class="thumb" type="button" data-product-image="/images/4.png" aria-label="Afficher l’image produit 4"><img src="/images/4.png" alt="Miniature produit STRIPPY 4"></button>
                  <button class="thumb" type="button" data-product-image="/images/5.png" aria-label="Afficher l’image produit 5"><img src="/images/5.png" alt="Miniature produit STRIPPY 5"></button>
                  <button class="thumb" type="button" data-product-image="/images/6.png" aria-label="Afficher l’image produit 6"><img src="/images/6.png" alt="Miniature produit STRIPPY 6"></button>
                  <button class="thumb" type="button" data-product-image="/images/7.png" aria-label="Afficher l’image produit 7"><img src="/images/7.png" alt="Miniature produit STRIPPY 7"></button>
                  <button class="thumb" type="button" data-product-image="/images/8.png" aria-label="Afficher l’image produit 8"><img src="/images/8.png" alt="Miniature produit STRIPPY 8"></button>
                </div>
                <button class="thumb-arrow" type="button" data-product-next aria-label="Image suivante">›</button>
              </div>
            </div>

            <div class="product-details">
              <h2 id="product-title">Strippy™ Patchs Beauté en Silicone</h2>
              <div class="product-price">
                <s>69,90 €</s>
                <strong>29,90 €</strong>
              </div>
              <span class="product-sale-badge">-60%</span>
              <p class="medical-line"><span aria-hidden="true">◎</span> Silicone médical réutilisable</p>
              <div class="benefit-grid">
                <div class="benefit-item"><span>≈</span><span>Aide à lisser l’apparence des rides</span></div>
                <div class="benefit-item"><span>↓</span><span>Aide à réduire l’apparence des ridules</span></div>
                <div class="benefit-item"><span>⌁</span><span>Aide les marques à paraître plus douces</span></div>
                <div class="benefit-item"><span>□</span><span>Confortable et bonne tenue</span></div>
                <div class="benefit-item"><span>＋</span><span>Réutilisable et durable</span></div>
                <div class="benefit-item"><span>↑</span><span>Aide à retenir l’hydratation</span></div>
              </div>
              <button class="add-cart" type="button">AJOUTER AU PANIER</button>
            </div>
          </div>

          <div class="results-proof" aria-label="Résultats clients STRIPPY">
            <h3>Voyez la différence en 30 jours ou contactez notre support.</h3>
            <div class="proof-row">
              <div class="proof-circle" style="--percent: 98">98%</div>
              <p><strong>Ont remarqué une peau d’apparence plus lisse</strong> et des ridules visiblement plus douces dès la première semaine.</p>
            </div>
            <div class="proof-row">
              <div class="proof-circle" style="--percent: 90">90%</div>
              <p>Ont trouvé Strippy™ <strong>plus facile à garder dans leur routine</strong> que les crèmes anti-rides déjà testées.</p>
            </div>
            <div class="proof-row">
              <div class="proof-circle" style="--percent: 90">90%</div>
              <p>Ont constaté <strong>une texture visiblement plus régulière</strong> après une utilisation régulière pendant la nuit.</p>
            </div>
          </div>
        </div>
      </section>
      <section class="section soft" id="faq" aria-labelledby="faq-title">
        <div class="container">
          <div class="faq-section-head">
            <p class="eyebrow">FAQ – TOUT CE QUE VOUS DEVEZ SAVOIR</p>
            <h2 id="faq-title">Vos Questions, Nos Réponses</h2>
          </div>
          <div class="faq">
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Quelle est la différence entre Strippy et les patchs anti-rides classiques ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Strippy utilise du silicone médical réutilisable qui aide à lisser visiblement l'apparence des rides et des cicatrices tout en maintenant l'hydratation de la peau.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Strippy fonctionne-t-il pour les rides et les cicatrices ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Oui. Strippy peut être utilisé sur les rides du front, les rides d'expression ainsi que sur certaines cicatrices anciennes ou récentes.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Quand vais-je voir les premiers résultats ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>De nombreux utilisateurs constatent une amélioration visible dès la première nuit, avec des résultats qui continuent de s'améliorer avec une utilisation régulière.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Convient-il aux peaux sensibles ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Oui. Le silicone médical est doux pour la peau et convient à la majorité des types de peau.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Combien de temps dois-je le porter ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Pour de meilleurs résultats, portez Strippy pendant plusieurs heures ou toute la nuit.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Combien de temps dure un rouleau ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Cela dépend de la fréquence d'utilisation et de la taille des découpes, mais un rouleau peut durer plusieurs semaines.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Tiendra-t-il pendant mon sommeil ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Oui. Strippy est conçu pour rester en place toute la nuit lorsqu'il est appliqué sur une peau propre et sèche.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Sur quelles zones puis-je l'utiliser ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Front, contour des yeux, rides du sourire, cou et certaines cicatrices sur le corps.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Pourquoi choisir Strippy plutôt qu'un ruban moins cher ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Strippy utilise un silicone médical de qualité supérieure conçu pour être confortable, réutilisable et efficace.</p>
              </div>
            </div>
            <div class="faq-item">
              <button class="faq-question" type="button" aria-expanded="false">
                <span>Proposez-vous une garantie ?</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </button>
              <div class="faq-answer">
                <p>Oui. Nous proposons une garantie satisfaction pour vous permettre d'essayer Strippy en toute confiance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Legal/footer links are placeholders to replace with store policy URLs -->
    <footer class="site-footer">
      <div class="container footer-grid">
        <a class="logo" href="#top">STRIPPY</a>
        <div class="footer-links">
          <a href="/contact">Contact</a>
          <a href="#livraison">Livraison</a>
          <a href="#retours">Retours</a>
          <a href="#confidentialite">Politique de confidentialité</a>
          <a href="#cgv">CGV</a>
        </div>
        <p class="footer-disclaimer">Strippy est un produit cosmétique. Il ne remplace pas un avis médical ou un traitement dermatologique. Les résultats peuvent varier.</p>
      </div>
    </footer>

    <div class="mobile-cta">
      <a class="btn" href="#offre">Essayer maintenant</a>
    </div>
  </div>
`;

export default function Index() {
  useEffect(() => {
    return connectStrippyInteractions();
  }, []);

  return <div dangerouslySetInnerHTML={{__html: landingMarkup}} />;
}
