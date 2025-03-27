import './Profile.css'
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";

function Profile() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [errorPasswordCheck, setErrorPasswordCheck] = useState(false);

    console.log(username, password, passwordCheck);

    function handlePasswordInput(target) {
        setPassword(target);
        if (target === "") {
            setErrorPasswordCheck(false)
        } else if (target !== passwordCheck) {
            setErrorPasswordCheck(false)
        } else {
            setErrorPasswordCheck(true)
        }
    }

    function handlePasswordChecker(target) {
        setPasswordCheck(target);
        if (target === "") {
            setErrorPasswordCheck(false)
        } else if (password === target) {
            setErrorPasswordCheck(true)
        } else if (password !== target && errorPasswordCheck !== false) {
            setErrorPasswordCheck(false)
        }
    }

    return(
        <div className="profile-container">
            <section className="profile-wrapper">
                <h3>Bekijk uw account</h3>
                <label className="profile-input-wrapper" htmlFor="username-change-input">
                    <p>Gebruikersnaam</p>
                    <input className="profile-input" type="text" id="username-change-input" name="change-username" value={username}
                           placeholder="Hier de gebruikersnaam" onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <div className="profile-button">
                    <Button variant="submit-button" text="Verander gebruikersnaam"/>
                </div>
                <label className="profile-input-wrapper" htmlFor="password-change-input">
                    <p>Wachtwoord</p>
                    <input className="profile-input" type="password" id="password-change-input" value={password}
                               name="change-password" onChange={(e) => handlePasswordInput(e.target.value)}/>
                </label>
                <label className="profile-input-wrapper" htmlFor="password-change-check-input">
                    <p>Wachtwoord herhalen</p>
                    <input className={errorPasswordCheck ? "profile-input" : "profile-input-error"} type="password" id="password-change-check-input" value={passwordCheck}
                           name="change-password-check" onChange={(e) => handlePasswordChecker(e.target.value)}/>
                </label>
                <div className="profile-button">
                    <Button variant="submit-button" text="Verander wachtwoord"/>
                </div>
            </section>
        </div>
    )
}

export default Profile;