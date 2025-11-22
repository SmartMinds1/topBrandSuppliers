import React from "react";
import { productData } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faTimes } from "@fortawesome/free-solid-svg-icons";


export default function ProductDetails({product, onClose}) {
      if (!productData[product]) {
        return (
          <div className="py-16 px-6 md:px-20 bg-bg w-[90vw] h-screen m-auto shadow-2xl ">
              <div className="w-full h-8 bg-transparent text-right mb-6 fixed top-3 right-[7%] md:right-[6%]">
                 <button onClick={onClose} className="bg-primary shadow-2xl w-6 h-6 rounded-full text-background hover:brightness-80 duration-300 cursor-pointer"> <FontAwesomeIcon icon={faTimes}/></button>
              </div>
              <div className="flex-col-center justify-center w-full h-[80vh]">
                  <p className="text-center py-16 text-gray-600">This product will be <span className="text-accent font-bold"> COMMING SOON!</span> <span className="text-accent font-bold text-2xl animate-ping"> . . .</span></p>
              </div>
          </div>
        )
      }

  return (
    <section className="py-16 px-6 md:px-20 bg-bg-light w-[90vw] m-auto shadow-2xl">
         <div className="w-fith-8 text-right mb-6 fixed top-3 right-[7%] md:right-[6%]">
            <button onClick={onClose} className="bg-bg-dark shadow-2xl w-6 h-6 rounded-full text-background hover:brightness-80 duration-300 cursor-pointer"> <FontAwesomeIcon icon={faTimes}/></button>
         </div>

         {/* Header sectiion */}
        <div className="text-center mb-12 bg-green-400">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">{productData[product].title}</h1>
       {/*    <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            {productData[product].description}
          </p> */}
        </div>

        {/* Product image and details */}
        <div className="w-[80%] m-auto h-[60vh] bg-amber-300 flex-row-center justify-evenly">
                <img
                src={productData[product].image}
                alt={productData[product].title}
                className="w-1/2 h-full object-cover rounded-2xl shadow"
                />
                <div>
                   {/*  title */}
                   <p>{productData[product].title}</p>

                   {/* price */}
                   <p>{productData[product].price}</p>

                   {/* caption */}
                   <p>{productData[product].caption}</p>

                   {/* description */}
                   <p>{productData[product].description} </p>

                   {/* description */}
                   <p>{productData[product].benefits.map((benefit, index)=>{
                         <div key={index}>
                            {benefit}
                         </div>
                   })} </p>

                

                </div>
        </div>




        <div className="text-center mt-16">
          <p className="text-lg text-gray-700">
            Want results like this for your business?
          </p>
          <a
            href="/contact"
            className="inline-block mt-5 px-6 py-3 bg-soft-alert text-white font-semibold rounded-xl shadow-2xl soft-shadow"
          >
            Start Your product <span><FontAwesomeIcon icon={faArrowRightLong} className="translate-y-0.5 animate-pulse"/> </span>
          </a>
        </div>
    </section>
  );
}
