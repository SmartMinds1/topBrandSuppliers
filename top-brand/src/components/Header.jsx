import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import MobileMenu from "./MobileMenu";
import { useCart } from "../context/CartContext";//for our cart

const Header = ()=> {
  //mobile menu control 
  const [isOpen, setIsOpen] = useState(false);

  //Cart Items
  const { cartItems } = useCart();
  const count = cartItems.reduce((t, i) => t + i.qty, 0);
  
    return(
      <>
        <div className="w-full h-12 m-auto flex-row-end justify-between sm:h-16 fixed top-0 left-0 z-50 p-2 pl-[5%] pr-[5%] backdrop-blur-[5px]">
           {/*  logo */}
            <div className="w-40 flex flex-row items-end justify-center">
                <div className="w-10 h-10 bg-[#111111] flex-col-center justify-start mr-0.5">
                    <div className="w-full h-2/3 border-b-2 border-yellow-500 rounded-br-full rounded-bl-full"></div>
                </div>
                <p className="text-maintext text-2xl font-extrabold">topB<span className="text-secondary text-2xl font-light">rand</span></p>
            </div>
            
            <div className="sm:block hidden  w-[55%] md:w-[50%] lg:w-[40%]">
                <ul className="text-text-light text-sm headerLink flex-row-center justify-evenly w-full h-fit">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "text-secondary" : ""}>home</NavLink> </li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-secondary" : ""}>about</NavLink> </li>
                    <li><NavLink to="/brands" className={({ isActive }) => isActive ? "text-secondary" : ""}>brands</NavLink> </li>
                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-secondary" : ""}>contact</NavLink> </li>
                </ul>
            </div>

           {/* dummy div */}
            <div className="w-36 bg-trasparent border-0"></div>

            <div className="absolute right-4 w-36 hover:w-60 duration-800 ease-in-out h-9 rounded-lg bg-text-light flex-row-center shadow">
                <div className="w-2/3 h-full rounded-2xl flex-row-center gap-1 pl-1">
                    <FontAwesomeIcon icon={faSearch} className="text-lg text-maintext"/>
                    <p className="text-text">Search</p>
                </div>
                <p className="text-2xl mr-2 text-text">|</p>

                {/* cart icon */}
                <div className="w-1/5 h-full rounded-2xl flex-row-center justify-center">
                    <NavLink to="/cart" className={({ isActive }) => isActive ? "text-secondary" : ""}><FontAwesomeIcon icon={faCartShopping} className="text-xl"/></NavLink>
                    {count > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-xs px-2 py-1 rounded-full">
                            {count}
                        </span>
                        )}
                </div>

            </div>

{/*             <button className="hidden sm:block text-bg-ligbg-bg-light bg-secondary m-0 rounded-3xl w-20 md:w-28 h-10 green-shadow">Call Now</button> */}
            
            {/* Mobile menu button */}
            <div className="mobile-menu-button sm:hidden">
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FontAwesomeIcon icon={faTimes} className="text-2xl text-maintext"/> : <FontAwesomeIcon icon={faBars} className="text-2xl text-maintext"/>}
                </button>
            </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen}/>
      

      </>
    )
}

export default Header
