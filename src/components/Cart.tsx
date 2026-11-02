"use client";

import { products, formatPrice } from "@/data/products";
import { useCart } from "./CartProvider";

export default function Cart() {
  const { items, removeItem } = useCart();

  const cartItems = items.flatMap((item) => {
    const product = products.find(
      (product) => product.id === item.productId
    );

    return product ? [{ ...item, product }] : [];
  });

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.product.priceInCents * item.dozens,
    0
  );

  return (
    <section
      id="cart"
      className="mx-auto max-w-6xl scroll-mt-6 px-6 pb-20"
    >
      <div className="rounded-3xl border border-pink-200 bg-white p-6 sm:p-8">
        <h2 className="text-3xl font-bold">Your cart</h2>

        {cartItems.length === 0 ? (
          <p className="mt-4 text-stone-600">
            Your cart is empty. Choose a treat and flavor above.
          </p>
        ) : (
          <>
            <ul className="mt-6 divide-y divide-pink-100">
              {cartItems.map((item) => (
                <li
                  key={`${item.productId}:${item.flavor}`}
                  className="flex flex-wrap items-center justify-between gap-4 py-5"
                >
                  <div>
                    <h3 className="font-bold">{item.product.name}</h3>
                    <p className="mt-1 text-sm text-stone-600">
                      {item.flavor} · {item.dozens} dozen ·{" "}
                      {item.dozens * 12} treats
                    </p>
                  </div>

                  <div className="flex items-center gap-5">
                    <span className="font-semibold">
                      {formatPrice(
                        item.product.priceInCents * item.dozens
                      )}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.productId, item.flavor)
                      }
                      aria-label={`Remove ${item.product.name}, ${item.flavor}`}
                      className="text-sm font-medium text-pink-800 underline"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-pink-200 pt-6">
              <p
                aria-live="polite"
                className="flex justify-between text-xl font-bold"
              >
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </p>

              <p className="mt-3 text-sm text-stone-600">
                Pickup scheduling and checkout are coming next.
                Orders cannot be submitted yet.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}