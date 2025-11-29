import React, {useState, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp, faCircleQuestion } from "@fortawesome/free-solid-svg-icons";

//GSAP
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"

const FAQcard = ({faqAns, faqTitle})=>{
    const [toggleIcon, setToggleIcon] = useState(false);


      //ref to each box
      const faqRef = useRef(null);
       
    //cards  
      useGSAP(() => {
        gsap.fromTo(
          faqRef.current,// all boxes
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
              trigger: faqRef.current, // first box triggers all
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }, []);


    return(
    <details ref={faqRef} className="w-[95%] sm:w-[80%] md:w-[65%] lg:w-[50%] m-auto rounded-sm p-2 pt-8 pb-8 mb-4  shadow-md bg-bg" open={toggleIcon}>
        <summary 
                className="h-fit w-full cursor-pointer list-none text-lg flex-row-start flex-nowrap gap-2 justify-between" 
                onClick={(e)=>{
                e.preventDefault();
                setToggleIcon(!toggleIcon);
                }}>    
               <FontAwesomeIcon icon={faCircleQuestion} className="text-2xl text-secondary translate-y-1 mr-2" /> {faqTitle}
                { toggleIcon ? <FontAwesomeIcon icon={faAngleUp} className="text-6 text-secondary float-right sm:mr-4 mt-1 " /> : <FontAwesomeIcon icon={faAngleDown} className="text-6 text-secondary float-right sm:mr-4 mt-1" /> }
        </summary>

        {toggleIcon && <p className="ml-[4vw] text-text font-light tracking-wide leading-normal mt-4">{faqAns}</p>}

    </details>
    )
}

export default FAQcard