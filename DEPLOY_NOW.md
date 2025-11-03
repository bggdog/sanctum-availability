# Deploy Now - Your Next Steps

## Situation
✅ GitHub repo is set up  
✅ Code is committed  
✅ Vercel project is created  
❌ No deployment yet

## Solution: Push to GitHub OR Deploy via CLI

### Option A: Push to GitHub (Recommended)
```bash
cd /Users/bransongurley/Downloads/spark-map-coverage-main
git push origin main
```

Then on Vercel dashboard, click "Redeploy" to trigger a new build.

---

### Option B: Install Vercel CLI and Deploy
```bash
npm i -g vercel
vercel login
cd /Users/bransongurley/Downloads/spark-map-coverage-main
vercel --prod
```

When prompted, add these environment variables:
- `VITE_SUPABASE_URL` = `https://zpkhfwwaintjrldrkcqj.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwa2hmd3dhaW50anJsZHJrY3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQzNDcsImV4cCI6MjA3Nzc0MDM0N30.hsvePNYjyhi19vbSwTLDdv5g5guWK-gsVles6OvlKb0`

---

### Option C: Manually Trigger in Vercel Dashboard

If your repo is already connected to Vercel:

1. Go to https://vercel.com
2. Click on your `sanctum-availability` project
3. Go to **Settings** → **Git**
4. Make sure GitHub repo is connected
5. Go to **Deployments**
6. Click "Redeploy" on the latest deployment OR click "Deploy" if there's a new commit

---

## Important: Add Environment Variables

Before deployment works, make sure to add these in Vercel:

**Settings** → **Environment Variables** → Add:
- `VITE_SUPABASE_URL` = `https://zpkhfwwaintjrldrkcqj.supabase.co`
- `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## After Deployment

Your site will be live at: `https://sanctum-availability.vercel.app`

Test it:
- Enter zip code "76054"
- Check service cards
- Test all three buttons

