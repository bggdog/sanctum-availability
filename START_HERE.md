# 🚀 START HERE - Webflow Embed

Your app is now ready to embed in Webflow as **ONE single HTML file**!

---

## ⚡ 2-Step Process (Super Easy!)

### Step 1️⃣: Build the Widget (30 seconds)

Open your terminal and run:

```bash
npm run build:embed
```

This creates ONE file: `dist-embed/embed.html` with everything included!

---

### Step 2️⃣: Add to Webflow (1 minute)

**Choose ONE method:**

#### Method A: Direct Embed (Simplest - No Hosting Needed!)
1. Open `dist-embed/embed.html` in a text editor
2. Copy ALL the contents (Ctrl+A, Ctrl+C)
3. In Webflow Designer, drag an **Embed** element onto your page
4. Paste the entire file contents
5. **Publish!** 🎉

#### Method B: Host & Use iframe (Better Performance)
1. Upload `embed.html` to Netlify Drop: https://app.netlify.com/drop
2. Copy the URL you get (e.g., `https://your-site.netlify.app/embed.html`)
3. In Webflow, drag an **Embed** element and paste:
   ```html
   <iframe 
     src="https://your-url-here/embed.html"
     width="100%"
     height="800px"
     frameborder="0"
     style="border: none;"
   ></iframe>
   ```
4. **Publish!** 🎉

---

## 📋 Example iframe Code

```html
<!-- Simple iframe embed -->
<iframe 
  src="https://your-hosting-url.com/embed.html"
  width="100%"
  height="800px"
  frameborder="0"
  style="border: none; border-radius: 8px;"
></iframe>
```

---

## 📚 Need More Help?

| Document | What's Inside |
|----------|---------------|
| **SINGLE_FILE_EMBED.md** | Complete guide for single-file embedding ⭐ |
| **WEBFLOW_EMBED_GUIDE.md** | Alternative method (separate JS/CSS files) |
| **QUICK_START_EMBED.md** | Original multi-file guide |
| **WEBFLOW_SUMMARY.md** | Overview of what was created |
| **test-embed.html** | Test the widget locally in a browser |

---

## 🧪 Test Locally First (Optional)

Before deploying, you can test locally:

1. Run `npm run build:embed`
2. Open `dist-embed/embed.html` directly in your web browser
3. Verify everything works
4. Then proceed with Webflow embedding

---

## ✅ What You Get

- ✅ Fully functional map coverage tool
- ✅ Zip code search
- ✅ Interactive map with markers
- ✅ Service cards
- ✅ Smooth animations
- ✅ Mobile responsive
- ✅ Works seamlessly in Webflow

---

## 🎨 Customization

Want to change the iframe appearance?

```html
<!-- With border and shadow -->
<iframe 
  src="https://your-url.com/embed.html"
  width="100%"
  height="800px"
  style="
    border: none;
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
    max-width: 1400px;
    display: block;
    margin: 0 auto;
  "
></iframe>
```

More examples in `SINGLE_FILE_EMBED.md`

---

## 🆘 Troubleshooting

### Widget doesn't appear?
1. Press **F12** to open browser console
2. Check for error messages
3. Verify your CSS and JS URLs are accessible
4. Make sure the div has `id="spark-map-widget"`

### Styles look wrong?
- Ensure CSS file loads **before** the JS file
- Try adding `!important` to your container styles

### Still stuck?
- Check `WEBFLOW_EMBED_GUIDE.md` for detailed troubleshooting
- Test with `test-embed.html` to verify the widget works

---

## 📞 Quick Reference

**Build command:**
```bash
npm run build:embed
```

**Output:**
```
dist-embed/embed.html  (ONE file with everything - 788 KB, 233 KB gzipped)
```

**Embed Options:**
1. Direct paste: Copy entire file contents into Webflow Embed
2. Hosted iframe: Upload file + use iframe in Webflow

---

## 🎯 That's It!

You're all set! The process is:

1. `npm run build:embed` → creates ONE file
2. Choose: Direct paste OR host + iframe
3. Add to Webflow → Publish! 🚀

**It's that simple!** 🎊

---

*For detailed guides, see the other documentation files.*

