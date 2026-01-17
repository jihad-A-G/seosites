#!/bin/bash

# SSL Certificate Setup Script for SEO Sites
# This script helps you obtain and configure SSL certificates using Let's Encrypt

set -e

echo "🔒 SSL Certificate Setup for SEO Sites"
echo "======================================="
echo ""

# Check if domain is provided
if [ -z "$1" ]; then
    echo "❌ Error: Domain name is required"
    echo "Usage: ./setup-ssl.sh yourdomain.com"
    exit 1
fi

DOMAIN=$1
EMAIL=${2:-"admin@$DOMAIN"}

echo "📋 Configuration:"
echo "   Domain: $DOMAIN"
echo "   Email: $EMAIL"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running"
    exit 1
fi

echo "✅ Docker is running"

# Stop nginx temporarily
echo ""
echo "⏸️  Stopping Nginx..."
docker-compose stop nginx

# Create directories for certbot
mkdir -p certbot/conf certbot/www

# Obtain certificate
echo ""
echo "📜 Obtaining SSL certificate from Let's Encrypt..."
docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  -p 80:80 \
  certbot/certbot certonly --standalone \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d www.$DOMAIN

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SSL certificate obtained successfully!"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Edit nginx/nginx.conf"
    echo "   2. Replace 'your-domain.com' with '$DOMAIN'"
    echo "   3. Comment out the HTTP server block (lines 59-103)"
    echo "   4. Uncomment the HTTPS server block (lines 105-192)"
    echo "   5. Run: docker-compose up -d"
    echo ""
    echo "🔄 Would you like to start Nginx now? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        docker-compose start nginx
        echo "✅ Nginx started successfully!"
    else
        echo "ℹ️  Remember to start Nginx with: docker-compose start nginx"
    fi
else
    echo ""
    echo "❌ Failed to obtain SSL certificate"
    echo "   Please check:"
    echo "   - Domain DNS is properly configured"
    echo "   - Ports 80 and 443 are accessible"
    echo "   - No other service is using port 80"
    docker-compose start nginx
    exit 1
fi

echo ""
echo "🎉 SSL setup complete!"
echo "   Your site will be available at: https://$DOMAIN"
