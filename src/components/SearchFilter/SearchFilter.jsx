import './SearchFilter.css'
import {useContext, useState} from "react";
import {LoaderContext} from "../../context/LoaderContext.jsx";
import axios from "axios";

const SearchFilter = ({setAdvertisementList}) => {

    const {setLoading} = useContext(LoaderContext);
    const [rangeValue, setRangeValue] = useState(0);
    const [since, setSince] = useState("");
    const [hasToGo, setHasToGo] = useState(false);

    const fetchFilteredData = async () => {
        setLoading(true);
        try{
            let url = "?price=" + rangeValue;
            if(since !== "") {
                url = url + "&since=" + since;
            }
            if(hasToGo !== false) {
                url = url + "&has-to-go=checked";
            }
            return await axios.get(`http://localhost:8080/advertisements/filter` + url);
        } catch (e) {
            console.error(e.message);
        }
    }

    return(
        <form className="form-container" onSubmit={(e) => {
            e.preventDefault();
            fetchFilteredData().then((r) => {
                console.log(r.data)
                setAdvertisementList(r.data)
            });
            setLoading(false);
        }}>
            <p>Filters</p>
            <div className="text-wrapper-coloured">
                <p>Prijs: max €{rangeValue}</p>
            </div>
            <label htmlFor="filter-slider">
                <input className="input-slider" type="range" id="filter-slider" min="0" max="250" name="price"
                       onChange={(e) => setRangeValue(+e.target.value)} value={rangeValue}/>
            </label>
            <div className="text-wrapper-coloured">
                <p>Aangeboden sinds</p>
            </div>
            <label className="filter-radio" htmlFor="since-radio-today">
                <input className="input-radio" type="radio" id="since-radio-today" name="since" value="today" onChange={() => setSince("today")}/>
                <p>Vandaag</p>
            </label>
            <label className="filter-radio" htmlFor="since-radio-week">
                <input className="input-radio" type="radio" id="since-radio-week" name="since" value="week" onChange={() => setSince("week")}/>
                <p>Deze week</p>
            </label>
            <label className="filter-radio" htmlFor="since-radio-month">
                <input className="input-radio" type="radio" id="since-radio-month" name="since" value="month" onChange={() => setSince("month")}/>
                <p>Deze maand</p>
            </label>
            <div className="text-wrapper-coloured">
                <label className="filter-checkbox" htmlFor="has-to-go">
                    <input className="input-checkbox" type="checkbox" id="has-to-go" name="hasToGo" value="checked" onChange={() => setHasToGo(!hasToGo)}/>
                    <p>Moet nu weg</p>
                </label>
            </div>
            <button className="text-wrapper-coloured-button" type="submit"><p>Zoeken</p></button>
        </form>
    )
}

export default SearchFilter;