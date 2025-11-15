"use client";

import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import useIsMobile from "@/hooks/useIsMobile";
import usePauseTransition from "@/hooks/usePauseTransition";

export default function MobileMenuButton({ linksUlId, navId }) {
    const isMobile = useIsMobile();
    const [open, setOpen] = useState(false);

    // pauses transitions when view changes from/to mobile
    usePauseTransition(`.${styles.nav} ul li ul`, isMobile);
    usePauseTransition(
        `.${styles.nav} ul li .${styles["dropdown-icon"]}`,
        isMobile
    );

    // applies toggle state
    useEffect(() => {
        const target = document.getElementById(navId);

        if (!target) return;

        target.classList.toggle(styles.active, open);
    }, [open]);

    // close menu when clicking outside or clicking a link
    useEffect(() => {
        function handleClick(e) {
            const nav = document.getElementById(navId);
            const target = e.target;
            const isClickLink = target.closest("a") !== null;
            const isClickInsideNav = nav && nav.contains(target);

            if (isClickInsideNav && !isClickLink) return;

            setOpen(false);
        }

        if (open) {
            document.addEventListener("click", handleClick);
        } else {
            document.removeEventListener("click", handleClick);
        }

        return () => document.removeEventListener("click", handleClick);
    }, [open]);

    return (
        <div
            className={styles["mobile-menu-icon"]}
            onClick={() => setOpen(!open)}
        >
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
        </div>
    );
}
