"use client";

import { useEffect, useState } from "react";

export default function useIsMobile(breakpoint = 1024) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const handleChange = (e) => setIsMobile(e.matches);

        handleChange(media);

        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, [breakpoint]);

    return isMobile;
}
