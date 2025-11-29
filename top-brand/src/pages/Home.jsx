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


  return (
   <div className='bg-background'>
{/* ---------------------landing page--------------------------- */}
            {/*  Nav bar */}
            <Header/>

      <div className="w-full h-screen shadow-2xs flex-row-start justify-end bg-[url('/cashew1.jpg')] bg-cover bg-bottom ">

         <div className='w-full h-full backdrop-blur-xs '>

            {/* landing page content */}
             <div className='h-[75%] w-full flex-row-start justify-between'>
                {/* landing captions */}
                <div className='h-full w-1/2 flex-col-start justify-end pl-[5%] pt-20 gap-6'>
                   <p className='w-fit h-fit text-bg text-6xl font-bold leading-20'>Sustainable Brands That Work</p>
                   <p className='text-text-light w-[80%]'>We're building a world where sustainable living is commonplace, desirable and rewarding. Where the brands people love are a force for good.</p>
                   <div className='w-1/2 h-fit flex-row-center justify-evenly'>
                        <NavLink to="/brands">  <button className="btn-primary mt-0 lg:mt-12 green-shadow text-maintext font-bold"> Shop Now</button> </NavLink> 
                        <button className="btn-secondary mt-0 lg:mt-12 green-shadow text-text-light">Explore more</button>
                   </div>
                </div>
          
             {/* landing image */}
             <div className="h-[65%] w-[30%] bg-[url('/landing1.png')] bg-cover bg-no-repeat bg-bottom "> </div>
             </div>

            {/* trendy products */}
             <div className='w-[80%] m-auto h-fit flex-row-center justify-end gap-4'>
                    <p className='text-text-light font-bold text-lg'>Trendy <br /> Products</p>
                    <div className='w-60 h-32 shadow-text rounded-2xl shadow-xs'></div>
                    <div className='w-60 h-32 shadow-text rounded-2xl shadow-xs'></div>
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
           <div className='w-full flex-row-center justify-evenly flex-wrap gap-4 md:gap-2'>
               <ServiceCard title="Product Sourcing" description="We identify trusted suppliers, negotiate the best value, and ensure every product meets strict quality standards." icon={faMagnifyingGlass}/>
               <ServiceCard title="International Shipping" description="From packaging to freight and documentation, we manage the full import–export process for smooth global deliveries." icon={faSailboat}/>
               <ServiceCard title="Supply Management" description="We coordinate your orders from start to finish, track shipments, and guarantee timely, reliable fulfillment." icon={faTruckFast}/>
           </div>
      </div>


{/* ------------------SECTION 2 ------------------------- */}
      <div className='h-fit w-full flex-row-center justify-evenly flex-wrap mt-44'>
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
      <div className='w-full h-fit mt-20  hidden'>
           <div>
               <p className='headerText w-full text-center'>Top Natural Products</p>
               <p className='bodyText'>Discover our sustainably sourced products. Carefully harvested to preserve purity, flavor, and nutritional value. Each product is selected from trusted farmers who follow eco-friendly practices, ensuring freshness and quality in every batch.</p>
           </div>
          {/* services cards */}
           <div className='w-full flex flex-row items-center sm:flex-col md:flex-row justify-evenly flex-wrap gap-12 sm:gap-6 md:gap-12 lg:gap-2 p-4'>
               <TopProductCard title="Golden Nature Honey" description="Pure, rich, and naturally harvested from eco-friendly apiaries. Packed with flavor and nutrients for everyday wellness." productImage=""/>
               <TopProductCard title="Premium Cashews" description="Carefully selected, rich, and naturally crisp. Perfect for snacking, cooking, and quality cashew products." productImage=""/>
               <TopProductCard title="Aromatic Cloves" description="Strong, fragrant cloves ideal for enhancing flavor, crafting spice blends, and supporting natural home remedies." productImage=""/>
           </div>
      </div>



{/* ------------------SECTION 4 -------------------------*/}
      <div className='w-full h-fit mt-40  hidden'>
            <div className='w-full h-15 flex-row-center justify-center'>
               <div> <FontAwesomeIcon icon={faCheckCircle} className='mainIcon'/> </div>
               <p className='headerText'>Proven Performance</p>           
            </div>
            <p className='bodyText'>Our track record is proven—satisfied clients, trusted partners, and reliable deliveries. We provide quality sourcing and transparent service you can count on.</p>
            <StatsCard/>
      </div>

{/* ------------------SECTION 5 -------------------------*/}
      <div className='w-full h-fit mt-40  hidden'>
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
      

      <br /><br /><br /><br /><br /><br /><br />


     {/*  Footer section */}
     <Footer/>
   </div>
  )
}

export default Home