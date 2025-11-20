import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ProductCard = ({productImg, price, title, description}) => {
  return (
    <div className='mb-8 flex flex-col sm:flex-row sm:justify-evenly lg:flex-col items-center lg:justify-start lg:items-start justify-center w-[90%] h-120 sm:h-fit sm:w-full sm:p-2 lg:p-0 lg:w-70 lg:h-100 shadow-xl hover:shadow-2xl duration-300 rounded-lg '>
       {/*  product Image */}
        <div className=' w-full bg-primary flex-1 md:flex-none lg:h-[60%] sm:h-70 sm:w-100 md:w-80 lg:w-full flex-col-center justify-end  rounded-lg rounded-br-none rounded-bl-none  sm:rounded-br-lg sm:rounded-bl-lg lg:rounded-br-none lg:rounded-bl-none relative bg-cover bg-center' style={{ backgroundImage: `url(${productImg})`}}> {/* '60% 40% 30% 70% / 60% 30% 70% 40%' */}
            <FontAwesomeIcon icon={farHeart} className=' text-secondary absolute top-4 right-4'/>
            <div className='w-full h-6 sm:h-0 lg:h-6 rounded-tr-full rounded-tl-full bg-bg-light hidden'></div>
            <div className="w-72 h-72 clip-wave bg-amber-500"> {/* style={{ borderRadius: '70% 20% 60% 30% / 30% 70% 20% 80%'}} */}
                <p className='font-bold text-xl font-serif tracking-wider text-green-900'>{price}</p>
            {/* product title */}
                <p className="text-maintext text-lg leading-10 font-semibold tracking-wider text-left">{title}</p>
            </div>
        </div>
        
        <div className='pb-6 pl-6 pr-6 w-full h-fit sm:h-60 md:h-70 lg:h-fit sm:w-1/2 lg:w-full bg-bg-light rounded-lg rounded-tr-none rounded-tl-none hidden'>
            {/*  product description */}
                <p className='text-center text-text sm:text-left line-clamp-2 text-sm' >{description}</p>

                <div className='w-full h-fit mt-1'> 
                    <div className='flex-row-center justify-end w-full'>
                        <p className='text-2xl w-20 flex-row-center justify-evenly mt-1'>
                            <FontAwesomeIcon icon={faMinus} className='text-maintext bg-bg-dark rounded-full p-2 text-sm cursor-pointer hover:brightness-90 duration-300'/>
                            <FontAwesomeIcon icon={faPlus}  className='text-maintext bg-bg-dark rounded-full p-2 text-sm hover:brightness-90 cursor-pointer duration-300'/>
                        </p>
                    </div>
                    <div className='flex-row-center justify-between w-full mt-3'>
                        <button className=" border border-secondary p-2 w-26  rounded-full green-shadow text-sm shadow-xl">View details</button>
                        <button className="w-fit bg-secondary p-2 text-bg-light font-semibold rounded-lg text-sm shadow-xl green-shadow "> Add to Cart</button>
                    </div>
             

                </div>
        </div>
    </div>
  )
}

export default ProductCard