"use client";

import { createContext, useContext, useState } from "react";
import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import useIsLayoutMobile from "@/hooks/useIsLayoutMobile";

const NavDropdownContext = createContext();

export function NavDropdownProvider({ children }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const isTouchDevice = useIsTouchDevice();
    const isLayoutMobile = useIsLayoutMobile();

    const toggleDropdown = (name) => {
        if (!isTouchDevice && !isLayoutMobile) return;

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
