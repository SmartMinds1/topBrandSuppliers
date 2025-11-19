import React, { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const StatsCard = () => {
  
    const countersRef = useRef([]);

      useGSAP(() => {
        countersRef.current.forEach((el, i) => {
          let target = el.getAttribute("data-target"); // target value
          let counter = { val: 0 };

          gsap.to(counter, {
            val: target,
            duration: 2,
            ease: "power1.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: () => {
                const value = Math.floor(counter.val);
                const symbol = el.getAttribute("data-symbol") || "";
                el.textContent = value + symbol;
              }
              
          });
        });
      }, []);
  
    return (
       <div className='w-[90%] m-auto h-fit flex-row-center justify-evenly flex-wrap'>
            <div className='w-85 p-2 h-60 flex flex-col items-start justify-evenly'>
                <div ref={(el) => (countersRef.current[0] = el)} data-target="98" data-symbol="%" className='text-7xl font-modern-negra text-green-900'>0%</div>
                <p className='text-maintext text-2xl'>Client Satisfaction</p>
                <p className='tracking-wide text-text '>Customers consistently trust the quality and purity of our natural products.</p>
            </div>

           <div className='w-85 p-2 h-60 flex flex-col items-start justify-evenly'>
                <div ref={(el) => (countersRef.current[1] = el)} data-target="20" data-symbol="+" className='text-7xl font-modern-negra text-green-900'>0+</div>
                <p className='text-maintext text-2xl'>Trusted Brands Partnered</p>
                <p className='tracking-wide text-text '>We work with reputable farms and suppliers committed to high standards.</p>
            </div>

           <div className='w-85 p-2 h-60 flex flex-col items-start justify-evenly'>
                <div ref={(el) => (countersRef.current[2] = el)} data-target="100" data-symbol="+" className='text-7xl font-modern-negra text-green-900'>0+</div>
                <p className='text-maintext text-2xl'>Successful Shipments</p>
                <p className='tracking-wide text-text '>Reliable global and regional deliveries completed with care and consistency.</p>
            </div>
       </div> 
  )
}

export default StatsCard