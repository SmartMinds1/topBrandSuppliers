import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Brands = () => {
  return (
   <div>
      {/*  Nav bar */}
      <Header/>

      <div className=' w-full h-screen flex-row-center justify-center text-maintext text-5xl'>
          <p>Brands page section</p>
      </div>
              
      <Footer/>
   </div>
  )
}

export default Brands