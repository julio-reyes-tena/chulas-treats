"use client";

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type CartItem = {
  productId: string;
  flavor: string;
  dozens: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, flavor: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addItem(newItem: CartItem) {
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
    <CartContext.Provider value={{ items, addItem, removeItem }}>
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