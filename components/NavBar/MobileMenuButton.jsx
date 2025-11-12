"use client";

import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";

export default function MobileMenuButton({ linksUlId, navId }) {
    const [open, setOpen] = useState(false);

    // applies toggle state
    useEffect(() => {
        const target = document.getElementById(linksUlId);

        if (!target) return;

        target.classList.toggle(styles.active, open);
    }, [open]);

    // close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            const nav = document.getElementById(navId);
            if (nav && nav.contains(e.target)) return;

            setOpen(false);
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    // handle resize to prevent transition issues
    useEffect(() => {
        const target = document.getElementById(linksUlId);

        if (!target) return;

        let resizeTimer;

        const handleResize = () => {
            target.classList.add("no-transition");

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                target.classList.remove("no-transition");
            }, 200);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
