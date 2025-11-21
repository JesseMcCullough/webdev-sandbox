import styles from "./NavBar.module.css";
import React from "react";
import MobileMenuButton from "./MobileMenuButton";
import DropdownToggle from "./DropdownToggle";
import ActiveListItem from "./ActiveListItem";
import NavLinks from "./NavLinks";
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
NavBar.Links = NavLinks;
NavBar.DropdownMenu = NavDropdownMenu;
NavBar.Actions = NavActions;
NavBar.getButtonPrimaryClassName = getButtonPrimaryClassName;
NavBar.getLogoClassName = getLogoClassName;

export { default as NavLinks } from "./NavLinks";

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
                <div>
                    {React.Children.map(children, (child) => {
                        if (child.type === "a" || child.props?.href) {
                            return (
                                <ActiveListItem href={child.props.href}>
                                    {child}
                                </ActiveListItem>
                            );
                        }

                        return child;
                    })}
                </div>
            </ul>
        </DropdownToggle>
    );
}

export function NavActions({ children }) {
    return <div className={styles.actions}>{children}</div>;
}

export function getButtonPrimaryClassName() {
    return `${styles["button"]} ${styles["primary"]}`;
}

export function getLogoClassName() {
    return styles["logo"];
}
