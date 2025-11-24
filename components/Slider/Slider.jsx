"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import "./Slider.css";

const SliderContext = createContext();

export function Slider({ name = null, transitionDuration = 500, children }) {
    const [currentView, setCurrentView] = useState(null);
    const [previousView, setPreviousView] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef(null);

    function setView(view) {
        clearTimeout(timeoutRef.current);
        setIsTransitioning(true);
        setCurrentView(view);

        timeoutRef.current = setTimeout(() => {
            setPreviousView(view);
            setIsTransitioning(false);
        }, transitionDuration);
    }

    return (
        <SliderContext.Provider
            value={{
                currentView,
                previousView,
                setPreviousView,
                isTransitioning,
                setIsTransitioning,
                setView,
            }}
        >
            <div className={name ? `slider ${name}` : "slider"}>{children}</div>
        </SliderContext.Provider>
    );
}

export function SliderViewer({ initialView, renderViewer = null }) {
    const { currentView, previousView, setView, isTransitioning } =
        useContext(SliderContext);
    const viewerRef = useRef(null);

    useEffect(() => {
        if (!currentView) setView(initialView);
    }, []);

    return (
        <div
            className={
                isTransitioning ? "slider-viewer transition" : "slider-viewer"
            }
            ref={viewerRef}
        >
            <div className="content">
                {renderViewer ? (
                    renderViewer(currentView)
                ) : (
                    <img src={currentView} />
                )}

                <div className="content previous">
                    {renderViewer ? (
                        renderViewer(previousView)
                    ) : (
                        <img src={previousView} />
                    )}
                </div>
            </div>
        </div>
    );
}

export function SliderItems({ children }) {
    return <div className="slider-items">{children}</div>;
}

export function SliderItem({ data, thumbnail }) {
    const { currentView, setView } = useContext(SliderContext);

    function handleClick() {
        if (currentView === data) return;

        setView(data);
    }

    return (
        <div
            className="slider-item"
            onClick={handleClick}
            style={{ backgroundImage: `url("${thumbnail}")` }}
        ></div>
    );
}
