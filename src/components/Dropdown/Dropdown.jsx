import "./Dropdown.css"
import {LoaderContext} from "../../context/LoaderContext.jsx";
import axios from "axios";
import {useContext} from "react";

const Dropdown = ({categoryList, variant, text, setAdvertisementList}) => {

    const {setLoading} = useContext(LoaderContext);

    const fetchAdvertisementsByCategory = async (category, controller) => {
        setLoading(true);
        try{
            return await axios.get(`http://localhost:8080/advertisements/category/` + category, {
                signal: controller.signal
            });
        } catch (e) {
            console.error(e.message);
        }
    }

    if (categoryList === undefined) {
        return (
            <p>loading...</p>
        )
    } else if (variant === "categories") {
        return (
            <div className="main-dropdown">
                <button className="filter-category-button" type="button" >
                    <p>{text}</p>
                    <div className="filter-category-button-image-wrapper">
                        <img src="src/assets/polygon-1-37.svg" alt="V"/>
                    </div>
                </button>
                <ul className="main-dropdown-menu">
                {categoryList.map((k, i) => {
                    const keys = Object.keys(k);
                    return (
                        <li key={i} className="dropdown-menu-item">
                            <Dropdown variant="child" text={keys[0]} categoryList={Object.entries(k)} setAdvertisementList={setAdvertisementList}/>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    } else if (variant === "child") {
        return(
            <div className="sub-dropdown">
                <button className="dropdown-menu-item-button" type="button" onClick={() => {
                        const controller = new AbortController();
                        fetchAdvertisementsByCategory(text, controller).then((r) => {
                            setAdvertisementList(r.data);
                        })
                        setLoading(false);
                        return () => {
                            controller.abort();
                        }
                    }}>{text}</button>
                <ul className="sub-dropdown-menu">
                    {
                        categoryList.map((v) => {
                            return (v[1].map((n, i) => {
                                return (
                                    <li key={i} className="sub-dropdown-menu-item">
                                        <button className="dropdown-menu-item-button" type="button" onClick={() => {
                                            const controller = new AbortController();
                                            fetchAdvertisementsByCategory(n, controller).then((r) => {
                                                setAdvertisementList(r.data);
                                            })
                                            setLoading(false);
                                            return () => {
                                                controller.abort();
                                            }
                                        }}>{n}</button>
                                    </li>
                                )
                            }))
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Dropdown;