import React from 'react'
import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import App from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import './index.css'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
