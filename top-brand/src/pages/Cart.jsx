import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Cart = () => {
  return (
    <div>
      {/*  Nav bar */}
      <Header/>

      <div className=' w-full h-screen flex-row-center justify-center text-maintext text-5xl'>
          <p>Client's shopping Cart manager</p>
      </div>
              
      <Footer/>
    </div>
  )
}

export default Cart