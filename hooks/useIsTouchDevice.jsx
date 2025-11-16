"use client";

import { useEffect, useState } from "react";

export default function useIsTouchDevice() {
    const [isTouchDevice, setisTouchDevice] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(`(hover: none) and (pointer: coarse)`);

        const handleChange = (e) => setisTouchDevice(e.matches);

        handleChange(media);

        media.addEventListener("change", handleChange);

        return () => media.removeEventListener("change", handleChange);
    }, []);

    return isTouchDevice;
}
