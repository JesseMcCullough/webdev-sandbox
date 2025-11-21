"use client";

import { usePathname } from "next/navigation";

export default function ActiveListItem({ href, children }) {
    const currentPath = usePathname();
    const isActive = currentPath === href;

    return <li className={isActive ? "active" : ""}>{children}</li>;
}
