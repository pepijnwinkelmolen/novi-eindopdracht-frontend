import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {isValidToken} from "../helpers/isValidToken.js";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [auth, setAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending"
    });

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken && isValidToken(storedToken)) {
            void login()
        } else {
            setAuth({
                status: "done"
            })
        }
    }, []);

    const login = async (token)  => {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token);
        try {
            const result = await axios.get(
                `http://localhost:8080/users/${decodedToken.username}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            setAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    id: result.data.userId
                },
                status: "done"
            });
        } catch (err) {
            console.error(err.message)
        }
        console.log("user logged in!")
    };

    const logout = () => {
        localStorage.clear();
        setAuth({
            isAuth: false,
            user: null,
            status: "done"
        });
        navigate("/home");
    };

    const data = {
        isAuth: auth.isAuth,
        user: auth.user,
        login,
        logout
    };

    return(
        <AuthContext.Provider value={data}>
            {auth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthProvider;