# Webflow Embed Guide

This guide explains how to embed the Spark Map Coverage widget into your Webflow website.

## Step 1: Build the Embed Widget

Run the following command to create the embeddable version:

```bash
npm run build:embed
```

This will create a `dist-embed` folder with the following files:
- `spark-map-widget.js` - The main JavaScript bundle
- `spark-map-widget.css` - All styles for the widget
- Other asset files (images, fonts, etc.)

## Step 2: Upload Files to Hosting

You need to host the widget files somewhere accessible via HTTPS. You have several options:

### Option A: Webflow Asset Manager (Recommended for small files)
1. Go to your Webflow project settings
2. Navigate to the Asset Manager
3. Upload `spark-map-widget.js` and `spark-map-widget.css`
4. Copy the URLs provided by Webflow

### Option B: CDN or Cloud Storage (Recommended)
Upload all files from `dist-embed` to:
- **Cloudflare Pages** (free, easy setup)
- **Netlify** (free tier available)
- **Vercel** (free tier available)
- **AWS S3 + CloudFront**
- **Google Cloud Storage**
- **Any other CDN or web hosting**

Make note of the base URL where the files are hosted (e.g., `https://your-cdn.com/spark-widget/`)

## Step 3: Add to Webflow

### Method 1: Embed in a Specific Page

1. Open your Webflow page in the Designer
2. Drag a **Custom Code** element (from Add panel > Components > Custom Code) or an **Embed** element onto your page where you want the widget
3. Add the following code:

```html
<!-- Container for the widget -->
<div id="spark-map-widget" style="width: 100%; min-height: 100vh;"></div>

<!-- Widget CSS -->
<link rel="stylesheet" href="https://YOUR-CDN-URL/spark-map-widget.css">

<!-- Widget JavaScript -->
<script src="https://YOUR-CDN-URL/spark-map-widget.js"></script>
```

**Important:** Replace `https://YOUR-CDN-URL/` with your actual file hosting URL.

### Method 2: Add to Site-Wide Custom Code (Header/Footer)

If you want the widget available on multiple pages:

1. Go to Project Settings > Custom Code
2. In the **Footer Code** section, add:

```html
<!-- Widget CSS -->
<link rel="stylesheet" href="https://YOUR-CDN-URL/spark-map-widget.css">

<!-- Widget JavaScript -->
<script src="https://YOUR-CDN-URL/spark-map-widget.js"></script>
```

3. On each page where you want the widget, add an Embed or HTML element with:

```html
<div id="spark-map-widget" style="width: 100%; min-height: 100vh;"></div>
```

## Step 4: Styling the Container

You can customize the container div to fit your design:

```html
<div 
  id="spark-map-widget" 
  style="
    width: 100%; 
    min-height: 800px; 
    max-width: 1400px; 
    margin: 0 auto;
  "
></div>
```

Or use Webflow's style panel if you wrap it in a container:

```html
<div class="widget-container">
  <div id="spark-map-widget"></div>
</div>
```

Then style `.widget-container` in Webflow Designer.

## Advanced: Manual Initialization

If you need more control over when the widget initializes:

```html
<div id="my-custom-widget-container"></div>

<link rel="stylesheet" href="https://YOUR-CDN-URL/spark-map-widget.css">
<script src="https://YOUR-CDN-URL/spark-map-widget.js"></script>

<script>
  // Initialize with custom container ID
  window.addEventListener('load', function() {
    if (window.initSparkMapWidget) {
      window.initSparkMapWidget('my-custom-widget-container');
    }
  });
</script>
```

## Troubleshooting

### Widget doesn't appear
1. Check browser console for errors (F12 > Console)
2. Verify the CSS and JS file URLs are accessible (open them in a new tab)
3. Ensure the container div has the correct ID: `spark-map-widget`
4. Check that the div has height (add `min-height: 600px` to the style)

### Styles look wrong
1. Make sure the CSS file is loaded before the JS file
2. Check for CSS conflicts with your Webflow theme
3. Try adding `!important` to critical container styles:
   ```html
   <div id="spark-map-widget" style="width: 100% !important; min-height: 100vh !important;"></div>
   ```

### Map not showing
1. The widget requires internet connection to load map tiles
2. Check if there are any CSP (Content Security Policy) restrictions
3. Verify that third-party scripts are allowed in your Webflow project

### Console errors about Supabase
1. Make sure your Supabase environment variables are properly configured
2. The widget will still work for the UI, but database features may not work without proper Supabase configuration

## Example: Full Embed Code

Here's a complete example ready to paste into Webflow:

```html
<!-- Spark Map Coverage Widget -->
<div 
  id="spark-map-widget" 
  style="
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  "
></div>

<link rel="stylesheet" href="https://YOUR-CDN-URL/spark-map-widget.css">
<script src="https://YOUR-CDN-URL/spark-map-widget.js"></script>
```

## Need Help?

If you encounter issues:
1. Check the browser console for error messages
2. Verify all file URLs are correct and accessible
3. Test the widget in a simple HTML file first before embedding in Webflow
4. Make sure you're using HTTPS URLs for all resources

## Testing Locally

To test the embed before uploading:

1. Build the embed: `npm run build:embed`
2. Preview it: `npm run preview:embed`
3. Open the provided local URL in your browser
4. Test the widget functionality

Once confirmed working, upload to your hosting and add to Webflow.

