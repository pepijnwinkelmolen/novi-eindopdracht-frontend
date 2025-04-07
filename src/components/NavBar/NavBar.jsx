import './NavBar.css'
import Button from "../Button/Button.jsx";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function NavBar() {
    const { isAuth, user } = useContext(AuthContext);
    return (
        <nav>
            <div className="logo-container">
                <NavLink className="logo" to="/home">
                    <img src="src/assets/logo.svg" alt="TG logo"/>
                </NavLink>
            </div>
            <div className="buffer"/>
            <div className="search-bar-container">
                <input className="search-bar" type="search" placeholder="Zoeken..." />
            </div>
            {isAuth ?
                <div className="button-logged-in-container">
                    <div className="user-buffer">
                        <div className="user-container">
                            <div className="user-wrapper">
                                <p>Welkom,</p>
                                <p>{user.username}</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="variant-nav" link="/advertise" text="Adverteer"/>
                    <Button variant="variant-nav" link="/profile" text="Profiel"/>
                    <Button variant="variant-logout" text="Log uit"/>
                </div>:
                <div className="button-logged-out-container">
                    <Button variant="variant-nav" link="/register" text="Registreren"/>
                    <Button variant="variant-nav" link="/login" text="Log in"/>
                </div>
            }
        </nav>
    )
}

export default NavBar;