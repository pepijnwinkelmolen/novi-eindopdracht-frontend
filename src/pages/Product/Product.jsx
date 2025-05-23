import './Product.css'
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Loader from "../../components/Loader/Loader.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";
import Button from "../../components/Button/Button.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";

function Product() {
    let { id } = useParams();
    const {loading, setLoading} = useContext(LoaderContext);
    const { user, isAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [imageSrc, setImageSrc] = useState("/");
    const [data, setData] = useState({});
    const [userRole, setUserRole] = useState("none");
    const [bidValue, setBidValue] = useState("")
    const [error, setError] = useState("");

    const fetchAdvert = async (controller) => {
        setLoading(true);
        try{
            const advert = await axios.get(`http://localhost:8080/advertisements/` + id, {
                signal: controller.signal
            });
            setImageSrc('data:image/jpeg;base64,' + advert.data.image);
            let updatedData = {
                advertisementId: advert.data.advertisementId,
                title: advert.data.title,
                category: advert.data.category[0].title,
                description: advert.data.description,
                details: advert.data.details,
                price: advert.data.price,
                state: advert.data.state,
                date: advert.data.date,
                bids: advert.data.bids,
                userId: advert.data.userId,
                hasToGo: advert.data.hasToGo,
            }
            setData(updatedData);
            setError("");
        } catch (e) {
            console.error(e.message);
            setError("Advertentie is niet gevonden.")
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();
        fetchAdvert(controller);
        if(user !== null && user !== undefined) {
            let newUserRole = "none";
            user.roles.map((r) => {
                if(r === "ROLE_USER") {
                    if(newUserRole !== "admin") {
                        newUserRole = "user";
                    }
                } else if(r === "ROLE_ADMIN") {
                    newUserRole = "admin"
                }
            })
            setUserRole(newUserRole);
        }
        return () => controller.abort();
    }, []);

    const deleteAdvert = async (controller) => {
        setLoading(true);
        try{
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/advertisements/` + id,
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                },
            );
            navigate("/home");
        } catch (e) {
            console.error(e.message);
            setError("Kon advertentie niet verwijderen.");
        } finally {
            setLoading(false);
        }
    }

    const createBid = async (controller) => {
        setLoading(true);
        try{
            const token = localStorage.getItem("token");
            await axios.post(`http://localhost:8080/bids/` + bidValue + `/advertisement/` + id,
                {},
                {
                    signal: controller.signal,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                },
            );
            window.location.reload();
            setError("");
        } catch (e) {
            console.error(e.message);
            setError("Kon geen nieuwe bieding maken.");
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return (<Loader/>)
    } else {
        return (
            <div className="product-container">
                <div className="product-container-divider">
                    <article className="product-image-wrapper">
                        <img className="product-image" src={imageSrc} alt="Product image"/>
                    </article>
                    <article className="product-article-container product-article-container-bids">
                        <div className="bids-header-wrapper">
                            <h3>Biedingen</h3>
                            {isAuth ?
                                <div className="bids-header-inner-wrapper">
                                    <input className="bid-value-input" type="text" id="bid-value-input" name="bid-value-input" value={bidValue} minLength="1" maxLength="10"
                                       onChange={(e) => setBidValue(e.target.value)}/>
                                    <Button variant="variant-normal" text="Bied" handler={() => {
                                        const controller = new AbortController();
                                        createBid(controller)
                                        return () => controller.abort();
                                    }}/>
                                </div> : <></>
                            }
                        </div>
                        {data.bids !== undefined ? data.bids.length !== 0 ? data.bids.toSorted((a, b) => b.price - a.price).slice(0, 7).map((b, i) => {
                            return <div key={i} className="bids-content-wrapper">
                                <p>{b.username}</p>
                                <p>-</p>
                                <p>{"€ " + b.price}</p>
                            </div>
                        }) : <div className="bids-content-wrapper"><p>Nog geen biedingen.</p></div> : <></>}
                    </article>
                    {userRole === "admin" || (userRole === "user" && user.id === data.userId) ?
                        <Button variant="variant-delete" text="Verwijder uw advertentie"
                                handler={() => {
                                    const controller = new AbortController();
                                    deleteAdvert(controller)
                                    return () => controller.abort();
                                }}/> : <></>}
                    {error !== null && error !== undefined && error !== "" ?
                        <div className="error-container">
                            <div className="error-wrapper">
                                <p className="error-message">{error}</p>
                            </div>
                        </div> : <></>
                    }
                </div>
                <div className="product-container-divider">
                    <article className="product-article-container product-article-container-right-top">
                        <h3>Omschrijving</h3>
                        <p>{data.description}</p>
                    </article>
                    <article className="product-article-container product-article-container-right-bottom">
                        <h3>Gegevens</h3>
                        <p>- Titel: {data.title}</p>
                        <p>- Categorie: {data.category}</p>
                        <p>- Prijs: {data.price}</p>
                        <p>- Staat: {data.state}</p>
                        <p>- Details: {data.details}</p>
                        <p>- Datum: {data.date}</p>
                        {data.hasToGo === "checked" ? <p>- Moet snel weg? Ja!</p> : <></>}
                    </article>
                </div>
            </div>
        )
    }
}

export default Product;