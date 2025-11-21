import { NavDropdownProvider } from "./NavDropdownContext";
import ActiveListItem from "./ActiveListItem";
import React from "react";

export default function NavLinks({ children }) {
    return (
        <NavDropdownProvider>
            <ul id="nav-links" className="nav-links">
                <div className="nav-links-wrapper">
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
        </NavDropdownProvider>
    );
}
