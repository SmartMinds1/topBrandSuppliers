import React, { useState, useRef } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLeaf, faSeedling, faSpa } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../components/ProductCard'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import ProductDetails from '../components/ProductDetails';
import Modal from '../components/Modal';
import { cashewList, clovesList, gingerList, honeyList, macadamiaList } from '../../constants/ProductList'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'


const Brands = () => {
  const [productLink, setProductLink] = useState("");
  const [showModal, setShowModal] = useState(false);

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

//The view details function is triggered from the Product card
    const viewDetails = (title)=>{
        setShowModal(true); 
        setProductLink(title);
    }

/* Animating brands page landing text */
   useGSAP(() => {
    gsap.fromTo( '.para',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        delay: 0.3,
        stagger: 0.3
      }
    );
  }, []);

  return (
   <div>
      {/*  Nav bar */}
      <Header/>

     {/* ------------------SECTION 1 -------------------------*/}
     <div className='w-full lg:w-[80%] m-auto h-fit pt-10 sm:pt-6 md:pt-16 lg:pt-6  lg:h-[80vh] mt-16 sm:mt-20 flex flex-col items-center sm:justify-evenly justify-center'>
            <div className='w-full h-fit lg:h-15 flex flex-col sm:flex-col items-center justify-center para'>
               <FontAwesomeIcon icon={faSeedling} className='text-4xl text-primary'/>
               <p className='headerTextGradient text-center sm:text-left'>Our Natural Products</p>           
            </div>
            <p className='bodyText para'>  Discover natural products grown with care and delivered with precision. From rich honey to premium cashews and cloves, we ensure freshness, purity, and high-quality standards from farm to export.</p>
            <div className='w-full h-fit text-center mb-4 -translate-y-8 flex-row-center justify-center gap-6 sm:gap-12 para'>
               <button className="btn-primary green-shadow"> Bulk Quote</button>
               <button className="btn-secondary green-shadow">Call to Order</button>
            </div>

            {/* Trust badges */}
            <div className="w-full flex-row-center justify-center gap-2 p-2 sm:gap-10 mt-2 md:mt-10 opacity-90 para">
                <div className="flex items-center gap-2 text-gray-600">
                  <FontAwesomeIcon icon={faLeaf} className="text-primary-light text-lg" />
                  <p className="text-sm">100% Organic</p>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-primary-light text-lg" />
                  <p className="text-sm">Certified Export Quality</p>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <FontAwesomeIcon icon={faSpa} className="text-primary-light text-lg" />
                  <p className="text-sm">Farm-Fresh Guarantee</p>
                </div>
            </div>
      </div>


     {/* ------------------SECTION 2 -------------------------*/}
         {/*  products bar */}
           <div className='w-[90%] sm:w-[80%] xl:w-[50%] lg:w-[60%] h-fit p-2 sm:h-12 bg-bg-dark rounded-4xl m-auto shadow-md sm:mb-16 mt-12 '>
              <ul className='flex-row-center justify-evenly flex-wrap text-maintext h-full w-full productLink'>
                <li onClick={() => setActiveProduct("cloves")}  className={`${activeProduct === "cloves" ? "bg-bg-light" : ""}`}>cloves</li>
                <li onClick={() => setActiveProduct("honey")}   className={`${activeProduct === "honey" ? "bg-bg-light" : ""}`}>honey</li>
                <li onClick={() => setActiveProduct("cashews")} className={`${activeProduct === "cashews" ? "bg-bg-light" : ""}`}>cashews</li>
                <li onClick={() => setActiveProduct("ginger")}  className={`${activeProduct === "ginger" ? "bg-bg-light" : ""}`}>ginger</li>
                <li onClick={() => setActiveProduct("macadamia")} className={`${activeProduct === "macadamia" ? "bg-bg-light" : ""}`}>macadamia</li>
              </ul>
           </div>

     {/* ------------------SECTION 2 -------------------------*/}
          {activeProduct === "cloves" &&  
             <div className='w-full h-fit mt-8'>
                {/* proudct caption */}
                  <div className='w-full sm:w-[85%] lg:w-[75%] m-auto h-fit flex flex-col sm:flex-row items-center justify-center mb-8 p-4 sm:p-0 '>
                      <p className="productListHeader">Aromatic Cloves</p>
                      <p className="productListDesc"> Strong, fragrant cloves perfect for enhancing dishes, blending spices, supporting wellness, and adding natural flavor depth.</p>
                  </div>

                {/* product cards */}
                  <div className="flex flex-row-center justify-evenly w-full h-fit flex-wrap mt-8sm:mt-20 gap-2">
                      {clovesList.map((card, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)} // SAME as using box1Ref, box2Ref, box3Ref
                            >
                           <ProductCard {...card} viewDetails={viewDetails} /> {/* sending all the props to the card component */}
                        </div>
                      ))}
                  </div> 
             </div>
          }

     {/* ------------------SECTION 3 -------------------------*/}
          {activeProduct === "cashews" &&  
             <div className='w-full h-fit mt-16'>
                {/* proudct caption */}
                <div className='w-full sm:w-[85%] lg:w-[75%] m-auto h-fit flex flex-col sm:flex-row items-center justify-center mb-8 p-4 sm:p-0 '>
                      <p className="productListHeader">Premium Cashew Products</p>
                      <p className="productListDesc"> High-quality cashews ideal for snacking, processing, roasting, confectionery, export markets, and diverse manufacturing applications.</p>
                  </div>

                {/* product cards */}
                <div className="flex flex-row-center justify-evenly w-full h-fit flex-wrap mt-8sm:mt-20">
                      {cashewList.map((card, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)} // SAME as using box1Ref, box2Ref, box3Ref
                            >
                           <ProductCard {...card} viewDetails={viewDetails} /> {/* sending all the props to the card component */}
                        </div>
                      ))}
                  </div> 
             </div>
          }


     {/* ------------------SECTION 4 -------------------------*/}
          {activeProduct === "honey" &&  
             <div className='w-full h-fit mt-16'>
                {/* proudct caption */}
                 <div className='w-full sm:w-[85%] lg:w-[75%] m-auto h-fit flex flex-col sm:flex-row items-center justify-center mb-8 p-4 sm:p-0 '>
                      <p className="productListHeader">Natural Honey</p>
                      <p className="productListDesc">Pure, richly flavored honey sourced responsibly to support nutrition, wellness, retail brands, and premium food production.</p>      
                  </div>

                {/* product cards */}
                <div className="flex flex-row-center justify-evenly w-full h-fit flex-wrap mt-8sm:mt-20">
                      {honeyList.map((card, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)} // SAME as using box1Ref, box2Ref, box3Ref
                            >
                           <ProductCard {...card} viewDetails={viewDetails} /> {/* sending all the props to the card component */}
                        </div>
                      ))}
                  </div> 
             </div>
          }


     {/* ------------------SECTION 5 -------------------------*/}
          {activeProduct === "ginger" &&  
             <div className='w-full h-fit mt-16'>
                {/* proudct caption */}
                 <div className='w-full sm:w-[85%] lg:w-[75%] m-auto h-fit flex flex-col sm:flex-row items-center justify-center mb-8 p-4 sm:p-0 '>
                      <p className="productListHeader">Fresh & Dried Ginger</p>
                      <p className="productListDesc">Bold, aromatic ginger trusted for flavoring foods, crafting beverages, supporting wellness, and powering natural herbal products.</p>     
                  </div>

                {/* product cards */}
                <div className="flex flex-row-center justify-evenly w-full h-fit flex-wrap mt-8sm:mt-20">
                      {gingerList.map((card, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)} // SAME as using box1Ref, box2Ref, box3Ref
                            >
                           <ProductCard {...card} viewDetails={viewDetails} /> {/* sending all the props to the card component */}
                        </div>
                      ))}
                  </div> 
             </div>
          }
          
     {/* ------------------SECTION 6 -------------------------*/}
          {activeProduct === "macadamia" &&  
             <div className='w-full h-fit mt-16'>
                {/* proudct caption */}
                 <div className='w-full sm:w-[85%] lg:w-[75%] m-auto h-fit flex flex-col sm:flex-row items-center justify-center mb-8 p-4 sm:p-0 '>
                      <p className="productListHeader">Premium Macadamia</p>
                      <p className="productListDesc">Rich macadamia products offering exceptional flavor, versatile usage, global demand, superior quality, and excellent nutrition across categories.</p>      
                  </div>

                {/* product cards */}
                <div className="flex flex-row-center justify-evenly w-full h-fit flex-wrap mt-8sm:mt-20">
                      {macadamiaList.map((card, index) => (
                        <div
                            key={index}
                            ref={(el) => (cardsRef.current[index] = el)} // SAME as using box1Ref, box2Ref, box3Ref
                            >
                           <ProductCard {...card} viewDetails={viewDetails} /> {/* sending all the props to the card component */}
                        </div>
                      ))}
                  </div> 
             </div>
          }
         

     <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              
      <Footer/>

    {/* A modal to show every project's additional details */}
      <Modal isOpen={showModal} onClose={() => {setShowModal(false)}}>
          <ProductDetails product={productLink} onClose={() => {setShowModal(false)}}/>
      </Modal> 
   </div>
  )
}

export default Brands