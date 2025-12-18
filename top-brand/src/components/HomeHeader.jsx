import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faCartShopping, 
  faSearch, 
  faTimes 
} from "@fortawesome/free-solid-svg-icons";

import MobileMenu from "./MobileMenu";
import { useCart } from "../context/CartContext";

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const HomeHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();

  const count = cartItems.reduce((t, i) => t + i.qty, 0);


  /* GSAP COLOR SWITCHING */
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "body",
      start: "top -80%",
      onEnter: () => {
        gsap.to(".site-header", { duration: 0.3, backgroundColor: "white" });
  
        // Header text
        gsap.to(".header-text", { color: "#1F4D3A", duration: 0.3 });

        // Logo
        gsap.to(".logo-bg", { borderColor: "#1F4D3A", duration: 0.3 });

        // brand text
        gsap.to(".brand-light", { color: "#1F4D3A", duration: 0.3 });

        // Nav links text
        gsap.to(".navLinks-light li", { color: "#000", duration: 0.3 });
  
     
      },
      onLeaveBack: () => {
        gsap.to(".site-header", { duration: 0.3, backgroundColor: "transparent" });

      // revert Header text
        gsap.to(".header-text", { color: "#FFF", duration: 0.3 });

      // revert Logo
        gsap.to(".logo-bg", { borderColor: "#FFF", duration: 0.3 });
  
       // revert nav links text
        gsap.to(".navLinks-light li", { color: "#FFF", duration: 0.2 });
  
        // revert mobile icons
        gsap.to(".mobile-icon", { color: "#99a1af", duration: 0.3 });
      }
    });
  }, []);
  
  

  return (
    <>
      {/* Header */}
      <div className="site-header w-full h-14 m-auto flex-row-end justify-between sm:h-13 fixed top-0 left-0 z-50 pb-2 pr-[5%] backdrop-blur-[5px]">{/* bg-[#ffffff7c] */}
        
        {/* Logo */}
        <div className="w-40 flex flex-row items-end justify-center">
          <div className="w-9 h-9 flex-col-center justify-start mr-0.5"> {/* bg-[#111111] */}
            <div className="logo-bg w-4/5 h-5/7 border-b-5 border-[#FFF] rounded-br-full rounded-bl-full"></div>
          </div>
          <p className="text-accent text-2xl font-extrabold">
             topB<span className="header-text text-bg text-2xl font-extralight">rand</span>
          </p>
        </div>

        {/* Desktop nav */}
        <div className="sm:block hidden w-[55%] md:w-[50%] lg:w-[40%]">
          <ul className="navLinks-light text-bg text-sm headerLink flex-row-center justify-evenly w-full h-fit">
            <li><NavLink to="/" className={({ isActive }) => isActive ? "text-accent" : ""}>home</NavLink></li>
            <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-accent" : ""}>about</NavLink></li>
            <li><NavLink to="/brands" className={({ isActive }) => isActive ? "text-accent" : ""}>brands</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-accent" : ""}>contact</NavLink></li>
          </ul>
        </div>

        {/* Right section */}
        <div className="w-36 bg-transparent border-0"></div>

        <div className="absolute right-4 w-12 sm:w-36 hover:w-60 duration-800 ease-in-out h-9 rounded-lg bg-bg flex-row-center shadow">
          <div className="w-2/3 h-full rounded-2xl flex-row-center gap-1 pl-1 hidden sm:flex">
            <FontAwesomeIcon icon={faSearch} className="text-lg text-text" />
            <p className="text-text text-sm">Search</p>
          </div>

          <p className="text-2xl mr-2 text-text">|</p>

          {/* Cart */}
          <div className="relative w-1/5 h-full rounded-2xl flex-row-center justify-center">
            <NavLink to="/cart" className={({ isActive }) => isActive ? "text-accent" : ""}>
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
            </NavLink>

            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-bg-light text-xs px-2 py-1 rounded-full">
                {count}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="mobile-menu-button sm:hidden fixed top-15 left-2 z-50">
            <button onClick={() => setIsOpen(prev => !prev)}>
                {isOpen ? (
                    <FontAwesomeIcon icon={faTimes} className="text-2xl header-text text-bg font-extralight" />
                ) : (
                    <FontAwesomeIcon icon={faBars} className="text-2xl header-text text-bg" />
                )}
            </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default HomeHeader;
