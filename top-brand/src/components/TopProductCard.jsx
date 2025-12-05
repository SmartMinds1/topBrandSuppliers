import React from 'react'

const TopProductCard = ({title, description, productImage}) => {
    return (
        <div className='flex flex-col sm:flex-row sm:justify-evenly lg:flex-col items-center lg:justify-start lg:items-start justify-center w-[90%] h-120 sm:h-fit sm:w-full sm:p-2 lg:p-0 lg:w-80 lg:h-100 shadow hover:shadow-xl duration-300 rounded-lg '>
            {/*  product Image */}
                <div className=' w-full bg-bg-dark flex-1 md:flex-none lg:flex-1 sm:h-70 sm:w-100 md:w-80 lg:w-full flex-col-center justify-end  rounded-lg rounded-br-none rounded-bl-none  sm:rounded-br-lg sm:rounded-bl-lg lg:rounded-br-none lg:rounded-bl-none bg-conver bg-no-repeat bg-cover bg-position-[50%_70%]' style={{ backgroundImage: `url(${productImage})`}}>
                    <div className='w-full h-6 sm:h-0 lg:h-6 rounded-tr-full rounded-tl-full bg-bg-light'></div>
                </div>
                
                <div className='pb-6 pl-6 pr-6 w-full h-fit sm:h-60 md:h-70 lg:h-fit sm:w-1/2 lg:w-full bg-bg-light rounded-lg rounded-tr-none rounded-tl-none'>
                    {/* product title */}
                        <p className="subHeader text-center sm:text-left mt-5 lg:mt-0">{title}</p>
    
                    {/*  product description */}
                        <p className='cardText text-center sm:text-left mt-2' >{description}</p>
                </div>
        </div>
    )  
}

export default TopProductCard