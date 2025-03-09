#!/bin/bash

# Frontend Deployment Script
# This script builds your React app and deploys it to your Nginx server
# Usage: ./deploy-frontend.sh /path/to/frontend/project

# Exit on any error
set -e

# Check if path is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 /path/to/frontend/project"
    exit 1
fi

# Variables
FRONTEND_DIR="$1"
DEPLOY_DIR="/var/www/your-app"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="/var/www/backups"

echo "===== Starting frontend deployment process ====="

# Navigate to frontend directory
echo "Changing to frontend directory: $FRONTEND_DIR"
cd "$FRONTEND_DIR"

# Install dependencies and build
echo "Installing dependencies..."
npm install

echo "Building frontend application..."
npm run build

# Create backup directory if it doesn't exist
if [ ! -d "$BACKUP_DIR" ]; then
    echo "Creating backup directory: $BACKUP_DIR"
    sudo mkdir -p "$BACKUP_DIR"
fi

# Backup current deployment if it exists
if [ -d "$DEPLOY_DIR" ] && [ "$(ls -A $DEPLOY_DIR)" ]; then
    echo "Creating backup of current deployment..."
    sudo mkdir -p "$BACKUP_DIR/$TIMESTAMP"
    sudo cp -r "$DEPLOY_DIR"/* "$BACKUP_DIR/$TIMESTAMP/"
    echo "Backup created at: $BACKUP_DIR/$TIMESTAMP"
fi

# Clear current deployment directory
echo "Clearing current deployment directory..."
sudo rm -rf "$DEPLOY_DIR"/*

# Copy new build to deployment directory
echo "Copying new build to deployment directory..."
sudo mkdir -p "$DEPLOY_DIR"
sudo cp -r dist/* "$DEPLOY_DIR"

# Set correct permissions
echo "Setting correct permissions..."
sudo chown -R www-data:www-data "$DEPLOY_DIR"
sudo chmod -R 755 "$DEPLOY_DIR"

# Test and reload Nginx
echo "Testing Nginx configuration..."
sudo nginx -t

echo "Reloading Nginx..."
sudo systemctl reload nginx

echo "===== Frontend deployment completed successfully ====="
echo "Your updated frontend is now live!"