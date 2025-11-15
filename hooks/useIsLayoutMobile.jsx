"use client";

import { useEffect, useState } from "react";

export default function useIsLayoutMobile(breakpoint = 1024) {
    const [isLayoutMobile, setIsLayoutMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${breakpoint}px)`);

        const handleChange = (e) => setIsLayoutMobile(e.matches);

        handleChange(media);

        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, [breakpoint]);

    return isLayoutMobile;
}
