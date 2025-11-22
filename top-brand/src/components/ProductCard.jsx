import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


const ProductCard = ({productImg, price, title, description, viewDetails}) => {


  return (
    <>
    <div className='mb-8 flex flex-col sm:flex-row sm:justify-evenly lg:flex-col items-center lg:justify-start lg:items-start justify-center w-[90%] h-120 sm:h-fit sm:w-full sm:p-2 lg:p-0 lg:w-70 lg:h-100 shadow-xl hover:shadow-2xl duration-300 rounded-lg '>
       {/*  product Image */}
        <div className=' w-full bg-primary flex-1 md:flex-none lg:flex-1 sm:h-70 sm:w-100 md:w-80 lg:w-full flex-col-center justify-end  rounded-lg rounded-br-none rounded-bl-none  sm:rounded-br-lg sm:rounded-bl-lg lg:rounded-br-none lg:rounded-bl-none relative bg-cover bg-center' style={{ backgroundImage: `url(${productImg})`}}>
            <FontAwesomeIcon icon={farHeart} className=' text-secondary absolute top-4 right-4'/>
            <div className='w-full lg:h-30 p-3 rounded-tr-full  bg-bg'>
                <div className='w-fit p-1 bg-bg-dark h-fit'>
                    {/* product price */}
                    <p className='font-bold text-xl font-serif tracking-wider text-green-900 shadow'>{price}</p>
               </div>
            {/* product title */}
                <p className="text-maintext text-lg leading-10 font-semibold tracking-normal text-left">{title}</p>
            {/*  product description */}
                <p className='text-center text-text sm:text-left line-clamp-2 text-sm' >{description}</p>
            </div>
        </div>
        
        <div className='pb-6 pl-6 pr-6 w-full h-fit sm:h-60 md:h-70 lg:h-fit sm:w-1/2 lg:w-full bg-bg rounded-lg rounded-tr-none rounded-tl-none'>
            <div className='w-full h-fit mt-1'> 
                <div className='flex-row-center justify-end w-full'>
                    <p className='text-2xl w-20 flex-row-center justify-evenly mt-1'>
                        <FontAwesomeIcon icon={faMinus} className='text-maintext bg-bg-dark rounded-full p-2 text-sm cursor-pointer hover:brightness-95 duration-300'/>
                        <FontAwesomeIcon icon={faPlus}  className='text-maintext bg-bg-dark rounded-full p-2 text-sm hover:brightness-95 cursor-pointer duration-300'/>
                    </p>
                </div>  
                <div className='flex-row-center justify-between w-full mt-3'>
                    <button onClick={()=> viewDetails(title)} className=" border border-secondary p-2 font-semibold text-text w-26  rounded-lg green-shadow text-sm shadow-xl">View Details</button>
                    <button className="w-fit bg-secondary p-2 text-bg-light font-semibold rounded-lg text-sm shadow-xl green-shadow "> Add to Cart</button>
                </div>
            </div>
        </div>
    </div>


  {/*   removed modal data */}




    </>
  )
}

export default ProductCard