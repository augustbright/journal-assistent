# GitHub Actions Workflow

This directory contains the GitHub Actions workflow for automatic deployment to GitHub Pages.

## Workflow: `deploy.yml`

The `deploy.yml` workflow automatically builds and deploys your PWA to GitHub Pages whenever you push to the `main` branch.

### What it does:

1. **Triggers**: Runs on push to `main` branch and pull requests
2. **Environment**: Uses Ubuntu latest with Node.js 18
3. **Steps**:
   - Checkout code
   - Setup Node.js with npm caching
   - Install dependencies
   - Build the project
   - Deploy to GitHub Pages (only on main branch)

### Setup Instructions:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" in the sidebar
   - Set source to "GitHub Actions"

2. **Push to main branch**:
   - The workflow will automatically run
   - Your app will be deployed to `https://yourusername.github.io/journal-assistent/`

### Manual Deployment:

If you prefer manual deployment, you can run:

```bash
npm run deploy
```

This will build the project and deploy it to the `gh-pages` branch.

### Troubleshooting:

- **Build fails**: Check the Actions tab for error details
- **Deployment fails**: Ensure GitHub Pages is enabled in repository settings
- **PWA not working**: Verify the base URL in `vite.config.ts` matches your repository name 