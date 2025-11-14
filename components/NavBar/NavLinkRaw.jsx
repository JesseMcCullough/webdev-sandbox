"use client";

import styles from "./NavBar.module.css";
import React from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";

export default function NavLinkRaw({ name, href = "", links = [] }) {
    const isMobile = useIsMobile();
    const currentPath = usePathname();
    const isDropdown = links && links.length > 0;
    const isActive = currentPath === href;

    useEffect(() => {
        closeDropdowns();
    }, [isMobile]);

    function handleShowDropdown(e, isDropdown) {
        if (!isMobile || !isDropdown) return;

        e.preventDefault();

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

    return (
        <li>
            <Link
                href={isDropdown && isMobile ? "" : href}
                className={isActive ? styles.active : ""}
                onClick={(e) => handleShowDropdown(e, isDropdown)}
            >
                {name}
                {isDropdown && (
                    <div className={styles["dropdown-icon"]}>
                        <div className={styles.left}></div>
                        <div className={styles.right}></div>
                    </div>
                )}
            </Link>
            {isDropdown && (
                <ul>
                    <div>{links}</div>
                </ul>
            )}
        </li>
    );
}
