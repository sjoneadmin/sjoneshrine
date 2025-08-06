#!/bin/bash

echo "🚀 Deploying React Donations Tracker to GitHub Pages..."
echo "📍 Repository: https://github.com/sjoneadmin/sjoneshrine.git"
echo "🌐 Will be live at: https://sjoneadmin.github.io/sjoneshrine/"

# Build the React app
echo "📦 Building React application..."
cd /app/frontend
yarn build

# Create deployment directory
mkdir -p /tmp/gh-pages-deploy
cp -r build/* /tmp/gh-pages-deploy/
cd /tmp/gh-pages-deploy

# Initialize git and deploy
git init
git remote add origin https://github.com/sjoneadmin/sjoneshrine.git
git checkout -b gh-pages
git add .
git commit -m "Deploy React donations tracker with $5,750 fix

✅ Fixed donations tracker to show correct amount
✅ React app now displays $100K goal with 5.8% progress  
✅ Updated localStorage.js currentAmount from 500 to 5750"

echo "📤 Files are ready to push to gh-pages branch"
echo ""
echo "🎯 NEXT STEPS:"
echo "1. Use Emergent's 'Save to GitHub' button to push these changes"
echo "2. Your donations tracker will be live at:"
echo "   https://sjoneadmin.github.io/sjoneshrine/"
echo "3. Wait 5-10 minutes for GitHub Pages to build"
echo ""
echo "💰 VERIFICATION - Check that your live site shows:"
echo "   ✅ $5,750 current amount (not $500)"  
echo "   ✅ $100,000 goal"
echo "   ✅ 5.8% progress"

ls -la