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

    function handleShowDropdown(e) {
        if (!isMobile) return;

        const isClickDropdownIcon =
            e.target.closest(`.${styles["dropdown-icon"]}`) !== null;

        if (!isClickDropdownIcon) return;

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
                href={href}
                className={isActive ? styles.active : ""}
                onClick={(e) => handleShowDropdown(e)}
            >
                <span className={styles["link-name"]}>{name}</span>
                {isDropdown && (
                    <svg
                        className={styles["dropdown-icon"]}
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#e3e3e3"
                    >
                        <path d="M480-345 240-585l56-56 184 183 184-183 56 56-240 240Z" />
                    </svg>
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
