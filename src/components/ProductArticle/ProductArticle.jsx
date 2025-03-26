import './ProductArticle.css'
import {Link} from "react-router-dom";

function ProductArticle() {
    return (
        <Link to="" className="product-article-button">
            <article className="product-article">
                <div className="product-information-img">
                    <img src="src/assets/logo.svg" alt="id-product-image"/>
                </div>
                <div className="product-information-bottom">
                    <p>*Naam van product*</p>
                    <p>-</p>
                    <p>*Prijs*</p>
                </div>
            </article>
        </Link>
    )
}

export default ProductArticle