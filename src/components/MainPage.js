import MonumentList from "../features/monument/MonumentList";
import "../style/App.css"

const MainPage = () => {
    return (
        <div className="main-page">
            <div className="main-page-row">
                <p className="main-page-row-text">The trendiest:</p>
                <MonumentList sort={"mustToBeVisited"}/>
            </div>

            <div className="main-page-row">
                <p className="main-page-row-text">The unmissable:</p>
                <MonumentList sort={"mustVisited"}/>
            </div>

            <div className="main-page-row">
                <p className="main-page-row-text">The timeless:</p>
                <MonumentList sort={"mostViewed"}/>
            </div>
            
            <div className="main-page-row">
                <p className="main-page-row-text">The new ones:</p>
                <MonumentList sort={"date"}/>
            </div>
        </div>
    );
};

export default MainPage;