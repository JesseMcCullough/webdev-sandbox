"use client";

import { useState, useEffect, createContext, useContext, useRef } from "react";
import "./Slider.css";
import Debug from "@/utils/Debug";

const SliderContext = createContext();
const isDebug = true;

export function Slider({ name = null, children }) {
    const [items, setItems] = useState([]); // item object data {index, data, thumbnail}
    const [activeIndex, setActiveIndex] = useState(0); // active item index
    const itemsRef = useRef([]); // ref to each SliderItem
    const scrollDirectionRef = useRef(null); // scroll direction (left or right)
    const canDetectScrollItems = useRef(true);
    const debug = new Debug("Slider", { enabled: isDebug });

    function setActiveItem(
        index,
        shouldScrollItems = true,
        shouldDetectScroll = false
    ) {
        debug.log("Running setSliderViewToIndex ", ...arguments);

        // checks if index is within range
        if (index < 0 || index >= itemsRef.current.length) {
            debug.warn(
                "Index either out of range or same index (activeIndex: " +
                    activeIndex +
                    ", index: " +
                    index +
                    ")"
            );
            return;
        }
        debug.log("Changing index to " + index);

        setActiveIndex((prev) => {
            scrollDirectionRef.current = index > prev ? "right" : "left";

            debug.log("Scroll direction set to " + scrollDirectionRef.current);
            return index;
        });

        // allows / disallows the slideritems observer to scroll
        canDetectScrollItems.current = shouldDetectScroll;

        if (shouldScrollItems) {
            debug.log(
                "shouldScrollItems is true, so scrolling to index within itemsRef"
            );
            debug.log("shouldDetectScroll", shouldDetectScroll);
            debug.log("canDetectScrollItems", canDetectScrollItems.current);
            itemsRef.current[index].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
            });
        }
    }

    return (
        <SliderContext.Provider
            value={{
                activeIndex,
                setActiveItem,
                itemsRef,
                items,
                setItems,
                canDetectScrollItems,
                scrollDirectionRef,
            }}
        >
            <div className={name ? `slider ${name}` : "slider"}>{children}</div>
        </SliderContext.Provider>
    );
}

export function SliderItems({ onClick, registerRef, children }) {
    const {
        items,
        itemsRef,
        setActiveItem,
        canDetectScrollItems,
        activeIndex,
    } = useContext(SliderContext);
    const itemsContainerRef = useRef(null);
    const debug = new Debug("SliderItems", { enabled: isDebug });

    // detects scrolling of SliderItems container and sets active index
    // at visible threshold of 0.5
    // will freak out if multiple items are viewable, but for single view items, should be okay
    // unsure if multiple items has a use case... maybe, unsure.
    useEffect(() => {
        if (!itemsContainerRef.current) return;

        let scrollTimeout;

        // resets scroll detection / intersection detection.
        const handleScrollEnd = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                debug.log(
                    "Native scroll detected, setting canDetectScrollItems to true"
                );
                canDetectScrollItems.current = true;
            }, 100);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);
                    debug.groupStart("Observing index " + index);
                    debug.log("isIntersecting", entry.isIntersecting);
                    debug.log(
                        "canDetectScrollItems",
                        canDetectScrollItems.current
                    );

                    if (entry.isIntersecting && canDetectScrollItems.current) {
                        debug.log("Detected to be intersecting");
                        debug.log(
                            "Changing active index to " +
                                index +
                                " with activeIndex currently " +
                                activeIndex
                        );
                        debug.groupEnd();
                        setActiveItem(index, false, true);
                    }
                    debug.groupEnd();
                });
            },
            {
                root: itemsContainerRef.current,
                threshold: 0.5,
            }
        );

        itemsRef.current.forEach((item) => {
            observer.observe(item);
        });

        itemsContainerRef.current.addEventListener("scroll", handleScrollEnd);

        return () => {
            observer.disconnect();
            itemsContainerRef?.current?.removeEventListener(
                "scroll",
                handleScrollEnd
            );
        };
    }, [items.length]);

    return (
        <div className="slider-items">
            <SliderArrow direction="left" onClick={onClick} />
            <div
                className="slider-items-container"
                ref={registerRef ? registerRef : itemsContainerRef}
            >
                {children}
            </div>
            <SliderArrow direction="right" onClick={onClick} />
        </div>
    );
}

export function SliderIndicators({ children }) {
    const { items, activeIndex, setActiveItem, scrollDirectionRef } =
        useContext(SliderContext);
    const indicatorItemsRef = useRef([]);
    const indicatorsContainerRef = useRef(null);
    const visibleMap = useRef({}); // index: isVisible boolean
    const debug = new Debug("SliderIndicators", { enabled: isDebug });

    // detects which SliderItem within SliderIndicators is visible, threshold 0.6
    useEffect(() => {
        if (!indicatorsContainerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.dataset.index);

                    visibleMap.current[index] = entry.isIntersecting;
                });
            },
            {
                root: indicatorsContainerRef.current,
                threshold: 0.6,
            }
        );

        indicatorItemsRef.current.forEach((item) => {
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, [indicatorItemsRef.current.length]);

    // scrolls the indicator for the active SliderItem into view
    useEffect(() => {
        debug.groupStart(
            "Checking whether to scroll SliderIndicator index " +
                activeIndex +
                " into view"
        );

        const visible = visibleMap.current[activeIndex];
        const el = indicatorItemsRef.current[activeIndex];

        debug.log("activeIndex", activeIndex);
        debug.log("visibleMap", visibleMap.current);
        debug.log("visible: ", visible);
        debug.log("el", el);
        debug.log("condition: ", !visible && !!el);

        if (!visible && el) {
            debug.log(
                "Scrolling SliderIndicator index " + activeIndex + " into view"
            );

            el.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline:
                    scrollDirectionRef.current === "right" ? "start" : "end",
            });
        }

        debug.groupEnd();
    }, [activeIndex]);

    function handleClick(index) {
        debug.log("Clicked item " + index);

        if (activeIndex === index) return;

        debug.log("Setting active index to " + index + ", scrolling");

        setActiveItem(index, true);
    }

    return (
        <div className="slider-indicators">
            <SliderItems registerRef={indicatorsContainerRef}>
                {items.map((item) => {
                    return (
                        <SliderItem
                            index={item.index}
                            key={item.index}
                            registerRef={(element) =>
                                (indicatorItemsRef.current[item.index] =
                                    element)
                            }
                            renderChildren={false}
                            thumbnail={item.thumbnail}
                            onClick={() => handleClick(item.index)}
                        >
                            {item.data}
                        </SliderItem>
                    );
                })}
            </SliderItems>
        </div>
    );
}

export function SliderItem({
    index,
    data,
    thumbnail,
    registerRef,
    children,
    renderChildren = true,
    onClick,
}) {
    const { activeIndex, itemsRef, setItems } = useContext(SliderContext);

    // adds item object data (index, data, thumbnail) to items
    useEffect(() => {
        setItems((prev) => {
            const updated = prev.map((item) =>
                item.index === index
                    ? { ...item, data: children ?? data }
                    : item
            );

            // if index wasn't found, add new item
            return updated.some((item) => item.index === index)
                ? updated
                : [...updated, { index, data: children ?? data, thumbnail }];
        });
    }, [children]);

    return (
        <div
            className={
                activeIndex === index ? "slider-item active" : "slider-item"
            }
            onClick={onClick}
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
    const { activeIndex, setActiveItem } = useContext(SliderContext);
    const debug = new Debug("SliderArrow", { enabled: isDebug });

    function handleClick(direction = 1) {
        debug.log(
            "Clicked arrow, setting index to " +
                (activeIndex + direction) +
                ", scrolling"
        );

        setActiveItem(activeIndex + direction);
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
