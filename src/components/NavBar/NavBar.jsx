import './NavBar.css'
import Button from "../Button/Button.jsx";
import {NavLink} from "react-router-dom";

function NavBar() {
    return (
        <nav>
            <div className="logo-container">
                <NavLink className="logo" to="/home">
                    <img src="src/assets/logo.svg" alt="TG logo"/>
                </NavLink>
            </div>
            <div className="buffer"/>
            <div className="search-bar-container">
                <input className="search-bar" type="search" placeholder="Zoeken..."/>
            </div>
            <div className="buffer-two"/>
            <div className="button-register-container">
                <Button variant="variant-nav" link="/register" text="Registreren"/>
            </div>
            <div className="button-login-container">
                <Button variant="variant-nav" link="/login" text="Log in"/>
            </div>
        </nav>
    )
}

export default NavBar;