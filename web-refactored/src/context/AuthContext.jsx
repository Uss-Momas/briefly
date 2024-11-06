import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authData = localStorage.getItem("auth");
        if (authData) {
            setAuth(JSON.parse(authData));
        }
        setIsLoading(false);
    }, []);

    function logout() {
        localStorage.removeItem("auth");
        setAuth(undefined);
    }

    return (
        <AuthContext.Provider value={{ auth, isLoading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}