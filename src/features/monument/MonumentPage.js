import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faStar } from '@fortawesome/free-solid-svg-icons';
import { Link, useSearchParams } from "react-router-dom";
import "../../style/MonumentPage.css"
import { useGetMonumentByIdQuery } from "./MonumentApiSlice";
import useAuth from "../../hooks/useAuth";
import { useAddToBeVisitedMonumentMutation, useAddVisitedMonumentMutation } from "../user/UserApiSlice";

const MonumentPage = () => {

    const [searchParams] = useSearchParams();
    const monumentId = searchParams.get('id');
    const {isLogged, id } = useAuth();
    const [sendAddToBeVisited] = useAddToBeVisitedMonumentMutation();
    const [sendAddVisited] = useAddVisitedMonumentMutation();

    const addToBeVisited = () => {
        console.log("ok");
        sendAddToBeVisited({userId: id, monumentId});
    }

    const addVisited = () => {
        sendAddVisited({userId: id, monumentId});
    }

    let buttons = <div className="monument-page-title-info-buttonarea"/>

    if (isLogged) {
        buttons = (<div className="monument-page-title-info-buttonarea">
            <button className="monument-page-title-info-buttonarea-button to-be-visited" onClick={() => addToBeVisited()}>
                Add to "To be visited"
            </button>
            <button className="monument-page-title-info-buttonarea-button visited" onClick={() => addVisited()}>
                Add to "Visited"
            </button>
        </div>)
    }

    const {
        data: monument,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMonumentByIdQuery({id: monumentId});

    let content = <></>;

    if (isLoading){
        content = <p>isLoading</p>
    }

    if (isError){
        content = <p>{error}</p>
    }

    if (isSuccess){
        content = (
            <div className="monument-page">
                <div className="monument-page-title">
                    <div className="monument-page-title-name">
                        <p>{monument.name}</p>
                    </div>
                    <div className="monument-page-title-info">
                        <div className="monument-page-title-info-list">
                            <div className="monument-page-title-info-location">
                            <img className="flag" alt="" src={`https://www.countryflagicons.com/FLAT/64/${monument.countryCode}.png`}/>
                                <p>{monument.country}, {monument.city}</p>
                            </div>
                            <div className="monument-page-title-info-rating">
                                <FontAwesomeIcon className="icon" icon={faStar}></FontAwesomeIcon>
                                <p>{monument.stats.avgRating.toFixed(2)}, {monument.stats.nbReviews} reviews, {monument.stats.nbViews} views</p>
                            </div>
                        </div>
                        {buttons}
                    </div>
                </div>
                <div className="monument-page-images">
                    {monument.images.map((url, i) => {
                        return (
                            <img key={i} src={url} alt="" className={"monument-page-images-"+(i===0?"main":"other")}/>
                        )
                    })
                    }
                    {
                    Array(Math.max(0, 5-monument.images.length)).fill(null).map((id, i) => (<div key={5+i} className="monument-page-images-empty"/>))
                    }
                    <button className="monument-page-images-button">
                        <FontAwesomeIcon className="icon" icon={faImage}/>
                        <p>Show all photos</p>
                    </button>
                </div>
                <div className="monument-page-description">
                    <p>{monument.description}</p>
                </div>
                <div className="monument-page-tag">
                    <p>Tags:</p>
                    {
                    monument.tags.map((tag, i) => (
                        <Link to="/" key={i}>{tag}</Link>
                    ))
                    }
                </div>
            </div>
        );
    }

    return content;
};

export default MonumentPage;