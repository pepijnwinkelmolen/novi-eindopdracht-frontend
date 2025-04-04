import './Login.css'
import Button from "../../components/Button/Button.jsx";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";

function Login() {
    const { login } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/login", {
                "username" : e.target.username.value,
                "password" : e.target.password.value
            })
            console.log(response.headers);
            if(response.status === 200) {
                //login(response.headers.getAuthorization())
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
        {loading ? <div>Loading...</div> :
                <form className="login-form" onSubmit={(e) => handleLogin(e)}>
                    <h1>Welkom bij TochGevonden</h1>
                    <h2>Log in om mee te doen</h2>
                    <div className="login-form-input-container">
                        <input className="login-form-input" type="text" placeholder="Gebruikersnaam" name="username"/>
                    </div>
                    <div className="login-form-input-container">
                        <input className="login-form-input" type="password" placeholder="Wachtwoord" name="password"/>
                    </div>
                    <Button variant="submit-button" text="Log in"/>
                </form>
        }</div>
    )
}

export default Login;