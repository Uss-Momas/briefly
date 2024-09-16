import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth)
      setAuth(JSON.parse(auth))
    setLoading(false);
  }, [])

  function addLoginData({ token, user }) {
    setAuth({ token, user });
    localStorage.setItem('auth', JSON.stringify({ token, user }));
  }

  // Function to log out the user
  function logout() {
    setAuth({});
    localStorage.removeItem("auth");
  }

  function getLogginData() {

  }

  const isLoggedIn = !!auth?.token;

  return (
    <AuthContext.Provider value={{ auth, isLoggedIn, loading, addLoginData, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;