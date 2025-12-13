import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ServiceItem from '../components/ServiceItem'
import {
  faGlobe,
  faBoxOpen,
  faUsers,
  faShieldAlt,
  faCheck,
  faHeart,
  faEye,
  faStar
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGSAP } from '@gsap/react';
import { gsap } from "gsap";

const About = () => {

  /*   animating all other cards */
        useGSAP(() => {
          gsap.utils.toArray(".card-group").forEach((group) => {
            gsap.fromTo(
              group.querySelectorAll(".animate-card"),
              { opacity: 0, y: 100 },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.25,
                scrollTrigger: {
                  trigger: group,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
                },
              }
            );
          });
        }, []);



  return (
    <div>
{/*  Nav bar */}
      <Header/>

{/* ------------------SECTION 1 ------------------------- */}
      <div className='w-full h-fit md:h-[95vh] mt-16  flex-col-center start gap-10 md:gap-20 pt-20'>
        <p className='w-[98%] sm:w-[54%] h-fit text-maintext text-4xl lg:text-5xl font-bold leading-normal lg:leading-18 text-center'>Connecting Africa To The World, One Quality<span className='font-light'> Shipment At A Time</span> </p>
        <p className='text-text w-[80%] text-center'>Your trusted partner for global Trade, Logistics and Supply services</p>
        <button className='btn-primary green-shadow '>Get Started</button>
      </div>

{/* ------------------SECTION 2 ------------------------- */}
        <div className='h-fit w-full flex-row-center justify-evenly flex-wrap mt-14 bg-bg'>
           {/* caption div */}
           <div className='w-full md:w-1/2 h-fit lg:h-110 p-2  lg:pt-20 mb-10'>
               <p className='headerText text-center md:text-left  m-auto'>Who we are</p>
               <p className="sideBodyText text-left"> Topbrand suppliers is a new and ambitious company dedicated to bridging African markets with reliable shipping and sourcing solutions. 
               Our Aim is to empower businesses and individuals, fostering growth and connectivity across the continent and beyond. 
               </p>
           </div>
            {/* image div */}
            <div className="w-200 md:w-90 lg:w-110 h-70 md:h-80 bg-bg-dark rounded-xl relative overflow-hidden bg-[url('/team1.jpg')] bg-cover bg-center"></div>
        </div>

        <br /><br /><br />

{/* ------------------SECTION 3 -------------------------*/}
      <div className='w-full h-fit mt-20'>
           <div>
               <p className='headerText w-full text-center'>What We Do</p>
               <p className='bodyText'>From sourcing quality products to delivering them across borders, we handle every step with care. We’re committed to giving you a smooth, stress-free experience from checkout to delivery.</p>
           </div>
          {/* services cards */}
           <div className='w-full flex flex-row items-center justify-center gap-12 flex-wrap p-4 card-group'>
               <div className="animate-card">
                  <ServiceItem icon={faGlobe} label="Shipping products from Africa to the world"/>
               </div>

               <div className="animate-card">
                  <ServiceItem icon={faBoxOpen} label="Import products into Africa"/>
               </div>

               <div className="animate-card">
                  <ServiceItem icon={faUsers} label="Connect customers with trusted suppliers"/>
               </div>
              {/* Shield + Check Special Icon */}
              <div className="animate-card">
                  <div className="flex flex-col items-center text-center justify-center space-y-3 bg-bg border border-gray-300 shadow-lg hover:shadow-2xl duration-300 w-50 h-40 rounded-lg">
                    <span className="relative inline-block text-secondary">
                      <FontAwesomeIcon icon={faShieldAlt} className="text-5xl" />
                      <FontAwesomeIcon icon={faCheck} className="absolute text-2xl top-3 left-3 text-maintext" />
                    </span>
                    <p className="text-text mt-2">
                      Provide secure and transparent logistics
                    </p>
                  </div>
              </div>
           </div>
      </div>

<br /><br /><br /><br /><br /> <br />

{/* ------------------SECTION 2 ------------------------- */}
        <div className='h-fit w-[95%] lg:pl-20 m-auto  flex-row-center justify-evenly flex-wrap'>
           {/* Mission div */}
           <div className='w-full md:w-[45%]  bg-bg-dark p-2 md:p-8 rounded-xl'>
               <p className='headerText md:text-left  border-b-2 border-secondary w-1/3 text-left leading-10 pl-0'>Our <br />Mission</p>
               <p className="sideBodyText">To empower businesses and individuals across Africa by providing reliable, secure and scalable trade and supply services. </p>
           </div>

           {/* Vission */}
           <div className='w-full md:w-[45%] p-2 md:p-8 '>
               <p className='headerText md:text-left  border-b-2 border-secondary w-1/3 text-left leading-10 pl-0'>Our <br />Vission</p>
               <p className="sideBodyText">To become one of the most trusted and accessible brand-supplier campanies connecting Africa with the rest of the world.</p>
           </div>
        </div>


<br /><br /><br /><br /><br />


{/* ------------------SECTION 3 -------------------------*/}
          <div className='w-full h-fit'>
                <div>
                    <p className='headerText w-full text-center'>Why Choose Us</p>
                    <p className='bodyText'>We combine quality sourcing, dependable logistics, and transparent service to give you peace of mind. 
                     With us, you get products you can trust and support you can count on.</p>
                </div>

                {/* SELLING points */}
                <div className='w-full lg:w-150 h-70 grid grid-cols-2 place-items-center m-auto  p-4 card-group'>
                      <div className="flex flex-col items-center text-center justify-center space-y-3 animate-card">
                        <span className="relative inline-block text-secondary">
                          <FontAwesomeIcon icon={faStar} className="text-3xl" />
                        </span>
                        <p className="text-maintext font-semibold  mt-2 tracking-wide">Quality First</p>
                      </div>

                      <div className="flex flex-col items-center text-center justify-center space-y-3 animate-card">
                        <span className="relative inline-block text-secondary">
                          <FontAwesomeIcon icon={faEye} className="text-3xl" />
                        </span>
                        <p className="text-maintext font-semibold  mt-2 tracking-wide">Transparency</p>
                      </div>

                      <div className="flex flex-col items-center text-center justify-center space-y-3 animate-card">
                        <span className="relative inline-block text-secondary">
                          <FontAwesomeIcon icon={faGlobe} className="text-3xl" />
                        </span>
                        <p className="text-maintext font-semibold tracking-wide mt-2">Global Reach</p>
                      </div>

                      <div className="flex flex-col items-center text-center justify-center space-y-3  animate-card">
                        <span className="relative inline-block text-secondary">
                          <FontAwesomeIcon icon={faHeart} className="text-3xl" />
                        </span>
                        <p className="text-maintext font-semibold  mt-2 tracking-wide">Customer-Centered Service</p>
                      </div>
                </div>
          </div>
                  
          <br /><br /><br />
       
          
    <Footer/>
  </div>
  )
}

export default About