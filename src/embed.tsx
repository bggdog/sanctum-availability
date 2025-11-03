import { createRoot } from "react-dom/client";
import AppEmbed from "./AppEmbed.tsx";
import "./index-embed.css";

// Global initialization function for embedding
declare global {
  interface Window {
    initSparkMapWidget: (containerId: string) => void;
  }
}

window.initSparkMapWidget = (containerId: string = "spark-map-widget") => {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Spark Map Widget: Container with id "${containerId}" not found`);
    return;
  }

  // Clear any existing content
  container.innerHTML = '';
  
  // Create root and render
  const root = createRoot(container);
  root.render(<AppEmbed />);
  
  console.log("Spark Map Widget initialized successfully");
};

// Auto-initialize if a container exists on page load
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (document.getElementById('spark-map-widget')) {
        window.initSparkMapWidget('spark-map-widget');
      }
    });
  } else {
    // DOM is already ready
    if (document.getElementById('spark-map-widget')) {
      window.initSparkMapWidget('spark-map-widget');
    }
  }
}

