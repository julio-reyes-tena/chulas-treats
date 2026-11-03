"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { products } from "@/data/products";

type CartItem = {
  productId: string;
  flavor: string;
  dozens: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, flavor: string) => void;
  pickupSlot: string;
  setPickupSlot: (slot: string) => void;
};

const STORAGE_KEY = "chulas-treats-cart-v1";

const CartContext = createContext<CartContextValue | null>(null);

function isValidItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Partial<CartItem>;
  const product = products.find(
    (product) => product.id === item.productId
  );

  return Boolean(
    product &&
      typeof item.flavor === "string" &&
      product.flavors.includes(item.flavor) &&
      typeof item.dozens === "number" &&
      Number.isSafeInteger(item.dozens) &&
      item.dozens > 0
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [pickupSlot, setPickupSlot] = useState("");
  const [ready, setReady] = useState(false);

  // Load saved data after the page opens in the browser.
  useEffect(() => {
    let cancelled = false;

    async function restoreCart() {
      // Defer restoration until after the initial render.
      await Promise.resolve();

      if (cancelled) return;

      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {
          const parsed: unknown = JSON.parse(saved);

          if (parsed && typeof parsed === "object") {
            const data = parsed as {
              items?: unknown;
              pickupSlot?: unknown;
            };

            if (Array.isArray(data.items)) {
              setItems(data.items.filter(isValidItem));
            }

            if (typeof data.pickupSlot === "string") {
              const timestamp = Date.parse(data.pickupSlot);
              const earliest = Date.now() + 72 * 60 * 60 * 1000;

              // Clear saved pickup times that no longer meet the lead time.
              if (Number.isFinite(timestamp) && timestamp >= earliest) {
                setPickupSlot(new Date(timestamp).toISOString());
              }
            }
          }
        }
      } catch {
        // Start with an empty cart if storage is unavailable or invalid.
      } finally {
        setReady(true);
      }
    }

    void restoreCart();

    return () => {
      cancelled = true;
    };
  }, []);

  // Wait for restoration before saving, avoiding an empty-cart overwrite.
  useEffect(() => {
    if (!ready) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ items, pickupSlot })
      );
    } catch {
      // The cart still works if the browser blocks storage.
    }
  }, [items, pickupSlot, ready]);

  function addItem(newItem: CartItem) {
    if (!isValidItem(newItem)) return;

    setItems((current) => {
      const exists = current.some(
        (item) =>
          item.productId === newItem.productId &&
          item.flavor === newItem.flavor
      );

      if (!exists) return [...current, newItem];

      return current.map((item) =>
        item.productId === newItem.productId &&
        item.flavor === newItem.flavor
          ? { ...item, dozens: item.dozens + newItem.dozens }
          : item
      );
    });
  }

  function removeItem(productId: string, flavor: string) {
    setItems((current) =>
      current.filter(
        (item) => !(item.productId === productId && item.flavor === flavor)
      )
    );
  }

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, pickupSlot, setPickupSlot }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return cart;
}