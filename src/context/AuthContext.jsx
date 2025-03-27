import {createContext, useState} from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [isAuth, setIsAuth] = useState(false)

    function login() {
        setIsAuth(true)
        console.log(true)
    }

    function logout() {
        setIsAuth(false)
    }

    return(
        <AuthContext.Provider value={{isAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}