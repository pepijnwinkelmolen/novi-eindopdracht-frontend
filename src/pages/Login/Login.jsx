import './Login.css'
import Button from "../../components/Button/Button.jsx";

function Login() {
    return (
        <form className="login-form" onSubmit="">
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
    )
}

export default Login;