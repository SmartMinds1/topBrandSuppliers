import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { NavLink } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { faMagnifyingGlass, faSailboat, faTruckFast} from '@fortawesome/free-solid-svg-icons'


const Home = () => {
  return (
   <div className='bg-background'>
{/* ---------------------landing page--------------------------- */}
      <div className=' w-full h-screen bg-primary shadow-2xs flex-col-start '>
            {/*  Nav bar */}
            <Header/>
            {/* landing page content */}
             <div className='h-[75%] w-full flex-row-center justify-between'>
                {/* landing captions */}
                <div className='h-full w-1/2 flex-col-start justify-center pl-[5%] pt-20'>
                   <p className='w-120 h-fit text-maintext text-5xl font-bold font-serif leading-14 tracking-wide'>Sustainable Brands That Work</p>
                   <p className='text-[#45556c] w-[80%] mt-4'>We're building a world where sustainable living is commonplace, desirable and rewarding. Where the brands people love are a force for good.</p>
                   <div className='w-1/2 h-fit flex-row-center justify-evenly'>
                        <NavLink to="/brands">  <button className="btn-primary mt-0 lg:mt-12 green-shadow"> shop Now</button> </NavLink> 
                        <button className="btn-secondary mt-0 lg:mt-12 green-shadow">Explore more</button>
                   </div>
                </div>
                 {/* landing image */}
                <div className="h-full w-[48%] bg-[url('/landing1.png')] bg-cover bg-no-repeat bg-position-[50%_32%]"> </div>
             </div>
            {/* trendy products */}
             <div className='w-2/3 h-fit flex-row-center justify-center gap-4'>
                    <p className='text-maintext font-bold text-xl'>Trendy <br /> Products</p>
                    <div className='w-60 h-32 bg-background rounded-2xl shadow-xl'></div>
                    <div className='w-60 h-32 bg-background rounded-2xl shadow-xl'></div>
             </div>
      </div>


{/* ------------------SECTION 1 -------------------------*/}
      <div className='w-full h-fit mt-20 '>
           <div>
               <p className='headerText w-full text-center'>Connecting Africa to the World</p>
               <p className='bodyText'>TopBrand Suppliers connect Africa’s finest products to the world with efficiency and trust. We specialize in sourcing quality products from Kenya and delivering them to global markets—and bringing international goods back home.</p>
           </div>
          {/* services cards */}
           <div className='w-full flex-row-center justify-evenly flex-wrap gap-4 md:gap-2'>
               <ServiceCard title="Product Sourcing" description="We identify trusted suppliers, negotiate the best value, and ensure every product meets strict quality standards." icon={faMagnifyingGlass}/>
               <ServiceCard title="International Shipping" description="From packaging to freight and documentation, we manage the full import–export process for smooth global deliveries." icon={faSailboat}/>
               <ServiceCard title="Supply Chain Management" description="We coordinate your orders from start to finish, track shipments, and guarantee timely, reliable fulfillment." icon={faTruckFast}/>
           </div>
      </div>


{/* ------------------SECTION 2 ------------------------- */}
      <div className='h-fit w-full flex-row-center justify-evenly flex-wrap mt-44'>
            {/* image div */}
           <div className='w-200 md:w-90 lg:w-110 h-70 md:h-110  bg-primary '></div>

           {/* caption div */}
           <div className='w-full md:w-1/2 h-fit lg:h-110 p-2 lg:p-4 lg:pt-8'>
               <p className='headerText text-center md:text-left  m-auto'>Pure, Natural Goods for Sustainable Lifestyles</p>
               <p className="sideBodyText">We source pure, natural products like cashews, cloves, and honey directly from trusted farmers using responsible practices. Our goods promote healthy living, support local communities, and meet high standards of quality and traceability. 
               <br /> <p className='md:mt-4'>Choose sustainably grown products that are authentic, fresh, and naturally produced.</p></p>
           </div>

      </div>






      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

     {/*  Footer section */}
     <Footer/>
   </div>
  )
}

export default Home