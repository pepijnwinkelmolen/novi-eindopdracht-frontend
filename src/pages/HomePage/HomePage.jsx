import './HomePage.css'
import ProductArticle from "../../components/ProductArticle/ProductArticle.jsx";
import Button from "../../components/Button/Button.jsx";
import {useEffect, useState} from "react";
import SearchFilter from "../../components/SearchFilter/SearchFilter.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";
import axios from "axios";

function HomePage() {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState()
    const [productCategoryKeyList, setProductCategoryKeyList] = useState([]);

    useEffect( () => {
        fetchCategories().then((categories) => {
            structureKeys(categories).then((keys) => {
                structureAllCategories(categories, keys).then(r => {
                    setCategoryList(r);
                    setProductCategoryKeyList(r.map(item => {
                        console.log(item)
                        return Object.keys(item);
                    }));
                });
            })
        });
        setLoading(false);
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/categories`);
            return result.data;
        } catch (err) {
            console.error(err.message);
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
        return (<p>Loading...</p>)
    } else {
        return (
            <div className="homepage-container">
                <div className="homepage-filter-container">
                    <aside className="homepage-filter-bar">
                        <Dropdown variant="categories" text="Categorieën" list={categoryList}/>
                        <div className="filter-inputs-wrapper">
                            <SearchFilter/>
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
                                                                                      text={t}/>)}
                        </div>
                        <button className="category-rotator-button"
                                onClick={() => handleProductCategoryKeyList("right-button")}>
                            <img src="src/assets/polygon-3-6.svg" alt="Category icon" className="category-rotator-svg"/>
                        </button>
                    </section>
                    <section className="homepage-product-article-container">
                        <ProductArticle/>
                        <ProductArticle/>
                        <ProductArticle/>
                        <ProductArticle/>
                        <ProductArticle/>
                        <ProductArticle/>
                        <ProductArticle/>
                        <ProductArticle/>
                        <ProductArticle/>
                    </section>
                </div>
            </div>
        )
    }
}

export default HomePage;