import styles from "./NavBar.module.css";
import Image from "next/image";
import React from "react";
import MobileMenuButton from "./MobileMenuButton";

export function NavBar({ children }) {
    let logo = null;
    let links = [];
    let buttons = [];

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.type == NavLink) {
            links.push(child);
        } else if (child.type == NavLogo) {
            logo = child;
        } else if (child.type == NavButton) {
            buttons.push(child);
        }
    });

    return (
        <div className={styles.nav} id="navbar">
            <div className={styles.background}></div>
            <div className={`${styles.container} container`}>
                {logo}
                <ul id="nav-links">{links}</ul>
                <div className={styles["button-links"]}>{buttons}</div>
                <MobileMenuButton linksUlId={"nav-links"} navId="navbar" />
            </div>
        </div>
    );
}

export function NavLink({ name, href }) {
    return (
        <li>
            <a href={href}>{name}</a>
        </li>
    );
}

export function NavLogo({ image }) {
    return <Image className={styles.logo} src={image} alt="" />;
}

export function NavButton({ name, href, primary = true }) {
    return (
        <a href={href} className={primary ? styles.cta : styles.login}>
            {name}
        </a>
    );
}
