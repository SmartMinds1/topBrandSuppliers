import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Brands from './pages/Brands.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="about" element={<About/>} />
        <Route path="brands" element={<Brands/>} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart/>} />
      </Routes>
    </Router>
  )
}

export default App;
