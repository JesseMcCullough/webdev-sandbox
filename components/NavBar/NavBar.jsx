import styles from "./NavBar.module.css";
import Image from "next/image";
import React from "react";
import MobileMenuButton from "./MobileMenuButton";
import DropdownToggle from "./DropdownToggle";
import ActiveNavLink from "./ActiveNavLink";
import Link from "next/link";
import themeToCssVars from "@/utils/themeToCssVars";
import defaultTheme from "./navbar.config.json";

export function NavBar({ theme = defaultTheme, children }) {
    return (
        <div className={styles.nav} id="navbar" style={themeToCssVars(theme)}>
            <div className={`${styles.container} container`}>
                {children}
                <MobileMenuButton navId="navbar" />
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

export { default as NavLinks } from "./NavLinks";

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
        <DropdownToggle name={name}>
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

export function NavActions({ children }) {
    return <div className={styles.actions}>{children}</div>;
}
