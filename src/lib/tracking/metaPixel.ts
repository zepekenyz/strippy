const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const DEDUPE_WINDOW_MS = 1000;
const FBC_COOKIE_MAX_AGE_SECONDS = 90 * 24 * 60 * 60;

type MetaEventName =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Purchase';

type MetaContent = {
  id: string;
  quantity?: number;
  item_price?: number;
};

type ProductPayload = {
  content_name?: string;
  content_category?: string;
  content_ids?: Array<string | number>;
  contents?: MetaContent[];
  content_type?: 'product';
  value?: number;
  currency?: 'EUR' | string;
  num_items?: number;
  event_id?: string;
  event_source_url?: string;
  order_id?: string;
};

type MetaPixelPayload = Omit<ProductPayload, 'event_id' | 'event_source_url'>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    strippyHasMarketingConsent?: () => boolean;
  }
}

let initialized = false;
let scriptLoading = false;
let lastPageViewPath: string | null = null;

const recentEvents = new Map<string, number>();
const viewedContentKeys = new Set<string>();

const debugLog = (message: string, data?: unknown) => {
  if (!import.meta.env.DEV) return;
  if (data === undefined) {
    console.info(`[Meta Pixel] ${message}`);
    return;
  }
  console.info(`[Meta Pixel] ${message}`, data);
};

const hasPixelId = () => Boolean(META_PIXEL_ID);

const hasMarketingConsent = () => {
  if (typeof window === 'undefined') return false;
  if (typeof window.strippyHasMarketingConsent === 'function') {
    return window.strippyHasMarketingConsent();
  }

  return true;
};

const normalizeIds = (ids: ProductPayload['content_ids']) =>
  Array.isArray(ids)
    ? ids
        .filter((id) => id !== null && id !== undefined)
        .map((id) => String(id))
    : [];

const normalizeValue = (value: ProductPayload['value']) =>
  Number.isFinite(Number(value)) ? Number(value) : undefined;

const normalizeContents = (payload: ProductPayload) => {
  if (Array.isArray(payload.contents) && payload.contents.length) {
    return payload.contents
      .filter((content) => content?.id)
      .map((content) => ({
        id: String(content.id),
        quantity: Math.max(Number(content.quantity || 1), 1),
        item_price: normalizeValue(content.item_price),
      }));
  }

  return normalizeIds(payload.content_ids).map((id) => ({
    id,
    quantity: Math.max(Number(payload.num_items || 1), 1),
    item_price: normalizeValue(payload.value),
  }));
};

const buildEventId = (eventName: MetaEventName, payload: ProductPayload = {}) => {
  if (payload.event_id) return payload.event_id;

  const source =
    [
      eventName,
      normalizeIds(payload.content_ids).sort().join('|'),
      normalizeValue(payload.value) ?? '',
      payload.num_items ?? '',
      typeof window !== 'undefined' ? window.location.pathname : '',
    ].join(':') || eventName;

  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash << 5) - hash + source.charCodeAt(index);
    hash |= 0;
  }

  return `${eventName.toLowerCase()}_${Date.now()}_${Math.abs(hash)}`;
};

const buildDedupeKey = (
  eventName: MetaEventName,
  payload: ProductPayload = {},
  eventId?: string,
) => {
  const ids = normalizeIds(payload.content_ids).sort().join('|');
  const value = normalizeValue(payload.value);
  return `${eventName}:${eventId || payload.event_id || ids}:${value ?? ''}`;
};

const shouldBlockDuplicate = (
  eventName: MetaEventName,
  payload: ProductPayload = {},
  eventId?: string,
) => {
  const key = buildDedupeKey(eventName, payload, eventId);
  const now = Date.now();
  const lastSentAt = recentEvents.get(key);

  if (lastSentAt && now - lastSentAt < DEDUPE_WINDOW_MS) {
    debugLog('Event bloque : doublon 1000ms', {eventName, eventId});
    return true;
  }

  recentEvents.set(key, now);
  return false;
};

const safeProductPayload = (payload: ProductPayload): MetaPixelPayload => {
  const safe: MetaPixelPayload = {};
  const contentIds = normalizeIds(payload.content_ids);
  const contents = normalizeContents(payload);
  const value = normalizeValue(payload.value);
  const numItems = Number(payload.num_items);

  if (payload.content_name) safe.content_name = String(payload.content_name);
  if (payload.content_category) {
    safe.content_category = String(payload.content_category);
  }
  if (contentIds.length) safe.content_ids = contentIds;
  if (contents.length) safe.contents = contents;
  if (payload.content_type === 'product') safe.content_type = 'product';
  if (value !== undefined) safe.value = value;
  safe.currency = String(payload.currency || 'EUR').toUpperCase();
  if (Number.isFinite(numItems) && numItems > 0) {
    safe.num_items = Math.floor(numItems);
  }
  if (payload.order_id) safe.order_id = String(payload.order_id);

  return safe;
};

const getCookieValue = (name: string) => {
  if (typeof document === 'undefined') return '';

  const cookie = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split('=').slice(1).join('=')) : '';
};

const setCookie = (name: string, value: string) => {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=${encodeURIComponent(
    value,
  )}; Max-Age=${FBC_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax; Secure`;
};

export function ensureMetaClickCookies() {
  if (typeof window === 'undefined') return;

  const fbc = getCookieValue('_fbc');
  const fbclid = new URLSearchParams(window.location.search).get('fbclid');

  if (!fbc && fbclid) {
    setCookie('_fbc', `fb.1.${Date.now()}.${fbclid}`);
  }
}

export function getMetaBrowserCookies() {
  ensureMetaClickCookies();

  return {
    fbp: getCookieValue('_fbp'),
    fbc: getCookieValue('_fbc'),
  };
}

const mirrorServerEvent = async (
  eventName: MetaEventName,
  payload: ProductPayload,
  eventId: string,
) => {
  if (!hasMarketingConsent()) return;
  if (typeof window === 'undefined') return;
  if (['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) {
    debugLog('Event serveur bloque', {
      reason: 'endpoint CAPI indisponible en dev local',
      eventName,
      eventId,
    });
    return;
  }

  try {
    const cookies = getMetaBrowserCookies();

    await fetch('/api/meta-capi-event', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      keepalive: true,
      body: JSON.stringify({
        event_name: eventName,
        event_id: eventId,
        event_source_url: payload.event_source_url || window.location.href,
        custom_data: safeProductPayload(payload),
        fbp: cookies.fbp,
        fbc: cookies.fbc,
      }),
    });
  } catch (error) {
    debugLog('Event serveur non envoye', {eventName, eventId});
  }
};

const sendEvent = (
  eventName: MetaEventName,
  payload: ProductPayload = {},
  options: {mirrorToServer?: boolean} = {},
) => {
  if (!hasMarketingConsent()) {
    debugLog('Event bloque : consentement marketing absent', {eventName});
    return;
  }

  if (!isMetaPixelReady()) {
    initMetaPixel();
  }

  if (!isMetaPixelReady()) {
    debugLog('Event bloque : pixel non initialise apres tentative init', {
      eventName,
    });

    if (options.mirrorToServer && payload.event_id) {
      void mirrorServerEvent(eventName, payload, payload.event_id);
    }
    return;
  }

  const eventId = buildEventId(eventName, payload);
  const safePayload =
    eventName === 'PageView'
      ? undefined
      : safeProductPayload({...payload, event_id: eventId});

  if (shouldBlockDuplicate(eventName, payload, eventId)) return;

  if (safePayload) {
    window.fbq?.('track', eventName, safePayload, {eventID: eventId});
  } else {
    window.fbq?.('track', eventName, {}, {eventID: eventId});
  }
  debugLog('Event navigateur envoye', {eventName, eventId, payload: safePayload});

  if (options.mirrorToServer) {
    void mirrorServerEvent(eventName, payload, eventId);
  }
};

export function initMetaPixel() {
  debugLog('Pixel ID present', hasPixelId());

  if (!hasPixelId()) return;
  if (!hasMarketingConsent()) {
    debugLog('Pixel bloque : consentement marketing absent');
    return;
  }
  if (initialized || scriptLoading) return;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  ensureMetaClickCookies();
  scriptLoading = true;

  if (!window.fbq) {
    const fbq = function fbq(...args: unknown[]) {
      (fbq as unknown as {queue: unknown[]}).queue.push(args);
    } as unknown as Window['fbq'] & {
      queue: unknown[];
      loaded: boolean;
      version: string;
    };

    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = '2.0';
    window.fbq = fbq;
    window._fbq = fbq;
  }

  const existingScript = document.querySelector(
    'script[data-meta-pixel-script="true"]',
  );

  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    script.dataset.metaPixelScript = 'true';
    document.head.appendChild(script);
  }

  window.fbq?.('set', 'autoConfig', false, META_PIXEL_ID);
  window.fbq?.('init', META_PIXEL_ID);
  initialized = true;
  scriptLoading = false;
  debugLog('Pixel initialise');
}

export function isMetaPixelReady() {
  return Boolean(hasPixelId() && initialized && window.fbq);
}

export function trackPageView(path: string) {
  if (!path || path === lastPageViewPath) {
    debugLog('Event bloque : PageView deja envoye pour ce pathname', {path});
    return;
  }

  lastPageViewPath = path;
  sendEvent('PageView', {
    event_id: `pageview_${path}_${Date.now()}`,
    event_source_url:
      typeof window !== 'undefined' ? window.location.href : undefined,
  });
}

export function trackViewContent(payload: ProductPayload) {
  const safePayload = {
    ...payload,
    content_type: 'product' as const,
    currency: payload.currency || 'EUR',
  };
  const key = buildDedupeKey(
    'ViewContent',
    safePayload,
    safePayload.event_id || normalizeIds(safePayload.content_ids).join('|'),
  );

  if (viewedContentKeys.has(key)) {
    debugLog('Event bloque : ViewContent deja envoye', {
      eventName: 'ViewContent',
    });
    return;
  }

  viewedContentKeys.add(key);
  sendEvent('ViewContent', safePayload, {mirrorToServer: true});
}

export function trackAddToCart(payload: ProductPayload) {
  sendEvent(
    'AddToCart',
    {
      ...payload,
      content_type: 'product',
      currency: payload.currency || 'EUR',
    },
    {mirrorToServer: true},
  );
}

export function trackInitiateCheckout(payload: ProductPayload) {
  // Do not track Purchase here. Shopify checkout or server-side webhook is responsible for purchase tracking.
  sendEvent(
    'InitiateCheckout',
    {
      ...payload,
      currency: payload.currency || 'EUR',
    },
    {mirrorToServer: true},
  );
}

export function trackPurchase(payload: ProductPayload) {
  sendEvent('Purchase', {
    ...payload,
    content_type: 'product',
    currency: payload.currency || 'EUR',
    event_id:
      payload.event_id || (payload.order_id ? `purchase_${payload.order_id}` : undefined),
  });
}
