import crypto from 'node:crypto';
import {
  compact,
  json,
  normalizePhone,
  readRawBody,
  safeCompare,
  sanitizeContents,
  sendEventToMeta,
  sha256,
} from './_meta-capi.js';

const verifyShopifyWebhook = (rawBody, hmacHeader, secret) => {
  if (!hmacHeader || !secret) return false;

  const digest = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('base64');

  return safeCompare(digest, hmacHeader);
};

const getAttribute = (order, key) => {
  const attributes = [
    ...(Array.isArray(order.note_attributes) ? order.note_attributes : []),
    ...(Array.isArray(order.custom_attributes) ? order.custom_attributes : []),
    ...(Array.isArray(order.cart?.attributes) ? order.cart.attributes : []),
  ];

  const found = attributes.find((attribute) => {
    const name = attribute.name || attribute.key;
    return name === key;
  });

  return found?.value;
};

const getVariantGid = (lineItem) => {
  const variantId = lineItem.variant_id || lineItem.variant?.id;
  if (!variantId) return undefined;

  const id = String(variantId);
  return id.startsWith('gid://')
    ? id
    : `gid://shopify/ProductVariant/${id}`;
};

const parseMoney = (value) => {
  const number = Number.parseFloat(String(value || '0'));
  return Number.isFinite(number) ? number : 0;
};

const getOrderId = (order) =>
  String(order.id || order.order_number || order.admin_graphql_api_id || '');

const getOrderValue = (order) =>
  parseMoney(order.current_total_price || order.total_price);

const getOrderCurrency = (order) =>
  String(order.currency || order.presentment_currency || 'EUR').toUpperCase();

const getEventTime = (order) => {
  const timestamp = Date.parse(order.processed_at || order.created_at || '');
  return Number.isFinite(timestamp)
    ? Math.floor(timestamp / 1000)
    : Math.floor(Date.now() / 1000);
};

const buildFbcFromOrder = (order) => {
  const existingFbc = getAttribute(order, '_fbc');
  if (existingFbc) return existingFbc;

  const landingSite = order.landing_site || order.referring_site || '';
  const match = String(landingSite).match(/[?&]fbclid=([^&]+)/);
  if (!match) return undefined;

  return `fb.1.${getEventTime(order) * 1000}.${decodeURIComponent(match[1])}`;
};

const buildUserData = (order) => {
  const billing = order.billing_address || {};
  const shipping = order.shipping_address || {};
  const customer = order.customer || {};
  const address = billing.city ? billing : shipping;
  const clientDetails = order.client_details || {};
  const phone = normalizePhone(
    order.phone || billing.phone || shipping.phone || customer.phone,
  );
  const customerId = customer.id || order.customer?.id;

  return compact({
    em: [sha256(order.email || customer.email)].filter(Boolean),
    ph: [sha256(phone)].filter(Boolean),
    fn: [
      sha256(billing.first_name || shipping.first_name || customer.first_name),
    ].filter(Boolean),
    ln: [
      sha256(billing.last_name || shipping.last_name || customer.last_name),
    ].filter(Boolean),
    ct: [sha256(address.city)].filter(Boolean),
    st: [sha256(address.province_code || address.province)].filter(Boolean),
    zp: [sha256(address.zip)].filter(Boolean),
    country: [sha256(address.country_code || address.country)].filter(Boolean),
    external_id: [sha256(customerId)].filter(Boolean),
    client_ip_address: clientDetails.browser_ip || order.browser_ip,
    client_user_agent: clientDetails.user_agent,
    fbp: getAttribute(order, '_fbp'),
    fbc: buildFbcFromOrder(order),
  });
};

const buildPurchaseEvent = (order) => {
  const lineItems = Array.isArray(order.line_items) ? order.line_items : [];
  const contents = sanitizeContents(
    lineItems.map((lineItem) => ({
      id: getVariantGid(lineItem),
      quantity: Number(lineItem.quantity || 1),
      item_price: parseMoney(lineItem.price),
    })),
  );
  const contentIds = contents.map((content) => content.id);
  const orderId = getOrderId(order);

  return {
    event_name: 'Purchase',
    event_time: getEventTime(order),
    event_id: `purchase_${orderId}`,
    action_source: 'website',
    event_source_url: order.order_status_url || order.landing_site,
    user_data: buildUserData(order),
    custom_data: compact({
      currency: getOrderCurrency(order),
      value: getOrderValue(order),
      content_type: 'product',
      content_ids: contentIds,
      contents,
      order_id: orderId,
      num_items: contents.reduce(
        (total, content) => total + Number(content.quantity || 0),
        0,
      ),
    }),
  };
};

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, {ok: false, error: 'Method not allowed'});
  }

  const webhookSecret = process.env.SHOPIFY_WEBHOOK_SECRET;
  const rawBody = await readRawBody(request);
  const hmacHeader = request.headers['x-shopify-hmac-sha256'];
  const topic = request.headers['x-shopify-topic'];

  if (!verifyShopifyWebhook(rawBody, hmacHeader, webhookSecret)) {
    return json(response, 401, {ok: false, error: 'Invalid Shopify webhook'});
  }

  if (topic && topic !== 'orders/paid' && topic !== 'orders/create') {
    return json(response, 202, {ok: true, skipped: 'Unsupported topic'});
  }

  let order;
  try {
    order = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return json(response, 400, {ok: false, error: 'Invalid JSON'});
  }

  try {
    const event = buildPurchaseEvent(order);
    const metaResponse = await sendEventToMeta(event);

    return json(response, 200, {
      ok: true,
      event_id: event.event_id,
      events_received: metaResponse.events_received,
      messages: metaResponse.messages,
    });
  } catch (error) {
    console.error('[Shopify Meta CAPI] Purchase sync failed', {
      order_id: order?.id,
      message: error.message,
    });

    return json(response, 502, {
      ok: false,
      error: 'Meta CAPI purchase sync failed',
    });
  }
}
