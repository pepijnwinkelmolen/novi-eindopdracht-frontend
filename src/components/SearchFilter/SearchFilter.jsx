import './SearchFilter.css'
import {useState} from "react";

function SearchFilter() {

    const [rangeValue, setRangeValue] = useState(0);

    return(
        <form className="form-container" onSubmit="">
            <p>Filters</p>
            <div className="text-wrapper-coloured">
                <p>Prijs: max €{rangeValue * 10}</p>
            </div>
            <label htmlFor="filter-slider">
                <input className="input-slider" type="range" id="filter-slider" min="0" max="100" name="price"
                       onChange={(e) => setRangeValue(+e.target.value)} value={rangeValue}/>
            </label>
            <div className="text-wrapper-coloured">
                <p>Aangeboden sinds</p>
            </div>
            <label className="filter-radio" htmlFor="since-radio-today">
                <input className="input-radio" type="radio" id="since-radio-today" name="since" value="today"/>
                <p>Vandaag</p>
            </label>
            <label className="filter-radio" htmlFor="since-radio-week">
                <input className="input-radio" type="radio" id="since-radio-week" name="since" value="week"/>
                <p>Deze week</p>
            </label>
            <label className="filter-radio" htmlFor="since-radio-month">
                <input className="input-radio" type="radio" id="since-radio-month" name="since" value="month"/>
                <p>Deze maand</p>
            </label>
            <div className="text-wrapper-coloured">
                <label className="filter-checkbox" htmlFor="has-to-go">
                    <input className="input-checkbox" type="checkbox" id="has-to-go" name="has-to-go" value="checked"/>
                    <p>Moet nu weg</p>
                </label>
            </div>
            <button className="text-wrapper-coloured-button" type="submit"><p>Zoeken</p></button>
        </form>
    )
}

export default SearchFilter;