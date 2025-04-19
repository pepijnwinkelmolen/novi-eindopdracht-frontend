import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {isValidToken} from "../helpers/isValidToken.js";
import axios from "axios";
import Loader from "../components/Loader/Loader.jsx";

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
        const controller = new AbortController();
        const storedToken = localStorage.getItem("token")
        if (storedToken && isValidToken(storedToken)) {
            void login(storedToken, controller);
        } else {
            setAuth({
                status: "done"
            })
        }
        return () => controller.abort();
    }, []);

    const login = async (token, controller)  => {
        if (localStorage.getItem("token") !== "token") {
            localStorage.setItem("token", token);
        }
        try {
            const result = await axios.get(
                `http://localhost:8080/users/login`,
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                },
            );
            setAuth({
                isAuth: true,
                user: {
                    username: result.data.username,
                    id: result.data.userId,
                    roles: result.data.roles
                },
                status: "done"
            });
        } catch (err) {
            console.error(err.message)
        }
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
            {auth.status === "done" ? children : <Loader/>}
        </AuthContext.Provider>
    )
}

export default AuthProvider;