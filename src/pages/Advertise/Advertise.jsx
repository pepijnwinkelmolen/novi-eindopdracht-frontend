import './Advertise.css'
import Button from "../../components/Button/Button.jsx";
import {useState} from "react";

function handleChangingImage (e) {
    const image =  document.querySelectorAll(".advertise-input-image-show");
    const imageContainer = document.getElementById("advertise-image-container");
    const file = e.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function (){
        image[0].setAttribute("src", fileReader.result);
        image[0].setAttribute("style", "display: block");
        imageContainer.setAttribute("style", "opacity: 1");
    }
}

function Advertise() {

    const [showPlaceholder, setShowPlaceholder] = useState(true);

    return(
        <form className="advertise-container" onSubmit={() => ""}>
            <section>
                <label className="advertise-input-select-wrapper" htmlFor="advertise-category">
                    <select className="advertise-input-select" id="advertise-category" name="category">
                        <option>Optie 1</option>
                    </select>
                </label>
                <label htmlFor="advertise-title"/>
                <input className="advertise-input" id="advertise-title" name="title" placeholder="Titel"/>
                <label htmlFor="advertise-description" />
                <textarea rows="4" cols="50" className="advertise-input" id="advertise-description" name="description" placeholder="Omschrijving"/>
            </section>
            <section>
                <label htmlFor="advertise-price" />
                <input className="advertise-input" id="advertise-price" name="price" placeholder="Prijs"/>
                <label className="advertise-input-image" htmlFor="advertise-image" id="advertise-image-container">
                    { showPlaceholder &&
                        <div className="advertise-input-image-inner">
                            <p>+</p>
                        </div>
                    }
                    <img className="advertise-input-image-show" alt="Uw plaatje"/>
                </label>
                <input type="file" id="advertise-image" name="image" accept="image/jpeg,imagine/png" onChange={(e) => {
                    setShowPlaceholder(false);
                    handleChangingImage(e);
                }}/>
            </section>
            <section>
                <label htmlFor="advertise-details"/>
                <textarea rows="4" cols="50" className="advertise-input" id="advertise-details" name="details" placeholder="Details"/>
                <label className="advertise-input-select-wrapper" htmlFor="advertise-state">
                    <select className="advertise-input-select" id="advertise-state" name="state">
                        <option value="new">Nieuw</option>
                        <option value="good">Goed</option>
                        <option value="fine">Prima</option>
                        <option value="bad">Slecht</option>
                        <option value="very-bad">Zeer slecht</option>
                    </select>
                </label>

            </section>
            <div className="advertise-button-container">
                <Button variant="submit-button" text="Plaats advertentie"/>
            </div>
        </form>
    )
}

export default Advertise;