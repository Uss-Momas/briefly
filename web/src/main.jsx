import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import ShortlinkAnonimous from './pages/ShortlinkAnonimous/ShortlinkAnonimous.jsx'
import ShortLink from './pages/ShortLink/ShortLink.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <ShortlinkAnonimous />
    {/* <Login /> */}
    {/* <Signup /> */}
    {/* <ShortLink /> */}
  </StrictMode>,
)
