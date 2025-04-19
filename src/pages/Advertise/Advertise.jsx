import './Advertise.css'
import Button from "../../components/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import {handleUserInput} from "../../helpers/InputValidationHelper.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";

function Advertise() {

    const {loading, setLoading} = useContext(LoaderContext);
    const [error, setError] = useState("")
    const [showPlaceholder, setShowPlaceholder] = useState(true);
    const [titleInputChecker, setTitleInputChecker] = useState(false);
    const [titleInput, setTitleInput] = useState("");
    const [file, setFile] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const controller = new AbortController();
        fetchCategories(controller).then(result => {
            setCategoryList(result);
            setLoading(false);
        });
        return () => controller.abort();
    }, []);

    async function fetchCategories(controller) {
        setLoading(true);
        try{
            const result = await axios.get(`http://localhost:8080/categories`, {
                signal: controller.signal
            });
            return result.data;
        } catch (e) {
            console.error(e.message);
            setError("Geen categorieën gevonden");
        }
    }

    async function handleAdvertSubmit(e, controller) {
        e.preventDefault();
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("image", file);
        formData.append("category", e.target[0].value);
        formData.append("title", e.target[1].value);
        formData.append("description", e.target[2].value);
        formData.append("price", e.target[3].value);
        formData.append("details", e.target[5].value);
        formData.append("state", e.target[6].value);
        if(e.target[7].value === "on") {
            formData.append("hasToGo", "checked");
        } else {
            formData.append("hasToGo", null);
        }

        try {
            const result = await axios.post(`http://localhost:8080/advertisements`, formData,
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: token,
                    },
                })
            const id = result.data.substring(35);
            navigate("/product/" + id);
        } catch (e) {
            console.error(e.message);
            setError("Titel, prijs en afbeelding bijvoegen.");
        } finally {
            setLoading(false);
        }
    }

    function handleImageChange (e) {
        const image =  document.querySelectorAll(".advertise-input-image-show");
        const imageContainer = document.getElementById("advertise-image-container");
        const file = e.target.files[0];
        setFile(file);

        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function (){
            image[0].setAttribute("src", fileReader.result);
            image[0].setAttribute("style", "display: block");
            imageContainer.setAttribute("style", "opacity: 1");
        }
    }

    if(loading) {
        return (<Loader/>)
    } else {
        return (
            <form className="advertise-container" onSubmit={(e) => {
                const controller = new AbortController();
                handleAdvertSubmit(e, controller);
                return () => controller.abort();
            }}>
                <section>
                    <label className="advertise-input-select-wrapper" htmlFor="advertise-category">
                        <select className="advertise-input-select" id="advertise-category" name="category">
                            {categoryList.map(c => {
                                return <option value={c.title}>{c.title}</option>
                            })}
                        </select>
                    </label>
                    <label htmlFor="advertise-title"/>
                    <input className={titleInputChecker ? "advertise-input" : "advertise-input-check"}
                           id="advertise-title" name="title" placeholder="Titel" minLength="6" maxLength="30" value={titleInput} onChange={(e) => {
                        setTitleInput(e.target.value);
                        setTitleInputChecker(handleUserInput(e.target.value, 5, 31))
                    }}/>
                    <label htmlFor="advertise-description"/>
                    <textarea rows="4" cols="50" className="advertise-input" id="advertise-description"
                              name="description" placeholder="Omschrijving"/>
                </section>
                <section>
                    <label htmlFor="advertise-price"/>
                    <input className="advertise-input" id="advertise-price" name="price" placeholder="Prijs"/>
                    <label className="advertise-input-image" htmlFor="advertise-image" id="advertise-image-container">
                        {showPlaceholder &&
                            <div className="advertise-input-image-inner">
                                <p>+</p>
                            </div>
                        }
                        <img className="advertise-input-image-show" alt="Uw plaatje"/>
                    </label>
                    <input type="file" id="advertise-image" name="image" accept="image/jpeg, image/png"
                           onChange={(e) => {
                               setShowPlaceholder(false);
                               handleImageChange(e);
                           }}/>
                </section>
                <section>
                    <label htmlFor="advertise-details"/>
                    <textarea rows="4" cols="50" className="advertise-input" id="advertise-details" name="details"
                              placeholder="Details"/>
                    <label className="advertise-input-select-wrapper" htmlFor="advertise-state">
                        <select className="advertise-input-select" id="advertise-state" name="state">
                            <option value="nieuw">Nieuw</option>
                            <option value="goed">Goed</option>
                            <option value="prima">Prima</option>
                            <option value="slecht">Slecht</option>
                            <option value="zeer slecht">Zeer slecht</option>
                        </select>
                    </label>
                    <div className="advertise-input-checkbox-wrapper">
                        <input className="advertise-input-checkbox" type="checkbox" id="advertise-has-to-go" name="has-to-go"/>
                        <label className="advertise-input-checkbox-label" htmlFor="advertise-has-to-go">Moet snel weg?</label>
                    </div>

                </section>
                <div className="advertise-button-container">
                    <Button variant="submit-button" text="Plaats advertentie"/>
                    {error !== null && error !== undefined && error !== "" ?
                        <div className="advertise-error-container">
                            <div className="error-wrapper">
                                <p className="error-message">{error}</p>
                            </div>
                        </div>: <></>
                    }
                </div>
            </form>
        )
    }
}

export default Advertise;