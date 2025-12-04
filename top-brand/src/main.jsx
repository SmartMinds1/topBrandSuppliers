import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./context/CartContext"; //for all cart items


//for animations
import {ScrollTrigger, SplitText} from "gsap/all";
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger, SplitText);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
)
