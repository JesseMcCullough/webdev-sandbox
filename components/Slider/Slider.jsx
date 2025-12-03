"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import "./Slider.css";

const SliderContext = createContext();

export function Slider({ name = null, children }) {
    const [items, setItems] = useState([]); // item object data {index, data, thumbnail}
    const [activeIndex, setActiveIndex] = useState(0); // active item index
    const shouldScrollItemsRef = useRef(true); // should scroll SliderItems below SliderViewer (indicators)
    const viewerRef = useRef(null); // SliderViewer ref
    const itemsRef = useRef([]); // SliderItems ref (inddicators)
    const viewerItemsRef = useRef([]); // SliderViewer's SliderItems
    const sliderItemsContainerRef = useRef(null); // SliderItems' container ref (indicators)
    const visibleMap = useRef({}); // index: isVisible boolean
    const scrollDirectionRef = useRef(null); // scroll direction (left or right)
    const isSliderViewerObserverActiveRef = useRef(true);

    function setSliderViewerToIndex(
        index,
        shouldScrollItems = true,
        shouldScrollViewerItems = true
    ) {
        if (index < 0 || index >= itemsRef.current.length) return;

        console.log("-----------------");
        console.log("shouldScrollItems", shouldScrollItems),
            (shouldScrollItemsRef.current = shouldScrollItems);
        console.log("shouldScrollItemsRef", shouldScrollItemsRef.current),
            setActiveIndex((prev) => {
                scrollDirectionRef.current = index > prev ? "right" : "left";

                return index;
            });

        // this
        if (shouldScrollViewerItems) {
            viewerItemsRef.current[index].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }

    // setup observer to watch the SliderItems below SliderViewer (indicators)
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

    // scroll active SliderItem (indicator) into view
    useEffect(() => {
        const visible = visibleMap.current[activeIndex];
        const el = itemsRef.current[activeIndex];

        // scroll sometimes already performed by user (mobile swiping)
        if (!visible && el && shouldScrollItemsRef.current) {
            console.log("scrolling");
            el.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline:
                    scrollDirectionRef.current === "right" ? "start" : "end",
            });
        }

        // reset scrolling
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
                viewerItemsRef,
                shouldScrollItemsRef,
                sliderItemsContainerRef,
                isSliderViewerObserverActiveRef,
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
        isSliderViewerObserverActiveRef,
        itemsRef,
    } = useContext(SliderContext);
    const sliderItemsRef = useRef(null);

    // sets up observer to select active item when scrolling through SliderViewer
    useEffect(() => {
        if (!sliderItemsRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);
                    if (
                        entry.isIntersecting &&
                        isSliderViewerObserverActiveRef.current
                    ) {
                        setSliderViewerToIndex(index, true, false);
                        console.log("1");
                    }
                });

                isSliderViewerObserverActiveRef.current = true;
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
        <div className={"slider-viewer"} ref={viewerRef}>
            <div className="content">
                <SliderItems
                    isIndicator={false}
                    onClick={(direction) => {
                        const newIndex =
                            direction === "right"
                                ? activeIndex + 1
                                : activeIndex - 1;

                        isSliderViewerObserverActiveRef.current = false;

                        setSliderViewerToIndex(newIndex);
                        console.log("2");
                    }}
                    registerRef={sliderItemsRef}
                >
                    {items.map((item) => {
                        return (
                            <SliderItem
                                // data={item.data}
                                index={item.index}
                                key={item.index}
                                registerRef={(element) =>
                                    (viewerItemsRef.current[item.index] =
                                        element)
                                }
                                renderChildren={true}
                            >
                                {item.data}
                                {/* {renderViewer ? (
                                    renderViewer(item.data)
                                ) : (
                                    <img src={item.data} />
                                )} */}
                            </SliderItem>
                        );
                    })}
                </SliderItems>
            </div>
        </div>
    );
}

export function SliderItems({
    isIndicator = true,
    onClick,
    registerRef,
    children,
}) {
    const { sliderItemsContainerRef } = useContext(SliderContext);

    function getSliderItems() {
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

    return isIndicator ? (
        <SliderIndicators>{getSliderItems()}</SliderIndicators>
    ) : (
        getSliderItems()
    );
}

function SliderIndicators({ children }) {
    return <div className="slider-indicators">{children}</div>;
}

export function SliderItem({
    index,
    data,
    thumbnail,
    registerRef,
    children,
    renderChildren = false,
}) {
    const {
        activeIndex,
        setSliderViewerToIndex,
        itemsRef,
        items,
        setItems,
        isSliderViewerObserverActiveRef,
    } = useContext(SliderContext);

    function handleClick() {
        if (activeIndex === index) return;

        console.log("handling click / hover");
        isSliderViewerObserverActiveRef.current = false;
        setSliderViewerToIndex(index, false);
    }

    // adds item object data (index, data, thumbnail) to items
    useEffect(() => {
        const exists = items.some((item) => item.index === index);
        if (exists) return;

        if (children) {
            setItems((prev) => [
                ...prev,
                { index: index, data: children, thumbnail: thumbnail },
            ]);
        } else {
            setItems((prev) => [
                ...prev,
                { index: index, data: data, thumbnail: thumbnail },
            ]);
        }
    }, []);

    return (
        <div
            className={
                activeIndex === index ? "slider-item active" : "slider-item"
            }
            onClick={handleClick}
            // onMouseEnter={handleClick}
            style={thumbnail && { backgroundImage: `url("${thumbnail}")` }}
            data-value={data}
            data-index={index}
            ref={(element) => {
                registerRef
                    ? registerRef(element)
                    : (itemsRef.current[index] = element);
            }}
        >
            {renderChildren && children}
        </div>
    );
}

export function SliderArrow({ direction, onClick }) {
    const { activeIndex, setSliderViewerToIndex } = useContext(SliderContext);

    function handleClick(direction = 1) {
        setSliderViewerToIndex(activeIndex + direction);
        console.log("3");
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
