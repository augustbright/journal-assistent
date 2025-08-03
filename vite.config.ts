import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === "production" ? "/journal-assistent/" : "/",
    build: {
        outDir: "docs",
    },
    plugins: [
        react(),
        VitePWA({
            registerType: "prompt",
            injectRegister: false,

            pwaAssets: {
                disabled: false,
                config: true,
            },

            manifest: {
                name: "Journal Assistant",
                short_name: "Journal",
                description: "A Progressive Web App for journal management",
                theme_color: "#2196F3",
                background_color: "#ffffff",
                display: "standalone",
                scope: "/journal-assistent/",
                start_url: "/journal-assistent/",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },

            workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
                cleanupOutdatedCaches: true,
                clientsClaim: true,
                navigateFallback: "/journal-assistent/index.html",
                swDest: "docs/sw.js",
            },

            devOptions: {
                enabled: false,
                navigateFallback: "index.html",
                suppressWarnings: true,
                type: "module",
            },
        }),
    ],
});
