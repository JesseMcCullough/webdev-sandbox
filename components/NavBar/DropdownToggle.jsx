"use client";

import { useNavDropdown } from "./NavDropdownContext";
import styles from "./NavBar.module.css";

export default function DropdownToggle({ name, children }) {
    const { openDropdown, toggleDropdown } = useNavDropdown();

    const isOpen = openDropdown === name;

    return (
        <li
            className={
                isOpen ? `${styles.dropdown} ${styles.active}` : styles.dropdown
            }
            onClick={() => toggleDropdown(name)}
        >
            {children}
        </li>
    );
}
