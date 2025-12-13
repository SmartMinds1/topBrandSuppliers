import React from "react";
import { productData } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../context/CartContext";


export default function ProductDetails({product, onClose}) {
  //Total Cart Items
    const { cartItems } = useCart();
    const singleCount = cartItems.find(item => item.id === product)?.qty || 0;

  //write the logic for single product count

  //handling add to cart
    const { addToCart } = useCart();

    if (!productData[product]) {
        return (
          <div className="py-16 px-6 md:px-20 bg-bg w-[90vw] h-screen m-auto shadow-2xl ">
              <div className="w-full h-8 bg-transparent text-right mb-6 fixed top-3 right-[7%] md:right-[6%]">
                 <button onClick={onClose} className="bg-bg-light shadow-2xl w-6 h-6 rounded-full text-background hover:brightness-80 duration-300 cursor-pointer"> <FontAwesomeIcon icon={faTimes}/></button>
              </div>
              <div className="flex-col-center justify-center w-full h-[80vh]">
                  <p className="text-center py-16 text-gray-600">This product will be <span className="text-accent font-bold"> COMMING SOON!</span> <span className="text-accent font-bold text-2xl animate-ping"> . . .</span></p>
              </div>
          </div>
        )
      }

  return (
    <section className="py-16 px-6 md:px-20 lg:px-0 xl:px-20 bg-bg-light w-[90vw] m-auto shadow-2xl">
        <div className="w-[80%] flex-row-center justify-between h-8 text-right fixed top-3 right-[7%] md:right-[6%]">
          {/* item count */}
            {singleCount > 0 ? (
                  <span className="bg-secondary text-xs px-2 py-1 rounded-full text-bg-light">
                    {singleCount}
                  </span>
                ) : (
                  <span className="bg-gray-300 text-xs px-2 py-1 rounded-full opacity-50">
                    0
                  </span>
              )}
          {/*  close btn */}
            <button onClick={onClose} className="bg-bg-dark shadow-2xl w-6 h-6 rounded-full text-background hover:brightness-80 duration-300 cursor-pointer"> <FontAwesomeIcon icon={faTimes}/></button>
        </div>


  {/* Product image and details */}
        <div className="w-full sm:w-[90%] lg:w-full m-auto h-fit lg:h-screen xl:h-[80vh] flex-row-center justify-evenly flex-wrap lg:flex-nowrap gap-4">
          {/* PRODUCT IMAGES */}
                <div className="w-full sm:w-120 lg:w-96 h-98 md:h-full flex-col-center">
                    <img
                        src={productData[product].image}
                        alt={productData[product].title}
                        className="w-full h-[60vh] object-cover rounded-xl bg-bg-dark object-center"
                    />
                    <div className=" w-full h-20 flex-row-center justify-center gap-4 ">
                      {/* image1 */}
                      <div className="w-20 h-12 bg-bg rounded-lg shadow hover:scale-110 ease-in-out duration-500 cursor-pointer"></div>
                      {/* image2 */}
                      <div className="w-20 h-12 bg-bg shadow rounded-lg hover:scale-110 ease-in-out duration-500 cursor-pointer"></div> 
                    </div>
                </div>

          {/* PRODUCT DETAILS */}
                <div className="w-full lg:w-1/2 h-full flex-col-start justify-start gap-6 mt-2">
                   {/*  title */}
                   <p className="text-maintext text-3xl sm:text-4xl font-bold font-sans sp-2  tracking-wider">{productData[product].title}</p>
                    
                    <div className="flex fle-row items-start gap-4">
                      {/* price */}
                      <p className="font-semibold text-2xl text-secondary">{productData[product].price}</p>
                      {/*  rating */}
                      <div>
                        <FontAwesomeIcon icon={faStar} className="text-xs text-text"/>
                        <FontAwesomeIcon icon={faStar} className="text-xs text-text"/>
                        <FontAwesomeIcon icon={faStar} className="text-xs text-text"/>
                        <FontAwesomeIcon icon={faStar} className="text-xs text-text"/>
                        <FontAwesomeIcon icon={faStarHalfAlt} className="text-xs text-text"/>
                      </div>
                    </div>

                    <div>
                        {/* caption */}
                        <p className="text-maintext text-xl font-semibold mb-1 tracking-wide">{productData[product].caption}</p>
                        {/* description */}
                        <p className="text-text w-full leading-relaxed">{productData[product].description} </p>
                    </div>

                   {/* Mapping benefits */}
                    <div  className="w-full h-fit">
                        <p className="text-maintext text-xl font-semibold tracking-wide mb-2">Benefits</p>
                        <div className="text-text pl-6 grid grid-cols-2">
                          {(productData[product].benefits).map((benefit, index) => (
                            <p key={index} className="list-disc flex-row-center flex-nowrap gap-2 mb-4">
                             <FontAwesomeIcon icon={faCheck} className="text-lg text-secondary" /> {benefit}
                            </p>
                          ))}
                        </div>
                    </div>
                   
                  {/*  Add to cart */}
                  <div className='w-full h-fit text-center mt-8 flex-row-center justify-start gap-6 lg:gap-12 flex-wrap'>
                    <button onClick={() =>addToCart({ ...productData[product], id: product })
                     } className="btn-primary green-shadow w-60"> Add to cart</button>
                    <button className="btn-secondary green-shadow">Bulk Quote</button>
                  </div>
              </div>
        </div>

    </section>
  );
}
