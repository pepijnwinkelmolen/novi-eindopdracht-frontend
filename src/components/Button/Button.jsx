import './Button.css'
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";
import axios from "axios";

function Button({ variant, text, handler, setAdvertisementList, link, imgsrc }) {
    const { logout } = useContext(AuthContext);
    const {setLoading} = useContext(LoaderContext);

    const fetchAdvertisementsByCategory = async (category) => {
        setLoading(true);
        try{
            return await axios.get(`http://localhost:8080/advertisements/category/` + category);
        } catch (e) {
            console.error(e.message);
        }
    }

    if (variant === "categories") {
        return (
            <button className="category-button" type="button" onClick={() => {
                const controller = new AbortController();
                fetchAdvertisementsByCategory(text, controller).then((r) => {
                    setAdvertisementList(r.data);
                })
                setLoading(false);
                return () => {
                    controller.abort();
                }
            }}>
                <p className="text-hider">{text}</p>
            </button>
        )
    } else if (variant === "variant-nav") {
        return (
            <NavLink className={(navObject) => navObject.isActive ? 'active-menu-link variant-nav' : 'default-menu-link variant-nav'} to={link}>
                <div className="nav-img-wrapper">
                    <img src={imgsrc} alt={text}/>
                </div>
                <p className="text-hider">{text}</p>
            </NavLink>
        )
    } else if (variant === "submit-button") {
        return (
            <button className={variant} type="submit" onClick={handler}>
                {text}
            </button>
        )
    } else if (variant === "variant-logout") {
        return (
            <button className="default-menu-link variant-nav" onClick={() => logout()}>
                <div className="nav-img-wrapper">
                    <img src={imgsrc} alt={text}/>
                </div>
                <p className="text-hider">{text}</p>
            </button>
        )
    } else if (variant === "variant-delete") {
        return (
            <button className="variant-delete" type="button" onClick={handler}>
                {text}
            </button>
        )
    } else if (variant === "variant-normal") {
        return (
            <button className="variant-normal" type="button" onClick={handler}>
                {text}
            </button>
        )
    }
}

export default Button;