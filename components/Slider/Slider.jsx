"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import "./Slider.css";

const SliderContext = createContext();

export function Slider({ name = null, children }) {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const shouldScrollItemsRef = useRef(true);
    const viewerRef = useRef(null);
    const itemsRef = useRef([]);
    const viewerItemsRef = useRef([]);
    const sliderItemsContainerRef = useRef(null);
    const visibleMap = useRef({}); // index: isVisible boolean

    function setSliderViewerToIndex(
        index,
        shouldScrollItems = true,
        shouldScrollViewerItems = true
    ) {
        if (index < 0 || index >= itemsRef.current.length) return;

        shouldScrollItemsRef.current = shouldScrollItems;
        setActiveIndex(index);

        if (shouldScrollViewerItems) {
            viewerItemsRef.current[index].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }

    // sets up observer to watch the items / dots
    useEffect(() => {
        if (!sliderItemsContainerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);

                    visibleMap.current[index] = entry.isIntersecting;
                });
            },
            {
                root: sliderItemsContainerRef.current,
                threshold: 0.6,
            }
        );

        itemsRef.current.forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    // scroll items (dots) into view
    useEffect(() => {
        const visible = visibleMap.current[activeIndex];
        const el = itemsRef.current[activeIndex];

        if (!visible && el && shouldScrollItemsRef.current) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
        }

        shouldScrollItemsRef.current = true;
    }, [activeIndex]);

    return (
        <SliderContext.Provider
            value={{
                activeIndex,
                setSliderViewerToIndex,
                viewerRef,
                itemsRef,
                items,
                setItems,
                setActiveIndex,
                viewerItemsRef,
                shouldScrollItemsRef,
                sliderItemsContainerRef,
            }}
        >
            <div className={name ? `slider ${name}` : "slider"}>{children}</div>
        </SliderContext.Provider>
    );
}

export function SliderViewer({ renderViewer = null }) {
    const {
        activeIndex,
        viewerRef,
        items,
        viewerItemsRef,
        setSliderViewerToIndex,
    } = useContext(SliderContext);
    const sliderItemsRef = useRef(null);

    // sets up observer to select active item when scrolling through SliderViewer
    useEffect(() => {
        if (!sliderItemsRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);
                    if (entry.isIntersecting) {
                        setSliderViewerToIndex(index, true, false);
                    }
                });
            },
            {
                root: sliderItemsRef.current,
                threshold: 0.5,
            }
        );

        viewerItemsRef.current.forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, [items.length]);

    return (
        <div
            className={"slider-viewer"}
            ref={viewerRef}
            data-index={activeIndex}
        >
            <div className="content">
                <SliderItems
                    onClick={(direction) => {
                        const newIndex =
                            direction === "right"
                                ? activeIndex + 1
                                : activeIndex - 1;

                        setSliderViewerToIndex(newIndex);
                    }}
                    registerRef={sliderItemsRef}
                >
                    {items.map((item) => {
                        return (
                            <SliderItem
                                data={item.data}
                                index={item.index}
                                key={item.index}
                                registerRef={(element) =>
                                    (viewerItemsRef.current[item.index] =
                                        element)
                                }
                            >
                                {renderViewer ? (
                                    renderViewer(item.data)
                                ) : (
                                    <img src={item.data} />
                                )}
                            </SliderItem>
                        );
                    })}
                </SliderItems>
            </div>
        </div>
    );
}

export function SliderItems({ onClick, registerRef, children }) {
    const { sliderItemsContainerRef } = useContext(SliderContext);

    return (
        <div className="slider-items">
            <SliderArrow direction="left" onClick={onClick} />
            <div
                className="slider-items-container"
                ref={registerRef ? registerRef : sliderItemsContainerRef}
            >
                {children}
            </div>
            <SliderArrow direction="right" onClick={onClick} />
        </div>
    );
}

export function SliderItem({ index, data, thumbnail, registerRef, children }) {
    const { activeIndex, setSliderViewerToIndex, itemsRef, items, setItems } =
        useContext(SliderContext);

    function handleClick() {
        if (activeIndex === index) return;

        setSliderViewerToIndex(index, false);
    }

    // adds item object data (index, data, thumbnail) to items
    useEffect(() => {
        const exists = items.some((item) => item.index === index);
        if (exists) return;

        setItems((prev) => [
            ...prev,
            { index: index, data: data, thumbnail: thumbnail },
        ]);
    }, []);

    return (
        <div
            className="slider-item"
            onClick={handleClick}
            style={{ backgroundImage: `url("${thumbnail}")` }}
            data-value={data}
            data-index={index}
            ref={(element) => {
                registerRef
                    ? registerRef(element)
                    : (itemsRef.current[index] = element);
            }}
        >
            {children}
        </div>
    );
}

export function SliderArrow({ direction, onClick }) {
    const { activeIndex, setSliderViewerToIndex } = useContext(SliderContext);

    function handleClick(direction = 1) {
        setSliderViewerToIndex(activeIndex + direction);
    }

    return (
        <div
            className={`slider-arrow ${direction}`}
            onClick={() => {
                if (onClick) onClick(direction);
                direction === "right" ? handleClick() : handleClick(-1);
            }}
        >
            <div className="slider-arrow-icon">
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </div>
    );
}
