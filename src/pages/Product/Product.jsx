import './Product.css'

function Product() {
    return(
        <div className="product-container">
            <div className="product-container-divider">
                <article className="product-image-wrapper">
                    <img className="product-image" src="" alt="Product image"/>
                </article>
                <article className="product-article-wrapper product-article-wrapper-bids">
                    <h3>Boden</h3>
                </article>
            </div>
            <div className="">
                <article className="product-article-wrapper product-article-wrapper-right">
                    <h3>Omschrijving</h3>
                </article>
                <article className="product-article-wrapper product-article-wrapper-right">
                    <h3>Gegevens</h3>
                </article>
                <article className="product-article-wrapper product-article-wrapper-right">
                    <h3>Reacties</h3>
                </article>
            </div>
        </div>
    )
}

export default Product;