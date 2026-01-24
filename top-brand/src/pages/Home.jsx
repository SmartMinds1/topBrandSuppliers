import React, {useEffect, useRef} from 'react'
import Footer from '../components/Footer'
import { NavLink } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { faArrowRightLong, faCheckCircle, faLeaf, faMagnifyingGlass, faSailboat, faSpa, faTruckFast} from '@fortawesome/free-solid-svg-icons'
import TopProductCard from '../components/TopProductCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatsCard from '../components/StatsCard'
import { testimonialCards } from '../../constants'
import TestimonialCard from '../components/TestimonialCard'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import HomeHeader from '../components/HomeHeader'

const Home = () => {
  // checking if array is empty or undefined
  if (!testimonialCards || testimonialCards.length === 0) return null;

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

/*   animating all other cards */
useGSAP(() => {
   gsap.utils.toArray(".card-group").forEach((group) => {
     gsap.fromTo(
       group.querySelectorAll(".animate-card"),
       { opacity: 0, y: 150 },
       {
         opacity: 1,
         y: 0,
         duration: 0.8,
         stagger: 0.4,
         scrollTrigger: {
           trigger: group,
           start: "top 80%",
           toggleActions: "play none none reverse"
         },
       }
     );
   });
 }, []);
 
 

/* Animating landing page text */
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
   <div className='bg-background'>
{/* ---------------------landing page--------------------------- */}
      {/*  Nav bar */}
      <HomeHeader/>

      <div className="w-full min-h-screen bg-[url('/landingPage3.png')] bg-cover bg-position-[65%_50%] lg:bg-position-[50%_100%] bg-no-repeat"> {/* bg-[url('/landingBg5.webp')] bg-cover bg-position-[50%_50%]     bg-position-[95%_50%] lg:bg-position-[50%_50%]*/}
         <div className="w-full min-h-screen flex-col-center justify-between  bg-linear-to-tr from-primary sm:from-transparent via-primary/50 sm:via-transparent to-transparent">
            
            {/* Main container */}
            <div className="h-fit lg:min-h-[75%] w-full pt-24 lg:pt-14 flex items-center justify-between flex-wrap-reverse">
               
               {/* Content wrapper */}
               <div className="w-full lg:w-1/2 flex flex-col justify-start px-6 sm:px-10 lg:pl-[5%] gap-6 text-center lg:text-left lg:mt-12">
                     {/* Heading */}
                     <p className="text-bg text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold leading-tight para text-left sm:w-100 md:w-120 lg:w-150 ">
                        Naturally Harvested<span className='font-extralight'>,</span> Globally Supplied<span className='font-extralight'>.</span> Cashews<span className='font-extralight'>,</span> Cloves <span className='font-extralight'>&</span> Honey
                     </p>
                     {/* Description */}
                     <p className="text-gray-200 w-full sm:w-[60%] lg:w-[95%] text-left para sm:text-left">
                       From farm to destination, we partner with sustainable growers to bring
                       you natural products. A global supply chain where quality enriches lives.
                     </p>
                     {/* Buttons */}
                     <div className="w-full flex flex-row items-center justify-start gap-4 sm:gap-6 mt-4 para">
                        <button className="btn-secondary green-shadow text-bg w-auto">
                           Explore more
                        </button>
                        <NavLink to="/brands">
                           <button className="btn-primary green-shadow text-bg-light w-full sm:w-30 ">
                           Shop Now
                           </button>
                        </NavLink>
                     </div>
               </div>

               <div className="w-full sm:w-fit mr-[10%] fit mt-8">
               {/*    <div className="w-full m-1 sm:w-123 h-60 p-2 bg-[url('/landingHoney.webp')] bg-cover bg-position-[50%_40%] rounded-2xl"></div>
                  <div className='p-1 flex flex-row-center justify-between mt-3 w-full sm:w-123 bg-amber-600'>
                     <div className="w-35 sm:w-50 h-44 p-2 bg-[url('/landingCloves.webp')] bg-cover bg-position-[50%_50%] rounded-2xl"></div>
                     <div className="w-38 sm:w-70 h-44 p-2 bg-[url('/landingCashews.webp')] bg-cover bg-position-[50%_50%] "></div>
                  </div> */}
                  <div className="w-70 h-70 p-2 bg-black/30 hidden lg:block rounded-full pl-16 pt-12 rotate-45">
                     <p className='text-gray-200 font-bold text-xl text-left pl-4 pt-1 leading-12 border-l-2 border-primary -rotate-45'> <span className='text-amber-300 text-4xl animate-pulse font-serif'>FREE!</span> <br /> Samples <br /> Available <FontAwesomeIcon icon={faArrowRightLong} className='font-light text-lg bg-[#FFF]/20 cursor-pointer hover:bg-primary duration-300  p-2 rounded-full ml-4 translate-y-2'/></p>
                  </div>
               </div>
            </div>

          {/* TRUST SECTION */}
            <div className='w-full h-20 bg flex-row-center justify-center mt-12'>
            {/* Trust badges */}
               <div className="w-full h-full flex-row-center justify-center gap-2 p-2 sm:gap-10  opacity-90">
                  <div className="flex items-center gap-2 text-gray-600 para">
                     <FontAwesomeIcon icon={faLeaf} className="text-accent-light text-lg" />
                     <p className="text-sm text-bg-dark">100% Organic</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 para">
                     <FontAwesomeIcon icon={faCheckCircle} className="text-accent-light text-lg" />
                     <p className="text-sm text-bg-dark">Certified Export Quality</p>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 para">
                     <FontAwesomeIcon icon={faSpa} className="text-accent-light text-lg" />
                     <p className="text-sm text-bg-dark">Farm-Fresh Guarantee</p>
                  </div>
               </div>
            </div>
         </div>
      </div>



{/* ------------------SECTION 1 -------------------------*/}
      <div className='w-full h-fit mt-16'>
           <div>
               <p className='headerText w-70 m-auto sm:h-full text-center'>Africa to <span className='font-light '>the World</span> </p>
               <p className='bodyText'>TopBrand Suppliers connect Africa’s finest products to the world with efficiency and trust. We specialize in sourcing quality products from Kenya and delivering them to global markets—and bringing international goods back home.</p>
           </div>
          {/* services cards */}
           <div className='w-[90%] md:w-[98%] m-auto flex-row-center justify-evenly flex-wrap gap-4 md:gap-2 card-group'>
               <div className="animate-card">
                  <ServiceCard title="Product Sourcing" description="We identify trusted suppliers, negotiate the best value, and ensure every product meets strict quality standards." icon={faMagnifyingGlass}/> 
               </div>

               <div className="animate-card">
                  <ServiceCard title="International Shipping" description="From packaging to freight and documentation, we manage the full import–export process for smooth global deliveries." icon={faSailboat}/>
               </div>

               <div className="animate-card">
                  <ServiceCard title="Supply Management" description="We coordinate your orders from start to finish, track shipments, and guarantee timely, reliable fulfillment." icon={faTruckFast}/>
               </div>
           </div>
      </div>

{/* ------------------SECTION 2 ------------------------- */}
      <div className='h-fit w-full flex-row-center justify-evenly flex-wrap mt-34 gap-10 sm:gap-5'>
            {/* image div */}
            <div className="w-200 md:w-90 lg:w-110 h-70 md:h-110 bg-bg-dark md:rounded-xl relative overflow-hidden">
               {/* Background Video */}
               <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover object-[60%]"
               >
                  <source src="honeyVid2.mp4" type="video/mp4" />
               </video>
            </div>

           {/* caption div */}
           <div className='w-full md:w-1/2 h-fit lg:h-110 p-2 lg:p-4 lg:pt-8'>
               <p className='headerText text-left w-75  m-0 sm:w-80 sm:text-center sm:m-auto md:m-0 md:text-left'>Pure & Natural for <span className='font-light text-[26px] sm:text-[28px]'>Sustainable Lifestyles</span></p>
               <p className="sideBodyText">We source pure, natural products like cashews, cloves, and honey directly from trusted farmers using responsible practices. Our goods promote healthy living, support local communities, and meet high standards of quality and traceability. 
               <br /> <p className='md:mt-4'>Choose sustainably grown products that are authentic, fresh, and naturally produced.</p></p>
           </div>
      </div>

{/* ------------------SECTION 3 -------------------------*/}
      <div className='w-full h-fit mt-20'>
           <div>
               <p className='headerText text-center w-70 m-auto'>Top Natural <span className='font-light text-[26px] sm:text-[28px]'>Products</span> </p>
               <p className='bodyText'>Discover our sustainably sourced products. Carefully harvested to preserve purity, flavor, and nutritional value. Each product is selected from trusted farmers who follow eco-friendly practices, ensuring freshness and quality in every batch.</p>
           </div>
          {/* services cards */}
           <div className='w-full flex flex-row items-center sm:flex-col md:flex-row justify-evenly flex-wrap gap-12 sm:gap-6 md:gap-12 lg:gap-2 p-4 card-group'>
               <div className="animate-card">
                  <TopProductCard title="Golden Nature Honey" description="Pure, rich, and naturally harvested from eco-friendly apiaries. Packed with flavor and nutrients for everyday wellness." productImage="honey3.webp"/>
               </div>

               <div className="animate-card">
                  <TopProductCard title="Premium Cashews" description="Carefully selected, rich, and naturally crisp. Perfect for snacking, cooking, and quality cashew products." productImage="cashew3.webp"/>
               </div>

               <div className="animate-card">
                 <TopProductCard title="Aromatic Cloves" description="Strong, fragrant cloves ideal for enhancing flavor, crafting spice blends, and supporting natural home remedies." productImage="cloves2.webp"/>
               </div>
           </div>
      </div>



{/* ------------------SECTION 4 -------------------------*/}
      <div className='w-full h-fit mt-20'>
            <div className='w-full h-15 flex-row-center justify-center mb-5 pl-[3%] gap-2'>
               <div> <FontAwesomeIcon icon={faCheckCircle} className='mainIcon text-accent'/> </div>
               <p className='headerText'>Proven <span className='text-[26px] sm:text-[28px] font-light'>Performance</span></p>           
            </div>
            <p className='bodyText'>Our track record is proven—satisfied clients, trusted partners, and reliable deliveries. We provide quality sourcing and transparent service you can count on.</p>
            <div className='w-full h-fit bg-accent-soft bg-bg p-4'>
            <StatsCard/>
            </div>
      </div>

{/* ------------------SECTION 5 -------------------------*/}
      <div className='w-full h-fit mt-16'>
          <div className='w-full h-fit flex flex-col sm:flex-row items-center justify-center mb-8 p-4 sm:p-0 '>
            <p className='w-[95%] sm:w-1/3 h-fit text-primary headerText'>Our Satisfied <span className='text-[26px] sm:text-[28px] font-light'>Customers</span></p>
            <p className='w-full text-left sm:w-1/2 p-4 h-fit text-text cardText'>Businesses and buyers trust our natural products for their quality, consistency, and dependable delivery. Their feedback reflects the strong relationships and reliable service we work hard to uphold every day.</p>
          </div>
            
         <div className="mt-20 bg-green-300flex flex-col-center justify-evenly gap-6 md:grid md:grid-cols-2 md:place-items-center testimonial-section">
            {testimonialCards.map((card, index) => (
               <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)} // SAME as using box1Ref, box2Ref, box3Ref
                  >
                  <TestimonialCard {...card} /> {/* sending all the props to the card component */}
               </div>
            ))}
         </div> 
      </div>
      
     {/*  Footer section */}
     <Footer/>
   </div>
  )
}

export default Home