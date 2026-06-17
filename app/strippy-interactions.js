import {
  getMetaBrowserCookies,
  trackAddToCart,
  trackInitiateCheckout,
  trackPurchase,
  trackViewContent,
} from '../src/lib/tracking/metaPixel';

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION =
  import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-01';
const SHOPIFY_VARIANT_ID = import.meta.env.VITE_SHOPIFY_VARIANT_ID;
const SHOPIFY_CHECKOUT_DOMAIN =
  import.meta.env.VITE_SHOPIFY_CHECKOUT_DOMAIN ||
  import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const PROMO_COUNTDOWN_STORAGE_KEY = 'strippy-promo-countdown-ends-at';
const PROMO_COUNTDOWN_DURATION_MS = (55 * 60 + 1) * 1000;
const CHECKOUT_EVENT_STORAGE_KEY = 'strippy-last-checkout-event';

function connectPersistentPromoCountdown(cleanup) {
  const countdownHours = document.querySelector('[data-countdown-hours]');
  const countdownMinutes = document.querySelector('[data-countdown-minutes]');
  const countdownSeconds = document.querySelector('[data-countdown-seconds]');

  if (!countdownHours || !countdownMinutes || !countdownSeconds) return;

  const padTime = (value) => String(value).padStart(2, '0');
  const getStoredEndTime = () => {
    try {
      const storedEndTime = Number(
        window.localStorage.getItem(PROMO_COUNTDOWN_STORAGE_KEY),
      );

      if (Number.isFinite(storedEndTime) && storedEndTime > 0) {
        return storedEndTime;
      }
    } catch {
      return 0;
    }

    return 0;
  };
  const setStoredEndTime = (endTime) => {
    try {
      window.localStorage.setItem(PROMO_COUNTDOWN_STORAGE_KEY, String(endTime));
    } catch {
      // The timer still works for the current session if storage is blocked.
    }
  };
  let countdownEndTime = getStoredEndTime();

  if (!countdownEndTime) {
    countdownEndTime = Date.now() + PROMO_COUNTDOWN_DURATION_MS;
    setStoredEndTime(countdownEndTime);
  }

  const updateCountdown = () => {
    const remaining = Math.max(
      Math.floor((countdownEndTime - Date.now()) / 1000),
      0,
    );
    const hours = Math.floor(remaining / 3600);
    const minutes = Math.floor((remaining % 3600) / 60);
    const seconds = remaining % 60;

    countdownHours.textContent = padTime(hours);
    countdownMinutes.textContent = padTime(minutes);
    countdownSeconds.textContent = padTime(seconds);
  };

  updateCountdown();
  const timer = window.setInterval(updateCountdown, 1000);
  cleanup.push(() => window.clearInterval(timer));
}

export function connectStrippyInteractions() {
  const cleanup = [];

  const optionButtons = document.querySelectorAll('.option');
  const faqItems = document.querySelectorAll('.faq-item');
  const reviewTrack = document.querySelector('[data-review-track]');
  const reviewPrev = document.querySelector('[data-review-prev]');
  const reviewNext = document.querySelector('[data-review-next]');
  const reviewDots = document.querySelector('[data-review-dots]');
  const productMainImage = document.querySelector('[data-product-main-image]');
  const productThumbTrack = document.querySelector('[data-product-thumbs]');
  const productThumbs = productThumbTrack
    ? Array.from(productThumbTrack.querySelectorAll('[data-product-image]'))
    : [];
  const productPrev = document.querySelector('[data-product-prev]');
  const productNext = document.querySelector('[data-product-next]');
  const addCartButton = document.querySelector('.add-cart');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteMenu = document.querySelector('[data-site-menu]');

  const addListener = (target, event, handler, options) => {
    if (!target) return;
    target.addEventListener(event, handler, options);
    cleanup.push(() => target.removeEventListener(event, handler, options));
  };

  const closeSiteMenu = () => {
    if (!menuToggle || !siteMenu) return;

    menuToggle.classList.remove('open');
    siteMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && siteMenu) {
    addListener(menuToggle, 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const willOpen = !siteMenu.classList.contains('open');
      menuToggle.classList.toggle('open', willOpen);
      siteMenu.classList.toggle('open', willOpen);
      menuToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    addListener(document, 'click', (event) => {
      if (
        siteMenu.contains(event.target) ||
        menuToggle.contains(event.target)
      ) {
        return;
      }

      closeSiteMenu();
    });

    addListener(document, 'keydown', (event) => {
      if (event.key === 'Escape') {
        closeSiteMenu();
      }
    });

    siteMenu.querySelectorAll('a').forEach((link) => {
      addListener(link, 'click', closeSiteMenu);
    });
  }

  connectPersistentPromoCountdown(cleanup);

  optionButtons.forEach((button) => {
    addListener(button, 'click', () => {
      optionButtons.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-checked', 'false');
      });

      button.classList.add('active');
      button.setAttribute('aria-checked', 'true');
    });
  });

  if (productMainImage && productThumbs.length) {
    let activeProductIndex = 0;

    const setProductImage = (index) => {
      activeProductIndex = (index + productThumbs.length) % productThumbs.length;
      const activeThumb = productThumbs[activeProductIndex];
      const nextImage = activeThumb.getAttribute('data-product-image');

      productThumbs.forEach((thumb, thumbIndex) => {
        const isActive = thumbIndex === activeProductIndex;
        thumb.classList.toggle('active', isActive);
        thumb.setAttribute('aria-current', isActive ? 'true' : 'false');
      });

      activeThumb.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
        block: 'nearest',
      });

      if (productMainImage.getAttribute('src') === nextImage) return;

      productMainImage.classList.add('is-changing');

      window.setTimeout(() => {
        productMainImage.src = nextImage;
        productMainImage.alt = `STRIPPY Patchs naturels anti-rides - image produit ${
          activeProductIndex + 1
        }`;
      }, 170);
    };

    const removeChangingClass = () => {
      productMainImage.classList.remove('is-changing');
    };

    addListener(productMainImage, 'load', removeChangingClass);

    productThumbs.forEach((thumb, index) => {
      addListener(thumb, 'click', () => setProductImage(index));
    });

    addListener(productPrev, 'click', () =>
      setProductImage(activeProductIndex - 1),
    );
    addListener(productNext, 'click', () =>
      setProductImage(activeProductIndex + 1),
    );
  }

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    addListener(button, 'click', () => {
      const isOpen = !item.classList.contains('open');

      item.classList.toggle('open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));

      if (answer) {
        answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
      }
    });
  });

  if (reviewTrack && reviewPrev && reviewNext && reviewDots) {
    const reviewCards = Array.from(reviewTrack.querySelectorAll('.review-card'));
    let autoplayTimer;

    reviewCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'review-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Afficher l’avis ${index + 1}`);
      addListener(dot, 'click', () => {
        scrollToReview(index);
        restartAutoplay();
      });
      reviewDots.appendChild(dot);
    });

    const dots = Array.from(reviewDots.querySelectorAll('.review-dot'));

    const getActiveIndex = () => {
      const trackCenter = reviewTrack.scrollLeft + reviewTrack.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      reviewCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(trackCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const updateDots = () => {
      const activeIndex = getActiveIndex();
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
        dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
      });
    };

    function scrollToReview(index) {
      if (!reviewCards.length) return;

      const safeIndex = (index + reviewCards.length) % reviewCards.length;
      const card = reviewCards[safeIndex];
      const targetLeft =
        card.offsetLeft - (reviewTrack.clientWidth - card.offsetWidth) / 2;

      reviewTrack.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }

    const moveReview = (direction) => {
      const activeIndex = getActiveIndex();
      scrollToReview(activeIndex + direction);
    };

    addListener(reviewPrev, 'click', () => {
      moveReview(-1);
      restartAutoplay();
    });

    addListener(reviewNext, 'click', () => {
      moveReview(1);
      restartAutoplay();
    });

    addListener(
      reviewTrack,
      'scroll',
      () => {
        window.requestAnimationFrame(updateDots);
      },
      {passive: true},
    );

    addListener(reviewTrack, 'mouseenter', () =>
      window.clearInterval(autoplayTimer),
    );
    addListener(reviewTrack, 'focusin', () =>
      window.clearInterval(autoplayTimer),
    );
    addListener(reviewTrack, 'mouseleave', () => restartAutoplay());
    addListener(reviewTrack, 'focusout', () => restartAutoplay());

    function restartAutoplay() {
      window.clearInterval(autoplayTimer);
      autoplayTimer = window.setInterval(() => moveReview(1), 5200);
    }

    updateDots();
    restartAutoplay();
    cleanup.push(() => window.clearInterval(autoplayTimer));
  }

  addListener(addCartButton, 'click', async () => {
    const selectedVariantId = SHOPIFY_VARIANT_ID;

    if (
      !SHOPIFY_STORE_DOMAIN ||
      !SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
      !selectedVariantId
    ) {
      window.alert(
        'Configure VITE_SHOPIFY_STORE_DOMAIN, VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN et VITE_SHOPIFY_VARIANT_ID dans .env pour activer le checkout Shopify.',
      );
      return;
    }

    addCartButton.disabled = true;
    const initialText = addCartButton.textContent;
    addCartButton.textContent = 'AJOUT EN COURS...';

    try {
      const checkoutUrl = await createShopifyCart(selectedVariantId);
      if (checkoutUrl) {
        const contentIds = [selectedVariantId];
        const contents = [{id: selectedVariantId, quantity: 1, item_price: 23.95}];
        const eventId = createTrackingEventId('initiatecheckout', contentIds);
        storeLastCheckoutEvent({
          event_id: eventId,
          value: 23.95,
          currency: 'EUR',
          num_items: 1,
          content_ids: contentIds,
          contents,
        });
        trackInitiateCheckout({
          value: 23.95,
          currency: 'EUR',
          num_items: 1,
          content_ids: contentIds,
          contents,
          event_id: eventId,
        });
      }
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      window.alert(
        "Impossible d'ouvrir le checkout Shopify. Vérifie les variables .env et l'ID de variante.",
      );
      addCartButton.disabled = false;
      addCartButton.textContent = initialText;
    }
  });

  return () => {
    cleanup.forEach((dispose) => dispose());
  };
}

export function connectStrippyProductPage() {
  const cleanup = [];
  const mainImage = document.querySelector('[data-product-page-main]');
  const thumbButtons = Array.from(
    document.querySelectorAll('[data-product-page-image]'),
  );
  const packButtons = Array.from(document.querySelectorAll('.strippy-pack'));
  const faqItems = document.querySelectorAll('.faq-item');
  const reviewTrack = document.querySelector('[data-review-track]');
  const reviewPrev = document.querySelector('[data-review-prev]');
  const reviewNext = document.querySelector('[data-review-next]');
  const reviewDots = document.querySelector('[data-review-dots]');
  const facebookTrack = document.querySelector('[data-facebook-track]');
  const facebookPrev = document.querySelector('[data-facebook-prev]');
  const facebookNext = document.querySelector('[data-facebook-next]');
  const addCartButtons = Array.from(document.querySelectorAll('[data-cart-add]'));
  const directCheckoutButtons = Array.from(
    document.querySelectorAll('[data-direct-checkout]'),
  );
  const primaryCartButton = document.querySelector('.strippy-product-cart');
  const stickyCart = document.querySelector('[data-product-sticky-cart]');
  const stickyCartTrigger = document.querySelector('[data-sticky-offer-trigger]');
  const cartDrawer = document.querySelector('[data-cart-drawer]');
  const cartOverlay = document.querySelector('[data-cart-overlay]');
  const cartOpenButtons = Array.from(document.querySelectorAll('[data-cart-open]'));
  const cartCloseButton = document.querySelector('[data-cart-close]');
  const cartContinueButton = document.querySelector('[data-cart-continue]');
  const cartCheckoutButton = document.querySelector('[data-cart-checkout]');
  const cartItems = document.querySelector('[data-cart-items]');
  const cartCount = document.querySelector('[data-cart-count]');
  const cartDiscount = document.querySelector('[data-cart-discount]');
  const cartTotal = document.querySelector('[data-cart-total]');
  const cartTimer = document.querySelector('[data-cart-timer]');
  const productMenuToggle = document.querySelector('[data-product-menu-toggle]');
  const productSiteMenu = document.querySelector('[data-product-site-menu]');
  const deliveryEstimate = document.querySelector('[data-delivery-estimate]');

  const addListener = (target, event, handler, options) => {
    if (!target) return;
    target.addEventListener(event, handler, options);
    cleanup.push(() => target.removeEventListener(event, handler, options));
  };

  connectPersistentPromoCountdown(cleanup);
  trackPurchaseFromReturnUrl();

  const updateDeliveryEstimate = () => {
    if (!deliveryEstimate) return;

    const today = new Date();
    const earliestDate = new Date(today);
    const latestDate = new Date(today);
    earliestDate.setDate(today.getDate() + 5);
    latestDate.setDate(today.getDate() + 8);

    const dayFormatter = new Intl.DateTimeFormat('fr-FR', {day: 'numeric'});
    const dayMonthFormatter = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
    });

    const sameMonth =
      earliestDate.getMonth() === latestDate.getMonth() &&
      earliestDate.getFullYear() === latestDate.getFullYear();
    const earliestText = sameMonth
      ? dayFormatter.format(earliestDate)
      : dayMonthFormatter.format(earliestDate);
    const latestText = dayMonthFormatter.format(latestDate);

    deliveryEstimate.textContent = `Commandez maintenant pour le recevoir entre le ${earliestText} et le ${latestText}`;
  };

  updateDeliveryEstimate();

  const syncProductCta = () => {
    if (!primaryCartButton) return;

    primaryCartButton.textContent =
      '🛒 Acheter';
    return;

    const activePack = document.querySelector('.strippy-pack.active');
    const packPrice = activePack?.getAttribute('data-pack-price') || '32,95 €';
    const compactPrice = packPrice.replace(',95', '').replace(' ', '');
    primaryCartButton.textContent = `🛒 Ajouter au panier • ${compactPrice}`;
  };

  const closeProductMenu = () => {
    if (!productMenuToggle || !productSiteMenu) return;

    productMenuToggle.classList.remove('open');
    productSiteMenu.classList.remove('open');
    productMenuToggle.setAttribute('aria-expanded', 'false');
  };

  if (productMenuToggle && productSiteMenu) {
    addListener(productMenuToggle, 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      const willOpen = !productSiteMenu.classList.contains('open');
      productMenuToggle.classList.toggle('open', willOpen);
      productSiteMenu.classList.toggle('open', willOpen);
      productMenuToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });

    addListener(document, 'click', (event) => {
      if (
        productSiteMenu.contains(event.target) ||
        productMenuToggle.contains(event.target)
      ) {
        return;
      }

      closeProductMenu();
    });

    addListener(document, 'keydown', (event) => {
      if (event.key === 'Escape') {
        closeProductMenu();
      }
    });

    productSiteMenu.querySelectorAll('a').forEach((link) => {
      addListener(link, 'click', closeProductMenu);
    });
  }

  const CART_STORAGE_KEY = 'strippy-cart-lines';
  let cartLines = [];
  let cartSecondsRemaining = 300;

  const getActivePack = () =>
    packButtons.find((pack) => pack.classList.contains('active')) ||
    packButtons[0];

  const getSelectedVariantId = () => {
    const activePack = getActivePack();
    return activePack?.getAttribute('data-shopify-variant-id') || SHOPIFY_VARIANT_ID;
  };

  const parseMoney = (value) => {
    const normalized = String(value || '')
      .replace(/[^\d,.-]/g, '')
      .replace(',', '.');

    return Number.parseFloat(normalized) || 0;
  };

  const formatMoney = (value) =>
    `${Number(value || 0).toFixed(2).replace('.', ',')} €`;

  const escapeHtml = (value) =>
    String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const saveCartLines = () => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartLines));
  };

  const loadCartLines = () => {
    try {
      const storedLines = JSON.parse(
        window.localStorage.getItem(CART_STORAGE_KEY) || '[]',
      );

      return Array.isArray(storedLines)
        ? storedLines.filter((line) => line.variantId && line.quantity > 0)
        : [];
    } catch (error) {
      return [];
    }
  };

  const getActivePackData = () => {
    const activePack = getActivePack();
    if (!activePack) return null;

    const variantId =
      activePack.getAttribute('data-shopify-variant-id') || SHOPIFY_VARIANT_ID;
    const priceText = activePack.getAttribute('data-pack-price') || '23,95 €';
    const oldPriceText =
      activePack.getAttribute('data-pack-old-price') || '60,95 €';
    const unitPrice = parseMoney(priceText);
    const unitOldPrice = parseMoney(oldPriceText);

    return {
      variantId,
      packName: activePack.getAttribute('data-pack-name') || '1 Pack',
      packSize: activePack.getAttribute('data-pack-size') || '1 Pack',
      image: activePack.getAttribute('data-pack-image') || '/images/1 pack.png',
      unitPrice,
      unitOldPrice,
      unitDiscount: Math.max(unitOldPrice - unitPrice, 0),
      quantity: 1,
    };
  };

  const getCartTotals = () =>
    cartLines.reduce(
      (totals, line) => ({
        quantity: totals.quantity + line.quantity,
        price: totals.price + line.unitPrice * line.quantity,
        discount: totals.discount + line.unitDiscount * line.quantity,
      }),
      {quantity: 0, price: 0, discount: 0},
    );

  const renderCartItems = () => {
    if (!cartItems) return;

    cartItems.innerHTML = cartLines
      .map(
        (line) => `
          <div class="cart-item">
            <img src="${escapeHtml(line.image)}" alt="" />
            <div class="cart-item-copy">
              <h3>STRIPPY Patchs naturels anti-rides</h3>
              <p>Taille du pack : <span>${escapeHtml(line.packSize)}</span></p>
              <div>
                <s>${formatMoney(line.unitOldPrice * line.quantity)}</s>
                <strong>${formatMoney(line.unitPrice * line.quantity)}</strong>
              </div>
            </div>
            <button class="cart-remove" type="button" data-cart-line-remove="${escapeHtml(
              line.variantId,
            )}" aria-label="Retirer le produit">×</button>
            <div class="cart-qty" aria-label="Quantite">
              <button type="button" data-cart-line-minus="${escapeHtml(
                line.variantId,
              )}" aria-label="Diminuer la quantite">−</button>
              <span>${line.quantity}</span>
              <button type="button" data-cart-line-plus="${escapeHtml(
                line.variantId,
              )}" aria-label="Augmenter la quantite">+</button>
            </div>
          </div>
        `,
      )
      .join('');
  };

  const syncCart = () => {
    const totals = getCartTotals();
    const hasItems = cartLines.length > 0;

    renderCartItems();

    if (cartDiscount) cartDiscount.textContent = formatMoney(totals.discount);
    if (cartTotal) cartTotal.textContent = formatMoney(totals.price);
    if (cartCount) {
      cartCount.textContent = String(totals.quantity);
      cartCount.hidden = !hasItems;
    }
    if (cartDrawer) cartDrawer.classList.toggle('is-empty', !hasItems);
  };

  const addActivePackToCart = () => {
    const packData = getActivePackData();
    if (!packData?.variantId) return null;

    const existingLine = cartLines.find(
      (line) => line.variantId === packData.variantId,
    );

    if (existingLine) {
      existingLine.quantity += 1;
    } else {
      cartLines.push(packData);
    }

    saveCartLines();
    syncCart();
    return packData;
  };

  cartLines = loadCartLines();

  const viewedVariantId = SHOPIFY_VARIANT_ID || getSelectedVariantId();
  trackViewContent({
    content_name: 'STRIPPY Patchs naturels anti-rides',
    content_category: 'Skincare patches',
    content_ids: [viewedVariantId],
    contents: [{id: viewedVariantId, quantity: 1, item_price: 23.95}],
    content_type: 'product',
    value: 23.95,
    currency: 'EUR',
    event_id: createTrackingEventId('viewcontent', [viewedVariantId]),
  });

  const openCart = ({addItem = false} = {}) => {
    if (!cartDrawer || !cartOverlay) return;
    if (addItem) {
      const addedPack = addActivePackToCart();
      if (addedPack) {
        trackAddToCart({
          content_name: 'STRIPPY Patchs naturels anti-rides',
          content_ids: [addedPack.variantId],
          contents: [
            {
              id: addedPack.variantId,
              quantity: 1,
              item_price: addedPack.unitPrice,
            },
          ],
          content_type: 'product',
          value: addedPack.unitPrice,
          currency: 'EUR',
          num_items: 1,
          event_id: createTrackingEventId('addtocart', [addedPack.variantId]),
        });
      }
    }

    syncCart();
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartOverlay.setAttribute('aria-hidden', 'false');
  };

  const closeCart = () => {
    if (!cartDrawer || !cartOverlay) return;

    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartOverlay.setAttribute('aria-hidden', 'true');
  };

  if (cartTimer) {
    const updateCartTimer = () => {
      const minutes = Math.floor(cartSecondsRemaining / 60);
      const seconds = cartSecondsRemaining % 60;
      cartTimer.textContent = `${String(minutes).padStart(2, '0')}:${String(
        seconds,
      ).padStart(2, '0')}`;
      cartSecondsRemaining = cartSecondsRemaining > 0 ? cartSecondsRemaining - 1 : 300;
    };

    updateCartTimer();
    const timer = window.setInterval(updateCartTimer, 1000);
    cleanup.push(() => window.clearInterval(timer));
  }

  cartOpenButtons.forEach((button) => {
    addListener(button, 'click', (event) => {
      event.preventDefault();
      openCart();
    });
  });

  addListener(cartCloseButton, 'click', closeCart);
  addListener(cartContinueButton, 'click', closeCart);
  addListener(cartOverlay, 'click', closeCart);

  addListener(cartItems, 'click', (event) => {
    const plusButton = event.target.closest('[data-cart-line-plus]');
    const minusButton = event.target.closest('[data-cart-line-minus]');
    const removeButton = event.target.closest('[data-cart-line-remove]');
    const variantId =
      plusButton?.getAttribute('data-cart-line-plus') ||
      minusButton?.getAttribute('data-cart-line-minus') ||
      removeButton?.getAttribute('data-cart-line-remove');

    if (!variantId) return;

    const line = cartLines.find((item) => item.variantId === variantId);
    if (!line) return;

    if (plusButton) {
      line.quantity += 1;
    }

    if (minusButton) {
      line.quantity -= 1;
    }

    if (removeButton || line.quantity <= 0) {
      cartLines = cartLines.filter((item) => item.variantId !== variantId);
    }

    saveCartLines();
    syncCart();
  });

  syncCart();
  syncProductCta();

  if (window.location.hash === '#panier') {
    window.setTimeout(() => openCart(), 0);
  }

  if (stickyCart && stickyCartTrigger) {
    const updateStickyCart = () => {
      const isDesktop = window.matchMedia('(min-width: 901px)').matches;
      const triggerPassed =
        stickyCartTrigger.getBoundingClientRect().bottom <= window.innerHeight;
      const shouldShow = isDesktop && triggerPassed;

      stickyCart.classList.toggle('visible', shouldShow);
      stickyCart.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    };

    updateStickyCart();
    addListener(window, 'scroll', updateStickyCart, {passive: true});
    addListener(window, 'resize', updateStickyCart);
  }

  thumbButtons.forEach((button) => {
    addListener(button, 'click', () => {
      const nextImage = button.getAttribute('data-product-page-image');
      if (!mainImage || !nextImage) return;

      thumbButtons.forEach((thumb) => {
        thumb.classList.remove('active');
        thumb.setAttribute('aria-current', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-current', 'true');

      if (mainImage.getAttribute('src') === nextImage) return;
      mainImage.classList.add('is-changing');
      window.setTimeout(() => {
        mainImage.src = nextImage;
      }, 160);
    });
  });

  addListener(mainImage, 'load', () => mainImage.classList.remove('is-changing'));

  packButtons.forEach((button) => {
    addListener(button, 'click', () => {
      packButtons.forEach((pack) => {
        pack.classList.remove('active');
        pack.setAttribute('aria-checked', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-checked', 'true');
      syncProductCta();
      syncCart();
    });
  });

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    addListener(button, 'click', () => {
      const isOpen = !item.classList.contains('open');

      item.classList.toggle('open', isOpen);
      button.setAttribute('aria-expanded', String(isOpen));

      if (answer) {
        answer.style.maxHeight = isOpen ? `${answer.scrollHeight}px` : '0px';
      }
    });
  });

  if (reviewTrack && reviewPrev && reviewNext && reviewDots) {
    const reviewCards = Array.from(reviewTrack.querySelectorAll('.review-card'));
    let autoplayTimer;

    reviewDots.textContent = '';

    reviewCards.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'review-dot';
      dot.type = 'button';
      dot.setAttribute('aria-label', `Afficher l'avis ${index + 1}`);
      addListener(dot, 'click', () => {
        scrollToReview(index);
        restartAutoplay();
      });
      reviewDots.appendChild(dot);
    });

    const dots = Array.from(reviewDots.querySelectorAll('.review-dot'));

    const getActiveIndex = () => {
      const trackCenter = reviewTrack.scrollLeft + reviewTrack.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      reviewCards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(trackCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const updateDots = () => {
      const activeIndex = getActiveIndex();
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === activeIndex);
        dot.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
      });
    };

    function scrollToReview(index) {
      if (!reviewCards.length) return;

      const safeIndex = (index + reviewCards.length) % reviewCards.length;
      const card = reviewCards[safeIndex];
      const targetLeft =
        card.offsetLeft - (reviewTrack.clientWidth - card.offsetWidth) / 2;

      reviewTrack.scrollTo({
        left: targetLeft,
        behavior: 'smooth',
      });
    }

    const moveReview = (direction) => {
      const activeIndex = getActiveIndex();
      scrollToReview(activeIndex + direction);
    };

    addListener(reviewPrev, 'click', () => {
      moveReview(-1);
      restartAutoplay();
    });

    addListener(reviewNext, 'click', () => {
      moveReview(1);
      restartAutoplay();
    });

    addListener(
      reviewTrack,
      'scroll',
      () => {
        window.requestAnimationFrame(updateDots);
      },
      {passive: true},
    );

    addListener(reviewTrack, 'mouseenter', () =>
      window.clearInterval(autoplayTimer),
    );
    addListener(reviewTrack, 'focusin', () =>
      window.clearInterval(autoplayTimer),
    );
    addListener(reviewTrack, 'mouseleave', () => restartAutoplay());
    addListener(reviewTrack, 'focusout', () => restartAutoplay());

    function restartAutoplay() {
      window.clearInterval(autoplayTimer);
      autoplayTimer = window.setInterval(() => moveReview(1), 5200);
    }

    updateDots();
    restartAutoplay();
    cleanup.push(() => window.clearInterval(autoplayTimer));
  }

  if (facebookTrack && facebookPrev && facebookNext) {
    const moveFacebookReview = (direction) => {
      const card = facebookTrack.querySelector('.strippy-facebook-card');
      const step = card
        ? card.getBoundingClientRect().width + 18
        : facebookTrack.clientWidth;

      facebookTrack.scrollBy({
        left: step * direction,
        behavior: 'smooth',
      });
    };

    addListener(facebookPrev, 'click', () => moveFacebookReview(-1));
    addListener(facebookNext, 'click', () => moveFacebookReview(1));
  }

  const handleCheckoutClick = async (button) => {
    if (!cartLines.length) {
      openCart();
      return;
    }

    if (
      !SHOPIFY_STORE_DOMAIN ||
      !SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
      cartLines.some((line) => !line.variantId)
    ) {
      window.alert(
        'Configure VITE_SHOPIFY_STORE_DOMAIN, VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN et VITE_SHOPIFY_VARIANT_ID dans .env pour activer le checkout Shopify.',
      );
      return;
    }

    if (button) button.disabled = true;
    const initialText = button?.textContent || '';
    if (button) button.textContent = 'CHECKOUT EN COURS...';

    try {
      const checkoutUrl = await createShopifyCart(
        cartLines.map((line) => ({
          merchandiseId: line.variantId,
          quantity: line.quantity,
        })),
      );
      if (checkoutUrl) {
        const totals = getCartTotals();
        const contentIds = cartLines.map((line) => line.variantId);
        const contents = cartLines.map((line) => ({
          id: line.variantId,
          quantity: line.quantity,
          item_price: line.unitPrice,
        }));
        const eventId = createTrackingEventId('initiatecheckout', contentIds);
        storeLastCheckoutEvent({
          event_id: eventId,
          value: totals.price,
          currency: 'EUR',
          num_items: totals.quantity,
          content_ids: contentIds,
          contents,
        });
        trackInitiateCheckout({
          value: totals.price,
          currency: 'EUR',
          num_items: totals.quantity,
          content_ids: contentIds,
          contents,
          event_id: eventId,
        });
      }
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      window.alert(
        "Impossible d'ouvrir le checkout Shopify. Verifie les variables .env et les variantes Shopify.",
      );
      if (button) button.disabled = false;
      if (button) button.textContent = initialText;
    }
  };

  const handleDirectCheckoutClick = async (button) => {
    const packData = getActivePackData();

    if (!packData?.variantId) {
      window.alert(
        'Aucune variante Shopify disponible pour ce pack. Vérifie la configuration du produit.',
      );
      return;
    }

    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      window.alert(
        'Configure VITE_SHOPIFY_STORE_DOMAIN et VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN dans .env pour activer le checkout Shopify.',
      );
      return;
    }

    const initialText = button?.textContent || '';
    if (button) {
      button.disabled = true;
      button.textContent = 'Redirection vers le checkout...';
    }

    try {
      const checkoutUrl = await createShopifyCart([
        {
          merchandiseId: packData.variantId,
          quantity: packData.quantity,
        },
      ]);

      if (checkoutUrl) {
        const contentIds = [packData.variantId];
        const contents = [
          {
            id: packData.variantId,
            quantity: packData.quantity,
            item_price: packData.unitPrice,
          },
        ];
        const eventId = createTrackingEventId('initiatecheckout', contentIds);
        storeLastCheckoutEvent({
          event_id: eventId,
          value: packData.unitPrice,
          currency: 'EUR',
          num_items: packData.quantity,
          content_ids: contentIds,
          contents,
        });
        trackInitiateCheckout({
          value: packData.unitPrice,
          currency: 'EUR',
          num_items: packData.quantity,
          content_ids: contentIds,
          contents,
          event_id: eventId,
        });
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      window.alert(
        "Impossible d'ouvrir le checkout Shopify. Vérifie les variables .env et les variantes Shopify.",
      );
      if (button) {
        button.disabled = false;
        button.textContent = initialText;
      }
    }
  };

  addCartButtons.forEach((button) => {
    addListener(button, 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCart({addItem: true});
    });
  });

  directCheckoutButtons.forEach((button) => {
    addListener(button, 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      handleDirectCheckoutClick(button);
    });
  });

  addListener(cartCheckoutButton, 'click', () =>
    handleCheckoutClick(cartCheckoutButton),
  );

  return () => cleanup.forEach((dispose) => dispose());
}

async function createShopifyCart(linesOrVariantId = SHOPIFY_VARIANT_ID, quantity = 1) {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  const lines = Array.isArray(linesOrVariantId)
    ? linesOrVariantId
    : [
        {
          merchandiseId: linesOrVariantId,
          quantity,
        },
      ];
  const trackingAttributes = getShopifyTrackingAttributes();

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({
      query: CART_CREATE_MUTATION,
      variables: {
        input: {
          lines,
          ...(trackingAttributes.length
            ? {attributes: trackingAttributes}
            : {}),
        },
      },
    }),
  });

  const payload = await response.json();
  const userErrors = payload?.data?.cartCreate?.userErrors || [];
  const checkoutUrl = payload?.data?.cartCreate?.cart?.checkoutUrl;

  if (!response.ok || userErrors.length || !checkoutUrl) {
    throw new Error(
      userErrors.map((error) => error.message).join(', ') ||
        'Shopify cartCreate failed',
    );
  }

  return normalizeShopifyCheckoutUrl(checkoutUrl);
}

function normalizeShopifyCheckoutUrl(checkoutUrl) {
  if (!checkoutUrl || !SHOPIFY_CHECKOUT_DOMAIN) return checkoutUrl;

  try {
    const url = new URL(checkoutUrl);
    const checkoutDomain = SHOPIFY_CHECKOUT_DOMAIN.replace(
      /^https?:\/\//,
      '',
    ).replace(/\/$/, '');

    if (url.hostname !== checkoutDomain) {
      url.hostname = checkoutDomain;
    }

    return url.toString();
  } catch {
    return checkoutUrl;
  }
}

function getShopifyTrackingAttributes() {
  if (typeof document === 'undefined') return [];

  const attributes = [];
  const {fbp, fbc} = getMetaBrowserCookies();

  if (fbp) attributes.push({key: '_fbp', value: fbp});
  if (fbc) attributes.push({key: '_fbc', value: fbc});

  return attributes;
}

function createTrackingEventId(prefix, ids = []) {
  const cleanIds = ids.filter(Boolean).map((id) => String(id)).join('_');
  const randomPart =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

  return `${prefix}_${cleanIds}_${randomPart}`.replace(/[^a-zA-Z0-9:_-]/g, '_');
}

function storeLastCheckoutEvent(payload) {
  try {
    window.sessionStorage.setItem(
      CHECKOUT_EVENT_STORAGE_KEY,
      JSON.stringify(payload),
    );
  } catch {
    // Purchase is still handled by Shopify webhook if browser storage is blocked.
  }
}

function trackPurchaseFromReturnUrl() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const orderId =
    params.get('order_id') ||
    params.get('order') ||
    params.get('shopify_order_id');

  if (!orderId) return;

  try {
    const storedEvent = JSON.parse(
      window.sessionStorage.getItem(CHECKOUT_EVENT_STORAGE_KEY) || '{}',
    );

    trackPurchase({
      ...storedEvent,
      order_id: orderId,
      event_id: `purchase_${orderId}`,
    });

    window.sessionStorage.removeItem(CHECKOUT_EVENT_STORAGE_KEY);
  } catch {
    trackPurchase({
      order_id: orderId,
      event_id: `purchase_${orderId}`,
      currency: 'EUR',
    });
  }
}

const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;
