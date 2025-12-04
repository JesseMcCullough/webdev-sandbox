"use client";

import { useEffect } from "react";

export default function LogOverlay() {
    useEffect(() => {
        const logBox = document.createElement("pre");
        logBox.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      max-height: 40%;
      overflow-y: auto;
      background: rgba(0,0,0,0.8);
      color: #0f0;
      font-size: 12px;
      padding: 10px;
      z-index: 99999;
    `;
        document.body.appendChild(logBox);

        const origLog = console.log;
        console.log = (...args) => {
            origLog.apply(console, args);
            logBox.textContent += args.join(" ") + "\n";
        };
    }, []);

    return null; // no UI element, everything is injected
}
