import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


const ProductCard = ({productImg, price, title, description, viewDetails}) => {


  return (
    <div className='mb-8 flex flex-col items-start justify-center p-0 w-70 h-100 shadow-xl hover:shadow-2xl duration-300 rounded-lg '>
       {/*  product Image */}
        <div className=' bg-primary flex-1 lg:flex-1 h-70 w-full flex-col-center justify-end  rounded-lg rounded-br-none rounded-bl-none  sm:rounded-br-lg sm:rounded-bl-lg lg:rounded-br-none lg:rounded-bl-none relative bg-cover bg-center' style={{ backgroundImage: `url(${productImg})`}}>
            <FontAwesomeIcon icon={farHeart} className=' text-secondary absolute top-4 right-4'/>
            <div className='w-full h-30 p-3 rounded-tr-full bg-bg'>
                <div className='w-fit p-1 bg-bg-dark h-fit'>
                    {/* product price */}
                    <p className='font-bold text-xl font-serif tracking-wider text-green-900 shadow'>{price}</p>
               </div>
            {/* product title */}
                <p className="text-maintext text-lg leading-8 tracking-normal text-left">{title}</p>
            {/*  product description */}
                <p className='text-text text-sm text-left line-clamp-2'>{description}</p>
            </div>
        </div>
        
 {/*        <div className='pb-6 pl-6 pr-6 w-full h-fit bg-bg rounded-lg rounded-tr-none rounded-tl-none'>
            <div className='w-full h-fit mt-1'> 
                <div className='flex-row-center justify-end w-full'>
                    <p className='text-2xl w-20 flex-row-center justify-evenly mt-1'>
                        <FontAwesomeIcon icon={faMinus} className='text-maintext bg-bg-dark rounded-full p-2 text-sm cursor-pointer hover:brightness-95 duration-300'/>
                        <FontAwesomeIcon icon={faPlus}  className='text-maintext bg-bg-dark rounded-full p-2 text-sm hover:brightness-95 cursor-pointer duration-300'/>
                    </p>
                </div>  
                <div className='flex-row-center justify-between w-full mt-3'>
                    <button onClick={()=> viewDetails(title)} className=" border border-secondary p-2 font-semibold text-text w-26  rounded-lg green-shadow text-sm shadow-xl">View Details</button>
                    <button className="w-fit bg-secondary p-2 text-bg-light font-semibold rounded-lg text-sm shadow-xl green-shadow"> Add to Cart</button>
                </div>
            </div>
        </div> */}
    </div>
    
  )
}

export default ProductCard