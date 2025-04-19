import './Login.css'
import Button from "../../components/Button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Loader from "../../components/Loader/Loader.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";

function Login() {
    const { login } = useContext(AuthContext);
    const {loading, setLoading} = useContext(LoaderContext);
    const [error, setError] = useState("");

    const handleLogin = async (e, controller) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/login", {
                "username" : e.target.username.value,
                "password" : e.target.password.value
            }, {
                signal: controller.signal
            })
            if(response.status === 200) {
                login(response.headers.getAuthorization(), controller)
            }
        } catch (err) {
            console.error(err);
            setError("Onjuiste gebruikersnaam of wachtwoord.");
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return (<Loader/>)
    } else {
        return (
            <div>
                <form className="login-form" onSubmit={(e) => {
                    const controller = new AbortController();
                    handleLogin(e, controller);
                    return () => controller.abort();
                }}>
                    <h1>Welkom bij TochGevonden</h1>
                    <h2>Log in om mee te doen</h2>
                    <div className="login-form-input-container">
                        <input className="login-form-input" type="text" placeholder="Gebruikersnaam" name="username" minLength="6" maxLength="15"/>
                    </div>
                    <div className="login-form-input-container">
                        <input className="login-form-input" type="password" placeholder="Wachtwoord" name="password" minLength="6" maxLength="20"/>
                    </div>
                    <Button variant="submit-button" text="Log in"/>
                    {error !== null && error !== undefined && error !== "" ?
                        <div className="error-container">
                            <div className="error-wrapper">
                                <p className="error-message">{error}</p>
                            </div>
                        </div>: <></>
                    }
                </form>
            </div>
        )
    }
}

export default Login;