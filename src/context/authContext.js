import { createContext, useEffect, useState } from "react";
import {getUser, logout} from "../config/api";

export const AuthContext = createContext();

export const AuthContexProvider = ({children}) => {
  const [ currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  
  const loginContext = async () =>{
    const res = await getUser();
    setCurrentUser(res);
  }

  const logoutContext = async () =>{
    await logout();
    setCurrentUser(null);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{currentUser, loginContext, logoutContext}}>
      {children}
    </AuthContext.Provider>
  );
}