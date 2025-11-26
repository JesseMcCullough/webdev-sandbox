"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import "./Slider.css";

const SliderContext = createContext();

export function Slider({ name = null, transitionDuration = 500, children }) {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [previousIndex, setPreviousIndex] = useState(-1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef(null);
    const viewerRef = useRef(null);
    const itemsRef = useRef([]);

    function setSliderViewerToIndex(view) {
        if (view < 0 || view >= itemsRef.current.length) return;

        clearTimeout(timeoutRef.current);
        setIsTransitioning(true);
        setActiveIndex(view);

        timeoutRef.current = setTimeout(() => {
            setPreviousIndex(view);
            setIsTransitioning(false);
        }, transitionDuration);
    }

    return (
        <SliderContext.Provider
            value={{
                activeIndex,
                previousIndex,
                isTransitioning,
                setSliderViewerToIndex,
                viewerRef,
                itemsRef,
            }}
        >
            <div className={name ? `slider ${name}` : "slider"}>{children}</div>
        </SliderContext.Provider>
    );
}

export function SliderViewer({ renderViewer = null }) {
    const { activeIndex, previousIndex, itemsRef, isTransitioning, viewerRef } =
        useContext(SliderContext);
    const activeItem = itemsRef.current[activeIndex];
    const previousItem = itemsRef.current[previousIndex];

    return (
        <div
            className={
                isTransitioning ? "slider-viewer transition" : "slider-viewer"
            }
            ref={viewerRef}
            data-index={activeIndex}
        >
            <div className="content">
                {renderViewer ? (
                    renderViewer(activeItem)
                ) : (
                    <img src={activeItem} />
                )}

                <div className="content previous">
                    {renderViewer ? (
                        renderViewer(previousItem)
                    ) : (
                        <img src={previousItem} />
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
    const { activeIndex, setSliderViewerToIndex, itemsRef } =
        useContext(SliderContext);
    const indexRef = useRef(-1);

    useEffect(() => {
        const existingIndex = itemsRef.current.indexOf(data);

        if (existingIndex !== -1) {
            indexRef.current = existingIndex;
            return;
        }

        indexRef.current = itemsRef.current.length;
        itemsRef.current.push(data);

        if (indexRef.current === 0) {
            setSliderViewerToIndex(indexRef.current);
        }
    }, []);

    function handleClick() {
        if (activeIndex === indexRef.current) return;

        setSliderViewerToIndex(indexRef.current);
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
    const { activeIndex, setSliderViewerToIndex } = useContext(SliderContext);

    function handleClick(direction = 1) {
        setSliderViewerToIndex(activeIndex + direction);
    }

    return (
        <div
            className={`slider-arrow ${direction}`}
            onClick={(e) =>
                direction === "right" ? handleClick() : handleClick(-1)
            }
        >
            <div className="slider-arrow-icon">
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
    );
}
