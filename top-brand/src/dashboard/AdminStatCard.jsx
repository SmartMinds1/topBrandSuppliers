import { faChartLine, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const AdminStatCard = ({icon, statsName, statsNumber, profit}) => {
  return (
    <div className='w-60 h-30 rounded-lg p-2 bg-linear-to-tr from-bg-dark to-bg-light shadow-md border border-gray-100  hover:shadow-xl cursor-pointer duration-300 flex-row-center justify-between ' >
      {/* card info */}
        <div className='flex-1'>
             <p className="text-2xl w-fit font-bold bg-linear-to-br from-bg via-primary to-primary bg-clip-text text-transparent">{statsNumber}</p>
             <p className='text-sm mt-1'>{statsName}</p>
             <p className='text-sm text-green-600'> <FontAwesomeIcon icon={faChartLine}/> +{profit}% this month</p>
        </div>
      {/* card Icon */}
        <div className='w-fit bg-accent-light/10 p-1.5 rounded mr-2'>
            <FontAwesomeIcon icon={icon} className='text-2xl text-accent'/>
        </div>
    </div>
  )
}

export default AdminStatCard
