"use client";

import { useState, useEffect } from "react";

export default function MobileMenuButton({ navId }) {
    const [open, setOpen] = useState(false);

    // applies toggle state
    useEffect(() => {
        const target = document.getElementById(navId);

        if (!target) return;

        target.classList.toggle("active", open);
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
        <div className="mobile-menu-icon" onClick={() => setOpen(!open)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    );
}
