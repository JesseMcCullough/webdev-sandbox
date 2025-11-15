import styles from "./NavBar.module.css";
import Image from "next/image";
import React from "react";
import MobileMenuButton from "./MobileMenuButton";
import NavLinkRaw from "./NavLinkRaw";
import Link from "next/link";

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
            <div className={`${styles.container} container`}>
                {logo}

                <ul id="nav-links">
                    <div className={styles["nav-links-wrapper"]}>{links}</div>
                </ul>

                <div className={styles["button-links"]}>{buttons}</div>
                <MobileMenuButton linksUlId={"nav-links"} navId="navbar" />
            </div>
        </div>
    );
}

export function NavLink({ name, href, children }) {
    let links = [];

    React.Children.forEach(children, (child) => {
        if (!React.isValidElement(child)) {
            return;
        }

        if (child.type == NavLink) {
            links.push(child);
        }
    });

    return <NavLinkRaw name={name} href={href} links={links} />;
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
