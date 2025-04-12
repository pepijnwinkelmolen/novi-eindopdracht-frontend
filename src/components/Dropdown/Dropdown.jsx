import "./Dropdown.css"
import {LoaderContext} from "../../context/LoaderContext.jsx";
import axios from "axios";
import {useContext} from "react";

const Dropdown = ({categoryList, variant, text, setAdvertisementList}) => {

    const {setLoading} = useContext(LoaderContext);

    const fetchAdvertisementsByCategory = async (category) => {
        setLoading(true);
        try{
            return await axios.get(`http://localhost:8080/advertisements/category/` + category);
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
                        fetchAdvertisementsByCategory(text).then((r) => {
                            setAdvertisementList(r.data);
                        })
                        setLoading(false);
                    }}>{text}</button>
                <ul className="sub-dropdown-menu">
                    {
                        categoryList.map((v) => {
                            return (v[1].map((n, i) => {
                                return (
                                    <li key={i} className="sub-dropdown-menu-item">
                                        <button className="dropdown-menu-item-button" type="button" onClick={() => {
                                            fetchAdvertisementsByCategory(n).then((r) => {
                                                setAdvertisementList(r.data);
                                            })
                                            setLoading(false);
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