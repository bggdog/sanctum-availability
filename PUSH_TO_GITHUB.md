# Push Changes to GitHub

Your GitHub repo is already set up at: `https://github.com/bggdog/sanctum-availability.git`

## Push Your Latest Changes

Run these commands to push all your changes:

```bash
cd /Users/bransongurley/Downloads/spark-map-coverage-main
git add .
git commit -m "Add status-based availability system with Yellow support"
git push origin main
```

GitHub may ask you to authenticate when you run `git push`.

---

## Then Deploy to Vercel

Once pushed to GitHub:

1. Go to https://vercel.com/new
2. Import the repository `bggdog/sanctum-availability`
3. Add environment variables:
   - `VITE_SUPABASE_URL` = `https://zpkhfwwaintjrldrkcqj.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpwa2hmd3dhaW50anJsZHJrY3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNjQzNDcsImV4cCI6MjA3Nzc0MDM0N30.hsvePNYjyhi19vbSwTLDdv5g5guWK-gsVles6OvlKb0`
4. Click "Deploy"

Done! 🎉

