import { AuthProvider } from './context/AuthContext';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import AdminLayout from './components/AdminLayout';
import Analytics from "./pages/Auth/Analytics";
import Dashboard from "./pages/Auth/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Auth/Profile";
import ProtectedRoute from './components/ProtectedRoute'
import RedirectLink from './pages/RedirectLink';
import Signup from "./pages/Signup";
import Users from './pages/Admin/Users';
import NoAccessPage from './pages/NoAccessPage';
import HandleRole from './components/HandleRole';

const ADMIN = "01";
const NORMAL = "02";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:code',
    element: <RedirectLink />,
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
  {
    path: '/admin',
    element: <ProtectedRoute>
      <HandleRole roleCode={ADMIN}>
        <AdminLayout />
      </HandleRole>
    </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Navigate to="users" replace />
      }, {
        path: 'users',
        element: <Users />
      }
    ]
  },
  {
    path: '/no-access',
    element: <NoAccessPage />,
  }
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}