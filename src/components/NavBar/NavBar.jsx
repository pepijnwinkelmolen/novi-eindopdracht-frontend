import './NavBar.css'
import Button from "../Button/Button.jsx";
import {NavLink, useNavigate, useLocation} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";
import axios from "axios";

const NavBar = ({ setAdvertisementList }) => {
    const { isAuth, user } = useContext(AuthContext);
    const {setLoading} = useContext(LoaderContext);
    const [search, setSearch] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    let location = useLocation();

    const fetchAdvertisementsWithQuery = async (controller) => {
        setLoading(true);
        setError(false);
        try{
            if(location.pathname !== "/home") {
                navigate("/home");
            }
            return await axios.get("http://localhost:8080/advertisements/search?query=" + search, {
                signal: controller.signal
            });
        } catch (e) {
            console.error(e.message);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <nav>
            <div className="logo-container">
                <NavLink className="logo" to="/home">
                    <img src="/src/assets/logo.svg" alt="TG logo"/>
                </NavLink>
            </div>
            <div className="buffer"/>
            <div className="search-bar-container">
                <input className={error ? "search-bar-error" : "search-bar"} type="search" placeholder="Zoeken..." minLength="1" maxLength="30" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button className={error ? "search-bar-button-error" : "search-bar-button"} type="button" onClick={() => {
                    if(search === "") {
                        throw "Invalid input";
                    } else {
                        const controller = new AbortController();
                        fetchAdvertisementsWithQuery(controller).then((r) => {
                            try{
                                setSearch("");
                                setAdvertisementList(r.data);
                            } catch (e) {
                                console.error(e.message);
                            }
                            return () => {
                                controller.abort();
                            }
                        })
                    }
                }}>Zoek</button>
            </div>
            {isAuth ?
                <div className="button-logged-in-container button-logged-in-mobile-splitter">
                    <div className="user-buffer navbar-text-hider">
                        <div className="user-container">
                            <div className="user-wrapper">
                                <p>Welkom,</p>
                                <p>{user.username}</p>
                            </div>
                        </div>
                    </div>
                    <Button variant="variant-nav" link="/advertise" text="Adverteer" imgsrc="/src/assets/Icons_product.png"/>
                    <Button variant="variant-nav" link={"/profile/" + user.id} text="Profiel" imgsrc="/src/assets/Icons_home.png"/>
                    <Button variant="variant-logout" text="Log uit" imgsrc="/src/assets/Icons_logout.png"/>
                </div>:
                <div className="buffer-two">
                    <div className="button-logged-out-container button-logged-out-mobile-splitter">
                        <Button variant="variant-nav" link="/register" text="Registreren" imgsrc="/src/assets/Icons_register.png"/>
                        <Button variant="variant-nav" link="/login" text="Log in" imgsrc="/src/assets/Icons_login.png"/>
                    </div>
                </div>
            }
        </nav>
    )
}

export default NavBar;