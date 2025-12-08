"use client";

import { useState, useRef } from "react";

export default function AccordionToggle({ name, children }) {
    const [isActive, setIsActive] = useState(false);
    const accordionClassName = name ? `accordion ${name}` : "accordion";
    const containerRef = useRef(null);

    function handleClick(e) {
        const nestedAccordion = e.target.closest(".accordion");

        if (nestedAccordion !== containerRef.current) return;

        setIsActive((prev) => !prev);
    }

    return (
        <div
            className={
                isActive ? `${accordionClassName} active` : accordionClassName
            }
            onClick={(e) => handleClick(e)}
            ref={containerRef}
        >
            {children}
        </div>
    );
}
