
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ServiceCard = ({title, description, icon}) => {
  return (
      <div className='flex flex-col items-center lg:justify-start lg:items-start justify-center  w-[90%]  md:w-60 lg:w-83 xl:w-90 lg:h-92 p-4 pt-8 pb-12 md:p-6 lg:p-12 xl:p-14 bg-bg-light shadow-xl hover:shadow-2xl duration-300 rounded-2xl'>
    {/*  card Icon */}
        <FontAwesomeIcon icon={icon} className=' mainIcon mb-2' />
      
    {/* card title */}
        <p className="subHeader text-center lg:text-left mt-5 lg:mt-0">{title}</p>

    {/*  card description */}
        <p className='cardText text-center' >{description}</p>
       
      </div>
  )
}

export default ServiceCard