#!/bin/bash

# Build script for Journal Assistant PWA
echo "🚀 Starting build process..."

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo "🌐 You can now push the dist folder to your gh-pages branch"
    echo "📱 PWA features are enabled - users can install the app!"
else
    echo "❌ Build failed!"
    exit 1
fi 