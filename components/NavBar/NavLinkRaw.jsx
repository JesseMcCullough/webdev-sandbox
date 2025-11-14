"use client";

import styles from "./NavBar.module.css";
import React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useIsMobile from "@/hooks/useIsMobile";

export default function NavLinkRaw({ name, href, links = [] }) {
    const isMobile = useIsMobile();
    const [showDropdown, setShowDropdown] = useState(false);
    const currentPath = usePathname();
    const isDropdown = links && links.length > 0;
    const isActive = currentPath === href;

    useEffect(() => {
        setShowDropdown(!isMobile);
    }, [isMobile]);

    return (
        <li>
            <Link href={href} className={isActive ? styles.active : ""}>
                {name}
                {isDropdown && showDropdown && (
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
