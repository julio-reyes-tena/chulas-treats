export const products = [
  {
    id: "cookies",
    name: "Cookies",
    description: "Choose chocolate chip, sugar, or cookies & cream.",
    priceInCents: 2400,
    quantity: "per dozen",
    flavors: ["Chocolate chip", "Sugar", "Cookies & cream"],
    emoji: "🍪",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    description: "Choose vanilla, chocolate, or strawberry.",
    priceInCents: 3600,
    quantity: "per dozen",
    flavors: ["Vanilla", "Chocolate", "Strawberry"],
    emoji: "🧁",
  },
  {
    id: "strawberries",
    name: "Chocolate-Covered Strawberries",
    description: "Fresh strawberries dipped in milk or white chocolate.",
    priceInCents: 3000,
    quantity: "per dozen",
    flavors: ["Milk chocolate", "White chocolate"],
    emoji: "🍓",
  },
    {
    id: "cookies",
    name: "Cookies",
    description: "Choose chocolate chip, sugar, or cookies & cream.",
    priceInCents: 2400,
    quantity: "per dozen",
    flavors: ["Chocolate chip", "Sugar", "Cookies & cream"],
    emoji: "🍪",
  },
  {
    id: "cupcakes",
    name: "Cupcakes",
    description: "Choose vanilla, chocolate, or strawberry.",
    priceInCents: 3600,
    quantity: "per dozen",
    flavors: ["Vanilla", "Chocolate", "Strawberry"],
    emoji: "🧁",
  },
  {
    id: "strawberries",
    name: "Chocolate-Covered Strawberries",
    description: "Fresh strawberries dipped in milk or white chocolate.",
    priceInCents: 3000,
    quantity: "per dozen",
    flavors: ["Milk chocolate", "White chocolate"],
    emoji: "🍓",
  },
];

export function formatPrice(priceInCents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceInCents / 100);
}