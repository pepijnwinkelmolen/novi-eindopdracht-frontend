import "./Dropdown.css"

function Dropdown(props) {
    if (props.variant === "categories") {
        return (
            <div className="main-dropdown">
                <button className="filter-category-button" type="button">
                    <p>{props.text}</p>
                    <div className="filter-category-button-image-wrapper">
                        <img src="src/assets/polygon-1-37.svg" alt="V"/>
                    </div>
                </button>
                <ul className="main-dropdown-menu">
                {Object.entries(props.list).map(function([k, v], i)
                    {
                        return (
                            <li key={i} className="dropdown-menu-item">
                                <Dropdown variant="child" text={k} list={v}/>
                            </li>
                        )
                    })
                }
                </ul>
            </div>
        )
    } else if (props.variant === "child") {
        return(
            <div className="sub-dropdown">
                <button className="dropdown-menu-item-button" type="button">{props.text}</button>
                <ul className="sub-dropdown-menu">
                    {
                        props.list.map((v, i) => {
                            console.log(v)
                            return (
                                <li key={i} className="sub-dropdown-menu-item">
                                    <button className="dropdown-menu-item-button">{v}</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Dropdown;