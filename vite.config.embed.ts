import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist-embed",
    assetsDir: "assets",
    sourcemap: false,
    minify: "esbuild",
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "embed.html"),
      },
      output: {
        // Create separate JS and CSS files
        entryFileNames: "spark-map-widget.js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'spark-map-widget.css';
          }
          return 'assets/[name]-[hash][extname]';
        },
        inlineDynamicImports: true,
      },
    },
    chunkSizeWarningLimit: 2000,
  },
  base: "./",
});

