// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

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

  //loading saved orders history
  const [orders, setOrders] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("orders")) || [];
    return saved.map(normalizeOrder);
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

  // Persist orders whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

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
  //add orders to local order history
  const addOrder = (order) => {
    setOrders(prev => [...prev, order]);
  };

  //update order status
  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId
          ? { ...order, status }
          : order
      )
    );
  };

  //UPDATE EXISTING ORDER
  const updateOrder = async (updatedOrder) => {
    try {
      const response = await axios.put(`${BASE_URL}/orders/${updatedOrder.id}`, updatedOrder);
      
      if (response.status === 200 && response.data?.status === "pending") {
        // update local state
        setOrders(prev => {
          // If no items, remove the order
          if (!updatedOrder.items || updatedOrder.items.length === 0) {
            return prev.filter(o => o.id !== updatedOrder.id);
          }
      
          // Otherwise, update order only if it is pending
          return prev.map(o =>
            o.id === updatedOrder.id && o.status === "pending"
              ? updatedOrder
              : o
          );
        });
      }
    } catch (error) {
      console.error("Failed to update order:", error);
    }
  };

  //remove Order
  const removeOrder = (orderId) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  // Checkout: save current cart to history and clear cart
  const clearCart = async () => {
    if (cartItems.length === 0) return;
  
    const generateId = () => Math.floor(10000000 + Math.random() * 90000000).toString();
  
    const orderData = {
      id: generateId(),
      items: cartItems.map(item => ({ ...item })),
      status: "pending",
      createdAt: new Date().toISOString(),
    };
  
    try {
      const response = await axios.post(`${BASE_URL}/orders`, orderData);
  
      if (response.status === 201) {
        setCartHistory(prev => [...prev, orderData]);
        addOrder(orderData);
        setCartItems([]);
      }
    } catch (error) {
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
        orders,
        addOrder,
        updateOrder,
        updateOrderStatus,
        removeOrder,
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
