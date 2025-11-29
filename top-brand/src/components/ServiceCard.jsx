
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const ServiceCard = ({title, description, icon}) => {
  return (
      <div className='flex flex-col items-center lg:justify-start lg:items-start justify-center  w-[90%]  md:w-60 lg:w-83 xl:w-90 lg:h-80  p-6 pt-12 bg-bg shadow-lg hover:shadow-xl duration-300 rounded-xl'>
        {/*  card Icon */}
        <FontAwesomeIcon icon={icon} className=' mainIcon mb-4' />
      <div className='w-full h-fit bg-bg-dark p-4'>
          {/* card title */}
              <p className="subHeader text-center lg:text-left">{title}</p>

          {/*  card description */}
              <p className='cardText text-center sm:text-left leading-7 mt-2' >{description}</p>
      </div>
       
      </div>
  )
}

export default ServiceCard