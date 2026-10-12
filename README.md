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
3. Add a live-blog repeater with IDs `#liveBlogRepeater`, `#postTitle`,
   `#postContent`, `#postAuthor`, and `#postDate`.
4. Add text elements with IDs `#checkoutStatus` and `#blogStatus`.
5. Create a CMS collection named `LiveBlogPosts` with fields `title` (Text),
   `content` (Text), `author` (Text), `publishedAt` (Date and Time), and
   `isPublished` (Boolean). Allow site visitors to read items; reserve editing
   permissions for site administrators. Add and publish posts by setting
   `isPublished` to `true`. The page checks for new posts every 30 seconds.
6. Paste [`backend/payments.jsw`](backend/payments.jsw) into the Wix site's
   Backend section as `payments.jsw`. Configure Wix Payments and set the site's
   currency to USD before accepting payments.

The backend is the source of truth for the catalog and prices. Checkout accepts
only listed product IDs and integer quantities from 1 to 10; the browser never
sets the amount. The displayed prices are sample USD prices and can be changed
in the backend catalog before launch. The payment flow does not calculate tax
or shipping or create fulfillment records; configure those separately for the
store's needs.

## Sample catalog

| Product | Category | Price (USD) |
| --- | --- | ---: |
| Silk Evening Dress | Clothing | $485.00 |
| Italian Leather Heels | Shoes | $365.00 |
| 18k Gold Drop Earrings | Earrings | $245.00 |
| Signature Leather Handbag | Accessories | $1,295.00 |
| Cashmere Wrap Coat | Clothing | $895.00 |
| Silk & Acetate Sunglasses | Accessories | $195.00 |
