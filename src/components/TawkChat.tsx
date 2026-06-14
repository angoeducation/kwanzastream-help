"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tawk_API: any;
    Tawk_LoadStart: Date;
  }
}

export function TawkChat() {
  useEffect(() => {
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    window.Tawk_API.onLoad = function () {
      window.Tawk_API.setAttributes(
        { name: "Visitante Kwanza Stream" },
        function (error: unknown) {},
      );
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6a2dd8c7310c741d42c880af/1jr1hdje5";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.head.appendChild(script);

    return () => {
      const s = document.head.querySelector('script[src*="tawk.to"]');
      if (s) document.head.removeChild(s);
    };
  }, []);

  return null;
}
