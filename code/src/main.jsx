import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './components/CartContext';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </CartProvider>

  </StrictMode>,
)
