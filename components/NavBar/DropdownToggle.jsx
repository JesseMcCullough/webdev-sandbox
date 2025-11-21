"use client";

import { useNavDropdown } from "./NavDropdownContext";

export default function DropdownToggle({ name, children }) {
    const { openDropdown, toggleDropdown } = useNavDropdown();

    const isOpen = openDropdown === name;

    return (
        <li
            className={isOpen ? "dropdown active" : "dropdown"}
            onClick={() => toggleDropdown(name)}
        >
            {children}
        </li>
    );
}
