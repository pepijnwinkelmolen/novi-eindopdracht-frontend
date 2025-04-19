import './Profile.css'
import Button from "../../components/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import {handlePasswordChecker, handlePasswordInput, handleUserInput} from '../../helpers/InputValidationHelper.js'
import axios from "axios";
import {AuthContext} from "../../context/AuthContext.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";
import {useNavigate, useParams} from "react-router-dom";

function Profile() {
    const { user, logout } = useContext(AuthContext);
    const {loading, setLoading} = useContext(LoaderContext);
    const navigate = useNavigate();
    let { id } = useParams();

    const [error, setError] = useState("");

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
    const [userRole, setUserRole] = useState("none");

    useEffect(() => {
        const controller = new AbortController();
        const storedToken = localStorage.getItem("token");
        fetchData(storedToken, controller);
        if(user !== null) {
            let newUserRole = "none";
            user.roles.map((r) => {
                if(r === "ROLE_USER") {
                    if(newUserRole !== "admin") {
                        newUserRole = "user";
                    }
                } else if(r === "ROLE_ADMIN") {
                    newUserRole = "admin"
                }
            })
            setUserRole(newUserRole);
        }
        return () => controller.abort();
    }, []);

    const fetchData = async (token, controller) => {
        setLoading(true);
        try {
            const userProfile = await axios.get(`http://localhost:8080/profile/` + id,
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                },
            );
            setProfile(userProfile.data);
        } catch (err) {
            console.error(err.message);
            navigate("/home")
        } finally {
            setLoading(false);
        }
    }

    const deleteUser = async (controller) => {
        setLoading(true);
        try{
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/users/delete/` + id,
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                },
            );
            logout();
            setError("");
        } catch (e) {
            console.error(e.message);
            setError("Kon item niet verwijderen.");
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return (<Loader/>)
    } else {
        return (
                <div className="profile-container">
                    <div>
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
                        <div className="user-delete-button-wrapper">
                            {userRole === "admin" || (userRole === "user" && user.username === profile.username) ?
                                <Button variant="variant-delete" text="Verwijder uw account" handler={() => {
                                    const controller = new AbortController();
                                    deleteUser(controller);
                                    return () => controller.abort();
                                }}/> : <></>}
                        </div>
                    </div>
                    <div>
                        <section className="profile-right-wrapper">
                            <h3>Verander uw account</h3>
                            <label className="profile-input-wrapper" htmlFor="username-change-input">
                                <p>Gebruikersnaam</p>
                                <input className={isUserValid ? "profile-input" : "profile-input-error"} type="text"
                                       id="username-change-input" name="change-username" value={username}
                                       placeholder="Tussen de 6 en 15 karakters" minLength="6" maxLength="15" onChange={(e) => {
                                    setUsername(e.target.value)
                                    setIsUserValid(handleUserInput(e.target.value, 5, 16))
                                }}/>
                            </label>
                            <div className="profile-button">
                                <Button variant="submit-button" text="Verander gebruikersnaam" handler={async () => {
                                    const controller = new AbortController();
                                    setLoading(true);
                                    try {
                                        const token = localStorage.getItem("token");
                                        await axios.put(`http://localhost:8080/users/update/username`,
                                            {
                                                "username" : username
                                            },
                                            {
                                                signal: controller.signal,
                                                headers: {
                                                    "Content-Type": "application/json",
                                                    Authorization: token,
                                                }
                                            }
                                        )
                                        logout();
                                    } catch (err) {
                                        console.error(err.message);
                                        setError("Kon gebruikersnaam niet aanpassen.")
                                    } finally {
                                        setLoading(false)
                                    }
                                    return () => controller.abort();
                                }}/>
                            </div>
                            <label className="profile-input-wrapper" htmlFor="password-change-input">
                                <p>Wachtwoord</p>
                                <input className={isValid ? "profile-input" : "profile-input-error"} type="password"
                                       id="password-change-input" name="change-password" value={password}
                                       placeholder="Tussen de 6 en 15 karakters" minLength="6" maxLength="20" onChange={(e) => {
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
                                       placeholder="Tussen de 6 en 15 karakters" minLength="6" maxLength="20" onChange={(e) => {
                                    setPasswordCheck(e.target.value)
                                    setErrorPasswordCheck(handlePasswordChecker(e.target.value, password))
                                }}/>
                            </label>
                            <div className="profile-button">
                                <Button variant="submit-button" text="Verander wachtwoord" handler={async () => {
                                    const controller = new AbortController();
                                    setLoading(true);
                                    try {
                                        const token = localStorage.getItem("token");
                                        await axios.put(`http://localhost:8080/users/update/password`,
                                            {
                                                "password" : password
                                            },
                                            {
                                                    signal: controller.signal,
                                                    headers: {
                                                        "Content-Type": "application/json",
                                                        Authorization: token,
                                                    }
                                                }
                                            )
                                        logout();
                                    } catch (err) {
                                        console.error(err.message);
                                        setError("Kon wachtwoord niet aanpassen.")
                                    } finally {
                                        setLoading(false)
                                    }
                                    return () => controller.abort();
                                }}/>
                            </div>
                        </section>
                        {error !== null && error !== undefined && error !== "" ?
                            <div className="error-container">
                                <div className="error-wrapper">
                                    <p className="error-message">{error}</p>
                                </div>
                            </div>: <></>
                        }
                    </div>
                </div>
        )
    }
}

export default Profile;