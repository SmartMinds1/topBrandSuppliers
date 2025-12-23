import { faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AdminStatCard = ({icon, statsName, statsNumber}) => {
  return (
    <div className='w-60 h-30 rounded-lg p-2 bg-bg-dark shadow-md border border-gray-300  hover:shadow-xl cursor-pointer duration-300 flex-row-center justify-between ' >
      {/* card info */}
        <div className='flex-1'>
             <p className="text-2xl w-fit font-bold bg-linear-to-br from-bg via-primary to-primary bg-clip-text text-transparent">{statsNumber}</p>
             <p className='text-sm mt-1'>{statsName}</p>
             <p className='text-sm text-green-600'> <FontAwesomeIcon icon={faChartLine}/> +12% this month</p>
        </div>
      {/* card Icon */}
        <div className='w-fit'>
            <FontAwesomeIcon icon={icon} className='text-2xl pr-2 text-accent-light'/>
        </div>
    </div>
  )
}

export default AdminStatCard
