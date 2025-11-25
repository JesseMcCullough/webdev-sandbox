"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import "./Slider.css";

const SliderContext = createContext();

export function Slider({ name = null, transitionDuration = 500, children }) {
    const [currentView, setCurrentView] = useState(null);
    const [previousView, setPreviousView] = useState(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef(null);
    const viewerRef = useRef(null);

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
                viewerRef,
            }}
        >
            <div className={name ? `slider ${name}` : "slider"}>{children}</div>
        </SliderContext.Provider>
    );
}

export function SliderViewer({ initialView, renderViewer = null }) {
    const { currentView, previousView, setView, isTransitioning, viewerRef } =
        useContext(SliderContext);

    useEffect(() => {
        if (!currentView) setView(initialView);
    }, []);

    return (
        <div
            className={
                isTransitioning ? "slider-viewer transition" : "slider-viewer"
            }
            ref={viewerRef}
            data-index={0}
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
    return (
        <div className="slider-items">
            <SliderArrow direction="left" />
            <div className="slider-items-container">{children}</div>
            <SliderArrow direction="right" />
        </div>
    );
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
            onMouseEnter={handleClick}
            style={{ backgroundImage: `url("${thumbnail}")` }}
            data-value={data}
        ></div>
    );
}

export function SliderArrow({ direction }) {
    const { viewerRef, setView } = useContext(SliderContext);

    function handleClick(e, direction = 1) {
        const viewerIndex = Number(viewerRef.current.dataset.index);
        const slider = e.target.closest(".slider");
        const items = slider.querySelectorAll(".slider-item");
        const nextIndex = viewerIndex + direction;

        if (nextIndex < 0 || nextIndex >= items.length) return;

        const data = items[nextIndex].dataset.value;

        setView(data);

        viewerRef.current.dataset.index = nextIndex;
    }

    return (
        <div
            className={`slider-arrow ${direction}`}
            onClick={(e) =>
                direction === "right" ? handleClick(e) : handleClick(e, -1)
            }
        >
            <div className="slider-arrow-icon">
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
    );
}
