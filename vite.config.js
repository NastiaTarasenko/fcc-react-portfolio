import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
    // base: '/fcc-react-portfolio/',
    base: "./",
    plugins: [
        react(),
        visualizer({
            filename: `./bundle-reports/stats-${Date.now()}.html`,
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
});
