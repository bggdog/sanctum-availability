# Webflow/Devlinks Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Set these in your Webflow project settings or Devlinks configuration:

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### 2. Build Configuration
The project is optimized for Webflow integration with:
- ✅ Optimized chunk splitting for better caching
- ✅ Consistent asset naming for Webflow compatibility
- ✅ CSS extraction for proper styling
- ✅ Minified production build
- ✅ Relative base path for deployment

### 3. Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# The built files will be in the `dist` folder
```

### 4. Devlinks Integration Steps

1. **Build the project**: Run `npm run build`
2. **Upload to Devlinks**: Use the generated `dist` folder contents
3. **Configure environment variables** in Devlinks dashboard
4. **Test the integration** in Webflow preview mode

### 5. Key Files for Webflow Integration

- `dist/index.html` - Main entry point
- `dist/assets/` - All JavaScript and CSS assets
- `dist/assets/index-[hash].js` - Main application bundle
- `dist/assets/index-[hash].css` - Main stylesheet

### 6. Supabase Configuration

Ensure your Supabase project has:
- ✅ Row Level Security (RLS) enabled
- ✅ Public read access policy for `zip_code_services` table
- ✅ CORS configured for your Webflow domain

### 7. Testing Checklist

- [ ] Map loads correctly
- [ ] Zip code search works
- [ ] Service indicators display properly
- [ ] Green highlight appears for searched zip codes
- [ ] All animations work smoothly
- [ ] Responsive design functions on mobile

### 8. Performance Optimizations

The build includes:
- Code splitting for better loading performance
- Optimized bundle sizes
- Proper asset caching headers
- Minified production code

### 9. Troubleshooting

If you encounter issues:
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Ensure Supabase CORS is configured for your domain
4. Test with a simple zip code like "76054"

### 10. Support

For Devlinks-specific issues, refer to their documentation or support channels.

