# GitHub Pages Deployment Guide

## Quick Start

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/advent.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository → **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Update the base path** (if needed):
   - Open `vite.config.js`
   - If your repository is NOT named `advent`, update the base path:
     ```js
     base: process.env.GITHUB_PAGES === 'true' ? '/your-repo-name/' : '/',
     ```

4. **Push again** to trigger the deployment:
   ```bash
   git push
   ```

5. **Check deployment status**:
   - Go to the **Actions** tab in your repository
   - Wait for the workflow to complete (usually 1-2 minutes)
   - Your site will be live at: `https://YOUR_USERNAME.github.io/advent/`

## Troubleshooting

### Site shows 404 or blank page
- Check that the base path in `vite.config.js` matches your repository name
- Ensure GitHub Pages is set to use **GitHub Actions** as the source
- Check the Actions tab for any build errors

### Assets not loading
- Verify the base path includes the trailing slash: `/advent/` not `/advent`
- Clear your browser cache and try again

### Custom Domain
If you're using a custom domain, change the base path to:
```js
base: '/',
```

