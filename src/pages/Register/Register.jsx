import './Register.css'
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";
import {handlePasswordChecker, handlePasswordInput, handleUserInput} from '../../helpers/InputValidationHelper.js'
import axios from "axios";

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

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [phonenumber, setPhonenumber] = useState("");
    const [isPhonenumberValid, setIsPhonenumberValid] = useState(false);

    const [residence, setResidence] = useState("");
    const [isResidenceValid, setIsResidenceValid] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(false);
        if (isUserValid && isValid && errorPasswordCheck && isEmailValid && isPhonenumberValid && isResidenceValid) {
            setLoading(true);
            try {
                await axios.post("http://localhost:8080/users/create", {
                    "username" : e.target.username.value,
                    "password" : e.target.password.value,
                    "email" : e.target.email.value,
                    "phoneNumber" : e.target.phoneNumber.value,
                    "residence" : e.target.residence.value,
                    "tos" : e.target.tos.value,
                    "prPolicy" : e.target.prPolicy.value
                });
            } catch(err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        } else {
            setError(true);
        }
    }

    return (
        <div className="register-form-container">
            {loading ? <div>hier nog de loader</div> :
                <form className="register-form" onSubmit={(e) => handleRegister(e)}>
                    <h3>Maak uw nieuw account aan</h3>
                    <label className="register-form-input-wrapper" htmlFor="username-input">
                        <p>Gebruikersnaam</p>
                        <input className={isUserValid ? "register-form-input" : "register-input-error"} type="text"
                               id="username-input" name="username" maxLength="15" value={username} onChange={(e) => {
                            setUsername(e.target.value)
                            setIsUserValid(handleUserInput(e.target.value, 5, 16))
                        }}/>
                    </label>
                    <label className="register-form-input-wrapper" htmlFor="password-input">
                        <p>Wachtwoord</p>
                        <input className={isValid ? "register-form-input" : "register-input-error"} type="password"
                               id="password-input" name="password" maxLength="15" value={password} onChange={(e) => {
                            setPassword(e.target.value)
                            const result = handlePasswordInput(e.target.value, passwordCheck)
                            setIsValid(result[0]);
                            setErrorPasswordCheck(result[1])
                        }}/>
                    </label>
                    <label className="register-form-input-wrapper" htmlFor="password-check-input">
                        <p>Wachtwoord herhalen</p>
                        <input className={errorPasswordCheck ? "register-form-input" : "register-input-error"}
                               type="password" id="password-check-input"
                               name="password-check" maxLength="15" value={passwordCheck} onChange={(e) => {
                            setPasswordCheck(e.target.value)
                            setErrorPasswordCheck(handlePasswordChecker(e.target.value, password))
                        }}/>
                    </label>
                    <label className="register-form-input-wrapper" htmlFor="email-input">
                        <p>Email</p>
                        <input className={isEmailValid ? "register-form-input" : "register-input-error"} type="text"
                               id="email-input" name="email" maxLength="30" value={email} onChange={(e) => {
                            setEmail(e.target.value)
                            setIsEmailValid(handleUserInput(e.target.value, 10, 31))
                        }}/>
                    </label>
                    <label className="register-form-input-wrapper" htmlFor="phonenumber-input">
                        <p>Telefoonnummer</p>
                        <input className={isPhonenumberValid ? "register-form-input" : "register-input-error"} type="text"
                               id="phonenumber-input" name="phoneNumber" maxLength="15" value={phonenumber} onChange={(e) => {
                            setPhonenumber(e.target.value)
                            setIsPhonenumberValid(handleUserInput(e.target.value, 9, 11))
                        }}/>
                    </label>
                    <label className="register-form-input-wrapper" htmlFor="residence-input">
                        <p>Woonplaats</p>
                        <input className={isResidenceValid ? "register-form-input" : "register-input-error"} type="text"
                               id="residence-input" name="residence" maxLength="15" value={residence} onChange={(e) => {
                            setResidence(e.target.value)
                            setIsResidenceValid(handleUserInput(e.target.value, 2, 20))
                        }}/>
                    </label>
                    <div className="buffer-register"/>
                    <label className="register-form-input-checkmark-wrapper" htmlFor="ToS">
                        <input className="register-form-input-checkmark" type="checkbox" id="ToS" value="accepted"
                               name="tos"/>
                        <p>Gebruikersvoorwaarden</p>
                    </label>
                    <label className="register-form-input-checkmark-wrapper" htmlFor="PrPolicy">
                        <input className="register-form-input-checkmark" type="checkbox" id="PrPolicy" value="accepted"
                               name="prPolicy"/>
                        <p>Privacyverklaring</p>
                    </label>
                    <div className="buffer-register"/>
                    <div className="register-form-button">
                        <Button variant="submit-button" text="Maak account aan"/>
                    </div>
                </form>
            }
        </div>
    )
}

export default Register;