"use client";

import { usePathname } from "next/navigation";
import styles from "./NavBar.module.css";

export default function ActiveListItem({ href, children }) {
    const currentPath = usePathname();
    const isActive = currentPath === href;

    return <li className={isActive ? styles.active : ""}>{children}</li>;
}
