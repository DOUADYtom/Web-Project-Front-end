import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faArrowCircleRight, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import '../../style/MonumentElement.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Monument = ({monument}) => {

    const [image, setImage] = useState(0);

    const n = monument.images.length;

    const rightImage = () => {
        setImage((previous) => Math.min(previous+1, n-1));
    }

    const leftImage = () => {
        setImage((previous) => Math.max(previous-1, 0));
    }

    return (
        <div className="monument-element">
            <div className="monument-element-image">
                <Link to={`/monument?id=${monument._id}`}>
                    <img alt="" className="monument-element-image-img" src={monument.images[image]}/>
                </Link>
                { image!==0 ? 
                <button className="monument-element-image-left-button" onClick={leftImage}>
                    <FontAwesomeIcon className="monument-element-image-button-icon" icon={faArrowCircleLeft}/>
                </button>
                : <></>}
                { image!==(n-1) ? 
                <button className="monument-element-image-right-button" onClick={rightImage}>
                    <FontAwesomeIcon className="monument-element-image-button-icon" icon={faArrowCircleRight}/>
                </button>
                : <></>}
            </div>
            <div className="monument-element-informations">
                <div className="monument-element-informations-name">
                    <p className="monument-element-informations-name-p">{monument.name}</p>
                </div>
                <div className="monument-element-informations-note">
                    <FontAwesomeIcon className="monument-element-informations-note-icon" icon={faStar}/>
                    <p className="monument-element-informations-note-p">{monument.stats.avgRating.toFixed(2)}</p>
                </div>
                <div className="monument-element-informations-flag">
                    <img className="monument-element-informations-flag-img" alt="" src={`https://www.countryflagicons.com/FLAT/64/${monument.countryCode}.png`}/>
                </div>
                <div className="monument-element-informations-location">
                    <p className="monument-element-informations-location-p">{monument.country}, {monument.city}</p>
                </div>
            </div>
        </div>
    )
}

export default Monument;