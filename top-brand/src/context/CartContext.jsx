// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load saved cart from localStorage
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cartItems")) || []
  );

  // Load saved cart history from localStorage
  const [cartHistory, setCartHistory] = useState(
    () => JSON.parse(localStorage.getItem("cartHistory")) || []
  );

  // Persist cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist cartHistory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartHistory", JSON.stringify(cartHistory));
  }, [cartHistory]);

  // Add new item or increase qty
   const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((x) => x.id === item.id);

      if (existing) {
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  }; 


  // Increment quantity
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
    );
  };

  // Decrement quantity
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
        .filter((x) => x.qty > 0)
    );
  };

  // Remove item completely
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((x) => x.id !== id));
  };

  // Checkout: save current cart to history and clear cart
  const clearCart = () => {
    if (cartItems.length > 0) {
      setCartHistory((prev) => [...prev, cartItems]);
    }
    setCartItems([]);
  };

  // Clear all cart history
  const clearCartHistory = () => {
    setCartHistory([]);
    localStorage.removeItem("cartHistory"); // also remove from storage
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartHistory,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        clearCartHistory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
