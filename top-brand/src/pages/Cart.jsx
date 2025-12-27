// src/pages/CartPage.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesPacking, faCartShopping, faHistory, faShoppingCart, faSignOut, faUser, faUserAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  const { cartItems, cartHistory, increaseQty, decreaseQty, removeFromCart, clearCart, clearCartHistory } =
    useCart();

  // For demo: mock orders
  const [orders, setOrders] = useState([
    { id: "TPBS002", date: "8/11/25", totalOrder: 254, status: "processing" },
    { id: "TPBS002", date: "4/9/25", totalOrder:600, status: "processing" },
    { id: "TPBS003", date: "22/8/25", totalOrder: 120, status: "completed" },
    { id: "TPBS004", date: "1/5/25", totalOrder:900, status: "cancelled" },
    { id: "TPBS005", date: "31/3/25", totalOrder: 114, status: "completed" },
    { id: "TPBS006", date: "26/2/25", totalOrder:550, status: "completed" },
  ]);

  //States to manage what's displayed on the customer dashboard
  const [activeTab, setActiveTab] = useState("cart");

  /* calculating total cost */
  const total = cartItems.reduce(
    (t, item) => t + parseFloat(item.price) * (item.sizeKg || 1) * item.qty,
    0
  );
  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-1 mt-22">
        {/* Sidebar */}
        <aside className="w-56 bg-bg shadow p-4 shrink flex-col-start justify-between hidden sm:flex">
          <ul className="space-y-3 w-full">

              <li
                className={`${activeTab === "cart" ? "activeCartTab" : "cartTab"}`}
                onClick={() => setActiveTab("cart")}
              >
                <FontAwesomeIcon icon={faCartShopping} /> Cart Items
              </li>

              <li
                className={`${activeTab === "history" ? "activeCartTab" : "cartTab"}`}
                onClick={() => setActiveTab("history")}
              >
               <FontAwesomeIcon icon={faHistory}/> Cart History
              </li>

              <li 
                className={` ${activeTab === "orders" ? "activeCartTab" : "cartTab"}`}
                onClick={() => setActiveTab("orders")}
              >
               <FontAwesomeIcon  icon={faBoxesPacking}/> Orders
              </li>
          </ul>

          <p 
              className="cursor-pointer hover:bg-bg-dark w-full p-2 text-sm"
            >
              <FontAwesomeIcon icon={faSignOut} /> logout
          </p>
        </aside>

        
        {/* Mobile bottom navigation bar */}
        <aside className="w-full h-fit fixed bottom-0 left-0  bg-bg-dark  p-2 pb-0 z-40 sm:hidden">
          <ul className="space-y-3 w-full grid grid-cols-3">
              <li
                className={`${activeTab === "cart" ? "activeCartTab" : "cartTab"}`}
                onClick={() => setActiveTab("cart")}
              >
                <FontAwesomeIcon icon={faCartShopping} /> Items
              </li>

              <li
                className={`${activeTab === "history" ? "activeCartTab" : "cartTab"}`}
                onClick={() => setActiveTab("history")}
              >
               <FontAwesomeIcon icon={faHistory}/> History
              </li>

              <li 
                className={` ${activeTab === "orders" ? "activeCartTab" : "cartTab"}`}
                onClick={() => setActiveTab("orders")}
              >
               <FontAwesomeIcon  icon={faBoxesPacking}/> Orders
              </li>
          </ul>
        </aside>

        {/* Main content */}
        <main className="w-full sm:flex-1 relative pt-16">
          {/* cartHeader */}
{           <div className="w-full ml-2 h-16 border border-r-0 border-t-0 border-l-0 border-gray-300 text-maintext  flex-row-center justify-between pl-2 pr-2 sm:pl-6 sm:pr-6 bg-bg-light absolute top-0 ">
              <p className="text-xl font-semibold">  <FontAwesomeIcon icon={faShoppingCart} className="text-xl text-accent"/> Cart Manager</p>
              <p>Fridah <FontAwesomeIcon icon={faUserCircle} className="text-2xl"/> </p>
            </div>}


          {/* content data */}
          <div className="w-full p-8 pt-8 h-[74vh] overflow-y-scroll">
                {/* Cart Items */}
                {activeTab === "cart" && (
                  <div>
                    <h2 className="text-lg lg:text-xl font-semibold mb-4 text-primary">Available Cart Items</h2>
                    {cartItems.length === 0 ? (
                      <div className="w-full h-30 flex-col-center justify-center">
                        <p className="text-text">Your cart is empty</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end justify-evenly">
                        {cartItems.map((item) => (
                          <div key={item.id} className="h-fit w-full flex justify-between items-center border border-gray-200 shadow p-4 rounded mb-2 flex-wrap gap-4">
                              <div className="w-fit h-fit flex-row-center flex-wrap gap-2">
                                  {/* item image */}
                                      <img
                                          src={item.image}
                                          alt={item.title}
                                          className="w-[95%] m-auto sm:w-36 h-38 sm:h-30 object-cover rounded-lg mr-4 bg-bg-dark text-sm border border-gray-300"
                                      />
                      
                                  {/* item name and price */}
                                  <div className="w-fit h-30 flex-col-start justify-evenly">
                                        <h3 className="font-semibold">{item.title}</h3>
                                         <p>Total item cost: ${(item.price * (item.sizeKg || 1) * item.qty).toFixed(2)}</p>

                                      <div className="flex items-center gap-2">
                                        <button
                                          className="w-9 h-8 border border-gray-300 rounded-md hover:bg-bg-dark cursor-pointer"
                                          onClick={() => decreaseQty(item.id)}
                                        >-</button>
                                        <span  className="w-16 h-10 bg-gray-200 rounded-lg flex-col-center justify-center">{item.qty}</span>
                                        <button
                                           className="w-9 h-8 border border-gray-300 rounded-md hover:bg-bg-dark cursor-pointer"
                                          onClick={() => increaseQty(item.id)}
                                        >+</button>
                                      </div>
                                  </div>
                              </div>

                             {/* remove button */}
                            <button
                              className="text-red-600 bg-bg p-2 rounded-md hover:bg-bg-dark cursor-pointer duration-300 text-sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}

                          <div className="w-full sm:w-80 h-38 border border-gray-300 rounded-lg mt-4 flex-col-center justify-evenly p-4 py-2 mb-8">
                              <h3 className="text-xl font-semibold w-full flex items-center justify-between">Grand Total: <span>${total.toFixed(2)}</span></h3>

                              <button
                                className="w-full bg-primary  cursor-pointer hover:shadow-2xl hover:shadow-primary-light/50 duration-300 text-white px-6 py-3 rounded-lg"
                                onClick={clearCart}
                              >
                                Request Order
                              </button>
                          </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Cart History */}
                {activeTab === "history" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-primary">Cart History</h2>
                    {cartHistory.length === 0 ? (
                      <p className="text-gray-500">No past carts found</p>
                    ) : (
                      cartHistory.map((cart, index) => (
                        <div key={index} className="border border-gray-100 shadow p-4 rounded mb-2">
                          <h3 className="font-semibold text-xl">Cart {index + 1} Items</h3>
                          <ul className="ml-4 list-disc">
                            {cart.map((item) => (
                              <li key={item.id}>{item.title} x {item.qty} (${item.price})</li>
                            ))}
                          </ul>
                          <button
                                className="mt-4 bg-red-300 text-white px-4 py-2 rounded"
                                onClick={clearCartHistory}
                              >
                                Clear Cart History
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Orders */}
                {activeTab === "orders" && (
                  <div>
                        <h2 className="text-xl font-semibold mb-4 text-primary">My Orders</h2>
                        <div className="p-4 rounded mb-2">
                        <table className="w-full text-left border-collapse ">
                              <thead>
                                <tr className="bg-bg-dark text-maintext font-semibold">
                                  <th className="py-3 px-4">Order ID</th>
                                  <th className="py-3 px-4">Date</th>
                                  <th className="py-3 px-4">Order Total</th>
                                  <th className="py-3 px-4">Status</th>
                                  <th className="py-3 px-4 text-right">Action</th>
                                </tr>
                              </thead>

                              <tbody>
                                {orders.length === 0 ? (
                                  <tr>
                                    <td
                                      colSpan="5"
                                      className="py-8 text-center text-text opacity-70"
                                    >
                                      No Orders Found
                                    </td>
                                  </tr>
                                ) : (
                                  orders.map((order, index) => (
                                    <tr
                                      key={order.id}
                                      className={`${
                                        index % 2 === 0 ? "bg-bg-light" : "bg-transparent"
                                      } hover:bg-bg duration-300 text-sm`}
                                    >
                                      <td className="py-3 px-4">{order.id}</td>
                                      <td className="py-3 px-4">{order.date}</td>
                                      <td className="py-3 px-4">${order.totalOrder}</td>
                                      <td className={`${order.status==="processing"?"text-primary":"text-maintext"} py-3 px-4 capitalize`}>{order.status}</td>

                                      <td className="py-3 px-4 text-right">
                                        {order.status === "processing" ? (
                                          <button className="bg-primary-light text-white px-4 py-2 rounded-lg shadow-sm hover:opacity-90 duration-300 cursor-pointer">
                                            Modify
                                          </button>
                                        ) : (
                                          <button
                                            className="bg-bg-dark text-text/80 px-4 py-2 rounded-lg cursor-not-allowed opacity-50 border border-gray-300"
                                            disabled
                                          >
                                            Modify
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                        </div>
                  </div>
                )}
          </div>

        </main>
      </div>
    </div>
  );
}
