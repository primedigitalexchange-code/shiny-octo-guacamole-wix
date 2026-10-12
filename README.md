# Luxury Collection: Wix Velo Storefront

Wix Velo page and backend code for a luxury clothing, shoes, earrings, and
accessories storefront with a CMS-powered live blog and Wix Stores checkout.

## Wix setup

This repository contains Velo code; Wix page layouts and CMS collections must be
created in the Wix Editor:

1. Enable Velo, create a page for the storefront, and paste
   [`pages/Home.js`](pages/Home.js) into that page's code panel.
2. Add a product repeater with these element IDs: `#productRepeater`,
   `#productName`, `#productCategory`, `#productPrice`, and `#buyButton`.
   `#buyButton` opens the item's Wix Stores product page.
3. Add a live-blog repeater with IDs `#liveBlogRepeater`, `#postTitle`,
   `#postContent`, `#postAuthor`, and `#postDate`.
4. Add text elements with IDs `#checkoutStatus` and `#blogStatus`.
5. In Wix Stores, create and publish physical products with their real prices,
   photos, inventory, and options. The page reads the live product catalog; it
   no longer uses the sample prices below. Add Wix Stores' product page and
   cart/checkout pages to the site. The custom listing links to the default
   `/product-page/{slug}` path; adjust the link in `pages/Home.js` if you
   customize Wix's product page URL prefix.
6. Set the site's currency to USD and configure Wix Stores shipping regions and
   rates. To allow delivery across the United States, create shipping coverage
   for all intended U.S. states/territories and set the desired $20 rate in Wix
   Stores. Configure taxes using Wix's destination-based tax settings or a
   supported tax provider; do not apply one flat percentage indiscriminately
   across the U.S. The previously provided 8.875% and $20 values are not
   hard-coded in Velo: set and verify applicable tax and shipping rules in the
   Wix dashboard before accepting orders.
7. Use Wix Stores order management for payment status, shipping address,
   fulfillment, and tracking. Wix Stores owns the cart and checkout totals;
   this code does not collect card data, calculate taxes, or create parallel
   order records.
8. In CMS, create `LiveBlogPosts` with `title` (Text), `content` (Text),
   `author` (Text), `publishedAt` (Date and Time), and `isPublished` (Boolean).
   Set read permission to anyone and all write permissions to administrators.
   Publish a post by setting `isPublished` to `true`; new posts appear within
   30 seconds.
9. Copy [`backend/storefront.jsw`](backend/storefront.jsw) into the Wix site's
   Backend section as `storefront.jsw`.

Tax obligations and exemptions vary by jurisdiction and product. Confirm your
tax registrations and Wix configuration with a qualified tax professional;
the storefront listing delegates tax, shipping, checkout, and fulfillment to
Wix Stores rather than calculating them in page code.

## Suggested starter catalog

These are optional product ideas and example prices only. Create the real
products, prices, and stock in Wix Stores; the page displays the Wix catalog.

| Product | Category | Price (USD) |
| --- | --- | ---: |
| Silk Evening Dress | Clothing | $485.00 |
| Italian Leather Heels | Shoes | $365.00 |
| 18k Gold Drop Earrings | Earrings | $245.00 |
| Signature Leather Handbag | Accessories | $1,295.00 |
| Cashmere Wrap Coat | Clothing | $895.00 |
| Silk & Acetate Sunglasses | Accessories | $195.00 |
