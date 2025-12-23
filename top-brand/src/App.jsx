import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Brands from './pages/Brands.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Admin from './dashboard/Admin.jsx';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="about" element={<About/>} />
        <Route path="brands" element={<Brands/>} />
        <Route path="contact" element={<Contact />} />
        <Route path="admin" element={<Admin />} />
        <Route path="cart" element={<Cart/>} />
      </Routes>
    </Router>
  )
}

export default App;





//import React, { lazy, Suspense } from "react";
//import { HashRouter as Router, Routes, Route } from "react-router-dom";
//import ScrollToTop from "./components/ScrollToTop.jsx";

/* Eager-loaded (critical) */
//import Home from "./pages/Home.jsx";

/* Lazy-loaded (non-critical) */
/* const About = lazy(() => import("./pages/About.jsx"));
const Brands = lazy(() => import("./pages/Brands.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));

const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="brands" element={<Brands />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App; */

