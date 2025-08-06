# GitHub Pages Deployment Guide for Sjòne Shrine Donations Tracker

## Overview
This guide will help you deploy the donations tracker application to GitHub Pages at `sjoneshrine.org/donations`.

## Prerequisites
✅ Your application is built and ready for deployment
✅ You have access to the `sjoneshrine.github.io` repository
✅ The application is configured for GitHub Pages subfolder deployment

## Configuration Summary
The following changes have been made to prepare your application for GitHub Pages deployment:

### 1. Router Configuration
- **Changed**: `BrowserRouter` → `HashRouter` for GitHub Pages compatibility
- **Why**: GitHub Pages with subfolders work better with hash-based routing
- **File**: `/app/frontend/src/App.js`

### 2. Build Configuration
- **Homepage**: Set to `"./donations"` in `package.json`
- **Build Output**: Configured for relative paths
- **Scripts**: Updated to use `yarn` instead of `npm`

### 3. Metadata Updates
- **Title**: Updated to "Sjòne Shrine - Donations Tracker"
- **Description**: Updated to donation-specific description
- **File**: `/app/frontend/public/index.html`

### 4. GitHub Pages Optimization
- **Added**: `.nojekyll` file to prevent Jekyll processing
- **Location**: `/app/frontend/public/.nojekyll`

## Deployment Steps

### Step 1: Copy Built Files
1. The built files are located in `/app/frontend/build/`
2. Copy the entire contents of the `build` folder to your local machine

### Step 2: Prepare Your Repository
1. Clone or navigate to your `sjoneshrine.github.io` repository locally
2. Create a `donations` folder in the root if it doesn't exist:
   ```bash
   mkdir donations
   ```

### Step 3: Deploy the Files
1. Copy all files from `/app/frontend/build/` to the `donations` folder in your repository
2. Your repository structure should look like:
   ```
   sjoneshrine.github.io/
   ├── donations/
   │   ├── static/
   │   │   ├── css/
   │   │   └── js/
   │   ├── index.html
   │   ├── .nojekyll
   │   └── [other built files]
   └── [other site files]
   ```

### Step 4: Commit and Push
1. Add all changes to git:
   ```bash
   git add donations/
   git commit -m "Deploy donations tracker application"
   git push origin main
   ```

### Step 5: Verify Deployment
1. Wait 5-10 minutes for GitHub Pages to build
2. Visit `https://sjoneshrine.org/donations`
3. Test the application functionality

## Alternative: Using gh-pages Package (Automated)
If you prefer automated deployment, you can use the gh-pages package:

1. Install gh-pages globally:
   ```bash
   npm install -g gh-pages
   ```

2. From `/app/frontend/`, run:
   ```bash
   yarn deploy
   ```

**Note**: This will deploy to the `gh-pages` branch, not the main branch. You may need to adjust your GitHub Pages settings.

## Troubleshooting

### Common Issues:
1. **404 Error**: Check that files are in the correct `donations` folder
2. **Blank Page**: Ensure `.nojekyll` file is present
3. **Routing Issues**: HashRouter should handle routing correctly with `#` in URLs

### Expected URLs:
- Dashboard: `https://sjoneshrine.org/donations/#/`
- Donation Form: `https://sjoneshrine.org/donations/#/donate`

## Verification Checklist
- [ ] Files copied to `donations/` folder
- [ ] `.nojekyll` file present
- [ ] Changes committed and pushed
- [ ] Site accessible at `https://sjoneshrine.org/donations`
- [ ] Navigation works between pages
- [ ] Donation form functions correctly
- [ ] Progress tracking displays properly

## Support
If you encounter any issues during deployment, please check:
1. GitHub Pages settings in your repository
2. DNS configuration for your custom domain
3. Browser console for any JavaScript errors

The application is now ready for deployment to GitHub Pages!