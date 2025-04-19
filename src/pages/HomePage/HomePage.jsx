import './HomePage.css'
import ProductArticle from "../../components/ProductArticle/ProductArticle.jsx";
import Button from "../../components/Button/Button.jsx";
import {useContext, useEffect, useState} from "react";
import SearchFilter from "../../components/SearchFilter/SearchFilter.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import {LoaderContext} from "../../context/LoaderContext.jsx";
import axios from "axios";
import Loader from "../../components/Loader/Loader.jsx";

const HomePage = ({ advertisementList, setAdvertisementList}) => {

    const {loading, setLoading} = useContext(LoaderContext);
    const [categoryList, setCategoryList] = useState()
    const [productCategoryKeyList, setProductCategoryKeyList] = useState([]);
    const [error, setError] = useState("");

    useEffect( () => {
        const controller = new AbortController();
        setLoading(true);
        fetchCategories(controller).then((categories) => {
            structureKeys(categories).then((keys) => {
                structureAllCategories(categories, keys).then(r => {
                    setCategoryList(r);
                    setProductCategoryKeyList(r.map(item => {
                        return Object.keys(item);
                    }));
                });
            })
        });
        fetchAdvertisements(controller).then((result) => setAdvertisementList(result));
        setLoading(false);
        return () => controller.abort();
    }, []);

    const fetchAdvertisements = async (controller) => {
        try{
            const result = await axios.get(`http://localhost:8080/advertisements`, {
                signal: controller.signal
            });
            return result.data;
        } catch (e) {
            console.error(e.message);
            setError("Kon de advertenties niet ophalen.");
        }
    }

    const fetchCategories = async (controller) => {
        try {
            const result = await axios.get(`http://localhost:8080/categories`, {
                signal: controller.signal
            });
            return result.data;
        } catch (err) {
            console.error(err.message);
            setError("Kon categorieën niet ophalen.");
        }
    }

    const structureKeys = async (categories) => {
        const categoryList = [];
        categories.map((x) => {
            if(x.parentId === null) {
                const key = x.title;
                const obj = {};
                obj[key] = [];
                categoryList.push(obj);
            }
        })
        return categoryList;
    }

    const structureAllCategories = async (categories, keys) => {
        let i = 0;
        categories.map((x) => {
            if(x.parentId !== null) {
                categories.map((k) => {
                    if(k.parentId === null) {
                        if(k.categoryId === x.parentId) {
                            const t = k.title;
                            keys[i][t].push(x.title);
                        } else {
                            i++;
                        }
                    }
                });
                i = 0;
            }
        })
        return keys;
    }

    function handleProductCategoryKeyList(variant) {
        if (variant === "left-button") {
            const newProductCategoryKeyList = productCategoryKeyList;
            const leftShiftedCategory = newProductCategoryKeyList.shift();
            newProductCategoryKeyList.push(leftShiftedCategory);
            setProductCategoryKeyList([...newProductCategoryKeyList]);
        } else if (variant === "right-button") {
            const newProductCategoryKeyList = productCategoryKeyList;
            const leftShiftedCategory = newProductCategoryKeyList.pop();
            newProductCategoryKeyList.unshift(leftShiftedCategory);
            setProductCategoryKeyList([...newProductCategoryKeyList]);
        }
    }

    if(loading === true) {
        return (<Loader/>)
    } else {
        return (
            <div className="homepage-container">
                <div className="homepage-filter-container">
                    <aside className="homepage-filter-bar">
                        <Dropdown variant="categories" text="Categorieën" categoryList={categoryList} setAdvertisementList={setAdvertisementList}/>
                        <div className="filter-inputs-wrapper">
                            <SearchFilter setAdvertisementList={setAdvertisementList}/>
                        </div>
                    </aside>
                </div>
                <div className="homepage-content-container">
                    <section className="homepage-category-container">
                        <button className="category-rotator-button"
                                onClick={() => handleProductCategoryKeyList("left-button")}>
                            <img src="src/assets/polygon-2-5.svg" alt="Category icon" className="category-rotator-svg"/>
                        </button>
                        <div className="category-list-container">
                            {productCategoryKeyList.slice(0, 5).map((t, k) => <Button key={k} variant="categories"
                                                                                      text={t} setAdvertisementList={setAdvertisementList}/>)}
                        </div>
                        <button className="category-rotator-button"
                                onClick={() => handleProductCategoryKeyList("right-button")}>
                            <img src="src/assets/polygon-3-6.svg" alt="Category icon" className="category-rotator-svg"/>
                        </button>
                    </section>
                    {error !== null && error !== undefined && error !== "" ?
                        <div className="homepage-error-container">
                            <div className="error-wrapper">
                                <p className="error-message">{error}</p>
                            </div>
                        </div> : advertisementList.length > 0 ?
                        <section className="homepage-product-article-container"> {
                            advertisementList.map((a, i) => {
                                return (
                                    <ProductArticle key={i} id={a.advertisementId} title={a.title} price={a.price}
                                         source={a.image}/>)
                                })}
                        </section> :
                        <div className="homepage-error-container">
                            <div className="error-wrapper">
                                <p className="error-message">Geen advertenties gevonden.</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default HomePage;