import crypto from 'node:crypto';

export const META_DEFAULT_VERSION = 'v22.0';
const ALLOWED_BROWSER_EVENTS = new Set([
  'ViewContent',
  'AddToCart',
  'InitiateCheckout',
]);

export const readRawBody = async (request) => {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
};

export const json = (response, status, payload) => {
  response.status(status).json(payload);
};

export const safeCompare = (a, b) => {
  const left = Buffer.from(String(a || ''), 'utf8');
  const right = Buffer.from(String(b || ''), 'utf8');

  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
};

export const sha256 = (value) => {
  const normalized = String(value || '').trim().toLowerCase();
  if (!normalized) return undefined;

  return crypto.createHash('sha256').update(normalized).digest('hex');
};

export const normalizePhone = (value) =>
  String(value || '').replace(/[^\d]/g, '') || undefined;

export const compact = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== null && value !== '';
    }),
  );

export const getClientIp = (request) => {
  const forwardedFor = request.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  return request.headers['x-real-ip'] || request.socket?.remoteAddress;
};

export const sanitizeContents = (contents = []) =>
  Array.isArray(contents)
    ? contents
        .filter((content) => content?.id)
        .map((content) =>
          compact({
            id: String(content.id),
            quantity: Math.max(Number(content.quantity || 1), 1),
            item_price: Number.isFinite(Number(content.item_price))
              ? Number(content.item_price)
              : undefined,
          }),
        )
    : [];

export const sanitizeCustomData = (customData = {}) => {
  const contentIds = Array.isArray(customData.content_ids)
    ? customData.content_ids.map((id) => String(id)).filter(Boolean)
    : [];
  const contents = sanitizeContents(customData.contents);
  const value = Number(customData.value);
  const numItems = Number(customData.num_items);

  return compact({
    content_name: customData.content_name
      ? String(customData.content_name)
      : undefined,
    content_category: customData.content_category
      ? String(customData.content_category)
      : undefined,
    content_ids: contentIds,
    contents,
    content_type:
      customData.content_type === 'product' ? 'product' : undefined,
    value: Number.isFinite(value) ? value : undefined,
    currency: String(customData.currency || 'EUR').toUpperCase(),
    num_items:
      Number.isFinite(numItems) && numItems > 0 ? Math.floor(numItems) : undefined,
    order_id: customData.order_id ? String(customData.order_id) : undefined,
  });
};

export const buildBrowserUserData = (request, body = {}) =>
  compact({
    client_ip_address: getClientIp(request),
    client_user_agent: request.headers['user-agent'],
    fbp: body.fbp,
    fbc: body.fbc,
  });

export const isAllowedBrowserEvent = (eventName) =>
  ALLOWED_BROWSER_EVENTS.has(eventName);

export const sendEventToMeta = async (event) => {
  const pixelId = process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID;
  const token =
    process.env.META_CAPI_ACCESS_TOKEN || process.env.META_ACCESS_TOKEN;
  const version = process.env.META_GRAPH_API_VERSION || META_DEFAULT_VERSION;

  if (!pixelId || !token) {
    throw new Error('Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN');
  }

  const body = {data: [event]};
  if (process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const endpoint = `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(
    token,
  )}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.error?.message || 'Meta CAPI request failed';
    console.error('[Meta CAPI] request failed', {
      event_name: event.event_name,
      event_id: event.event_id,
      message,
    });
    throw new Error(message);
  }

  console.info('[Meta CAPI] event sent', {
    event_name: event.event_name,
    event_id: event.event_id,
    events_received: payload.events_received,
  });

  return payload;
};
