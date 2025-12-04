import React, { useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import FAQcard from '../components/FAQcard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMobilePhone, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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

    /*       try {
              const response = await axios.post("http://localhost:5000/api/messages", formData);
              setResponseMessage(response.data.message);
              setFormData({username:"", email:"", message:""});
              }
              
          catch(error){
            setResponseMessage("ERROR! sending message, Kindly try again later!");
          } */
      }


  return (
    <div>
      {/*  Nav bar */}
      <Header/>


      {/* SECTION 1 */}
      <div className="flex flex-col items-center md:flex-row justify-center pt-12 h-fit xl:h-screen bg-bg-light">
            <div className='w-[95%] md:w-[46%] lg:ml-[10%] m-auto h-full pt-8 sm:pt-16 md:pt-0 lg:pt-20 sm:pl-10 md:pl-0 flex flex-col justify-end'>
                <p className='headerText'>Let's talk</p>
                <p className='w-[90%] m-auto h-fit text-text font-light'>
                We’re here for you anytime ready to answer, support, and 
                guide you. Reach out whenever you need us; your comfort 
                and experience mean everything to us.</p>

                  {/*  Contact channels */}
                    <div className='w-2/3 m-auto h-full pt-8 text-text font-light mt-12 '>
                      <div className='flex-row-center gap-4  w-70'> 
                          <p className='contactIcon'> <FontAwesomeIcon icon={faMobilePhone} className='text-secondary text-2xl'/></p>
                          <div>
                              <p className='text-maintext text-lg font-semibold'>Phone</p>
                              <p> +254 769731071</p>
                          </div>
                      </div>
                      <br />
                      <div className='flex-row-center gap-4 w-70'> 
                          <p className='contactIcon'> <FontAwesomeIcon icon={faEnvelope} className='text-secondary text-2xl'/></p>
                          <div>
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
                        <div className='flex-row-center gap-4  w-70'> 
                            <p className='contactIcon'> <FontAwesomeIcon icon={faWhatsapp} className='text-secondary text-2xl'/></p>
                            <div>
                                <p className='text-maintext text-lg font-semibold'>Whatsapp</p>
                                <p> Chat on Whatsapp</p>
                            </div>
                        </div>
                      </a>
                  </div>
            </div>

            {/* contact form */}
            <div className='w-[95%] sm:w-100 h-[70vh] m-auto mt-10 md:mt-20 lg:mt-28 lg:mr-[10%]'>
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
                            className="w-full border-b border-text-light h-10 p-4 outline-none  text-sm hover:border-secondary duration-300 ease-in-out" 
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
                            className="w-full border-b border-text-light h-10 p-4 outline-none text-sm hover:border-secondary duration-300 ease-in-out" 
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
                            className="w-full h-20 resize-none p-4 mt-10 outline-none border-b border-text-light text-sm hover:border-secondary duration-300 ease-in-out"
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
        <div className="w-full h-fit mb-16 mt-30">
                <p className="headerText text-center">| Have questions? <span className="headerSpan">You’re not alone.</span></p>
                <p className="m-auto mt-4 text-text w-[90%] md:w-[70%] lg:w-[50%] text-md text-center">We’ve answered frequently asked questions by clients. If you don’t see your question here, feel free to reach out.</p>
        </div>

      {/* FAQ cards */}
      <div className="h-fit">
                {/* All the faqs */}
                <FAQcard 
                  faqTitle="How much do you charge for a website?"
                  faqAns="Our pricing depends on the complexity of your project. Simple landing pages cost less than full e-commerce platforms. After a free consultation, we shall give you a break-down, no-surprise quote."
                  />
                <FAQcard 
                  faqTitle="Do you only build websites, or you also handle marketing?"
                  faqAns="We do both. We can design, build, and promote your website."
                  />
                <FAQcard 
                  faqTitle="Can I hire you just for Google Ads management?"
                  faqAns="Absolutely! Some clients already have a website and only need Ads management. We can audit your site and campaigns, then set up and optimize ads to bring in targeted traffic."
                  />
                <FAQcard 
                  faqTitle="How long does it take to finish a project?"
                  faqAns="Small websites (like landing pages) can take 1–2 weeks. Larger websites (e-commerce, custom apps) usually take 1-2 months. Ad campaigns can be launched in as little as 3–5 days once everything is set up."
                  />
                <FAQcard 
                  faqTitle="Will I be able to update my website after you build it?"
                  faqAns="Yes! We design websites so they’re easy to update. We also provide a quick walkthrough or documentation so you can manage content on your own — no coding required."
                  />
                <FAQcard 
                  faqTitle="Do you work with international clients?"
                  faqAns="Yes. We work with clients from anywhere in the world. We can communicate via email, Zoom, or WhatsApp, and We accept international payments."
                  />
                <FAQcard 
                  faqTitle="How do you make sure my Ads budget is well spent?"
                  faqAns="We set up detailed conversion tracking so we know exactly where every dollar goes. We regularly test, monitor, and optimize your campaigns to make sure your budget brings maximum return."
                  />
                <FAQcard 
                  faqTitle="What if I don’t know where to start, website first or Ads?"
                  faqAns="Don’t worry. During our consultation, We'll analyze your business and recommend the best starting point. Sometimes it’s building a high-converting site first, sometimes it’s running ads with a landing page — it depends on your goals."
                  />
              </div>

            <br /><br /><br /><br />
    <Footer/>
    </div>
  )
}

export default Contact