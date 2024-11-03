import { createBrowserRouter, RouterProvider } from "react-router-dom"
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
    element: <Dashboard />,
  },
  {
    path: '/auth/analytics',
    element: <Analytics />,
  },
  {
    path: '/auth/profile',
    element: <Profile />,
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}