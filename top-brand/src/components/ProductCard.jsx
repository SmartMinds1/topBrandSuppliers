import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


const ProductCard = ({productImg, price, title, description, viewDetails}) => {


  return (
    <div onClick={()=> viewDetails(title)} className='mb-8 flex flex-col items-start justify-center p-0 w-70 h-80 shadow hover:shadow-xl duration-300 rounded-lg cursor-pointer'>
       {/*  product Image */}
        <div className=' bg-bg-dark flex-1 lg:flex-1 h-70 w-full flex-col-center justify-end  rounded-lg rounded-br-none rounded-bl-none  sm:rounded-br-lg sm:rounded-bl-lg lg:rounded-br-none lg:rounded-bl-none relative bg-cover bg-center' style={{ backgroundImage: `url(${productImg})`}}>
            <FontAwesomeIcon icon={farHeart} className=' text-secondary absolute top-4 right-4'/>
            <div className='w-full h-32 p-4 bg-bg-light'>
            {/* product title */}
                <p className="text-maintext text-lg tracking-normal text-left font-semibold">{title}</p>
            {/*  product description */}
                <p className='text-text text-sm text-left line-clamp-2'>{description}</p>
            {/* product price */}
                <div className='w-fit p-1 bg-bg-dark h-fit mt-1'>
                    <p className='font-bold text-maintext font-serif tracking-wider shadow'>${price}</p>
               </div>
            </div>
        </div>
    </div>
    
  )
}

export default ProductCard