"use client";

import { useEffect } from "react";

export default function usePauseTransition(selector, trigger, duration = 200) {
    let timer;

    useEffect(() => {
        if (!selector) return;

        const elements = document.querySelectorAll(selector);

        if (!elements.length) return;

        elements.forEach((el) => el.classList.add("no-transition"));

        timer = setTimeout(() => {
            elements.forEach((el) => el.classList.remove("no-transition"));
        }, duration);

        return () => clearTimeout(timer);
    }, [trigger]);
}
