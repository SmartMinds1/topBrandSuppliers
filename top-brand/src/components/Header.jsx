import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBars, 
  faCartShopping, 
  faSearch, 
  faTimes,
  faAngleDown, 
  faUser, 
  faAngleUp,
  faSignOut
} from "@fortawesome/free-solid-svg-icons";

import MobileMenu from "./MobileMenu";
import { useCart } from "../context/CartContext";


import { verifyAccessToken } from "../utils/authHelper";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/modals/AuthModal";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import ForgotPassword from "../pages/ForgotPassword";
import LogoutButton from "../dashboard/logoutButton";


const Header = () => {
/* Auth states */
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  
  const { cartItems } = useCart();
 //displaying cart items count 
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

//navigate to admin dashboard on successfull login (this works if there's a direct admin button)
  const handleCartAccess = async () => {
        await verifyAccessToken();
        navigate("/cart");
  };


  return (
    <>
      {/* Header */}
      <div className="w-full h-14 m-auto flex-row-end justify-between sm:h-13 fixed top-0 left-0 z-50 pb-2  backdrop-blur-[5px]">{/* bg-[#ffffff7c] pr-[5%]*/}
        {/* logo */}
        <div className="w-22 h-8 ml-4 bg-[url('/dropletLogoBlack2.png')] bg-contain bg-no-repeat"></div>

        {/* Desktop nav */}
        <div className="sm:block hidden w-[55%] md:w-[50%] lg:w-[40%]">
          <ul className="text-maintext text-sm headerLink flex-row-center justify-evenly w-full h-fit">
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
                <div className="w-36 h-8 hover:w-60 duration-800 ease-in-out absolute top-2 right-44 rounded-2xl flex-row-center gap-1 pl-1 hidden xl:flex bg-bg-dark">
                    <FontAwesomeIcon icon={faSearch} className="text-lg text-text" />
                    <p className="text-text text-sm">Search</p>
                </div>

            {/* user account */}
                <div className="absolute w-28 right-15 top-2">
                    <div className="w-full xl:w-15 p-1 flex-row-end justify-end xl:justify-evenly">
                      <FontAwesomeIcon icon={faUser} className="text-primary text-xl" />
                      <button onClick={() => setOpenAcc(prev => !prev)}>
                          {openAcc ? (
                              <FontAwesomeIcon icon={faAngleUp} className="text-sm text-maintext font-extralight cursor-pointer hover:text-accent" />
                          ) : (
                              <FontAwesomeIcon icon={faAngleDown} className="text-sm text-maintext cursor-pointer hover:text-accent" />
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
                        <li className="cursor-pointer hover:bg-red-50 text-text w-full pl-2 flex-row-start p-1">
                            <FontAwesomeIcon icon={faSignOut} className='pr-2 p-1 text-sm' />
                            <LogoutButton />
                        </li> 
                      </ul>
                            
                </div>

            {/* Cart */}
                <div className="relative w-8 h-8 rounded-full flex-row-center justify-center bg-bg-dark">
                  {/*   <NavLink to="/cart" className={({ isActive }) => isActive ? "text-primary" : ""}>
                      <FontAwesomeIcon icon={faCartShopping} className="text-xl pt-2" />
                    </NavLink> */}
                    <p 
                       className={({ isActive }) => isActive ? "text-primary" : ""}
                       onClick={()=>handleCartAccess()}
                    >
                       <FontAwesomeIcon icon={faCartShopping} className="text-xl pt-2" />
                    </p>

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
                <FontAwesomeIcon icon={faTimes} className="text-xl text-maintext font-extralight" />
            ) : (
                <FontAwesomeIcon icon={faBars} className="text-2xl text-maintext" />
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

export default Header;
