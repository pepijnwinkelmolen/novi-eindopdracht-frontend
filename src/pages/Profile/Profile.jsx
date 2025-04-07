import './Profile.css'
import Button from "../../components/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import {handlePasswordChecker, handlePasswordInput, handleUserInput} from '../../helpers/InputValidationHelper.js'
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";

function Profile() {
    const { logout } = useContext(AuthContext);

    // username input state
    const [username, setUsername] = useState("");
    const [isUserValid, setIsUserValid] = useState(false);

    // password input state
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);

    // password repeat input state
    const [passwordCheck, setPasswordCheck] = useState("");
    const [errorPasswordCheck, setErrorPasswordCheck] = useState(false);

    // profile
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        fetchData(storedToken);
    }, []);

    const fetchData = async (token) => {
        setLoading(true);
        try {
            const userProfile = await axios.get(`http://localhost:8080/profile`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                },
            );
            setProfile(userProfile.data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading === false) {
        return (
                <div className="profile-container">
                    <section className="profile-left-wrapper">
                        <h3>Uw account</h3>
                        <label className="profile-output-wrapper" htmlFor="username-change-input">
                            <p>Gebruikersnaam: {profile.username}</p>

                        </label>
                        <label className="profile-output-wrapper" htmlFor="username-change-input">
                            <p>Woonplaats: {profile.residence}</p>

                        </label>
                        <label className="profile-output-wrapper" htmlFor="username-change-input">
                            <p>Telefoonnummer: {profile.phoneNumber}</p>

                        </label>
                        <label className="profile-output-wrapper" htmlFor="username-change-input">
                            <p>Email: {profile.email}</p>

                        </label>
                    </section>
                    <section className="profile-right-wrapper">
                        <h3>Verander uw account</h3>
                        <label className="profile-input-wrapper" htmlFor="username-change-input">
                            <p>Gebruikersnaam</p>
                            <input className={isUserValid ? "profile-input" : "profile-input-error"} type="text"
                                   id="username-change-input" name="change-username" value={username}
                                   placeholder="Tussen de 6 en 15 karakters" maxLength="15" onChange={(e) => {
                                setUsername(e.target.value)
                                setIsUserValid(handleUserInput(e.target.value, 5, 16))
                            }}/>
                        </label>
                        <div className="profile-button">
                            <Button variant="submit-button" text="Verander gebruikersnaam" handler={async () => {
                                setLoading(true);
                                try {
                                    const token = localStorage.getItem("token");
                                    await axios.put(`http://localhost:8080/users/update/username`,
                                        username,
                                        {
                                            headers: {
                                                "Content-Type": "application/json",
                                                Authorization: token,
                                            }
                                        }
                                    )
                                } catch (err) {
                                    console.error(err.message);
                                } finally {
                                    setLoading(false)
                                    logout();
                                }
                            }}/>
                        </div>
                        <label className="profile-input-wrapper" htmlFor="password-change-input">
                            <p>Wachtwoord</p>
                            <input className={isValid ? "profile-input" : "profile-input-error"} type="password"
                                   id="password-change-input" name="change-password" value={password}
                                   placeholder="Tussen de 6 en 15 karakters" maxLength="15" onChange={(e) => {
                                setPassword(e.target.value)
                                const result = handlePasswordInput(e.target.value, passwordCheck)
                                setIsValid(result[0]);
                                setErrorPasswordCheck(result[1])
                            }}/>
                        </label>
                        <label className="profile-input-wrapper" htmlFor="password-change-check-input">
                            <p>Wachtwoord herhalen</p>
                            <input className={errorPasswordCheck ? "profile-input" : "profile-input-error"} type="password"
                                   id="password-change-check-input" name="change-password-check" value={passwordCheck}
                                   placeholder="Tussen de 6 en 15 karakters" maxLength="15" onChange={(e) => {
                                setPasswordCheck(e.target.value)
                                setErrorPasswordCheck(handlePasswordChecker(e.target.value, password))
                            }}/>
                        </label>
                        <div className="profile-button">
                            <Button variant="submit-button" text="Verander wachtwoord" handler={async () => {
                                setLoading(true);
                                try {
                                    const token = localStorage.getItem("token");
                                    await axios.put(`http://localhost:8080/users/update/password`,
                                                    password,
                                        {
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    Authorization: token,
                                                }
                                            }
                                        )
                                } catch (err) {
                                    console.error(err.message);
                                } finally {
                                    setLoading(false)
                                    logout();
                                }
                            }}/>
                        </div>
                    </section>
                </div>
        )
    } else {
        return (
            <div>
                loading...
            </div>
        )
    }
}

export default Profile;