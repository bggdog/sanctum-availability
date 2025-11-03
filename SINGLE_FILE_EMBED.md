# 🎯 Single File Embed for Webflow

Your widget is now built as **ONE single HTML file** with all code, styles, and content embedded!

## ✨ What's Different?

Instead of separate JS and CSS files, you now have:
- ✅ **ONE file**: `dist-embed/embed.html` (788 KB, 233 KB gzipped)
- ✅ All JavaScript code included
- ✅ All CSS styles included
- ✅ Everything self-contained

## 🚀 How to Use in Webflow

### Option 1: Direct Embed (Easiest for Small Sites)

1. **Build the widget:**
   ```bash
   npm run build:embed
   ```

2. **Open the file:**
   - Open `dist-embed/embed.html` in a text editor
   - Copy ALL the contents (Ctrl+A, Ctrl+C)

3. **Paste in Webflow:**
   - Go to Webflow Designer
   - Drag an **Embed** element onto your page
   - Paste the entire file contents
   - Save & Publish!

**Pros:** No hosting needed  
**Cons:** Large embed code (~788 KB)

---

### Option 2: Host the File (Recommended)

1. **Build the widget:**
   ```bash
   npm run build:embed
   ```

2. **Upload `embed.html` to hosting:**
   - **Netlify Drop**: https://app.netlify.com/drop
   - **Cloudflare Pages**
   - **Vercel**
   - **Your own hosting**

3. **Embed with iframe in Webflow:**
   ```html
   <iframe 
     src="https://your-hosting-url.com/embed.html"
     width="100%"
     height="800px"
     frameborder="0"
     style="border: none; border-radius: 8px;"
   ></iframe>
   ```

**Pros:** Faster page load, cacheable  
**Cons:** Requires hosting

---

### Option 3: Webflow Asset Manager (if supported)

1. Upload `embed.html` to Webflow's asset manager
2. Get the URL
3. Use iframe method above with that URL

---

## 📏 Recommended Iframe Settings

```html
<!-- Minimal -->
<iframe 
  src="https://your-url.com/embed.html"
  width="100%"
  height="800px"
  frameborder="0"
></iframe>

<!-- Full-featured with styling -->
<iframe 
  src="https://your-url.com/embed.html"
  width="100%"
  height="100vh"
  frameborder="0"
  scrolling="auto"
  loading="lazy"
  style="
    border: none;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    max-width: 1400px;
    margin: 0 auto;
    display: block;
  "
></iframe>

<!-- Responsive with aspect ratio -->
<div style="position: relative; padding-bottom: 75%; height: 0;">
  <iframe 
    src="https://your-url.com/embed.html"
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    "
  ></iframe>
</div>
```

---

## 🎨 Customization

### Adjust Height
```html
<!-- Fixed height -->
<iframe src="..." height="600px"></iframe>

<!-- Viewport height -->
<iframe src="..." height="100vh"></iframe>

<!-- Minimum height with auto -->
<iframe src="..." style="min-height: 800px; height: auto;"></iframe>
```

### Add Border/Shadow
```html
<iframe 
  src="..."
  style="
    border: 2px solid #e0e0e0;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  "
></iframe>
```

---

## 🔄 Two Embedding Methods Comparison

| Method | File Size | Setup | Best For |
|--------|-----------|-------|----------|
| **Direct Paste** | ~788 KB | Copy/paste entire file | Quick tests, simple sites |
| **Hosted + iframe** | Smaller initial load | Upload file + add iframe | Production, better performance |

---

## 📦 What's in the File?

The `embed.html` file contains:
- ✅ All React code
- ✅ All components (search, map, cards)
- ✅ All Tailwind CSS
- ✅ All UI library styles
- ✅ Framer Motion animations
- ✅ Leaflet map library
- ✅ Auto-initialization code

---

## 🧪 Testing Before Webflow

**Test locally:**
1. Build: `npm run build:embed`
2. Open `dist-embed/embed.html` in a web browser
3. Verify everything works
4. Then deploy to Webflow

**Test with local server:**
```bash
npm run preview:embed
```
Opens at http://localhost:4173

---

## 💡 Pro Tips

1. **Use iframe method** for better performance
2. **Enable lazy loading** on iframe: `loading="lazy"`
3. **Set explicit height** to prevent layout shift
4. **Use responsive container** for mobile
5. **Cache the file** on CDN for faster loads

---

## 🐛 Troubleshooting

### Widget doesn't load
- Check that the URL is accessible (open in new tab)
- Verify iframe src is correct
- Check browser console for errors

### Height too small/big
- Adjust iframe `height` attribute
- Use `min-height` in style
- Try `height="100vh"` for full viewport

### Styles look off
- Clear browser cache
- Rebuild: `npm run build:embed`
- Try incognito/private browsing

---

## 📊 File Size

| Original | Gzipped |
|----------|---------|
| 788 KB | 233 KB |

Modern browsers automatically use gzip, so users download ~233 KB.

---

## ✅ Quick Checklist

- [ ] Run `npm run build:embed`
- [ ] Choose embedding method (direct or hosted)
- [ ] If hosting: upload `embed.html`
- [ ] Add to Webflow (paste code or iframe)
- [ ] Test on live site
- [ ] Check mobile responsiveness
- [ ] Publish!

---

**Need the old method (separate JS/CSS)?** See `WEBFLOW_EMBED_GUIDE.md`

**Questions?** All methods work, choose what's easiest for you!

