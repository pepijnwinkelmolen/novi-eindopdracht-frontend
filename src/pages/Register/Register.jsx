import './Register.css'
import Button from "../../components/Button/Button.jsx";

function Register() {
    return (
        <div className="register-form-container">
            <form className="register-form" onSubmit="">
                <h3>Maak uw nieuw account aan</h3>
                <label className="register-form-input-wrapper" htmlFor="username-input">
                    <p>Gebruikersnaam</p>
                    <input className="register-form-input" type="text" id="username-input" name="username"/>
                </label>
                <label className="register-form-input-wrapper" htmlFor="password-input">
                    <p>Wachtwoord</p>
                    <input className="register-form-input" type="password" id="password-input" name="password"/>
                </label>
                <label className="register-form-input-wrapper" htmlFor="password-check-input">
                    <p>Wachtwoord herhalen</p>
                    <input className="register-form-input" type="password" id="password-check-input"
                           name="password-check"/>
                </label>
                <div className="buffer-register"/>
                <label className="register-form-input-checkmark-wrapper" htmlFor="ToS">
                    <input className="register-form-input-checkmark" type="checkbox" id="ToS" value="accepted"
                           name="ToS"/>
                    <p>Gebruikersvoorwaarden</p>
                </label>
                <label className="register-form-input-checkmark-wrapper" htmlFor="PrPolicy">
                    <input className="register-form-input-checkmark" type="checkbox" id="PrPolicy" value="accepted"
                           name="PrPolicy"/>
                    <p>Privacyverklaring</p>
                </label>
                <div className="buffer-register"/>
                <div className="register-form-button">
                    <Button variant="submit-button" text="Maak account aan"/>
                </div>
            </form>
        </div>
    )
}

export default Register;