import { useState, useRef } from "react";
import Monument from "./Monument";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../../style/MonumentList.css'
import { useGetMonumentsQuery } from "./MonumentApiSlice";

export const MonumentList = ({sort}) => {

    let scrl = useRef(null);
    const [scrolStart, setscrolStart] = useState(true);
    const [scrolEnd, setscrolEnd] = useState(false);

    const {
        data: monuments,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMonumentsQuery({sort, limit: 10});

    let content = <></>;

    if (isLoading){
        content = <p>isLoading</p>
    }

    if (isError){
        content = <p>{error}</p>
    }

    if (isSuccess){
        content = (<div className="monument-list-container" ref={scrl} onScroll={() => slide(0, false)}>
        {monuments.map((monument, i) => {
            return (
                <Monument key={i} monument={monument}/>
            );
        })}
        </div>)
    }

    const slide = (shift, press) => {
        let x = Math.max(Math.min(Math.floor(scrl.current.scrollLeft+shift), Math.floor(scrl.current.scrollWidth-scrl.current.offsetWidth)), 0);
        if(press){
            scrl.current.scrollLeft = x;
        }else{
            setscrolStart(Math.floor(x) <= 5)
            setscrolEnd(Math.floor(scrl.current.offsetWidth + x) >= scrl.current.scrollWidth-6);
        }
    };

    return (
        <div className="monument-list">
            <div className="monument-list-gradient">
                {content}
                {!scrolStart &&
                <div className="monument-list-gradient-before">
                    <button className="monument-list-button" onClick={() => slide(-(scrl.current.scrollWidth-scrl.current.offsetWidth)/3, true)}>
                        <FontAwesomeIcon className="monument-list-button-icon left" icon={faArrowLeft}/>
                    </button>
                </div>}
                {!scrolEnd &&
                <div className="monument-list-gradient-after">
                    <button className="monument-list-button" onClick={() => slide((scrl.current.scrollWidth-scrl.current.offsetWidth)/3, true)}>
                        <FontAwesomeIcon className="monument-list-button-icon right" icon={faArrowRight}/>
                    </button>
                </div>
                }
            </div>
        </div>
    );
};

export default MonumentList;