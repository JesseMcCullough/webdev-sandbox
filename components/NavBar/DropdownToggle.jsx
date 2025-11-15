"use client";

import { useEffect } from "react";
import styles from "./NavBar.module.css";
import useIsMobile from "@/hooks/useIsMobile";

export default function DropdownToggle({ children }) {
    const isMobile = useIsMobile();

    useEffect(() => {
        closeDropdowns();
    }, [isMobile]);

    function handleShowDropdown(e) {
        if (!isMobile) return;

        const li = e.target.closest("li");

        closeDropdownsExcept(li);

        li.querySelector("ul").classList.toggle(styles["show-dropdown"]);
        li.querySelector(`.${styles["dropdown-icon"]}`).classList.toggle(
            styles.rotate
        );
    }

    function closeDropdownsExcept(ignoredDowndrown) {
        closeDropdowns(ignoredDowndrown);
    }

    function closeDropdowns(ignoredDowndrown = null) {
        document.querySelectorAll(`.${styles.nav} ul li ul`).forEach((ul) => {
            if (ul.closest("li") == ignoredDowndrown) return;
            ul.classList.remove(styles["show-dropdown"]);
            ul.closest("li")
                .querySelector(`.${styles["dropdown-icon"]}`)
                .classList.remove(styles.rotate);
        });
    }

    return <li onClick={(e) => handleShowDropdown(e)}>{children}</li>;
}
