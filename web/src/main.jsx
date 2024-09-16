import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import ShortlinkAnonimous from './pages/ShortlinkAnonimous/ShortlinkAnonimous.jsx'
import ShortLink from './pages/ShortLink/ShortLink.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider, Routes } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'

import { AuthProvider } from './context/AuthProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/:code',
    element: <NotFoundPage />,
  },
  {
    path: '/shortlink-anonimous',
    element: < ShortlinkAnonimous />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={router} /> */}
      {/* <App /> */}
      {/* <ShortlinkAnonimous /> */}
      {/* <Login /> */}
      {/* <Signup /> */}
      {/* <ShortLink /> */}
    </AuthProvider>
  </StrictMode>,
)
