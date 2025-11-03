# Quick Start: Embed in Webflow

## 🚀 3-Minute Setup

### Step 1: Build the Widget (30 seconds)

```bash
npm run build:embed
```

This creates a `dist-embed` folder with:
- `spark-map-widget.js` (your widget code)
- `spark-map-widget.css` (your widget styles)

### Step 2: Upload to Hosting (1-2 minutes)

**Easiest Option - Use Netlify Drop:**

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `dist-embed` folder onto the page
3. Wait for upload to complete
4. Copy the URL provided (e.g., `https://sparkly-name-123456.netlify.app/`)

**Alternative Options:**
- Cloudflare Pages (drag & drop)
- Vercel (drag & drop)
- GitHub Pages
- Any web host

### Step 3: Add to Webflow (1 minute)

1. In Webflow Designer, drag an **Embed** element where you want the widget
2. Paste this code (replace `YOUR-URL-HERE` with your Netlify URL):

```html
<div id="spark-map-widget" style="width: 100%; min-height: 100vh;"></div>
<link rel="stylesheet" href="https://YOUR-URL-HERE/spark-map-widget.css">
<script src="https://YOUR-URL-HERE/spark-map-widget.js"></script>
```

3. Publish your Webflow site!

## ✅ Done!

Your widget should now appear on your Webflow page.

---

## 🎨 Customization

### Change Widget Height

```html
<div id="spark-map-widget" style="width: 100%; min-height: 600px;"></div>
```

### Add Border/Shadow

```html
<div 
  id="spark-map-widget" 
  style="
    width: 100%; 
    min-height: 800px;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    overflow: hidden;
  "
></div>
```

### Center with Max Width

```html
<div 
  id="spark-map-widget" 
  style="
    width: 100%; 
    max-width: 1200px;
    min-height: 800px;
    margin: 0 auto;
  "
></div>
```

---

## 🐛 Troubleshooting

**Widget doesn't show?**
1. Press F12, check Console tab for errors
2. Verify your URLs are correct
3. Make sure the div has `id="spark-map-widget"`

**Styles look weird?**
- Add `!important` to your container styles
- Check that CSS loads before JS

**Need help?**
- See full guide: `WEBFLOW_EMBED_GUIDE.md`
- Test locally first: Open `test-embed.html` in a browser

---

## 📝 Example: Full Embed Code

```html
<!-- Paste this into a Webflow Embed element -->
<div 
  id="spark-map-widget" 
  style="
    width: 100%;
    min-height: 100vh;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  "
></div>

<link rel="stylesheet" href="https://your-netlify-url.netlify.app/spark-map-widget.css">
<script src="https://your-netlify-url.netlify.app/spark-map-widget.js"></script>
```

That's it! 🎉

