import React, { useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHouse,  
  faAngleRight,
  faUserCircle,
  faTags,
  faPhoneAlt
} from "@fortawesome/free-solid-svg-icons";
import { useGSAP } from "@gsap/react";

export default function MobileMenu({ isOpen, setIsOpen }) {
  const menuRef = useRef(null);

  useGSAP(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.4,
        ease: "power3.in"
      });
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full h-[85vh] overflow-y-hidden overflow-x-hidden fixed top-8 right-0 z-40 sm:hidden pointer-events-none">
      <div
        ref={menuRef}
        className="bg-bg absolute top-6 right-0 w-[98%] h-[90vh] pt-12 text-maintext p-2 shadow-[#2e2e3f] shadow-lg flex flex-col items-center z-50 opacity-0 pointer-events-auto rounded-lg"
      >
        <h2 className="font-bold border-b border-accent text-center w-[80%] pb-2">
          Menu
        </h2>

        <ul className="text-sm flex flex-col justify-start gap-12 pt-12 w-[95%] h-full mobileList rounded-lg text-tex">
          <li onClick={handleClose}>
            <Link to="/" className="w-full flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faHouse} className="mobileNavIcon" />
                Home
              </span>
              <FontAwesomeIcon icon={faAngleRight} className="navAngleIcon" />
            </Link>
          </li>

          <li onClick={handleClose}>
            <Link to="/about" className="w-full flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUserCircle} className="mobileNavIcon" />
                About
              </span>
              <FontAwesomeIcon icon={faAngleRight} className="navAngleIcon" />
            </Link>
          </li>

          <li onClick={handleClose}>
            <Link to="/brands" className="w-full flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faTags} className="mobileNavIcon" />
                brands
              </span>
              <FontAwesomeIcon icon={faAngleRight} className="navAngleIcon" />
            </Link>
          </li>

          <li onClick={handleClose}>
            <Link to="/contact" className="w-full flex items-center justify-between">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faPhoneAlt} className="mobileNavIcon" />
                Contact
              </span>
              <FontAwesomeIcon icon={faAngleRight} className="navAngleIcon" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
