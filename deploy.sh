#!/bin/bash

# Lendsqr Frontend Assessment - Deployment Script
# This script prepares and deploys the application

echo "🚀 Starting Lendsqr Frontend Assessment Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run type checking
echo "🔍 Running TypeScript type checking..."
npm run type-check
if [ $? -ne 0 ]; then
    echo "❌ TypeScript errors found. Please fix them before deploying."
    exit 1
fi

# Run linting
echo "🧹 Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
    echo "⚠️  ESLint warnings/errors found. Consider fixing them."
fi

# Build the application
echo "🏗️  Building application..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Check if dist directory was created
if [ ! -d "dist" ]; then
    echo "❌ Build output directory 'dist' not found."
    exit 1
fi

echo "✅ Build successful!"

# Test the build locally
echo "🧪 Testing build locally..."
npm run preview &
PREVIEW_PID=$!

# Wait a moment for the server to start
sleep 3

# Check if the server is running
if curl -f -s http://localhost:4173 > /dev/null; then
    echo "✅ Local preview server is running successfully!"
else
    echo "⚠️  Local preview server might not be running properly."
fi

# Kill the preview server
kill $PREVIEW_PID 2>/dev/null

# Git status check
echo "📋 Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Consider committing them before deployment."
    git status --short
else
    echo "✅ Git working directory is clean."
fi

echo ""
echo "🎉 Deployment preparation complete!"
echo ""
echo "📝 Next steps:"
echo "1. Commit any remaining changes: git add . && git commit -m 'Final deployment'"
echo "2. Push to your repository: git push origin main"
echo "3. Your Render deployment should automatically trigger"
echo "4. Check your deployment at: https://chukwudi-nwafor-lendsqr-fe-test.onrender.com"
echo ""
echo "📊 Build statistics:"
echo "- Build output: $(du -sh dist 2>/dev/null || echo 'N/A')"
echo "- Total files: $(find dist -type f 2>/dev/null | wc -l || echo 'N/A')"
echo ""
echo "🔗 Useful links:"
echo "- Repository: https://github.com/chukwudi34/lendsqr-fe-test"
echo "- Live app: https://chukwudi-nwafor-lendsqr-fe-test.onrender.com"
echo ""
echo "✨ Good luck with your submission!"
