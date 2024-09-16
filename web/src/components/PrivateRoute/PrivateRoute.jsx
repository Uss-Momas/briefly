import useAuth from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const { isLoggedIn, auth, loading } = useAuth();

    if (loading) return (
        <div>Loading...</div>
    )
    
    return isLoggedIn? children : <Navigate to="/login" />;
}