import './Button.css'
import {Link, NavLink} from "react-router-dom";

function Button(props) {
    if (props.variant === "variant-nav") {
        return(
            <NavLink className={(navObject) => navObject.isActive ? 'active-menu-link variant-nav' : 'default-menu-link variant-nav'} to={props.link}>{props.text}</NavLink>
        )
    }
}

export default Button;