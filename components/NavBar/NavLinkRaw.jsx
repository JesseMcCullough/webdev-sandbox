"use client";

import styles from "./NavBar.module.css";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavLinkRaw({ name, href, links = [] }) {
    const currentPath = usePathname();
    const isDropdown = links && links.length > 0;
    const isActive = currentPath === href;

    return (
        <li>
            <Link
                href={href}
                className={currentPath === href ? styles.active : ""}
            >
                {name}
                {isDropdown && (
                    <div className={styles["dropdown-icon"]}>
                        <div className={styles.left}></div>
                        <div className={styles.right}></div>
                    </div>
                )}
            </Link>
            {isDropdown && <ul>{links}</ul>}
        </li>
    );
}
