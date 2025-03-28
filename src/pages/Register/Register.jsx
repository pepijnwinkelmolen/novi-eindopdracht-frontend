import './Register.css'
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";
import {handlePasswordChecker, handlePasswordInput, handleUserInput} from '../../helpers/InputValidationHelper.js'

function Register() {
    // username input state
    const [username, setUsername] = useState("");
    const [isUserValid, setIsUserValid] = useState(false);

    // password input state
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    //password repeat input state
    const [passwordCheck, setPasswordCheck] = useState("");
    const [errorPasswordCheck, setErrorPasswordCheck] = useState(false);

    return (
        <div className="register-form-container">
            <form className="register-form" onSubmit={() => ""}>
                <h3>Maak uw nieuw account aan</h3>
                <label className="register-form-input-wrapper" htmlFor="username-input">
                    <p>Gebruikersnaam</p>
                    <input className={isUserValid ? "register-form-input" : "register-input-error"} type="text" id="username-input" name="username" maxLength="15" value={username} onChange={(e) => {
                        setUsername(e.target.value)
                        setIsUserValid(handleUserInput(e.target.value))
                    }}/>
                </label>
                <label className="register-form-input-wrapper" htmlFor="password-input">
                    <p>Wachtwoord</p>
                    <input className={isValid ? "register-form-input" : "register-input-error"} type="password" id="password-input" name="password" maxLength="15" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                        const result = handlePasswordInput(e.target.value, passwordCheck)
                        setIsValid(result[0]);
                        setErrorPasswordCheck(result[1])
                    }}/>
                </label>
                <label className="register-form-input-wrapper" htmlFor="password-check-input">
                    <p>Wachtwoord herhalen</p>
                    <input className={errorPasswordCheck ? "register-form-input" : "register-input-error"} type="password" id="password-check-input"
                           name="password-check" maxLength="15" value={passwordCheck} onChange={(e) => {
                        setPasswordCheck(e.target.value)
                        setErrorPasswordCheck(handlePasswordChecker(e.target.value, password))
                    }}/>
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