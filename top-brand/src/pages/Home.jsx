import React, {useEffect, useRef} from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { NavLink } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { faCheckCircle, faMagnifyingGlass, faSailboat, faTruckFast} from '@fortawesome/free-solid-svg-icons'
import TopProductCard from '../components/TopProductCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import StatsCard from '../components/StatsCard'
import { testimonialCards } from '../../constants'
import TestimonialCard from '../components/TestimonialCard'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'

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
      <Header/>

      <div className="w-full min-h-screen bg-[url('/landing6.png')] bg-cover bg-position-[50%_80%]">
         <div className="w-full min-h-screen bg-[#00000046]">
            
            {/* Main container */}
            <div className="min-h-screen lg:min-h-[75%] w-full pt-14 flex items-center">
               
               {/* Content wrapper */}
               <div className="w-full lg:w-1/2 flex flex-col justify-start px-6 sm:px-10 lg:pl-[5%] gap-6 text-center lg:text-left">

               {/* Heading */}
               <p className="text-bg-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight para sm:text-left sm:w-100 md:w-120 lg:w-150 lg:mt-20 ">
                  Sustainable Brands That Work
               </p>

               {/* Description */}
               <p className="text-gray-300 w-full sm:w-[95%]  text-base para sm:text-left ">
                  We're building a world where sustainable living is commonplace, desirable and rewarding. 
                  Where the brands people love are a force for good.
               </p>

               {/* Buttons */}
               <div className="w-full flex flex-col sm:flex-row items-center sm:justify-start gap-4 sm:gap-6 mt-4 para">
                  <NavLink to="/brands">
                     <button className="btn-primary green-shadow text-maintext font-bold w-full sm:w-auto ">
                     Shop Now
                     </button>
                  </NavLink>

                  <button className="btn-secondary green-shadow text-bg-dark w-65 sm:w-auto">
                     Explore more
                  </button>
               </div>

               </div>
            </div>
         </div>
      </div>



{/* ------------------SECTION 1 -------------------------*/}
      <div className='w-full h-fit mt-20'>
           <div>
               <p className='headerText w-full text-center'>Africa to the World</p>
               <p className='bodyText'>TopBrand Suppliers connect Africa’s finest products to the world with efficiency and trust. We specialize in sourcing quality products from Kenya and delivering them to global markets—and bringing international goods back home.</p>
           </div>
          {/* services cards */}
           <div className='w-[90%] m-auto flex-row-center justify-evenly flex-wrap gap-4 md:gap-2 card-group'>
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
      <div className='h-fit w-full flex-row-center justify-evenly flex-wrap mt-34'>
            {/* image div */}
            <div className="w-200 md:w-90 lg:w-110 h-70 md:h-110 bg-bg-dark rounded-xl relative overflow-hidden">
               {/* Background Video */}
               <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute top-0 left-0 w-full h-full object-cover object-[60%]"
               >
                  <source src="/honeyVid2.mp4" type="video/mp4" />
               </video>
            </div>

           {/* caption div */}
           <div className='w-full md:w-1/2 h-fit lg:h-110 p-2 lg:p-4 lg:pt-8'>
               <p className='headerText text-center md:text-left  m-auto'>Pure, Natural Goods for Sustainable Lifestyles</p>
               <p className="sideBodyText">We source pure, natural products like cashews, cloves, and honey directly from trusted farmers using responsible practices. Our goods promote healthy living, support local communities, and meet high standards of quality and traceability. 
               <br /> <p className='md:mt-4'>Choose sustainably grown products that are authentic, fresh, and naturally produced.</p></p>
           </div>
      </div>


{/* ------------------SECTION 3 -------------------------*/}
      <div className='w-full h-fit mt-20'>
           <div>
               <p className='headerText w-full text-center'>Top Natural Products</p>
               <p className='bodyText'>Discover our sustainably sourced products. Carefully harvested to preserve purity, flavor, and nutritional value. Each product is selected from trusted farmers who follow eco-friendly practices, ensuring freshness and quality in every batch.</p>
           </div>
          {/* services cards */}
           <div className='w-full flex flex-row items-center sm:flex-col md:flex-row justify-evenly flex-wrap gap-12 sm:gap-6 md:gap-12 lg:gap-2 p-4 card-group'>
               <div className="animate-card">
                  <TopProductCard title="Golden Nature Honey" description="Pure, rich, and naturally harvested from eco-friendly apiaries. Packed with flavor and nutrients for everyday wellness." productImage="/honey3.jpg"/>
               </div>

               <div className="animate-card">
                  <TopProductCard title="Premium Cashews" description="Carefully selected, rich, and naturally crisp. Perfect for snacking, cooking, and quality cashew products." productImage="/cashew3.jpg"/>
               </div>

               <div className="animate-card">
                 <TopProductCard title="Aromatic Cloves" description="Strong, fragrant cloves ideal for enhancing flavor, crafting spice blends, and supporting natural home remedies." productImage="/cloves9.jpg"/>
               </div>
           </div>
      </div>



{/* ------------------SECTION 4 -------------------------*/}
      <div className='w-full h-fit mt-40'>
            <div className='w-full h-15 flex-row-center justify-center'>
               <div> <FontAwesomeIcon icon={faCheckCircle} className='mainIcon'/> </div>
               <p className='headerText'>Proven Performance</p>           
            </div>
            <p className='bodyText'>Our track record is proven—satisfied clients, trusted partners, and reliable deliveries. We provide quality sourcing and transparent service you can count on.</p>
            <div className='w-full h-fit bg-bg'>
            <StatsCard/>
            </div>
      </div>

{/* ------------------SECTION 5 -------------------------*/}
      <div className='w-full h-fit mt-40'>
          <div className='w-full h-fit flex flex-col sm:flex-row items-center justify-center mb-8 p-4 sm:p-0 '>
            <p className='w-[95%] sm:w-1/3 h-fit text-maintext headerText'>Meet Our Satisfied Customers</p>
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
      

      <br /><br /><br /><br />

   


     {/*  Footer section */}
     <Footer/>
   </div>
  )
}

export default Home