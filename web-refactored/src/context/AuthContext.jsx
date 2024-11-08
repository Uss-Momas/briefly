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

    function login(authData) {
        setAuth(authData);
        localStorage.setItem("auth", JSON.stringify(authData));
    }

    function updateUser(userData) {
        const authData = localStorage.getItem("auth");
        const data = JSON.parse(authData);
        data.user.firstName = userData.firstName;
        data.user.lastName = userData.lastName;
        setAuth(data);
        localStorage.setItem("auth", JSON.stringify(data));
    }

    function logout() {
        localStorage.removeItem("auth");
        setAuth(undefined);
    }

    return (
        <AuthContext.Provider value={{ auth, isLoading, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}