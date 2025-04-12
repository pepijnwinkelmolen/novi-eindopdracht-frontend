import './ProductArticle.css'
import {Link} from "react-router-dom";

function ProductArticle(props) {
    return (
        <Link key={props.i} to={"/product/" + props.id} className="product-article-button">
            <article className="product-article">
                <div className="product-information-img">
                    <img src={'data:image/jpeg;base64,' + props.source} alt={props.title}/>
                </div>
                <div className="product-information-bottom">
                    <p>{props.title}</p>
                    <p>-</p>
                    <p>{"€ " +props.price}</p>
                </div>
            </article>
        </Link>
    )
}

export default ProductArticle