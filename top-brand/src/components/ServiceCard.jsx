
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ServiceCard = ({title, description, icon}) => {
  return (
      <div className='flex flex-col items-center lg:justify-start lg:items-start justify-center  w-full m-auto sm:w-100 md:w-60 lg:w-82 lg:h-80  p-6 pt-12 bg-bg shadow-lg hover:shadow-xl duration-300 rounded-xl'>
        {/*  card Icon */}
        <FontAwesomeIcon icon={icon} className='mainIcon mb-4' />
        <div className='w-full h-fit bg-bg-light p-4'>
            {/* card title */}
                <p className="subHeader text-center lg:text-left">{title}</p>

            {/*  card description */}
                <p className='cardText text-center sm:text-left leading-7 mt-2 font-light' >{description}</p>
        </div>
       
      </div>
  )
}

export default ServiceCard