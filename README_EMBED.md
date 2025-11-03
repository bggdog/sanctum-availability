# Spark Map Coverage - Webflow Embed Version

This project has been configured to work as an **embeddable widget** for Webflow and other websites.

## 📦 What's Included

This setup allows you to:
- ✅ Embed the entire map coverage tool in any Webflow page
- ✅ Use a simple script tag and div element
- ✅ Host the files on any CDN or static hosting
- ✅ Maintain all functionality of the original app
- ✅ Prevent CSS conflicts with your Webflow site

## 🚀 Quick Start

**1. Build the widget:**
```bash
npm run build:embed
```

**2. Upload `dist-embed` folder contents to your hosting**

**3. Add to Webflow:**
```html
<div id="spark-map-widget" style="width: 100%; min-height: 100vh;"></div>
<link rel="stylesheet" href="https://your-cdn.com/spark-map-widget.css">
<script src="https://your-cdn.com/spark-map-widget.js"></script>
```

## 📚 Documentation

- **Quick Start Guide**: `QUICK_START_EMBED.md` - Get up and running in 3 minutes
- **Detailed Guide**: `WEBFLOW_EMBED_GUIDE.md` - Complete embedding instructions
- **Test File**: `test-embed.html` - Test the widget locally before deploying

## 🛠️ Available Scripts

### Development
```bash
npm run dev              # Run the full app in dev mode
```

### Building
```bash
npm run build:embed      # Build embeddable widget (creates dist-embed/)
npm run build            # Build full standalone app (creates dist/)
npm run build:webflow    # Build for Devlinks deployment
```

### Preview
```bash
npm run preview:embed    # Preview the embed build locally
npm run preview          # Preview the full app build
```

## 📁 Project Structure

```
.
├── src/
│   ├── embed.tsx           # Widget entry point
│   ├── AppEmbed.tsx        # Simplified app (no routing)
│   ├── index-embed.css     # Scoped styles for embedding
│   └── ...
├── dist-embed/             # Built widget files (after build:embed)
│   ├── spark-map-widget.js
│   ├── spark-map-widget.css
│   └── embed.html
├── vite.config.embed.ts    # Build config for widget
├── embed.html              # Widget HTML template
├── test-embed.html         # Local testing page
└── README_EMBED.md         # This file
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)
1. Drag `dist-embed` folder to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Get your URL instantly
3. Free tier available

### Option 2: Cloudflare Pages
1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Upload `dist-embed` folder
3. Free tier with excellent performance

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `cd dist-embed && vercel`
3. Follow prompts

### Option 4: GitHub Pages
1. Create a repository
2. Upload `dist-embed` contents
3. Enable GitHub Pages in settings

### Option 5: Any Static Host
Upload to S3, Google Cloud Storage, or any web server that serves static files.

## 🧪 Testing Locally

Before embedding in Webflow, test locally:

1. Build the widget:
   ```bash
   npm run build:embed
   ```

2. Open `test-embed.html` in your browser to see how it works

3. Verify everything functions correctly

4. Then proceed with hosting and Webflow embedding

## 🎨 Customizing the Container

You can style the widget container to match your Webflow design:

```html
<!-- Minimal height -->
<div id="spark-map-widget" style="min-height: 600px;"></div>

<!-- With max-width and centering -->
<div id="spark-map-widget" style="
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 800px;
"></div>

<!-- With border and shadow -->
<div id="spark-map-widget" style="
  width: 100%;
  min-height: 100vh;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  overflow: hidden;
"></div>
```

## 🔧 Advanced Usage

### Multiple Widgets on Same Page

```html
<!-- First widget -->
<div id="widget-1"></div>

<!-- Second widget -->
<div id="widget-2"></div>

<!-- Load scripts once -->
<link rel="stylesheet" href="https://your-cdn.com/spark-map-widget.css">
<script src="https://your-cdn.com/spark-map-widget.js"></script>

<script>
  window.addEventListener('load', function() {
    window.initSparkMapWidget('widget-1');
    window.initSparkMapWidget('widget-2');
  });
</script>
```

### Custom Initialization

```html
<div id="my-custom-id"></div>

<link rel="stylesheet" href="https://your-cdn.com/spark-map-widget.css">
<script src="https://your-cdn.com/spark-map-widget.js"></script>

<script>
  // Initialize when you want
  document.getElementById('myButton').addEventListener('click', function() {
    window.initSparkMapWidget('my-custom-id');
  });
</script>
```

## 🐛 Troubleshooting

### Widget doesn't appear
1. Open browser DevTools (F12) → Console tab
2. Check for JavaScript errors
3. Verify CSS and JS files load (Network tab)
4. Ensure container has correct `id` attribute
5. Add explicit height: `style="min-height: 600px;"`

### Styles conflict with Webflow
1. The widget uses scoped styles to minimize conflicts
2. Try adding `!important` to critical container styles
3. Ensure CSS loads before JavaScript

### Map tiles don't load
1. Check internet connection
2. Verify no ad blockers blocking map requests
3. Check browser console for CSP errors

### Supabase features not working
- Ensure environment variables are properly configured
- The UI will still work without Supabase

## 📊 Build Output

After running `npm run build:embed`, you get:

- **spark-map-widget.js** (~710 KB, ~215 KB gzipped)
  - Contains all React code, components, and logic
  - Minified and optimized
  
- **spark-map-widget.css** (~79 KB, ~18 KB gzipped)
  - All styles bundled in one file
  - Includes Tailwind and custom CSS
  
- **embed.html** (~0.5 KB)
  - Reference template (not needed for Webflow)

- **assets/** folder
  - Images, fonts, and other static assets
  - Upload this along with JS/CSS

## 🔐 Security Notes

- The widget runs in the context of your Webflow page
- Uses the same origin policy as your site
- No iframes or cross-origin issues
- Supabase credentials should be configured securely

## 📄 License

Same license as the original project.

## 💡 Support

For issues or questions:
1. Check `WEBFLOW_EMBED_GUIDE.md` for detailed instructions
2. Review `test-embed.html` for working example
3. Check browser console for error messages

---

**Ready to embed?** → See `QUICK_START_EMBED.md` for 3-minute setup guide!

