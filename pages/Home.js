import wixData from "wix-data";
import wixPay from "wix-pay-frontend";
import { createProductPayment, getProductCatalog } from "backend/payments";

const CURRENCY = "USD";
const BLOG_REFRESH_MS = 30000;
const SAMPLE_POSTS = [
  {
    _id: "sample-welcome",
    title: "Welcome to the collection",
    content: "Discover considered pieces across clothing, shoes, and accessories.",
    author: "The Editorial Team",
    publishedAt: new Date("2026-10-12T09:00:00.000Z"),
  },
  {
    _id: "sample-craft",
    title: "A closer look at craftsmanship",
    content: "Our edit brings together fine materials and details made to be worn for years.",
    author: "The Editorial Team",
    publishedAt: new Date("2026-10-12T08:00:00.000Z"),
  },
];

$w.onReady(() => {
  $w("#productRepeater").onItemReady(($item, product) => {
    $item("#productName").text = product.name;
    $item("#productCategory").text = product.category;
    $item("#productPrice").text = formatPrice(product.price);
    $item("#buyButton").label = "Buy now";
    $item("#buyButton").onClick(() => beginCheckout($item, product));
  });
  loadProductCatalog();

  $w("#liveBlogRepeater").onItemReady(($item, post) => {
    $item("#postTitle").text = post.title || "Update";
    $item("#postContent").text = post.content || "";
    $item("#postAuthor").text = post.author || "Editorial team";
    $item("#postDate").text = formatDate(post.publishedAt);
  });

  refreshLiveBlog();
  setInterval(refreshLiveBlog, BLOG_REFRESH_MS);
});

async function loadProductCatalog() {
  try {
    $w("#productRepeater").data = await getProductCatalog();
  } catch (error) {
    $w("#checkoutStatus").text = "The collection is temporarily unavailable. Please try again later.";
  }
}

async function beginCheckout($item, product) {
  const button = $item("#buyButton");
  const quantity = Number($item("#quantityInput").value);
  button.disable();
  button.label = "Preparing checkout…";
  $w("#checkoutStatus").text = "";

  try {
    const payment = await createProductPayment(product._id, quantity);
    const result = await wixPay.startPayment(payment.id);
    const status = String(result.status || "").toLowerCase();
    $w("#checkoutStatus").text =
      status === "successful"
        ? "Payment received. Thank you for your order."
        : status === "pending"
          ? "Your payment is pending."
          : "Checkout was not completed.";
  } catch (error) {
    $w("#checkoutStatus").text = "Checkout could not be started. Please try again.";
  } finally {
    button.label = "Buy now";
    button.enable();
  }
}

async function refreshLiveBlog() {
  try {
    const result = await wixData
      .query("LiveBlogPosts")
      .eq("isPublished", true)
      .descending("publishedAt")
      .limit(20)
      .find();
    const posts = result.items.length
      ? result.items.map((post) => ({ ...post, _id: post._id }))
      : SAMPLE_POSTS;
    $w("#liveBlogRepeater").data = posts;
    $w("#blogStatus").text = "Live updates refresh automatically.";
  } catch (error) {
    $w("#liveBlogRepeater").data = SAMPLE_POSTS;
    $w("#blogStatus").text = "Showing sample updates. Live posts are temporarily unavailable.";
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CURRENCY,
  }).format(price);
}

function formatDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}
