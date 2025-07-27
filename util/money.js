import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm";

export function formatMoney(amount) {
  return `$${(amount / 100).toFixed(2)}`;
}

export const deliveryOptions = [
  {
    deliveryOptionsId: 1,
    date: dayjs().format("dddd, MMMM D"),
    price: 0,
  },
  {
    deliveryOptionsId: 2,
    date: dayjs().add(2, "day").format("dddd, MMMM D"),
    price: 5.99,
  },
  {
    deliveryOptionsId: 3,
    date: dayjs().add(5, "day").format("dddd, MMMM D"),
    price: 9.99,
  },
];

export let orderSummary = {
  totalItems: 0,
  totalPrice: 0,
  deliveryPrice: 0,
  totalPriceWithDelivery: 0,
  tax: 0,
  totalPriceWithTax: 0,
};
