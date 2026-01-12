import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faAngleDown,
  faAngleUp,
  faBars, 
  faCartShopping, 
  faSearch, 
  faTimes, 
  faUser
} from "@fortawesome/free-solid-svg-icons";

import MobileMenu from "./MobileMenu";
import { useCart } from "../context/CartContext";

import { verifyAccessToken } from "../utils/authHelper";
import { useNavigate } from "react-router-dom";

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AuthModal from "./modals/AuthModal";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
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

  const navigate = useNavigate();

  //navigate to admin dashboard on successfull login
  const handleAdminAccess = async () => {
    const isAuthenticated = await verifyAccessToken();

    if (isAuthenticated) {
      // Already logged in, go straight to dashboard
      navigate("/admin");
    } else {
      // Not logged in, show Sign In modal
      setShowSignIn(true);
    }
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
      <div className="site-header w-full h-14 m-auto flex-row-end justify-between sm:h-13 fixed top-0 left-0 z-50 pb-2 pr-[5%] backdrop-blur-[5px]">{/* bg-[#ffffff7c] */}
        {/* logo light */}
        <div className="w-30 h-9 ml-4 bg-[url('/ORIGINAL_LOGO1.png')] bg-contain bg-no-repeat logo-light relative"></div>
        {/* logo dark*/}
        <div className="w-30 h-9 ml-4 bg-[url('/ORIGINAL_LOGO3.png')] bg-contain bg-no-repeat logo-dark opacity-0 absolute top-0 left-0"></div>

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
                <div className="w-36 h-9 hover:w-60 duration-800 ease-in-out absolute top-2 right-42 rounded-2xl flex-row-center gap-1 pl-1 hidden xl:flex bg-bg">
                    <FontAwesomeIcon icon={faSearch} className="text-lg text-text" />
                    <p className="text-text text-sm">Search</p>
                </div>

            {/* user account */}
                <div className="absolute w-24 right-15 top-2">
                    <div className="w-15 p-1 flex-row-end justify-evenly">
                      <FontAwesomeIcon icon={faUser} className="text-bg header-text text-xl" />
                      <button onClick={() => setOpenAcc(prev => !prev)}>
                          {openAcc ? (
                              <FontAwesomeIcon icon={faAngleUp} className="text-sm text-bg header-text font-extralight cursor-pointer hover:text-accent" />
                          ) : (
                              <FontAwesomeIcon icon={faAngleDown} className="text-sm text-bg header-text cursor-pointer hover:text-accent" />
                          )}
                      </button>
                    </div>
                      <ul className={`bg-bg transition-all duration-300 overflow-hidden shadow flex-col-start justify-evenly ${openAcc ? 'h-29' : 'h-0'}`}>
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
                      </ul>     
                </div>

            {/* Cart */}
                <div className="relative w-10 h-10 rounded-full flex-row-center justify-center bg-bg-dark">
                    <NavLink to="/cart" className={({ isActive }) => isActive ? "text-primary" : ""}>
                      <FontAwesomeIcon icon={faCartShopping} className="text-xl pt-2" />
                    </NavLink>

                    {count > 0 && (
                      <span className="absolute -top-1 -right-4 sm:-right-1.5 bg-accent text-bg-light text-xs px-1.5 py-0.5 rounded-full">
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
