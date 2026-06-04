import {
  trackAddToCart,
  trackInitiateCheckout,
  trackViewContent,
} from '../src/lib/tracking/metaPixel';

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
  import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION =
  import.meta.env.VITE_SHOPIFY_API_VERSION || '2026-01';
const SHOPIFY_VARIANT_ID = import.meta.env.VITE_SHOPIFY_VARIANT_ID;

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
  const countdownHours = document.querySelector('[data-countdown-hours]');
  const countdownMinutes = document.querySelector('[data-countdown-minutes]');
  const countdownSeconds = document.querySelector('[data-countdown-seconds]');

  const addListener = (target, event, handler, options) => {
    if (!target) return;
    target.addEventListener(event, handler, options);
    cleanup.push(() => target.removeEventListener(event, handler, options));
  };

  if (countdownHours && countdownMinutes && countdownSeconds) {
    const countdownDuration = 55 * 60 + 1;
    const countdownStart = Date.now();
    const padTime = (value) => String(value).padStart(2, '0');

    const updateCountdown = () => {
      const elapsed = Math.floor((Date.now() - countdownStart) / 1000);
      const remaining = Math.max(countdownDuration - elapsed, 0);
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
        productMainImage.alt = `STRIPPY Patchs Beauté en Silicone - image produit ${
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
        trackInitiateCheckout({
          value: 23.95,
          num_items: 1,
          content_ids: [selectedVariantId],
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
  const purchaseButtons = Array.from(
    document.querySelectorAll('.strippy-purchase-type button'),
  );
  const faqItems = document.querySelectorAll('.faq-item');
  const reviewTrack = document.querySelector('[data-review-track]');
  const reviewPrev = document.querySelector('[data-review-prev]');
  const reviewNext = document.querySelector('[data-review-next]');
  const reviewDots = document.querySelector('[data-review-dots]');
  const addCartButtons = Array.from(document.querySelectorAll('[data-cart-add]'));
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

  const addListener = (target, event, handler, options) => {
    if (!target) return;
    target.addEventListener(event, handler, options);
    cleanup.push(() => target.removeEventListener(event, handler, options));
  };

  const CART_STORAGE_KEY = 'strippy-cart-lines';
  let cartLines = [];
  let cartSecondsRemaining = 79;

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
              <h3>STRIPPY™ Patchs Beaute en Silicone</h3>
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

  trackViewContent({
    content_name: 'STRIPPY™ Patchs Beaute en Silicone',
    content_category: 'Skincare patches',
    content_ids: [SHOPIFY_VARIANT_ID || getSelectedVariantId()],
    content_type: 'product',
    value: 23.95,
    currency: 'EUR',
  });

  const openCart = ({addItem = false} = {}) => {
    if (!cartDrawer || !cartOverlay) return;
    if (addItem) {
      const addedPack = addActivePackToCart();
      if (addedPack) {
        trackAddToCart({
          content_name: 'STRIPPY™ Patchs Beaute en Silicone',
          content_ids: [addedPack.variantId],
          content_type: 'product',
          value: addedPack.unitPrice,
          currency: 'EUR',
          num_items: 1,
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
      cartSecondsRemaining = cartSecondsRemaining > 0 ? cartSecondsRemaining - 1 : 79;
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
      syncCart();
    });
  });

  purchaseButtons.forEach((button) => {
    addListener(button, 'click', () => {
      purchaseButtons.forEach((option) => {
        option.classList.remove('active');
        option.setAttribute('aria-checked', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-checked', 'true');
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
        trackInitiateCheckout({
          value: totals.price,
          currency: 'EUR',
          num_items: totals.quantity,
          content_ids: cartLines.map((line) => line.variantId),
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

  addCartButtons.forEach((button) => {
    addListener(button, 'click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openCart({addItem: true});
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

  return checkoutUrl;
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
