// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { BASE_URL } from "../api/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  //global order reset if the order is unreparable
  //const validOrders = saved.filter(o => Array.isArray(o.items));

  //Normalizing our Order data
  const normalizeOrder = (order) => ({
    id: order.id ?? crypto.randomUUID(),
    items: Array.isArray(order.items) ? order.items.map(item => ({
      id: item.id,
      title: item.title ?? "Unknown item",
      image: item.image ?? "",
      price: Number(item.price) || 0,
      qty: Number(item.qty) || 1,
      sizeKg: Number(item.sizeKg) || 0,
    })) : [],
    status: order.status ?? "pending",
    createdAt: order.createdAt ?? new Date().toISOString(),
  });

  // Load saved cart from localStorage
  const [cartItems, setCartItems] = useState(
    () => JSON.parse(localStorage.getItem("cartItems")) || []
  );

  // Load saved cart history from localStorage
  const [cartHistory, setCartHistory] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("cartHistory")) || [];
    return saved.map(normalizeOrder);
  });
  

  // Persist cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist cartHistory to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartHistory", JSON.stringify(cartHistory));
  }, [cartHistory]);


  /* CART ITEMS SECTION ------------------------------------------*/
  // Add new item or increase qty
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (x) => x.id === item.id && x.sizeKg === item.sizeKg
      );
  
      if (existing) {
        return prev.map((x) =>
          x.id === item.id && x.sizeKg === item.sizeKg
            ? { ...x, qty: x.qty + 1 }
            : x
        );
      }
  
      return [...prev, { ...item, qty: 1 }];
    });
  };
  
  // Increment quantity
  const increaseQty = (id, sizeKg) => {
    setCartItems((prev) =>
      prev.map((x) =>
        x.id === id && x.sizeKg === sizeKg
          ? { ...x, qty: x.qty + 1 }
          : x
      )
    );
  };
  
  // Decrement quantity
  const decreaseQty = (id, sizeKg) => {
    setCartItems((prev) =>
      prev
        .map((x) =>
          x.id === id && x.sizeKg === sizeKg
            ? { ...x, qty: x.qty - 1 }
            : x
        )
        .filter((x) => x.qty > 0)
    );
  };
  
  // Remove item completely
  const removeFromCart = (id, sizeKg) => {
    setCartItems((prev) =>
      prev.filter((x) => !(x.id === id && x.sizeKg === sizeKg))
    );
  };

 /* ORDERS SECTION ------------------------------------------*/
  // save local history on successfull checkout
  const updateHistory = () => {
    const orderData = {
      items: cartItems.map(item => ({ ...item })),
      createdAt : new Date().toISOString()
    };
      setCartHistory(prev => [...prev, orderData]);
  };



//--------------------CHECKOUT, send data to db and update locally---------------------------------------------
  const clearCart = async () => {
    if (cartItems.length === 0) return;
  
    // Build request payload
    const orderPayload = {
      items: cartItems.map(item => ({
        productName: item.title,
        packageType: item.packageType,
        sizeKg: item.sizeKg,
        qty: item.qty,
        productPrice: item.price
      }))
    };
  
    try {
      // Send to backend
      const response = await api.post(`${BASE_URL}/api/orders`, orderPayload);
  
      if (response.status === 201) {
        updateHistory();//update local history
        setCartItems([]);//clear the shopping cart
        alert("Order placed successfully");
      }
    } catch (error) {
      alert("FAILED TO SUBMIT ORDER");
      console.error("Failed to submit order:", error);
    }
  };
  
  
  // Clear all cart history
  const clearCartHistory = (cartId) => {
    setCartHistory(prev => prev.filter(cart => cart.id !== cartId));
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
