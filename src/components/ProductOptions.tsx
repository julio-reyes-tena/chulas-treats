"use client";

import { useState } from "react";
import { formatPrice } from "@/data/products";
import { useCart } from "./CartProvider";

type ProductOptionsProps = {
  productId: string;
  flavors: string[];
  priceInCents: number;
};

export default function ProductOptions({
  productId,
  flavors,
  priceInCents,
}: ProductOptionsProps) {
  const [flavor, setFlavor] = useState(flavors[0] ?? "");
  const [dozens, setDozens] = useState(1);
    const { addItem } = useCart();
    const [message, setMessage] = useState("");

  return (
    <div className="mt-6 space-y-4">
      <div>
        <label
          htmlFor={`${productId}-flavor`}
          className="mb-2 block text-sm font-semibold"
        >
          Flavor
        </label>

        <select
          id={`${productId}-flavor`}
          value={flavor}
          onChange={(event) => setFlavor(event.target.value)}
          className="w-full rounded-xl border border-pink-200 bg-white p-3"
        >
          {flavors.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor={`${productId}-quantity`}
          className="mb-2 block text-sm font-semibold"
        >
          Quantity in dozens
        </label>

        <select
          id={`${productId}-quantity`}
          value={dozens}
          onChange={(event) => setDozens(Number(event.target.value))}
          className="w-full rounded-xl border border-pink-200 bg-white p-3"
        >
          {[1, 2, 3, 4, 5, 6].map((quantity) => (
            <option key={quantity} value={quantity}>
              {quantity} dozen ({quantity * 12} treats)
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite" className="font-semibold text-pink-800">
        Item total: {formatPrice(priceInCents * dozens)}
      </p>
      <button
  type="button"
  onClick={() => {
    addItem({ productId, flavor, dozens });
    setMessage(`Added ${dozens} dozen, ${flavor}, to your cart.`);
  }}
  className="w-full rounded-full bg-pink-700 px-6 py-3 font-semibold text-white transition hover:bg-pink-800"
>
  Add to cart
</button>

<p role="status" className="text-sm text-pink-800">
  {message}
</p>
    </div>
  );
}