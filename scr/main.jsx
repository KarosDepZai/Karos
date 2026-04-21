import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './script.js' // Nạp code từ file App.jsx của bạn
import './style.css'     // Nạp các style cơ bản (Tailwind)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
