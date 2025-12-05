import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import WhatsapChat from "./WhatsapChat";
import Socials from "./Socials";

const Footer = ()=> {
    //state controlled inputs
        const[formData, setFormData] = useState({username:"", email:"",phone:"", message:""});

    //The handle change function inserts user inputs to the formdata
        const handleChange = (e)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
        }

    //handleSubmit sends the user inputs to the database
        const handleSubscribe = async (e) => {
        e.preventDefault();
        console.log("submitting user subscription", formData);

    /*      try {
                const response = await axios.post("http://localhost:5000/api/messages", formData);
                setResponseMessage(response.data.message);
                setFormData({username:"", email:"", message:""});
                }
                
            catch(error){
            setResponseMessage("ERROR! sending message, Kindly try again later!");
            } */

        }
    return(
        <>
        {/* EMAIL SUBSCRIPTION SECTION */}
            <div className="w-full h-fit p-4 mb-20">
                <p className="text-text w-full text-center">Be the first to know about new products, special deals, and important industry updates.</p>
                <form onSubmit={handleSubscribe} className='flex-row-center gap-8 mt-4 justify-center'>
                    <input
                        className="w-1/4 border-b border-text-light h-10 p-4 outline-none  text-sm hover:border-secondary duration-300 ease-in-out" 
                        type="email"
                        name="email"
                        autoComplete="on"
                        id="email"
                        maxLength="40"
                        required
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                   <button className="btn-primary mt-3 w-40 hover:shadow-xl bg-maintext text-bg-dark">Subscribe Now</button>
                </form>
            </div>

        {/* FOOTER  SECTION */}
            <div className="w-full h-fit flex flex-col items-center justify-between">
                <div className="flex-row-center flex-wrap justify-center lg:justify-evenly w-full h-fit pb-12 pt-8 bg-bg">
                    {/* logo div */}
                    <div className=" w-full lg:w-70 h-fit flex-row-center lg:flex-col-start flex-wrap lg:justify-start justify-evenly gap-2 p-2">
                        <div className="mb-6 sm:mb-0"> 
                            {/*  logo */}
                            <div className="w-40 flex flex-row items-end justify-center">
                                <div className="w-9 h-9  flex-col-center justify-start mr-0.5 bg-[#111111]">
                                    <div className="w-full h-2/3 border-b-3 border-bg-light rounded-br-full rounded-bl-full"></div>
                                </div>
                                <p className="text-secondary text-2xl font-extrabold">topB<span className="text-maintext text-2xl font-extralight">rand</span></p>
                            </div>
                            <p className="w-[90%] text-md text-text text-sm mt-4 pl-4">Ideas that grow, connections that scale.</p>
                        </div>
                        <button className="btn-primary mt-0 lg:mt-12 green-shadow">Call Now</button>
                    </div>

                {/* links div */}
                    <div className="w-full lg:w-2/3 h-fit flex flex-col justify-evenly">
                        <div className="w-[95%] sm:w-full h-fit m-auto flex-row-start flex-wrap justify-evenly gap-4 pt-6">
                            <div  className="footerList">
                                <p className="font-bold text-lg text-maintext">Quick links</p>
                                <ul className="text-text flex flex-col justify-between gap-2 footerLink">
                                    <li><NavLink to="/" className={({ isActive }) => isActive ? "text-secondary" : ""}>home</NavLink> </li>
                                    <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-secondary" : ""}>about</NavLink> </li>
                                    <li><NavLink to="/brands" className={({ isActive }) => isActive ? "text-secondary" : ""}>brands</NavLink> </li>
                                    <li><NavLink to="/contact" className={({ isActive }) => isActive ? "text-secondary" : ""}>contact</NavLink> </li>
                                </ul>
                            </div>

                            <div  className="footerList">
                                <p className="font-bold text-lg text-maintext">support</p>
                                <ul className="text-text flex flex-col justify-between gap-2 footerLink">
                                    <li>topbrand community</li>
                                    <li>support@topbrand.com</li>
                                    <li>FAQs</li>
                                </ul>
                            </div>

                            <div  className="footerList sm:pt-0 sm:pl-0 pl-[10%] pt-6">
                                <p className="font-bold text-lg text-maintext">Let's connect</p>
                                <ul className="footerList gap-6 w-fit sm:w-100 text-text footerLink">
                                    <li><FontAwesomeIcon icon={faMobileAlt} className="text-xl text-secondary mr-3" /> +254 115 154 402  </li>
                                    <li><FontAwesomeIcon icon={faEnvelope} className="text-xl text-secondary  mr-3" /> topbrandsuppliers@gmail.com  </li>
                                    <li className="flex-row-start pl-1 gap-1"><FontAwesomeIcon icon={faLocationDot} className="text-xl text-secondary  mr-3" /> <span> Twiga towers, 6th floor, Room 606, Murang'a Road, Opp Meridian Court Hotel, Nairobi Kenya </span> </li>
                                </ul>
                            </div>
                        
                        </div>
                        <br />
                        {/* Socials div */}
                        <div className="w-full h-fit flex items-center justify-center sm:justify-start md:pl-[4%] lg:pl-0 mt-6">
                            <Socials/>
                        </div>
                    </div>
                </div>
                
                <WhatsapChat/>


                {/* footer copyright */}
                <div className="flex-row-center flex-wrap w-full h-fit pt-4 pb-4 gap-2 sm:gap-0 text-text bg-bg-dark text-xs">
                    <div className="w-full sm:w-[55%] sm:h-full h-1/2 flex-row-center justify-center sm:justify-end">
                        <p>&copy; 2025 topbrandsuppliers.com</p>
                    </div>
                    <div className="w-full sm:w-[45%] h-1/2 sm:h-full flex-row-center justify-evenly">  
                        <p className="text-secondary border-b border-text-muted">Terms of service</p>
                        <p className="text-secondary border-b border-text-muted">Privacy policy</p>
                    </div>
                </div>
            </div>
       </>
    )
}

export default Footer
