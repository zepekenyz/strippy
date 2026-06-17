import {
  buildBrowserUserData,
  compact,
  isAllowedBrowserEvent,
  json,
  readRawBody,
  sanitizeCustomData,
  sendEventToMeta,
} from './_meta-capi.js';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return json(response, 405, {ok: false, error: 'Method not allowed'});
  }

  let body;
  try {
    body = request.body;
    if (!body) {
      const rawBody = await readRawBody(request);
      body = rawBody.toString('utf8');
    }
    if (typeof body === 'string') body = JSON.parse(body);
  } catch {
    return json(response, 400, {ok: false, error: 'Invalid JSON'});
  }

  const eventName = String(body?.event_name || '');
  const eventId = String(body?.event_id || '');

  if (!isAllowedBrowserEvent(eventName) || !eventId) {
    return json(response, 400, {ok: false, error: 'Unsupported event'});
  }

  const event = compact({
    event_name: eventName,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    event_source_url: body.event_source_url,
    action_source: 'website',
    user_data: buildBrowserUserData(request, body),
    custom_data: sanitizeCustomData(body.custom_data),
  });

  try {
    const metaResponse = await sendEventToMeta(event);

    return json(response, 200, {
      ok: true,
      event_id: eventId,
      events_received: metaResponse.events_received,
    });
  } catch {
    return json(response, 502, {
      ok: false,
      error: 'Meta CAPI event sync failed',
    });
  }
}
