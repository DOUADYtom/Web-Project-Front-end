import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useGetToBeVisitedMonumentQuery, useGetVisitedMonumentQuery } from './UserApiSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import '../../style/MonumentList.css'
import "../../style/App.css"
import { useState, useRef } from 'react';
import Monument from "../monument/Monument"


const MyPage = () => {

    const { id } = useAuth();
    let scrlToBeVisited = useRef(null);
    const [scrolStartToBeVisited, setscrolStartToBeVisited] = useState(true);
    const [scrolEndToBeVisited, setscrolEndToBeVisited] = useState(false);
    let scrlVisited = useRef(null);
    const [scrolStartVisited, setscrolStartVisited] = useState(true);
    const [scrolEndVisited, setscrolEndVisited] = useState(false);

    const {
        data: monumentsToBeVisited,
        isLoading: isLoadingToBeVisited,
        isSuccess: isSuccessToBeVisited,
        isError: isErrorToBeVisited,
        error: errorToBeVisited
    } = useGetToBeVisitedMonumentQuery({userId: id});

    const {
        data: monumentsVisited,
        isLoading: isLoadingVisited,
        isSuccess: isSuccessVisited,
        isError: isErrorVisited,
        error: errorVisited
    } = useGetVisitedMonumentQuery({userId: id});

    let contentToBeVisited = <></>;

    if (isLoadingToBeVisited){
        contentToBeVisited = <p>isLoading</p>
    }

    if (isErrorToBeVisited){
        contentToBeVisited = <p>{errorToBeVisited}</p>
    }

    if (isSuccessToBeVisited){
        contentToBeVisited = (<div className="monument-list-container" ref={scrlToBeVisited} onScroll={() => slideToBeVisited(0, false)}>
        {monumentsToBeVisited.map((monument, i) => {
            return (
                <Monument key={i} monument={monument}/>
            );
        })}
        </div>)
    }

    let contentVisited = <></>;

    if (isLoadingVisited){
        contentVisited = <p>isLoading</p>
    }

    if (isErrorVisited){
        contentVisited = <p>{errorVisited}</p>
    }

    if (isSuccessVisited){
        contentVisited = (<div className="monument-list-container" ref={scrlVisited} onScroll={() => slideVisited(0, false)}>
        {monumentsVisited.map((monument, i) => {
            return (
                <Monument key={i} monument={monument}/>
            );
        })}
        </div>)
    }

    const slideToBeVisited = (shift, press) => {
        let x = Math.max(Math.min(Math.floor(scrlToBeVisited.current.scrollLeft+shift), Math.floor(scrlToBeVisited.current.scrollWidth-scrlToBeVisited.current.offsetWidth)), 0);
        if(press){
            scrlToBeVisited.current.scrollLeft = x;
        }else{
            setscrolStartToBeVisited(Math.floor(x) <= 5)
            setscrolEndToBeVisited(Math.floor(scrlToBeVisited.current.offsetWidth + x) >= scrlToBeVisited.current.scrollWidth-6);
        }
    };

    const slideVisited = (shift, press) => {
        let x = Math.max(Math.min(Math.floor(scrlVisited.current.scrollLeft+shift), Math.floor(scrlVisited.current.scrollWidth-scrlVisited.current.offsetWidth)), 0);
        if(press){
            scrlVisited.current.scrollLeft = x;
        }else{
            setscrolStartVisited(Math.floor(x) <= 5)
            setscrolEndVisited(Math.floor(scrlVisited.current.offsetWidth + x) >= scrlVisited.current.scrollWidth-6);
        }
    };

    return (
        <div className="main-page">
            <div className="main-page-row">
                <p className="main-page-row-text">My to be visited:</p>
                <div className="monument-list">
                    <div className="monument-list-gradient">
                        {contentToBeVisited}
                        {!scrolStartToBeVisited &&
                        <div className="monument-list-gradient-before">
                            <button className="monument-list-button" onClick={() => slideToBeVisited(-(scrlToBeVisited.current.scrollWidth-scrlToBeVisited.current.offsetWidth)/3, true)}>
                                <FontAwesomeIcon className="monument-list-button-icon left" icon={faArrowLeft}/>
                            </button>
                        </div>}
                        {!scrolEndToBeVisited &&
                        <div className="monument-list-gradient-after">
                            <button className="monument-list-button" onClick={() => slideToBeVisited((scrlToBeVisited.current.scrollWidth-scrlToBeVisited.current.offsetWidth)/3, true)}>
                                <FontAwesomeIcon className="monument-list-button-icon right" icon={faArrowRight}/>
                            </button>
                        </div>
                        }
                    </div>
                </div>
            </div>

            <div className="main-page-row">
                <p className="main-page-row-text">My already visited:</p>
                <div className="monument-list">
                    <div className="monument-list-gradient">
                        {contentVisited}
                        {!scrolStartVisited &&
                        <div className="monument-list-gradient-before">
                            <button className="monument-list-button" onClick={() => slideVisited(-(scrlVisited.current.scrollWidth-scrlVisited.current.offsetWidth)/3, true)}>
                                <FontAwesomeIcon className="monument-list-button-icon left" icon={faArrowLeft}/>
                            </button>
                        </div>}
                        {!scrolEndVisited &&
                        <div className="monument-list-gradient-after">
                            <button className="monument-list-button" onClick={() => slideVisited((scrlVisited.current.scrollWidth-scrlVisited.current.offsetWidth)/3, true)}>
                                <FontAwesomeIcon className="monument-list-button-icon right" icon={faArrowRight}/>
                            </button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;