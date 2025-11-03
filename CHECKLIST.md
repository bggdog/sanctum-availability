# ✅ Webflow Embed Checklist

Follow this checklist to embed your widget in Webflow.

---

## 📦 Step 1: Build the Widget

- [ ] Open terminal in project folder
- [ ] Run: `npm run build:embed`
- [ ] Confirm `dist-embed` folder was created
- [ ] Check that `spark-map-widget.js` and `spark-map-widget.css` exist

---

## 🌐 Step 2: Upload to Hosting

Choose one hosting option:

### Option A: Netlify Drop (Easiest)
- [ ] Go to https://app.netlify.com/drop
- [ ] Drag entire `dist-embed` folder onto page
- [ ] Wait for upload to complete
- [ ] Copy the URL (e.g., `https://amazing-name-123.netlify.app`)
- [ ] Test URL by opening it in browser

### Option B: Other Hosting
- [ ] Upload `dist-embed` contents to your host
- [ ] Get the base URL
- [ ] Test that files are accessible

---

## 🎨 Step 3: Add to Webflow

- [ ] Open Webflow project in Designer
- [ ] Navigate to the page where you want the widget
- [ ] Drag an **Embed** element onto the page
- [ ] Open `EMBED_CODE.html` from this project
- [ ] Copy the code between the dashed lines
- [ ] Paste into Webflow Embed element
- [ ] Replace `YOUR-CDN-URL-HERE` with your URL from Step 2
- [ ] Save the embed

---

## 🧪 Step 4: Test

- [ ] Click **Preview** in Webflow
- [ ] Verify the widget appears
- [ ] Test the zip code search
- [ ] Check if map displays correctly
- [ ] Test on mobile view
- [ ] Fix any styling issues if needed

---

## 🚀 Step 5: Publish

- [ ] Click **Publish** in Webflow
- [ ] Visit your live site
- [ ] Verify widget works on production
- [ ] Test from different browsers (Chrome, Safari, Firefox)
- [ ] Test on different devices (desktop, tablet, mobile)

---

## ✨ Optional: Customization

- [ ] Adjust container height/width in embed code
- [ ] Add border-radius for rounded corners
- [ ] Add box-shadow for depth
- [ ] Match colors with your site theme
- [ ] Adjust spacing/margins

---

## 🐛 Troubleshooting (If Needed)

If widget doesn't appear:
- [ ] Press F12 to open browser console
- [ ] Check for JavaScript errors
- [ ] Verify CSS and JS file URLs load (Network tab)
- [ ] Confirm div has correct id: `spark-map-widget`
- [ ] Try adding explicit height: `style="min-height: 800px"`

If styles look wrong:
- [ ] Ensure CSS file loads before JS file
- [ ] Try adding `!important` to container styles
- [ ] Check for CSS conflicts in console

---

## 📋 Quick Reference

**Your embed code should look like:**
```html
<div id="spark-map-widget" style="width: 100%; min-height: 100vh;"></div>
<link rel="stylesheet" href="https://YOUR-URL/spark-map-widget.css">
<script src="https://YOUR-URL/spark-map-widget.js"></script>
```

**Replace:**
- `YOUR-URL` → Your hosting URL from Step 2

---

## 🎉 You're Done!

Once all checkboxes are complete, your widget is live on Webflow!

**Need help?** Check these docs:
- `START_HERE.md` - Quick start guide
- `WEBFLOW_EMBED_GUIDE.md` - Detailed guide
- `QUICK_START_EMBED.md` - Alternative quick start

---

**Last Updated:** After running `npm run build:embed`

