// src/pages/CartPage.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxesPacking, faCartShopping, faHistory, faShoppingCart, faSignOut, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import OrdersTable from "../context/OrdersTable";

export default function Cart() {
  const { cartItems, cartHistory, increaseQty, decreaseQty, removeFromCart, clearCart, clearCartHistory } =
    useCart();

  //States to manage what's displayed on the customer dashboard
  const [activeTab, setActiveTab] = useState("cart");

  /* calculating total cost */
  const total = cartItems.reduce(
    (t, item) => t + parseFloat(item.price) * (item.sizeKg) * item.qty,
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
{           <div className="w-full ml-2 h-16 border border-r-0 border-t-0 border-l-0 border-gray-300 text-maintext  flex-row-center justify-start pl-2 pr-2 sm:pl-6 sm:pr-6 bg-bg sm:bg-bg-light absolute top-0 ">
              <p className="text-xl font-semibold">  <FontAwesomeIcon icon={faShoppingCart} className="text-lg lg:text-xl text-accent"/> Cart Manager</p>
            </div>}


          {/* content data */}
          <div className="w-full p-2 lg:p-8 pt-8 h-[74vh] overflow-y-scroll">
                {/* Cart Items */}
                {activeTab === "cart" && (
                  <div>
                    <h2 className="text-lg lg:text-xl mb-4 text-primary hidden sm:block">Available Cart Items</h2>
                    {cartItems.length === 0 ? (
                      <div className="w-full h-30 flex-col-center justify-center">
                        <p className="text-text">Your cart is empty</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end justify-evenly">
                        {cartItems.map((item) => (
                          <div key={item.id} className="h-fit w-full flex justify-between items-center border border-gray-200 shadow p-1 sm:p-4 rounded mb-2 flex-wrap ">
                              <div className="w-fit h-fit flex-row-center flex-wrap">
                                {/* item image */}
                                  <img
                                      src={item.image}
                                      alt={item.title}
                                      className="m-auto w-24 h-24 sm:w-36 sm:h-30 object-cover rounded-lg mr-3 sm:mr-4 bg-bg-dark text-sm border border-gray-300"
                                  />
                      
                                {/* item name and price */}
                                  <div className="w-fit h-30 flex-col-start justify-start">
                                         <h4 className="font-semibold pt-2">{item.sizeKg}kg {item.title} x {item.qty} </h4>
                                         <p className="text-text text-sm mb-4 mt-0.5">Total item cost: <span className="text-primary text-sm font-semibold">${(item.price * (item.sizeKg) * item.qty).toFixed(2)}</span></p>

                                      <div className="flex items-center gap-2">
                                        <button
                                          className="w-7 h-6 border border-gray-300 rounded-md hover:bg-bg-dark cursor-pointer"
                                          onClick={() => decreaseQty(item.id, item.sizeKg)}
                                        >-</button>
                                        <span  className="w-14 h-8 bg-gray-200 rounded-lg flex-col-center justify-center">{item.qty}</span>
                                        <button
                                          className="w-7 h-6 border border-gray-300 text-sm rounded-md hover:bg-bg-dark cursor-pointer"
                                          onClick={() => increaseQty(item.id, item.sizeKg)}
                                        >+</button>
                                      </div>
                                  </div>
                              </div>

                          {/* remove button */}
                            <button
                              className="text-red-600 bg-bg p-1 sm:p-2 rounded-md hover:bg-bg-dark cursor-pointer duration-300 text-sm hidden sm:flex"
                              onClick={() => removeFromCart(item.id, item.sizeKg)}
                            >
                              Remove
                            </button>
                          {/* button for mobiles */}
                            <button
                              className="text-red-500 rounded-md hover:brightness-75 cursor-pointer duration-300 text-sm sm:hidden"
                              onClick={() => removeFromCart(item.id, item.sizeKg)}
                            >
                              <FontAwesomeIcon icon={faTrashAlt}/>
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
                  <div className="mb-12">
                    <h2 className="text-lg  sm:mb-4 text-primary">Cart History</h2>
                    {cartHistory.length === 0 ? (
                      <p className="text-gray-500">No past carts found</p>
                    ) : (
                      cartHistory.map((cart, index) => (
                      <div key={cart.id} className="border border-gray-100 shadow rounded mb-2">
                          {/* Header */}
                          <div className="flex justify-between items-center mb-3">
                              <h3 className="font-bold">Cart {index + 1}</h3>
                              <span className="text-xs text-gray-500">{new Date(cart.createdAt).toLocaleString()}</span>
                          </div>
                          
                          {/* Item info */}
                          <div>
                            {cart.items.map((item) => (
                              <div key={`${item.id}_${item.sizeKg}`} className="w-fit h-fit flex-row-center flex-wrap sm:mb-4">
                                  {/* item image */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="m-auto w-24 h-24 sm:w-36 sm:h-30 object-cover rounded-lg mr-3 sm:mr-4 bg-bg-dark text-sm border border-gray-300"
                                    />

                                  {/* item name and price */}
                                  <div className="w-fit h-30 flex-col-start justify-center">
                                        <h4 className="font-semibold pt-2">{item.sizeKg}kg {item.title} x {item.qty} </h4>
                                        <p className="text-text text-sm mb-4 mt-0.5">Total cost: <span className="text-primary text-sm font-semibold">${(item.price * (item.sizeKg) * item.qty).toFixed(2)}</span></p>
                                  </div>
                              </div>
                            ))}
                          </div>

                          {/* total order cost */}
                          <h4 className="font-semibold mt-2">
                              Order Total:$ {cart.items.reduce((sum, item) => sum + item.price * item.sizeKg * item.qty,0)}
                          </h4>

                          {/* clear cart history button */}
                          <button
                                className="mt-4 bg-red-400 cursor-pointer text-white px-4 py-2 rounded"
                                onClick={() => clearCartHistory(cart.id)}
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
                    <h2 className="text-lg sm:mb-4 text-primary ">My Orders</h2>
                    <div className="p-4 rounded mb-2">
                        <OrdersTable/>
                    </div>
                  </div>
                )}
          </div>

        </main>
      </div>
    </div>
  );
}
