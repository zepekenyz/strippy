const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;
const DEDUPE_WINDOW_MS = 1000;

type MetaPixelPayload = Record<string, unknown>;

type ProductPayload = {
  content_name?: string;
  content_category?: string;
  content_ids?: Array<string | number>;
  content_type?: 'product';
  value?: number;
  currency?: 'EUR';
  num_items?: number;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
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

const normalizeIds = (ids: ProductPayload['content_ids']) =>
  Array.isArray(ids)
    ? ids
        .filter((id) => id !== null && id !== undefined)
        .map((id) => String(id))
    : [];

const normalizeValue = (value: ProductPayload['value']) =>
  Number.isFinite(Number(value)) ? Number(value) : undefined;

const buildDedupeKey = (eventName: string, payload: ProductPayload = {}) => {
  const ids = normalizeIds(payload.content_ids).sort().join('|');
  const value = normalizeValue(payload.value);
  return `${eventName}:${ids}:${value ?? ''}`;
};

const shouldBlockDuplicate = (
  eventName: string,
  payload: ProductPayload = {},
) => {
  const key = buildDedupeKey(eventName, payload);
  const now = Date.now();
  const lastSentAt = recentEvents.get(key);

  if (lastSentAt && now - lastSentAt < DEDUPE_WINDOW_MS) {
    debugLog('Event bloque : doublon 1000ms', {eventName});
    return true;
  }

  recentEvents.set(key, now);
  return false;
};

const safeProductPayload = (payload: ProductPayload): MetaPixelPayload => {
  const safe: MetaPixelPayload = {};
  const contentIds = normalizeIds(payload.content_ids);
  const value = normalizeValue(payload.value);
  const numItems = Number(payload.num_items);

  if (payload.content_name) safe.content_name = String(payload.content_name);
  if (payload.content_category) {
    safe.content_category = String(payload.content_category);
  }
  if (contentIds.length) safe.content_ids = contentIds;
  if (payload.content_type === 'product') safe.content_type = 'product';
  if (value !== undefined) safe.value = value;
  if (payload.currency === 'EUR') safe.currency = 'EUR';
  if (Number.isFinite(numItems) && numItems > 0) {
    safe.num_items = Math.floor(numItems);
  }

  return safe;
};

const sendEvent = (eventName: string, payload?: ProductPayload) => {
  if (!isMetaPixelReady()) {
    debugLog('Event bloque : pixel non initialise', {eventName});
    return;
  }

  if (payload && shouldBlockDuplicate(eventName, payload)) return;

  const safePayload = payload ? safeProductPayload(payload) : undefined;

  if (safePayload) {
    window.fbq?.('track', eventName, safePayload);
  } else {
    window.fbq?.('track', eventName);
  }

  debugLog('Event envoye', {eventName, payload: safePayload});
};

export function initMetaPixel() {
  debugLog('Pixel ID present', hasPixelId());

  if (!hasPixelId()) return;
  if (initialized || scriptLoading) return;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  scriptLoading = true;

  if (!window.fbq) {
    const fbq = function fbq(...args: unknown[]) {
      // eslint-disable-next-line prefer-rest-params
      (fbq as unknown as {queue: unknown[]}).queue.push(args);
    } as unknown as Window['fbq'] & {queue: unknown[]; loaded: boolean; version: string};

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
  sendEvent('PageView');
}

export function trackViewContent(payload: ProductPayload) {
  const safePayload = {
    ...payload,
    content_type: 'product' as const,
    currency: 'EUR' as const,
  };
  const key = buildDedupeKey('ViewContent', safePayload);

  if (viewedContentKeys.has(key)) {
    debugLog('Event bloque : ViewContent deja envoye', {eventName: 'ViewContent'});
    return;
  }

  viewedContentKeys.add(key);
  sendEvent('ViewContent', safePayload);
}

export function trackAddToCart(payload: ProductPayload) {
  sendEvent('AddToCart', {
    ...payload,
    content_type: 'product',
    currency: 'EUR',
  });
}

export function trackInitiateCheckout(payload: ProductPayload) {
  // Do not track Purchase here. Shopify checkout or server-side webhook is responsible for purchase tracking.
  sendEvent('InitiateCheckout', {
    ...payload,
    currency: 'EUR',
  });
}
