import './NavBar.css'
import Button from "../Button/Button.jsx";
import {NavLink} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";
import axios from "axios";

const NavBar = ({ setAdvertisementList }) => {
    const { isAuth, user } = useContext(AuthContext);
    const {setLoading} = useContext(LoaderContext);
    const [search, setSearch] = useState("");

    const fetchAdvertisementsWithQuery = async () => {
        setLoading(true);
        try{
            return await axios.get("http://localhost:8080/advertisements/search?query=" + search);
        } catch (e) {
            console.error(e.message);
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
                <input className="search-bar" type="search" placeholder="Zoeken..." minLength="1" maxLength="30" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button className="search-bar-button" type="button" onClick={() => {
                    if(search === "") {
                        throw "Invalid input";
                    } else {
                        fetchAdvertisementsWithQuery().then((r) => {
                            setSearch("");
                            setAdvertisementList(r.data);
                        })
                    }
                }}>Zoek!</button>
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
                    <Button variant="variant-nav" link={"/profile/" + user.id} text="Profiel"/>
                    <Button variant="variant-logout" text="Log uit"/>
                </div>:
                <div className="buffer-two">
                    <div className="button-logged-out-container">
                        <Button variant="variant-nav" link="/register" text="Registreren"/>
                        <Button variant="variant-nav" link="/login" text="Log in"/>
                    </div>
                </div>
            }
        </nav>
    )
}

export default NavBar;