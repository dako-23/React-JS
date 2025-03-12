import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React, { StrictMode, Suspense } from 'react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback='Loading...'>

      <App />
    </Suspense>
  </StrictMode>
)
