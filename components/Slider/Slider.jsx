"use client";

import {
    useState,
    useEffect,
    createContext,
    useContext,
    useRef,
    useLayoutEffect,
} from "react";
import "./Slider.css";

const SliderContext = createContext();

export function Slider({ name = null, transitionDuration = 500, children }) {
    const [items, setItems] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(-1);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef(null);
    const viewerRef = useRef(null);
    const itemsRef = useRef([]);
    const viewerItemsRef = useRef([]);

    function setSliderViewerToIndex(index) {
        if (index < 0 || index >= itemsRef.current.length) return;

        clearTimeout(timeoutRef.current);
        setIsTransitioning(true);
        setActiveIndex(index);

        viewerItemsRef.current[index].scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
        });

        // itemsRef.current[index].scrollIntoView({
        //     behavior: "smooth",
        //     block: "center",
        //     inline: "center",
        // });

        timeoutRef.current = setTimeout(() => {
            setPreviousIndex(index);
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
                items,
                setItems,
                setActiveIndex,
                viewerItemsRef,
            }}
        >
            <div className={name ? `slider ${name}` : "slider"}>{children}</div>
        </SliderContext.Provider>
    );
}

export function SliderViewer({ renderViewer = null }) {
    const {
        activeIndex,
        previousIndex,
        itemsRef,
        isTransitioning,
        viewerRef,
        items,
        setActiveIndex,
        viewerItemsRef,
        setSliderViewerToIndex,
    } = useContext(SliderContext);
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
                <SliderItems
                    onClick={(direction) => {
                        const newIndex =
                            direction === "right"
                                ? activeIndex + 1
                                : activeIndex - 1; // hello

                        setSliderViewerToIndex(newIndex);
                        console.log("clicked");
                    }}
                >
                    {items.map((item) => {
                        //console.log("itemsRef item map", item);
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

                {/* {renderViewer ? (
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
                </div> */}
            </div>
        </div>
    );
}

export function SliderItems({ onClick, children }) {
    const { itemsRef, activeIndex, items } = useContext(SliderContext);
    const containerRef = useRef(null);
    const visibleMap = useRef({}); // index: isVisible boolean
    const hasObserverTicked = useRef(false);

    useLayoutEffect(() => {
        console.log("--------CREATING OBSERVER", items.length);

        if (!containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);
                    visibleMap.current[index] = entry.isIntersecting;
                    console.log(
                        "insection loop in entries",
                        index,
                        entry.isIntersecting
                    );
                    hasObserverTicked.current = true;
                });
            },
            {
                root: containerRef.current,
                threshold: 0.6,
            }
        );

        itemsRef.current.forEach((item, index) => {
            console.log("looping itemsRef", item);

            if (!item) return;

            item.dataset.index = index;
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        console.log("observerTicked?", hasObserverTicked.current);
        if (!hasObserverTicked.current) return;

        const visible = visibleMap.current[activeIndex];
        const el = itemsRef.current[activeIndex];

        console.log("activeItem", el);
        console.log("activeIndex", activeIndex);
        console.log("visible", visible);
        console.log("visibleMap", visibleMap);
        console.log("-----------");

        if (!visible && el) {
            el.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start",
            });
        }
    }, [activeIndex]);

    return (
        <div className="slider-items">
            <SliderArrow direction="left" onClick={onClick} />
            <div className="slider-items-container" ref={containerRef}>
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

        setSliderViewerToIndex(index);
    }

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
            onMouseEnter={handleClick}
            style={{ backgroundImage: `url("${thumbnail}")` }}
            data-value={data}
            data-index={index}
            ref={(element) => {
                //if (itemsRef.current.indexOf(index) !== -1) return;

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
        // setSliderViewerToIndex(activeIndex + direction);
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
