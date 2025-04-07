import "./Dropdown.css"

function Dropdown(props) {
    if (props.list === undefined) {
        return (
            <p>loading...</p>
        )
    } else if (props.variant === "categories") {
        return (
            <div className="main-dropdown">
                <button className="filter-category-button" type="button">
                    <p>{props.text}</p>
                    <div className="filter-category-button-image-wrapper">
                        <img src="src/assets/polygon-1-37.svg" alt="V"/>
                    </div>
                </button>
                <ul className="main-dropdown-menu">
                {props.list.map((k, i) => {
                    const keys = Object.keys(k);
                    return (
                        <li key={i} className="dropdown-menu-item">
                            <Dropdown variant="child" text={keys[0]} list={Object.entries(k)}/>
                        </li>
                    )
                })}
                </ul>
            </div>
        )
    } else if (props.variant === "child") {
        return(
            <div className="sub-dropdown">
                <button className="dropdown-menu-item-button" type="button">{props.text}</button>
                <ul className="sub-dropdown-menu">
                    {
                        props.list.map((v) => {
                            return (v[1].map((n, i) => {
                                return (
                                    <li key={i} className="sub-dropdown-menu-item">
                                        <button className="dropdown-menu-item-button">{n}</button>
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