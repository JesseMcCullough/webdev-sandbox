"use client";

import { useState } from "react";

export default function AccordionToggle({ name, children }) {
    const [isActive, setIsActive] = useState(false);
    const accordionClassName = name ? `accordion ${name}` : "accordion";

    function handleClick() {
        setIsActive((prev) => !prev);
    }

    return (
        <div
            className={
                isActive ? `${accordionClassName} active` : accordionClassName
            }
            onClick={handleClick}
        >
            {children}
        </div>
    );
}
