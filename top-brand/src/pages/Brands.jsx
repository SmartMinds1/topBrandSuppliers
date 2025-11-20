import React, { useState, useRef } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSeedling } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../components/ProductCard'
import { clovesList } from '../../constants'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'

const Brands = () => {
  /* setting up active product */
  const [activeProduct, setActiveProduct] = useState("cloves");


 /*  Let's now animate our product cards */
  // checking if array is empty or undefined
  if (!clovesList || clovesList.length === 0) return null;

  // equivalent of box1Ref, box2Ref, box3Ref
  const cardsRef = useRef([]); 

  useGSAP(() => {
    // Equivalent to using [box1Ref.current, box2Ref.current, box3Ref.current]
    const cardElements = cardsRef.current;

    gsap.fromTo(
      cardElements,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardElements[0],   // same as using box1Ref.current
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);



  return (
   <div>
      {/*  Nav bar */}
      <Header/>

     {/* ------------------SECTION 1 -------------------------*/}
     <div className='w-full h-fit mt-40 mb-16'>
            <div className='w-full h-15 flex-row-center justify-center'>
               <div> <FontAwesomeIcon icon={faSeedling} className='mainIcon'/> </div>
               <p className='headerTextGradient'>Our Natural Products</p>           
            </div>
            <p className='bodyText'>Discover natural products grown with care and delivered with precision. From rich honey to quality cashews and cloves, we maintain purity at every step.</p>
            <div className='w-full h-fit text-center mb-4 -translate-y-8 flex-row-center justify-center gap-12'>
               <button className="btn-primary green-shadow"> Bulk Quote</button>
               <button className="btn-secondary green-shadow">Call to Order</button>
            </div>
      </div>

     {/* ------------------SECTION 2 -------------------------*/}
         {/*  products bar */}
           <div className='w-[50%] h-12 bg-bg-light rounded-4xl m-auto shadow-lg'>
              <ul className='flex-row-center justify-evenly text-maintext h-full w-full productLink'>
                <li onClick={() => setActiveProduct("cloves")}  className={`${activeProduct === "cloves" ? "bg-bg-dark" : ""}`}>cloves</li>
                <li onClick={() => setActiveProduct("honey")}   className={`${activeProduct === "honey" ? "bg-bg-dark" : ""}`}>honey</li>
                <li onClick={() => setActiveProduct("cashews")} className={`${activeProduct === "cashews" ? "bg-bg-dark" : ""}`}>cashews</li>
                <li onClick={() => setActiveProduct("ginger")}  className={`${activeProduct === "ginger" ? "bg-bg-dark" : ""}`}>ginger</li>
                <li onClick={() => setActiveProduct("macadamia")} className={`${activeProduct === "macadamia" ? "bg-bg-dark" : ""}`}>macadamia</li>
              </ul>
           </div>

     {/* ------------------SECTION 2 -------------------------*/}
          {activeProduct === "cloves" &&  
             <div className='w-full h-fit mt-8'>
                {/* proudct caption */}
                  <div className='w-[75%] m-auto h-fit flex flex-col sm:flex-row items-center justify-center mb-8 p-4 sm:p-0 '>
                    <p className='w-[95%] sm:w-1/3 h-fit text-maintext headerText'>Aromatic Cloves</p>
                    <p className='w-full text-left sm:w-1/2 p-4 h-fit text-text cardText'> Strong, fragrant cloves ideal for enhancing flavor, crafting spice blends, and supporting natural home remedies.</p>
                  </div>

                {/* product cards */}
                  <div className="flex flex-row-center justify-evenly w-full h-fit">
                      {clovesList.map((card, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)} // SAME as using box1Ref, box2Ref, box3Ref
                            >
                            <ProductCard {...card} /> {/* sending all the props to the card component */}
                        </div>
                      ))}
                  </div> 
             </div>
          }

   
          {activeProduct === "honey" &&  
            <div className='w-full h-[50vh] mt-16'>
                <p className='subHeader w-full text-center'>Golden Nature Honey</p>
                <p className='bodyText'>Pure, rich, and naturally harvested from eco-friendly apiaries. Packed with flavor and nutrients for everyday wellness.</p>
            </div>
          }

          {activeProduct === "cashews" &&  
            <div className='w-full h-[50vh]  mt-16'>
                <p className='subHeader w-full text-center'>Premium Cashews</p>
                <p className='bodyText'>Carefully selected, rich, and naturally crisp. Perfect for snacking, cooking, and quality cashew products.</p>
            </div>
          }

          {activeProduct === "ginger" &&  
            <div className='w-full h-[50vh]  mt-16'>
                <p className='subHeader w-full text-center'>Pure Ginger</p>
                <p className='bodyText'>Aromatic, sun-dried ginger with strong flavor—perfect for tea blends, spice mixes, and food processing.</p>
            </div>
          }

          {activeProduct === "macadamia" &&  
            <div className='w-full h-[50vh]  mt-16'>
                <p className='subHeader w-full text-center'>Elite Macadamia</p>
                <p className='bodyText'>Rich, carefully selected macadamia nuts, ideal for snacking, baking, and creating high-quality nut products with consistent freshness.</p>
            </div>
          }

     <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              
      <Footer/>
   </div>
  )
}

export default Brands