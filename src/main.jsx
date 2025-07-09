import { GoogleOAuthProvider } from '@react-oauth/google' //

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">

      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>

      </GoogleOAuthProvider>

    </BrowserRouter>
  </StrictMode>,
)