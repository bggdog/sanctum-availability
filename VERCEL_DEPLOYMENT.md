# Deploying to Vercel

## Quick Deploy Steps

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project

3. **Configure Environment Variables**:
   In the Vercel project settings, add these environment variables:
   ```
   VITE_SUPABASE_URL=https://zpkhfwwaintjrldrkcqj.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwa2hmd3dhaW50anJsZHJrY3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQzNDcsImV4cCI6MjA3Nzc0MDM0N30.hsvePNYjyhi19vbSwTLDdv5g5guWK-gsVles6OvlKb0
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Add Environment Variables**:
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_PUBLISHABLE_KEY
   ```

5. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## Project Configuration

### Build Settings
Vercel will auto-detect these from your `package.json`:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

These are already configured correctly in your `vite.config.ts`.

---

## Environment Variables to Set

In Vercel Dashboard → Your Project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `VITE_SUPABASE_URL` | `https://zpkhfwwaintjrldrkcqj.supabase.co` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

---

## Post-Deployment Checklist

- [ ] Test zip code search (e.g., "76054")
- [ ] Verify service cards display correctly
- [ ] Test all three status buttons:
  - [ ] Green → Referral Form link works
  - [ ] Yellow → Call button works
  - [ ] Red → Teletherapy link works
- [ ] Check mobile responsiveness
- [ ] Verify map loads correctly
- [ ] Test on different browsers

---

## Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL is automatically configured

---

## Troubleshooting

### Build Fails
- Check that `package.json` has all dependencies
- Verify Node version (Vercel uses Node 18 by default)
- Check build logs in Vercel dashboard

### Environment Variables Not Working
- Make sure variables are set for the correct environment (Production, Preview, Development)
- Redeploy after adding environment variables
- Check variable names start with `VITE_`

### Map Not Loading
- Verify Supabase CORS is configured for your Vercel domain
- Check browser console for errors
- Ensure `VITE_SUPABASE_URL` is correct

### 404 on Refresh
- This is normal for SPA routing
- Vercel will automatically handle this with the `vercel.json` configuration (see below)

---

## Optional: Add vercel.json for SPA Routing

Create a `vercel.json` file in your project root to handle client-side routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This ensures all routes serve `index.html` for React Router to handle.

---

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` automatically deploys to production
- Pull requests get preview deployments
- You can see build status in Vercel dashboard

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- Check Vercel deployment logs for specific errors

