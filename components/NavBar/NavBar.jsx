import "./NavBar.css";
import React from "react";
import MobileMenuButton from "./MobileMenuButton";
import DropdownToggle from "./DropdownToggle";
import ActiveListItem from "./ActiveListItem";
import NavLinks from "./NavLinks";
import themeToCssVars from "@/utils/themeToCssVars";
import defaultTheme from "./navbar.config.json";

/**
 * Navigation bar for displaying the site logo, links, dropdown menus, and action links.
 *
 * Use "logo" className for your provided logo image.
 *
 * @example
 * <NavBar>
 *     <img className="logo" ... />
 *     <NavBar.Links>
 *         <a href="#">Link-1</a>
 *         <NavBar.DropdownMenu name="Link-2">
 *             <a href="#">DropdownLink-1</a>
 *             <a href="#">DropdownLink-2</a>
 *         </NavBar.DropdownMenu>
 *     </NavBar.Links>
 *     <NavBar.Actions>
 *            <a href="#">ActionLink-1</a>
 *            <a href="#" className="button primary">ActionLink-2</a>
 *     </NavBar.Actions>
 * </NavBar>
 *
 * @param {Object} [props.theme] navbar.config.js theme file
 * @param {React.ReactNode} props.children logo image (use "logo" className), {@link NavLinks}, and {@link NavActions}
 * @returns {JSX.Element} NavBar
 */
export function NavBar({ theme = defaultTheme, children }) {
    // potential bug: container should probably be defined within NavBar.css
    // and not just expect one in a global css file.
    return (
        <div
            className={theme.float.enable ? "nav float" : "nav"}
            id="navbar"
            style={themeToCssVars(theme)}
        >
            <div className="container">
                {children}
                <MobileMenuButton navId="navbar" />
            </div>
        </div>
    );
}
NavBar.Links = NavLinks;
NavBar.DropdownMenu = NavDropdownMenu;
NavBar.Actions = NavActions;

export { default as NavLinks } from "./NavLinks";

/**
 * Dropdown menu for {@link NavLinks}.
 *
 * @example
 * <NavBar.Links>
 *     <NavBar.DropdownMenu name="Link-2">
 *         <a href="#">DropdownLink-1</a>
 *         <a href="#">DropdownLink-2</a>
 *     </NavBar.DropdownMenu>
 * </NavBar.Links>
 *
 * @param {string} name Dropdown menu name
 * @param {React.ReactNode} props.children Navigation links (ultimately an a tag with the href attribute)
 * @returns {JSX.Element} Dropdown menu
 */
export function NavDropdownMenu({ name, children }) {
    return (
        <DropdownToggle name={name}>
            <div className="dropdown-name-container">
                <span className="dropdown-name">{name}</span>
                <div className="dropdown-icon">
                    <div className="left"></div>
                    <div className="right"></div>
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

/**
 * Navigation actions, such as login, sign up, any call-to-action, etc.
 *
 * @param {React.ReactNode} props.children Action links (ultimately an a tag with the href attribute)
 * @returns {JSX.Element} NavActions
 */
export function NavActions({ children }) {
    return <div className="actions">{children}</div>;
}
