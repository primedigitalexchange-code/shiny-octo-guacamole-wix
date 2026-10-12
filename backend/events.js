import wixData from "wix-data";

const ORDERS_COLLECTION = "StoreOrders";

export async function wixPay_onPaymentUpdate(event) {
  const paymentId = event && event.payment && event.payment.id;
  if (!paymentId) {
    return;
  }

  const result = await wixData
    .query(ORDERS_COLLECTION)
    .eq("paymentId", paymentId)
    .limit(1)
    .find({ suppressAuth: true });
  const order = result.items[0];
  if (!order) {
    return;
  }

  const paymentStatus = String(event.status || "").toLowerCase();
  if (paymentStatus === "successful") {
    await wixData.update(
      ORDERS_COLLECTION,
      {
        ...order,
        paymentStatus: "Paid",
        fulfillmentStatus: order.fulfillmentStatus === "Fulfilled" ? "Fulfilled" : "Unfulfilled",
        transactionId: event.transactionId || "",
        paidAt: new Date(),
      },
      { suppressAuth: true },
    );
  } else if (["failed", "cancelled", "canceled"].includes(paymentStatus)) {
    await wixData.update(
      ORDERS_COLLECTION,
      { ...order, paymentStatus: paymentStatus === "failed" ? "Failed" : "Cancelled" },
      { suppressAuth: true },
    );
  }
}
