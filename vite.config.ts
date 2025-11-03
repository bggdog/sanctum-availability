import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize for Webflow/Devlinks integration
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Disable sourcemaps for production
    minify: "terser",
    rollupOptions: {
      output: {
        // Ensure consistent chunk naming for Webflow
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
        // Optimize chunk splitting for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-popover'],
          map: ['leaflet'],
          motion: ['framer-motion'],
          supabase: ['@supabase/supabase-js']
        }
      }
    },
    // Ensure CSS is properly extracted
    cssCodeSplit: true,
    // Optimize bundle size
    chunkSizeWarningLimit: 1000
  },
  // Ensure proper base path for deployment
  base: mode === "production" ? "./" : "/",
}));
