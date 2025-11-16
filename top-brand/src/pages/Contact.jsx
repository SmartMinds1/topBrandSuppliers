import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Contact = () => {
  return (
    <div>
      {/*  Nav bar */}
      <Header/>

      <div className=' w-full h-screen flex-row-center justify-center text-maintext text-5xl'>
          <p>Client contact and support </p>
      </div>
            
    <Footer/>
    </div>
  )
}

export default Contact