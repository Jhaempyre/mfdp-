#!/bin/bash
echo "Removing old build..."
sudo rm -rf /var/www/html/*


echo "Building new frontend..."
npm run build
echo "Frontend build complete"

sudo mkdir -p /var/www/mfdp 

echo "Copying new build to Nginx..."
sudo cp -r ./dist/* /var/www/html/
echo "file copied to nginx"

echo "Setting permissions..."
sudo chown -R www-data:www-data /var/www/html
sudo chmod -R 755 /var/www/html
echo "permission set"

echo "Restarting Nginx..."
##sudo systemctl restart nginx
echo "Nginx restarted"

echo "Frontend updated successfully!"

