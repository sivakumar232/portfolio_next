"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        oneko?: (catImage: string) => void;
    }
}

const OnekoLoader = () => {
    useEffect(() => {
        const script = document.createElement("script");
        const scriptUrl = '/js/oneko.js';

        script.src = scriptUrl;
        script.async = true;

        script.onload = () => {
            console.log("Oneko script loaded");
            if (typeof window.oneko === "function") {
                const catImage = '/js/oneko.gif';
                window.oneko(catImage);
                console.log("Oneko initialized");
            } else {
                console.error("window.oneko is not a function");
            }
        };

        script.onerror = () => {
            console.error("Failed to load oneko.js");
        };

        document.body.appendChild(script);

        return () => {
            // Clean up: remove the cat and script on unmount
            const neko = document.getElementById("oneko");
            if (neko) neko.remove();
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
        };
    }, []);

    return null;
};

export default OnekoLoader;
