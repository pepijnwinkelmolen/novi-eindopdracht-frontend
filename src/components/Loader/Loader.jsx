import './Loader.css'
import {PulseLoader} from "react-spinners";

function Loader() {
    return(
        <div className="loader-container">
            <PulseLoader size="25px" color="#2A3663"/>
        </div>
    )
}

export default Loader;