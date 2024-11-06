import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import ProtectedRoute from './components/ProtectedRoute'
import Analytics from "./pages/Auth/Analytics";
import Dashboard from "./pages/Auth/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Auth/Profile";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/auth/dashboard',
    element: <ProtectedRoute ><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/auth/analytics',
    element: <ProtectedRoute ><Analytics /></ProtectedRoute>,
  },
  {
    path: '/auth/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}