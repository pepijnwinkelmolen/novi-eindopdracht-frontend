import './Profile.css'
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";
import {handlePasswordChecker, handlePasswordInput, handleUserInput} from '../../helpers/InputValidationHelper.js'

function Profile() {
    // username input state
    const [username, setUsername] = useState("");
    const [isUserValid, setIsUserValid] = useState(false);

    // password input state
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    //password repeat input state
    const [passwordCheck, setPasswordCheck] = useState("");
    const [errorPasswordCheck, setErrorPasswordCheck] = useState(false);

    return(
        <div className="profile-container">
            <section className="profile-wrapper">
                <h3>Bekijk uw account</h3>
                <label className="profile-input-wrapper" htmlFor="username-change-input">
                    <p>Gebruikersnaam</p>
                    <input className={isUserValid ? "profile-input" : "profile-input-error"} type="text" id="username-change-input" name="change-username" value={username}
                           placeholder="Tussen de 6 en 15 karakters" maxLength="15" onChange={(e) => {
                               setUsername(e.target.value)
                               setIsUserValid(handleUserInput(e.target.value))
                    }}/>
                </label>
                <div className="profile-button">
                    <Button variant="submit-button" text="Verander gebruikersnaam"/>
                </div>
                <label className="profile-input-wrapper" htmlFor="password-change-input">
                    <p>Wachtwoord</p>
                    <input className={isValid ? "profile-input" : "profile-input-error"} type="password" id="password-change-input" name="change-password" value={password}
                           placeholder="Tussen de 6 en 15 karakters" maxLength="15" onChange={(e) => {
                               setPassword(e.target.value)
                               const result = handlePasswordInput(e.target.value, passwordCheck)
                               setIsValid(result[0]);
                               setErrorPasswordCheck(result[1])
                           }}/>
                </label>
                <label className="profile-input-wrapper" htmlFor="password-change-check-input">
                    <p>Wachtwoord herhalen</p>
                    <input className={errorPasswordCheck ? "profile-input" : "profile-input-error"} type="password" id="password-change-check-input" name="change-password-check" value={passwordCheck}
                           placeholder="Tussen de 6 en 15 karakters" maxLength="15" onChange={(e) => {
                               setPasswordCheck(e.target.value)
                               setErrorPasswordCheck(handlePasswordChecker(e.target.value, password))
                           }}/>
                </label>
                <div className="profile-button">
                    <Button variant="submit-button" text="Verander wachtwoord"/>
                </div>
            </section>
        </div>
    )
}

export default Profile;