import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faHouse, 
    faUser, 
    faGears, 
    faBriefcase, 
    faEnvelope, 
    faTags, 
    faAngleRight
  } from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";

export default function MobileMenu({isOpen}) {
  const menuRef = useRef(null);
  //mobile menu closing on clicking nav link
  const [isClosed, setIsClosed] = useState(false);

  useGSAP(() => {
    if (isOpen) {
      // Animate menu in
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    } 
    else {
      // Animate menu out
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  //close the menu on clicking the nav link
  useGSAP(() => {
    if (isClosed) {
      // Animate menu out
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [isClosed]);

  return (
    <div className="w-full h-screen overflow-x-hidden fixed top-0 right-0 z-40 sm:hidden ">
      {/* Overlay Menu */}
      <div ref={menuRef} className="bg-background absolute top-14 right-0 w-[95%] h-[90vh] text-maintext p-1 shadow-[#2e2e3f] shadow-lg flex-col-center z-50 opacity-0 " >
        <h2 className="font-bold border-b border-text text-center w-[80%] pb-2">Menu</h2>
        <ul className="pb-8 p text-sm flex-col-start justify-evenly w-[95%] h-full mobileList rounded-lg">
            <li onClick={()=>setIsClosed(!isClosed)}> <Link to="/" className="w-full"> <FontAwesomeIcon icon={faHouse} className="mobileNavIcon"/> home <FontAwesomeIcon icon={faAngleRight} className="navAngleIcon"/> </Link> </li>
            <li onClick={()=>setIsClosed(!isClosed)}> <Link to="/about" className="w-full"> <FontAwesomeIcon icon={faUser} className="mobileNavIcon"/> about <FontAwesomeIcon icon={faAngleRight} className="navAngleIcon"/> </Link></li>
            <li onClick={()=>setIsClosed(!isClosed)}> <Link to="/brands" className="w-full"> <FontAwesomeIcon icon={faGears} className="mobileNavIcon"/> products <FontAwesomeIcon icon={faAngleRight} className="navAngleIcon"/> </Link></li>
            <li onClick={()=>setIsClosed(!isClosed)}> <Link to="/contact" className="w-full"> <FontAwesomeIcon icon={faBriefcase} className="mobileNavIcon"/>contact <FontAwesomeIcon icon={faAngleRight} className="navAngleIcon"/> </Link></li>
        </ul>
      </div>
    </div>
  );
}
