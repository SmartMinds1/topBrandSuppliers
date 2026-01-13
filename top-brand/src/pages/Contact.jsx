import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import FAQcard from '../components/FAQcard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobilePhone, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import { BASE_URL } from "../api/api";

const Contact = () => {
    //state controlled inputs
     const[formData, setFormData] = useState({username:"", email:"",phone:"", message:""});

    //The handle change function inserts user inputs to the formdata
       const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
      }

      //handleSubmit sends the user inputs to the database
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting user message", formData);

     try {
              const response = await axios.post(`${BASE_URL}/api/messages`, formData);
              setResponseMessage(response.data.message);
              setFormData({username:"", email:"", message:""});
              }
              
          catch(error){
            setResponseMessage("ERROR! sending message, Kindly try again later!");
          } 
      }

/* Animating contact page landing text */
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

      {/* SECTION 1 */}
      <div className="flex flex-col items-center md:flex-row justify-center pt-16 text-center lg:text-left md:pt-12 h-fit xl:h-screen">
            <div className='w-[95%] md:w-[46%] lg:ml-[10%] m-auto h-full pt-8 sm:pt-16 md:pt-0 lg:pt-20 sm:pl-10 md:pl-0 flex flex-col justify-end'>
                <p className='headerText'>Let's talk</p>
                <p className='w-[90%] m-auto h-fit text-text font-light text-left'>
                We’re here for you anytime ready to answer, support, and 
                guide you. Reach out whenever you need us; your comfort 
                and experience mean everything to us.</p>

                  {/*  Contact channels */}
                    <div className='w-70 lg:w-2/3  m-auto h-full pt-8 text-text font-light mt-12'>
                      <div className='flex-row-center gap-4  w-70 para'> 
                          <p className='contactIcon'> <FontAwesomeIcon icon={faMobilePhone} className='text-accent text-2xl'/></p>
                          <div className='text-left'>
                              <p className='text-maintext text-lg font-semibold'>Phone</p>
                              <p> +254 769731071</p>
                          </div>
                      </div>
                      <br />
                      <div className='flex-row-center gap-4 w-70 para'> 
                          <p className='contactIcon'> <FontAwesomeIcon icon={faEnvelope} className='text-accent text-2xl'/></p>
                          <div className='text-left'>
                              <p className='text-maintext text-lg font-semibold'>Email</p>
                              <p> support@topbrand.co.ke</p>
                              <p>salesteam@topbrand.co.ke</p>
                          </div>
                      </div>
                      <br />
                      <a   
                        href={`https://wa.me/254115154402?text=${encodeURIComponent("Hello, Welcome to topBrand Suppliers!")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                      <div className='flex-row-center gap-4  w-70 para'> 
                          <p className='contactIcon'> <FontAwesomeIcon icon={faWhatsapp} className='text-accent text-2xl'/></p>
                          <div className='text-left'>
                              <p className='text-maintext text-lg font-semibold'>Whatsapp</p>
                              <p> Chat on Whatsapp</p>
                          </div>
                      </div>
                      </a>
                  </div>
            </div>

            {/* contact form */}
            <div className='w-[95%] sm:w-100 h-114 m-auto mt-10 md:mt-20 lg:mt-28 lg:mr-[10%]'>
                  {/* Contact form */}
                    <form onSubmit={handleSubmit} className='w-full h-full flex-col-center p-4 gap-3 bg-bg shadow pt-8 rounded-xl'>
                          <input 
                            className="w-full h-10 p-4 outline-none border-b border-text-light text-sm"
                            type="text"
                            placeholder="Your name"
                            name="username"
                            id="username"
                            autoComplete="on"
                            maxLength="30"
                            minLength="3"
                            required
                            value={formData.username}
                            onChange={handleChange}
                          />
                          <input
                            className="w-full border-b border-text-light h-10 p-4 outline-none  text-sm hover:border-primary duration-300 ease-in-out" 
                            type="email"
                            name="email"
                            autoComplete="on"
                            id="email"
                            maxLength="40"
                            required
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                          <input
                            className="w-full border-b border-text-light h-10 p-4 outline-none text-sm hover:border-primary duration-300 ease-in-out" 
                            type="text"
                            name="phone"
                            autoComplete="on"
                            id="phone"
                            maxLength="20"
                            required
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                          <textarea 
                            className="w-full h-20 resize-none p-4 mt-10 outline-none border-b border-text-light text-sm hover:border-primary duration-300 ease-in-out"
                            type="text"
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Your message"
                          />
                          <button className="btn-primary green-shadow w-[90%] mt-8"> Submit </button>
                    </form>
              </div>
        </div>
         

        {/* SECTION 2 */} 
        <div className="w-full m-auto h-fit mb-8 mt-20">
                <p className="headerText text-center w-[80%] m-auto sm:leading-2 ">| Have questions? <span className="headerSpan">You’re not alone.</span></p>
                <p className="m-auto sm:mt-4 text-text w-[90%] md:w-[70%] lg:w-[50%] text-md text-center">We’ve answered frequently asked questions by clients. If you don’t see your question here, feel free to reach out.</p>
        </div>

        {/* FAQ cards */}
        <div className="h-fit p-2">
            <FAQcard 
              faqTitle="How do I place an order with TopBrand Suppliers?"
              faqAns="You can place an order by contacting us through our website, WhatsApp, or email. Once we understand what you need, we’ll send you a quote and delivery timeline."
            />
            <FAQcard 
              faqTitle="Do you supply in bulk or also small quantities?"
              faqAns="We do both. Whether you’re a retailer, a distributor, or an individual buyer, we provide flexible order quantities depending on your needs."
            />
            <FAQcard 
              faqTitle="Which types of products do you supply?"
              faqAns="We specialize in natural products, sustainable brands, household essentials, food items, and general wholesale goods. If you're looking for something specific, feel free to ask — chances are we can source it."
            />
            <FAQcard 
              faqTitle="Do you offer delivery services?"
              faqAns="Yes. We handle deliveries across Kenya and organize regional shipments. For larger orders, we offer scheduled deliveries and full logistics support."
            />
            <FAQcard 
              faqTitle="Can you source specific products on request?"
              faqAns="Absolutely. If a product isn’t listed, we can source it through our supplier network and provide a custom quote based on your requirements."
            />
            <FAQcard 
              faqTitle="What are your payment options?"
              faqAns="We accept M-Pesa, bank transfers, and invoice-based payments for businesses. International clients can use standard cross-border payment methods."
            />
            <FAQcard 
              faqTitle="How long does delivery take?"
              faqAns="Delivery timelines depend on your order size and destination. Most local orders take 1–3 days, while bulk or long-distance deliveries may take 3–7 days."
            />
            <FAQcard 
              faqTitle="Can I open a long-term supply account with you?"
              faqAns="Yes. Many businesses work with us for consistent supply and discounted pricing. We can create a custom supply plan based on your monthly needs."
            />
        </div>


            <br /><br /><br /><br />
    <Footer/>
    </div>
  )
}

export default Contact