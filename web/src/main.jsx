import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login/Login.jsx'
import Signup from './pages/Signup/Signup.jsx'
import ShortlinkAnonimous from './pages/ShortlinkAnonimous/ShortlinkAnonimous.jsx'
import ShortLink from './pages/ShortLink/ShortLink.jsx'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'

import { AuthProvider } from './context/AuthProvider'
import LaunchingPage from './pages/LaunchingPage/LaunchingPage.jsx'
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'

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
          <Route path='/' element={<LaunchingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/shortlink-anonimous'element={<ShortlinkAnonimous />}/>

          {/* Protected Route */}
          <Route
            path="/shorturl"
            element={
              <PrivateRoute>
                <ShortLink />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Redirect Home or 404 */}
          <Route path="*" element={<NotFoundPage />} />
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
