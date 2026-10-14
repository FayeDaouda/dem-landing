// Exemples de la documentation API DEM (/developpeurs). Gardés à part pour
// que les accolades et les retours à la ligne restent lisibles.

export const BASE_URL = 'https://api.dem.sn/v1'
export const OPENAPI_URL = 'https://api.dem.sn/v1/openapi.yaml'

export const meCurl = `curl ${BASE_URL}/me \\
  -H "Authorization: Bearer dem_test_VOTRE_CLE"`

export const meResponse = `{
  "organization": { "id": "org_jD8ZMMJBi7kqn", "name": "Boutique Awa" },
  "api_key": {
    "id": "key_WppNQBOjTJHhrtFC",
    "name": "Site WooCommerce",
    "prefix": "dem_test_YPlJ",
    "environment": "test",
    "scopes": ["quotes:read", "deliveries:create", "deliveries:read", "tracking:read"]
  },
  "quotas": { "requests_per_minute": 60, "deliveries_per_day": 200 }
}`

export const quoteCurl = `curl -X POST ${BASE_URL}/quotes \\
  -H "Authorization: Bearer dem_test_VOTRE_CLE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "pickup":  { "address": "Point E, Dakar",  "latitude": 14.705, "longitude": -17.46 },
    "dropoff": { "address": "Almadies, Dakar", "latitude": 14.74,  "longitude": -17.51 }
  }'`

export const quoteNode = `const res = await fetch('${BASE_URL}/quotes', {
  method: 'POST',
  headers: {
    Authorization: \`Bearer \${process.env.DEM_API_KEY}\`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    pickup:  { address: 'Point E, Dakar',  latitude: 14.705, longitude: -17.46 },
    dropoff: { address: 'Almadies, Dakar', latitude: 14.74,  longitude: -17.51 },
  }),
})
const quote = await res.json()
console.log(quote.price, quote.quote_id) // 1850 quote_8fK2mQ1xZt0Yb`

export const quotePhp = `<?php
$ch = curl_init('${BASE_URL}/quotes');
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER     => [
    'Authorization: Bearer ' . getenv('DEM_API_KEY'),
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => json_encode([
    'pickup'  => ['address' => 'Point E, Dakar',  'latitude' => 14.705, 'longitude' => -17.46],
    'dropoff' => ['address' => 'Almadies, Dakar', 'latitude' => 14.74,  'longitude' => -17.51],
  ]),
]);
$quote = json_decode(curl_exec($ch), true);
echo $quote['price'];   // 1850`

export const quoteResponse = `{
  "quote_id": "quote_8fK2mQ1xZt0Yb",
  "service": "standard",
  "price": 1850,
  "currency": "XOF",
  "distance_km": 6.4,
  "estimated_duration_minutes": 18,
  "pickup":  { "address": "Point E, Dakar",  "latitude": 14.705, "longitude": -17.46 },
  "dropoff": { "address": "Almadies, Dakar", "latitude": 14.74,  "longitude": -17.51 },
  "expires_at": "2026-10-14T10:15:00.000Z",
  "used": false,
  "livemode": false
}`

export const deliveryCurl = `curl -X POST ${BASE_URL}/deliveries \\
  -H "Authorization: Bearer dem_test_VOTRE_CLE" \\
  -H "Content-Type: application/json" \\
  -H "Idempotency-Key: MAX-45892" \\
  -d '{
    "external_order_id": "MAX-45892",
    "quote_id": "quote_8fK2mQ1xZt0Yb",
    "customer": { "name": "Mamadou Faye", "phone": "+221770000000" },
    "package":  { "description": "Commande e-commerce", "quantity": 1 },
    "payment":  { "method": "CASH", "paid_by": "recipient" },
    "metadata": { "source": "woocommerce" }
  }'`

export const deliveryNode = `const res = await fetch('${BASE_URL}/deliveries', {
  method: 'POST',
  headers: {
    Authorization: \`Bearer \${process.env.DEM_API_KEY}\`,
    'Content-Type': 'application/json',
    // Votre numéro de commande : un nouvel essai ne crée jamais 2 livraisons
    'Idempotency-Key': order.number,
  },
  body: JSON.stringify({
    external_order_id: order.number,
    quote_id: quote.quote_id,
    customer: { name: order.customerName, phone: order.customerPhone },
    payment: { method: 'CASH', paid_by: 'recipient' },
  }),
})
const delivery = await res.json()
if (!res.ok) throw new Error(\`\${delivery.error.code} — \${delivery.error.message}\`)
// Gardez delivery.id (del_…) avec votre commande, envoyez delivery.tracking_url au client`

export const deliveryPhp = `<?php
$ch = curl_init('${BASE_URL}/deliveries');
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER     => [
    'Authorization: Bearer ' . getenv('DEM_API_KEY'),
    'Content-Type: application/json',
    'Idempotency-Key: ' . $order_number,   // un nouvel essai ne crée jamais 2 livraisons
  ],
  CURLOPT_POSTFIELDS => json_encode([
    'external_order_id' => $order_number,
    'quote_id'          => $quote_id,
    'customer'          => ['name' => $customer_name, 'phone' => $customer_phone],
    'payment'           => ['method' => 'CASH', 'paid_by' => 'recipient'],
  ]),
]);
$delivery = json_decode(curl_exec($ch), true);
$status   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($status >= 400) { error_log($delivery['error']['code'] . ' ' . $delivery['error']['request_id']); }`

export const deliveryResponse = `{
  "id": "del_3kQm9xV2pLs8",
  "object": "delivery",
  "livemode": true,
  "status": "SEARCHING_DRIVER",
  "service": "standard",
  "external_order_id": "MAX-45892",
  "pickup":   { "store_id": "store_a7b4…", "name": "Max Store", "address": "Point E, Dakar", "latitude": 14.705, "longitude": -17.46 },
  "dropoff":  { "address": "Almadies, Dakar", "latitude": 14.74, "longitude": -17.51 },
  "customer": { "name": "Mamadou Faye", "phone": "+221770000000" },
  "package":  { "description": "Commande e-commerce", "quantity": 1 },
  "price":    { "amount": 1850, "currency": "XOF" },
  "payment":  { "method": "CASH", "paid_by": "recipient", "status": "PENDING", "refunded_at": null },
  "driver": null,
  "tracking_url": "https://api.dem.sn/track/4ce628e9-…",
  "cancellation": null,
  "metadata": { "source": "woocommerce" },
  "created_at": "2026-10-14T10:02:11.000Z",
  "accepted_at": null,
  "picked_up_at": null,
  "delivered_at": null
}`

export const trackingResponse = `{
  "id": "del_3kQm9xV2pLs8",
  "status": "PICKED_UP",
  "tracking_url": "https://api.dem.sn/track/4ce628e9-…",
  "driver": { "first_name": "Ibrahima", "phone": "+221771112233", "vehicle_type": "MOTO" },
  "location": { "latitude": 14.7123, "longitude": -17.4568, "updated_at": "2026-10-14T10:21:40.000Z" }
}`

export const cancelCurl = `curl -X POST ${BASE_URL}/deliveries/del_3kQm9xV2pLs8/cancel \\
  -H "Authorization: Bearer dem_test_VOTRE_CLE" \\
  -H "Content-Type: application/json" \\
  -d '{ "reason": "OUT_OF_STOCK" }'`

export const advanceCurl = `curl -X POST ${BASE_URL}/test/deliveries/del_3kQm9xV2pLs8/advance \\
  -H "Authorization: Bearer dem_test_VOTRE_CLE" \\
  -H "Content-Type: application/json" \\
  -d '{ "to": "DELIVERED" }'
# Webhooks envoyés : delivery.driver_assigned, delivery.picked_up, delivery.delivered`

export const listCurl = `curl "${BASE_URL}/deliveries?limit=20&external_order_id=MAX-45892" \\
  -H "Authorization: Bearer dem_test_VOTRE_CLE"`

export const webhookCreateCurl = `curl -X POST ${BASE_URL}/webhooks \\
  -H "Authorization: Bearer dem_test_VOTRE_CLE" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://boutique.sn/dem/webhook",
    "events": ["delivery.driver_assigned", "delivery.picked_up", "delivery.delivered", "delivery.cancelled"]
  }'
# Réponse : … "secret": "whsec_9xQ2LmPa7tKcV0bYw3nR1sDe"  ← à garder, affiché une seule fois`

export const webhookPayload = `POST /dem/webhook
Content-Type: application/json
X-DEM-Event: delivery.delivered
X-DEM-Event-ID: evt_Qm3xK9pL2vT8
X-DEM-Timestamp: 1760436900
X-DEM-Signature: v1=5f2b9c…

{
  "id": "evt_Qm3xK9pL2vT8",
  "object": "event",
  "type": "delivery.delivered",
  "created_at": "2026-10-14T10:35:00.000Z",
  "livemode": true,
  "data": {
    "object": { "id": "del_3kQm9xV2pLs8", "status": "DELIVERED", "external_order_id": "MAX-45892", … }
  }
}`

export const verifyNode = `import crypto from 'node:crypto'
import express from 'express'

const app = express()
const SECRET = process.env.DEM_WEBHOOK_SECRET // whsec_…

// Corps BRUT : la signature porte sur les octets reçus, pas sur un JSON relu
app.post('/dem/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const timestamp = req.get('X-DEM-Timestamp') ?? ''
  const signature = req.get('X-DEM-Signature') ?? ''
  const expected = 'v1=' + crypto
    .createHmac('sha256', SECRET)
    .update(\`\${timestamp}.\${req.body}\`)
    .digest('hex')

  const valid = signature.length === expected.length
    && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  const recent = Math.abs(Date.now() / 1000 - Number(timestamp)) <= 300 // 5 min
  if (!valid || !recent) return res.sendStatus(400)

  res.sendStatus(200) // répondre tout de suite…

  // …puis traiter (une seule fois par X-DEM-Event-ID)
  const event = JSON.parse(req.body)
  if (event.type === 'delivery.delivered') {
    markOrderDelivered(event.data.object.external_order_id)
  }
})`

export const verifyPhp = `<?php
$secret    = getenv('DEM_WEBHOOK_SECRET');            // whsec_…
$payload   = file_get_contents('php://input');        // corps BRUT
$timestamp = $_SERVER['HTTP_X_DEM_TIMESTAMP'] ?? '';
$signature = $_SERVER['HTTP_X_DEM_SIGNATURE'] ?? '';

$expected = 'v1=' . hash_hmac('sha256', $timestamp . '.' . $payload, $secret);
if (!hash_equals($expected, $signature) || abs(time() - (int) $timestamp) > 300) {
  http_response_code(400);
  exit;
}
http_response_code(200);   // répondre tout de suite…

// …puis traiter (une seule fois par HTTP_X_DEM_EVENT_ID)
$event = json_decode($payload, true);
if ($event['type'] === 'delivery.delivered') {
  // ex. WooCommerce : wc_get_order($event['data']['object']['external_order_id'])->update_status('completed');
}`

export const errorExample = `HTTP/1.1 402 Payment Required
X-Request-ID: req_mv7flfiw21e0880eec01

{
  "error": {
    "code": "INSUFFICIENT_WALLET_BALANCE",
    "message": "Le solde du wallet est insuffisant pour cette livraison.",
    "request_id": "req_mv7flfiw21e0880eec01",
    "details": { "balance": 500, "amount": 1850 }
  }
}`
