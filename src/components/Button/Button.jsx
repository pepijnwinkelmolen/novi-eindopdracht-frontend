import './Button.css'
import {NavLink} from "react-router-dom";

function Button(props) {
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
    } else if (props.variant === "filter") {
        return (
            <button className="filter-button" type="button">
                <p>{props.text}</p>
                <div className="filter-button-image-wrapper">
                    <img src="src/assets/polygon-1-37.svg" alt="V"/>
                </div>
            </button>
        )
    } else if (props.variant === "submit-button") {
        return (
            <button className={props.variant} type="submit">
                {props.text}
            </button>
        )
    }
}

export default Button;