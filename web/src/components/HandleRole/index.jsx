import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import NoAccessPage from "../../pages/NoAccessPage";
import { getProtectedData } from "../../utils/utils";

export default function HandleRole({ roleCode, children }) {
    const { auth } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [userRole, setUserRole] = useState(null);

    // IF NEEDED TO CHANGE IN FUTURE
    const fetchCurrentUser = async () => {
        try {
            const { user } = await getProtectedData(`/users/${auth.user.id}`, auth.token);
            const { role } = user;
            console.log(user, role);
            setUserRole(role);
        } catch (error) {
            console.error('Error fetching user role:', error);
        } finally {
            setIsLoading(false);
        }
    }

    if (auth.user.role.code !== roleCode) {
        return <Navigate to='/no-access' />
    }

    return (
        <>
            {children}
        </>
    );

}