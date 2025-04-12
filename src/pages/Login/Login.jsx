import './Login.css'
import Button from "../../components/Button/Button.jsx";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import Loader from "../../components/Loader/Loader.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";

function Login() {
    const { login } = useContext(AuthContext);
    const {loading, setLoading} = useContext(LoaderContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/login", {
                "username" : e.target.username.value,
                "password" : e.target.password.value
            })
            if(response.status === 200) {
                login(response.headers.getAuthorization())
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return (<Loader/>)
    } else {
        return (
            <div>
                <form className="login-form" onSubmit={(e) => handleLogin(e)}>
                    <h1>Welkom bij TochGevonden</h1>
                    <h2>Log in om mee te doen</h2>
                    <div className="login-form-input-container">
                        <input className="login-form-input" type="text" placeholder="Gebruikersnaam" name="username" minLength="6" maxLength="15"/>
                    </div>
                    <div className="login-form-input-container">
                        <input className="login-form-input" type="password" placeholder="Wachtwoord" name="password" minLength="6" maxLength="20"/>
                    </div>
                    <Button variant="submit-button" text="Log in"/>
                </form>
            </div>
        )
    }
}

export default Login;