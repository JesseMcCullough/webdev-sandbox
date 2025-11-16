"use client";

import { NavDropdownProvider } from "./NavDropdownContext";
import styles from "./NavBar.module.css";

export default function NavLinks({ children }) {
    return (
        <NavDropdownProvider>
            <ul id="nav-links" className={styles.navLinks}>
                <div className={styles["nav-links-wrapper"]}>{children}</div>
            </ul>
        </NavDropdownProvider>
    );
}
