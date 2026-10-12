# Luxury Collection: Wix Velo Storefront

Wix Velo page and backend code for a luxury clothing, shoes, earrings, and
accessories storefront with a CMS-powered live blog and Wix Pay checkout.

## Wix setup

This repository contains Velo code; Wix page layouts and CMS collections must be
created in the Wix Editor:

1. Enable Velo, create a page for the storefront, and paste
   [`pages/Home.js`](pages/Home.js) into that page's code panel.
2. Add a product repeater with these element IDs: `#productRepeater`,
   `#productName`, `#productCategory`, `#productPrice`, `#quantityInput`, and
   `#buyButton`. The quantity input should be numeric and default to `1`.
3. Add shipping form inputs with IDs `#shippingName`, `#shippingAddressLine1`,
   `#shippingAddressLine2`, `#shippingCity`, `#shippingRegion`,
   `#shippingPostalCode`, and `#shippingCountryCode`. Make all except address
   line 2 required. Use a country-code dropdown restricted to the country set
   in the backend configuration.
4. Add a live-blog repeater with IDs `#liveBlogRepeater`, `#postTitle`,
   `#postContent`, `#postAuthor`, and `#postDate`.
5. Add text elements with IDs `#checkoutStatus` and `#blogStatus`.
6. In CMS, create `LiveBlogPosts` with `title` (Text), `content` (Text),
   `author` (Text), `publishedAt` (Date and Time), and `isPublished` (Boolean).
   Set read permission to anyone and all write permissions to administrators.
   Publish a post by setting `isPublished` to `true`; new posts appear within
   30 seconds.
7. Create `StoreOrders` with these fields and types:
   `paymentId` (Text), `productSku` (Text), `productName` (Text),
   `quantity` (Number), `subtotalCents` (Number), `shippingCents` (Number),
   `taxCents` (Number), `totalCents` (Number), `currency` (Text),
   `shippingName` (Text), `shippingAddressLine1` (Text),
   `shippingAddressLine2` (Text), `shippingCity` (Text), `shippingRegion`
   (Text), `shippingPostalCode` (Text), `shippingCountryCode` (Text),
   `paymentStatus` (Text), `fulfillmentStatus` (Text), `transactionId` (Text),
   `createdAt` (Date and Time), `paidAt` (Date and Time), `trackingNumber`
   (Text), `trackingUrl` (URL), and `fulfilledAt` (Date and Time). Set all
   collection permissions to administrators only; backend code writes using
   server permissions.
8. Copy [`backend/payments.jsw`](backend/payments.jsw) and
   [`backend/events.js`](backend/events.js) into the site's Backend section.
   Configure Wix Payments and set the site's currency to USD. The `wixPay`
   payment-update event runs on the published site, not in Preview.

### Tax, shipping, and fulfillment configuration

Checkout is intentionally disabled until the merchant configures
`STORE_COUNTRY_CODE`, `TAX_RATE_BPS`, `SHIPPING_FEE_CENTS`, and (if applicable)
`SHIPPING_TAXABLE` at the top of `backend/payments.jsw`. Use the destination
country's two-letter ISO code, tax rate in basis points (for example, 825 means
8.25%), and shipping charge in cents (for example, 1500 means $15.00). The
backend calculates and charges the subtotal, flat shipping charge, and
configured flat tax; the browser cannot set prices or totals. Product prices
below are sample USD prices. Confirm tax treatment and shipping charges for
every destination with a qualified tax professional before enabling checkout.
This starter supports one country-wide flat tax rate and one flat shipping
charge; it does not calculate destination-specific/state/local taxes, tax
nexus, shipping zones, or carrier rates. For those requirements, use Wix Stores
and its configured checkout/tax/shipping services instead of this basic Wix Pay
flow.

After a successful payment event, the backend marks its private `StoreOrders`
record `Paid` and `Unfulfilled`. In the Wix CMS, an administrator should pack
and ship the order, then set `fulfillmentStatus` to `Fulfilled` and fill in
`trackingNumber`, `trackingUrl`, and `fulfilledAt`. Failed or canceled payment
events update payment status without marking an order fulfilled. Add Wix
Automations separately if customer or staff email notifications are needed.

## Sample catalog

| Product | Category | Price (USD) |
| --- | --- | ---: |
| Silk Evening Dress | Clothing | $485.00 |
| Italian Leather Heels | Shoes | $365.00 |
| 18k Gold Drop Earrings | Earrings | $245.00 |
| Signature Leather Handbag | Accessories | $1,295.00 |
| Cashmere Wrap Coat | Clothing | $895.00 |
| Silk & Acetate Sunglasses | Accessories | $195.00 |
