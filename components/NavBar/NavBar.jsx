import styles from "./NavBar.module.css";
import Image from "next/image";
import React from "react";
import MobileMenuButton from "./MobileMenuButton";
import DropdownToggle from "./DropdownToggle";
import ActiveNavLink from "./ActiveNavLink";
import Link from "next/link";

export function NavBar({ children }) {
    return (
        <div className={styles.nav} id="navbar">
            <div className={`${styles.container} container`}>
                {children}
                <MobileMenuButton linksUlId={"nav-links"} navId="navbar" />
            </div>
        </div>
    );
}

export function NavLink({ name, href }) {
    return (
        <ActiveNavLink href={href}>
            <Link href={href}>
                <span className={styles["link-name"]}>{name}</span>
            </Link>
        </ActiveNavLink>
    );
}

export function NavLinks({ children }) {
    return (
        <ul id="nav-links">
            <div className={styles["nav-links-wrapper"]}>{children}</div>
        </ul>
    );
}

export function NavLogo({ image }) {
    return <Image className={styles.logo} src={image} alt="" />;
}

export function NavButton({ name, href, primary = false }) {
    return (
        <Link href={href} className={primary ? styles.cta : styles.login}>
            {name}
        </Link>
    );
}

export function NavButtons({ children }) {
    return <div className={styles["button-links"]}>{children}</div>;
}

export function NavDropdownMenu({ name, children }) {
    return (
        <DropdownToggle>
            <div className={styles["dropdown-name-container"]}>
                <span className={styles["dropdown-name"]}>{name}</span>
                <div className={styles["dropdown-icon"]}>
                    <div className={styles.left}></div>
                    <div className={styles.right}></div>
                </div>
            </div>

            <ul>
                <div>{children}</div>
            </ul>
        </DropdownToggle>
    );
}
