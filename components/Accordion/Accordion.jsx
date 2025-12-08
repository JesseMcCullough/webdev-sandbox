import React from "react";
import AccordionToggle from "./AccordionToggle";
import "./Accordion.css";

export default function Accordion({ name, title, children }) {
    return (
        <AccordionToggle name={name}>
            <div className="dropdown-container">
                <h3 className="title">{title}</h3>
                <div className="dropdown-icon">
                    <div className="left"></div>
                    <div className="right"></div>
                </div>
            </div>
            <div className="collapse">
                <div className="collapse-wrapper">{children}</div>
            </div>
        </AccordionToggle>
    );
}
