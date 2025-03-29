import './HomePage.css'
import ProductArticle from "../../components/ProductArticle/ProductArticle.jsx";
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";
import SearchFilter from "../../components/SearchFilter/SearchFilter.jsx";
import Dropdown from "../../components/Dropdown/Dropdown.jsx";

const productCategory = {
                                            "Voertuigen": ["Auto's en motoren", "Boten", "Andere voertuigen"],
                                            "Verzamelobjecten": ["Munten", "Postzegels", "Antiek", "Kunst"],
                                            "Kleding en sport": ["Herenkleding", "Vrouwenkleding", "Kinderkleding", "Babykleding", "Accessoires", "Juwelen", "Reisbagage", "Sportuitrusting", "Visuitrusting"],
                                            "Electronica": ["Computers", "Tablets", "Laptops", "Telefoons", "Camera's", "TV's", "Audioapparatuur", "Koptelefoons", "Vriezers", "Koelkasten"],
                                            "Huis en tuin": ["Tuinapparatuur", "Tuinmeubels", "Binnenmeubels", "Slaapproducten", "Stofzuigers", "Keukengerei", "Lampen"],
                                            "Eigen tijd": ["Boeken", "Muziekinstrumenten", "CD's", "Vinyl", "Games", "DVD's", "Blu-ray"],
                                            "Gezondheidsproducten": ["Parfum", "Makeup", "Huidverzorging", "Haarstijlproducten", "Scheerproducten"]
                                        };

function HomePage() {

    const [productCategoryKeyList, setProductCategoryKeyList] = useState(["Voertuigen", "Verzamelobjecten", "Kleding en sport", "Electronica", "Huis en tuin", "Eigen tijd", "Gezondheidsproducten"]);

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

    return (
        <div className="homepage-container">
            <div className="homepage-filter-container">
                <aside className="homepage-filter-bar">
                    <Dropdown variant="categories" text="Categorieën" list={productCategory}/>
                    <div className="filter-inputs-wrapper">
                        <SearchFilter />
                    </div>
                </aside>
            </div>
            <div className="homepage-content-container">
                <section className="homepage-category-container">
                    <button className="category-rotator-button" onClick={() => handleProductCategoryKeyList("left-button")}>
                        <img src="src/assets/polygon-2-5.svg" alt="Category icon" className="category-rotator-svg"/>
                    </button>
                    <div className="category-list-container">
                        {productCategoryKeyList.slice(0, 5).map((t, k) => <Button key={k} variant="categories" text={t}/>)}
                    </div>
                    <button className="category-rotator-button" onClick={() => handleProductCategoryKeyList("right-button")}>
                        <img src="src/assets/polygon-3-6.svg" alt="Category icon" className="category-rotator-svg"/>
                    </button>
                </section>
                <section className="homepage-product-article-container">
                    <ProductArticle />
                    <ProductArticle />
                    <ProductArticle />
                    <ProductArticle />
                    <ProductArticle />
                    <ProductArticle />
                    <ProductArticle />
                    <ProductArticle />
                    <ProductArticle />
                </section>
            </div>
        </div>
    )
}

export default HomePage;