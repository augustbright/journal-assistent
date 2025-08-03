# Deployment Guide for Journal Assistant PWA

This guide will help you deploy your PWA to GitHub Pages.

## Prerequisites

- A GitHub account
- Your repository pushed to GitHub
- Node.js 18+ installed locally

## Quick Start

### 1. Build Locally

Build your project locally:

```bash
# Build the project
npm run build

# Or use the build script
./deploy.sh
```

This will generate the production files in the `docs/` directory.

### 2. Deploy to GitHub Pages

#### Option A: Direct Deployment from Main Branch

1. Build and commit the docs folder:
```bash
npm run build
git add docs/
git commit -m "Deploy PWA to GitHub Pages"
git push origin main
```

#### Option B: GitHub Pages Settings

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Select the `main` branch and `/docs` folder
5. Click "Save"

### 3. Verify Deployment

1. Wait a few minutes for the deployment to complete
2. Visit `https://yourusername.github.io/journal-assistent/`
3. Check that your PWA is working correctly

## PWA Features

Once deployed, your app will have these PWA features:

### Installation

- **Desktop**: Look for the install button in the browser address bar
- **Mobile**: Use "Add to Home Screen" from the browser menu
- **iOS**: Use "Add to Home Screen" from Safari's share menu

### Offline Support

The app includes a service worker that caches resources for offline use.

## Customization

### Update App Information

Edit `vite.config.ts` to customize your PWA:

```typescript
manifest: {
  name: 'Your App Name',
  short_name: 'App',
  description: 'Your app description',
  theme_color: '#your-color',
  // ... other options
}
```

### Change Repository Name

If you change your repository name, update the base URL in `vite.config.ts`:

```typescript
base: process.env.NODE_ENV === 'production' ? '/your-new-repo-name/' : '/',
```

### Add Custom Domain

1. Add your domain to the `cname` field in `.github/workflows/deploy.yml`
2. Configure your domain's DNS to point to `yourusername.github.io`
3. Push the changes to trigger a new deployment

## Troubleshooting

### Common Issues

1. **Build fails in GitHub Actions**
   - Check the Actions tab for error details
   - Ensure all dependencies are in `package.json`

2. **App not loading**
   - Verify the base URL matches your repository name
   - Check that GitHub Pages is enabled

3. **PWA not installable**
   - Ensure HTTPS is enabled (GitHub Pages provides this)
   - Check that the manifest is properly generated

4. **Service worker not working**
   - Clear browser cache
   - Check browser console for errors

### Debug Commands

```bash
# Test build locally
npm run build

# Preview production build
npm run preview

# Check PWA assets
ls dist/

# Validate manifest
cat dist/manifest.webmanifest
```

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Review the browser console for errors
3. Verify all configuration files are correct
4. Ensure your repository name matches the base URL configuration

## Next Steps

After successful deployment:

1. Test the PWA on different devices
2. Verify offline functionality
3. Test the install process
4. Consider adding analytics
5. Set up monitoring for your PWA 