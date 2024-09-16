import { createContext, useEffect, useState } from "react";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  console.log(auth)

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if(auth)
      setAuth(JSON.parse(auth))
  }, [])

  function addLoginData({token, user}) {
    setAuth({ token, user });
    localStorage.setItem('auth', JSON.stringify({ token, user }));
  }

  return (
    <AuthContext.Provider value={{ auth, addLoginData }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;