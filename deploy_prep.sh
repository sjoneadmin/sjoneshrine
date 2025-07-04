#!/bin/bash

# Deployment preparation script for Sjòne Shrine Donations Tracker
# This script helps prepare the files for GitHub Pages deployment

echo "🚀 Preparing Sjòne Shrine Donations Tracker for GitHub Pages deployment..."

# Navigate to frontend directory
cd /app/frontend

# Build the application
echo "📦 Building the application..."
yarn build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo ""
    echo "📁 Built files are located in: /app/frontend/build/"
    echo ""
    echo "Next steps:"
    echo "1. Copy all files from /app/frontend/build/ to your local machine"
    echo "2. In your sjoneshrine.github.io repository, create/navigate to the 'donations' folder"
    echo "3. Copy all the built files into the 'donations' folder"
    echo "4. Commit and push the changes"
    echo "5. Wait 5-10 minutes and visit https://sjoneshrine.org/donations"
    echo ""
    echo "📖 For detailed instructions, see: /app/DEPLOYMENT_GUIDE.md"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi