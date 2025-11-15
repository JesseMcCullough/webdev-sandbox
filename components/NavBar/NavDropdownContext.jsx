"use client";

import { createContext, useContext, useState } from "react";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";

const NavDropdownContext = createContext();

export function NavDropdownProvider({ children }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const isTouchDevice = useIsTouchDevice();

    const toggleDropdown = (name) => {
        if (!isTouchDevice) return;

        setOpenDropdown((prev) => (prev === name ? null : name));
    };

    return (
        <NavDropdownContext.Provider value={{ openDropdown, toggleDropdown }}>
            {children}
        </NavDropdownContext.Provider>
    );
}

export function useNavDropdown() {
    return useContext(NavDropdownContext);
}
