import './Button.css'
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";

function Button(props) {
    const { logout } = useContext(AuthContext);
    if (props.variant === "categories") {
        return (
            <button className="category-button" type="button" onClick={() => ("do something here")}>
                {props.text}
            </button>
        )
    } else if (props.variant === "variant-nav") {
        return (
            <NavLink className={(navObject) => navObject.isActive ? 'active-menu-link variant-nav' : 'default-menu-link variant-nav'} to={props.link}>{props.text}</NavLink>
        )
    } else if (props.variant === "submit-button") {
        return (
            <button className={props.variant} type="submit" onClick={props.handler}>
                {props.text}
            </button>
        )
    } else if (props.variant === "variant-logout") {
        return (
            <button className="default-menu-link variant-nav" onClick={() => logout()}>
                {props.text}
            </button>
        )
    }
}

export default Button;