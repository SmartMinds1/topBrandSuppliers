import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faAngleDown,
  faAngleUp,
  faBars, 
  faCartShopping, 
  faSearch, 
  faSignOut, 
  faTimes, 
  faUser
} from "@fortawesome/free-solid-svg-icons";

import MobileMenu from "./MobileMenu";
import { useCart } from "../context/CartContext";

import { verifyAccessToken } from "../utils/authHelper";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuthModal from "./modals/AuthModal";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import LogoutButton from "../dashboard/logoutButton";
gsap.registerPlugin(ScrollTrigger);

const HomeHeader = () => {
  /* Auth states */
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);

  //displaying cart items count 
  const { cartItems } = useCart();
  const count = cartItems.reduce((t, i) => t + i.qty, 0);

  //Current active user
   const [activeUser, setActiveUser] = useState("");

  //Fetching active User from access token
    useEffect(() => {
    const loadUser = async () => {
      await verifyAccessToken();
  
      //Read token AFTER refresh
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setActiveUser(null);
        return;
      }
      try {
        //Decode JWT
        const decoded = jwtDecode(token);
  
        //Extract username
        setActiveUser(decoded.username ?? null);
      } catch (err) {
        console.error("Failed to decode token", err);
        setActiveUser(null);
      }
    };
    loadUser();
  }, []);


  //hadling switch to signIn
  const handleSwitchToSignIn = (message) => {
    setShowSignUp(false);
    setSignUpMessage(message);
    setShowSignIn(true);
  };

  //hadling switch to signUp
  const handleSwitchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  //hadling switch to forgot password
  const handleSwitchToForgotPassword = () => {
    setShowSignIn(false);
    setShowForgotPass(true);
  };


  /* GSAP HEADER COLOR SWITCHING */
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "body",
      start: "top -80%",
      onEnter: () => {
        gsap.to(".site-header", { duration: 0.3, backgroundColor: "white" });
  
        // Header text
        gsap.to(".header-text", { color: "#1F4D3A", duration: 0.3 });

        // Logo
        gsap.to(".logo-light", { duration: 0.3, opacity: 0});
        gsap.to(".logo-dark", { duration: 0.3, opacity: 1});

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
        gsap.to(".logo-light", { duration: 0.3, opacity: 1});
        gsap.to(".logo-dark", { duration: 0.3, opacity: 0});
  
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
      <div className="site-header w-full h-14 m-auto flex-row-end justify-between sm:h-13 fixed top-0 left-0 z-50 pb-2 backdrop-blur-[5px]">{/* bg-[#ffffff7c] */}
        {/* logo light */}
        <div className="w-22 h-6 ml-4 bg-[url('/dropletLogoWhite4.png')] bg-contain bg-no-repeat logo-light relative"></div>
        {/* logo dark*/}
        <div className="w-22 h-8 mt-3 ml-4 bg-[url('/dropletLogoBlack2.png')] bg-contain bg-no-repeat logo-dark opacity-0 absolute top-0 left-0"></div>

        {/* Logo */}
    {/*     <div className="w-40 flex flex-row items-end justify-center">
          <div className="w-9 h-9 flex-col-center justify-start mr-0.5">
            <div className="logo-bg w-4/5 h-5/7 border-b-5 border-[#FFF] rounded-br-full rounded-bl-full"></div>
          </div>
          <p className="text-accent-light text-2xl font-extrabold">
             topB<span className="header-text text-bg text-2xl font-extralight">rand</span>
          </p>
        </div> */}

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

        <div className="w-14 flex-row-center justify-evenly relative pt-1 mr-4">
        {/* search bar */}
        <div className="w-36 h-8 hover:w-60 duration-800 ease-in-out absolute top-2 right-54 rounded-2xl flex-row-center gap-1 pl-1 hidden lg:flex bg-bg-dark">
                    <FontAwesomeIcon icon={faSearch} className="text-lg text-text" />
                    <p className="text-text text-sm">Search</p>
                </div>

            {/* user account */}
                <div className="absolute w-28 right-25 top-0.5 lg:top-2 bg-transparent">
                    <div className="w-40 p-1 flex-row-end justify-end">
                      <p className="text-xs md:text-sm text-bg-dark mr-1 header-text">{activeUser ? `Hi, ${activeUser}` : "Guest"}</p>
                      <div className="w-12 h-fit">
                        <FontAwesomeIcon icon={faUser} className="text-primary-light text-xl" />
                        <button onClick={() => setOpenAcc(prev => !prev)}>
                            {openAcc ? (
                                <FontAwesomeIcon icon={faAngleUp} className="text-sm text-bg-dark font-extralight cursor-pointer hover:text-accent header-text" />
                            ) : (
                                <FontAwesomeIcon icon={faAngleDown} className="text-sm text-bg-dark cursor-pointer hover:text-accent header-text" />
                            )}
                        </button>
                      </div>
                    </div>
                    
                      <ul className={`bg-bg mt-2 transition-all duration-300 overflow-hidden shadow flex-col-start justify-evenly ${openAcc ? 'h-29' : 'h-0'}`}>
                        <li
                            className="text-sm cursor-pointer hover:bg-bg-dark duration-300 w-full p-2 text-text"
                            onClick={() => {
                            setShowSignIn(true);
                            setShowSignUp(false);
                            setOpenAcc(false);
                            setIsOpen(false);
                          }}
                        >
                          Sign In
                        </li>
                        <li
                            className="text-sm cursor-pointer hover:bg-bg-dark duration-300 w-full p-2 text-text"
                            onClick={() => {
                            setShowSignUp(true);
                            setShowSignIn(false);
                            setOpenAcc(false);
                            setIsOpen(false);
                          }}
                        >
                          Sign Up
                        </li>
                        <li className="cursor-pointer hover:bg-red-50 text-text w-full pl-2 flex-row-start p-1">
                            <FontAwesomeIcon icon={faSignOut} className='pr-2 p-1 text-sm' />
                            <LogoutButton />
                        </li> 
                      </ul>
                            
                </div>

            {/* Cart */}
                <div className="relative w-8 h-8 rounded-full flex-row-center justify-center bg-bg-dark cursor-pointer">
                    <NavLink to="/cart" className={({ isActive }) => isActive ? "text-primary" : ""}>
                      <FontAwesomeIcon icon={faCartShopping} className="text-xl pt-2" />
                    </NavLink> 
                    {count > 0 && (
                      <span className="absolute -top-1 -right-2 sm:-right-1.5 bg-accent text-bg-light text-xs px-1 py-0 sm:px-1.5 sm:py-0.5 rounded-full">
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
                    <FontAwesomeIcon icon={faTimes} className="text-sm text-maintext font-extralight ml-1 mt-2" />
                ) : (
                    <FontAwesomeIcon icon={faBars} className="text-xl header-text text-bg" />
                )}
            </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* showing login popUp */}
      {showSignIn && (
        <AuthModal isOpen={showSignIn} onClose={() => setShowSignIn(false)}>
          {/*Any popUP right here */}
          <SignIn
            signUpResponse={signUpMessage}
            closeSignIn={() => setShowSignIn(false)}
            onForgotPass={() => handleSwitchToForgotPassword()}
            onDontHaveAccount={() => handleSwitchToSignUp()}
          />
        </AuthModal>
      )}

      {/* showing signUp popUp */}
        {showSignUp && (
          <AuthModal isOpen={showSignUp} onClose={() => setShowSignUp(false)}>
            {/* Any popUP right here */}
            <SignUp
              onSuccess={handleSwitchToSignIn}
              closeSignUp={() => setShowSignUp(false)}
            />
          </AuthModal>
        )}

      {/* showing forgotPassword popUp */}
        {showForgotPass && (
          <AuthModal isOpen={showForgotPass} onClose={() => setShowForgotPass(false)}>
            {/*Any popUP right here */}
            <ForgotPassword closeForgotPass={() => setShowForgotPass(false)} />
          </AuthModal>
        )}
    
    </>
  );
};

export default HomeHeader;
