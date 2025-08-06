#!/bin/bash

# GitHub Pages Deployment Script for React Donations Tracker
# This script builds the React app and prepares it for GitHub Pages deployment

echo "🚀 Starting GitHub Pages deployment process..."

# Step 1: Build the React app
echo "📦 Building React application..."
cd /app/frontend
yarn build

# Step 2: Copy build files to GitHub Pages directory
echo "📁 Copying build files to GitHub Pages repository..."
cd /app
cp -r frontend/build/* sjoneshrine.github.io/

# Step 3: Create .nojekyll file for GitHub Pages
echo "🔧 Creating .nojekyll file..."
touch sjoneshrine.github.io/.nojekyll

# Step 4: Show git status
echo "📊 Git status:"
cd sjoneshrine.github.io
git add .
git status

echo "✅ Build complete! Files are staged and ready for deployment."
echo ""
echo "🎯 NEXT STEPS:"
echo "1. Use the 'Save to GitHub' button in the Emergent interface"
echo "2. Your site will be live at: https://sjoneadmin.github.io/sjoneshrine.github.io/"
echo "3. Wait 5-10 minutes for GitHub Pages to build and deploy"
echo ""
echo "💰 VERIFICATION:"  
echo "- Check that the site shows \$5,750 (not \$500)"
echo "- Verify \$100,000 goal is displayed"
echo "- Confirm 5.8% progress is shown"