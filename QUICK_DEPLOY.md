# Quick Deploy to Vercel - 3 Options

## 🚀 Option 1: GitHub + Vercel (Recommended - ~5 minutes)

### 1. Push to GitHub
```bash
cd /Users/bransongurley/Downloads/spark-map-coverage-main
git init
git add .
git commit -m "Spark Map Coverage - Ready for deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repo
4. **Add Environment Variables**:
   - `VITE_SUPABASE_URL` = `https://zpkhfwwaintjrldrkcqj.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwa2hmd3dhaW50anJsZHJrY3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQzNDcsImV4cCI6MjA3Nzc0MDM0N30.hsvePNYjyhi19vbSwTLDdv5g5guWK-gsVles6OvlKb0`
5. Click "Deploy"

**Done!** Your site will be live in ~2 minutes.

---

## ⚡ Option 2: Vercel CLI (Fastest - ~2 minutes)

### Install & Deploy
```bash
npm i -g vercel
vercel login
cd /Users/bransongurley/Downloads/spark-map-coverage-main
vercel
```

When prompted:
- Select default settings
- Add environment variables when asked
- Deploy to production with `vercel --prod`

**Done!**

---

## 🎯 Option 3: Drag & Drop (Easiest - No CLI)

### Build First
```bash
cd /Users/bransongurley/Downloads/spark-map-coverage-main
npm run build
```

### Deploy
1. Go to https://vercel.com/new
2. Scroll down to "Import Third-Party Git Repository"
3. Or go to https://vercel.com/new/project and drag the `dist` folder
4. Or use Vercel's web UI

---

## 🔑 Important Environment Variables

Copy these into Vercel's environment variables:

```
VITE_SUPABASE_URL=https://zpkhfwwaintjrldrkcqj.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwa2hmd3dhaW50anJsZHJrY3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQzNDcsImV4cCI6MjA3Nzc0MDM0N30.hsvePNYjyhi19vbSwTLDdv5g5guWK-gsVles6OvlKb0
```

---

## ✅ After Deployment

Test these features:
1. Enter zip code "76054"
2. Check service cards display
3. Test all three buttons:
   - 🟢 Green: Referral Form link
   - 🟡 Yellow: Call button
   - 🔴 Red: Teletherapy link

---

## 🆘 Quick Fixes

### If map doesn't load:
1. Check Supabase CORS settings allow your domain
2. Verify environment variables are set
3. Check browser console for errors

### If deployment fails:
1. Make sure `node_modules` is not in `.gitignore`
2. Check Node version (needs 18+)
3. Review build logs in Vercel dashboard

---

## 🎉 That's It!

Your interactive therapy coverage map is now live on Vercel!

