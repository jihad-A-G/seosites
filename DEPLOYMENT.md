# 🚀 Docker Deployment Guide

Complete guide for deploying the SEO Sites application on a VPS using Docker, Docker Compose, and Nginx.

## 📋 Prerequisites

- VPS with Ubuntu 20.04 or later (minimum 2GB RAM)
- Domain name pointed to your VPS IP address
- SSH access to your VPS
- Docker and Docker Compose installed

## 🛠️ Initial VPS Setup

### 1. Update System Packages

```bash
sudo apt update && sudo apt upgrade -y
```

### 2. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Start Docker service
sudo systemctl enable docker
sudo systemctl start docker
```

### 3. Install Docker Compose

```bash
# Download Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make it executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

### 4. Install Git

```bash
sudo apt install git -y
```

## 📦 Application Deployment

### 1. Clone the Repository

```bash
cd /home/$USER
git clone <your-repository-url> seosites
cd seosites
```

### 2. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your actual values
nano .env
```

**Important variables to update:**

```bash
# Generate a strong JWT secret (you can use: openssl rand -base64 32)
JWT_SECRET=your-strong-secret-key-here

# Cloudinary credentials (sign up at cloudinary.com)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Your domain (replace with your actual domain)
FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. Update Nginx Configuration

Edit `nginx/nginx.conf` and replace `your-domain.com` with your actual domain:

```bash
nano nginx/nginx.conf
```

### 4. Build and Start Containers

```bash
# Build and start all services
docker-compose up -d --build

# Check if all containers are running
docker-compose ps

# View logs
docker-compose logs -f
```

### 5. Create Admin User

Once the backend is running, seed the database:

```bash
# Access the backend container
docker exec -it seosites-backend sh

# Run the seed script
npm run seed

# Exit the container
exit
```

**Default admin credentials:**
- Email: admin@seosites.com
- Password: admin123

⚠️ **Change these credentials immediately after first login!**

## 🔒 SSL Certificate Setup (Production)

### 1. Install Certbot

The docker-compose file includes a Certbot service. First, update `nginx/nginx.conf`:

1. Comment out the development HTTP location block
2. Uncomment the HTTPS server block
3. Replace `your-domain.com` with your actual domain

### 2. Obtain SSL Certificate

```bash
# Stop nginx temporarily
docker-compose stop nginx

# Get the certificate (replace with your email and domain)
docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  -p 80:80 \
  certbot/certbot certonly --standalone \
  --email your-email@example.com \
  --agree-tos \
  --no-eff-email \
  -d yourdomain.com \
  -d www.yourdomain.com

# Start nginx again
docker-compose start nginx
```

### 3. Enable Auto-Renewal

Uncomment the certbot service in `docker-compose.yml` and restart:

```bash
docker-compose up -d
```

## 📊 Container Management

### View Running Containers

```bash
docker-compose ps
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f nginx
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend
docker-compose restart frontend
docker-compose restart nginx
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ This will delete your database!)
docker-compose down -v
```

### Update Application

```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Clean up old images
docker image prune -f
```

## 🔧 Health Checks

All services include health checks. Check their status:

```bash
docker-compose ps
```

Services should show "healthy" status. If not, check logs:

```bash
docker-compose logs <service-name>
```

## 🗄️ Database Backup

### Manual Backup

```bash
# Create backup directory
mkdir -p backups

# Backup MongoDB
docker exec seosites-mongodb mongodump --out=/dump
docker cp seosites-mongodb:/dump ./backups/mongodb-backup-$(date +%Y%m%d-%H%M%S)
```

### Automated Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
BACKUP_DIR="/home/$USER/seosites/backups"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p $BACKUP_DIR

# Backup MongoDB
docker exec seosites-mongodb mongodump --out=/dump
docker cp seosites-mongodb:/dump $BACKUP_DIR/mongodb-$DATE

# Keep only last 7 days of backups
find $BACKUP_DIR -type d -mtime +7 -exec rm -rf {} +

echo "Backup completed: $BACKUP_DIR/mongodb-$DATE"
```

Make it executable and add to cron:

```bash
chmod +x backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
# Add this line:
0 2 * * * /home/$USER/seosites/backup.sh >> /home/$USER/seosites/backup.log 2>&1
```

## 🔐 Security Recommendations

### 1. Firewall Setup

```bash
# Install UFW
sudo apt install ufw

# Allow SSH, HTTP, and HTTPS
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
```

### 2. Change Default Passwords

- Change MongoDB admin password (if you enable authentication)
- Change default admin user password immediately after first login

### 3. Regular Updates

```bash
# Update system packages weekly
sudo apt update && sudo apt upgrade -y

# Update Docker images monthly
docker-compose pull
docker-compose up -d
```

### 4. Monitor Logs

```bash
# Check for suspicious activity
docker-compose logs nginx | grep -i "error\|failed\|unauthorized"
```

## 📈 Performance Optimization

### 1. MongoDB Optimization

```bash
# Set memory limits in docker-compose.yml
services:
  mongodb:
    deploy:
      resources:
        limits:
          memory: 512M
```

### 2. Nginx Caching

Already configured in `nginx/nginx.conf` for static assets.

### 3. Docker Image Cleanup

```bash
# Remove unused images
docker image prune -a -f

# Remove unused volumes
docker volume prune -f
```

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs <service-name>

# Check resource usage
docker stats
```

### Database Connection Issues

```bash
# Check if MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Test connection from backend
docker exec -it seosites-backend sh
wget -O- http://mongodb:27017
```

### Nginx Issues

```bash
# Test nginx configuration
docker exec seosites-nginx nginx -t

# Reload nginx
docker-compose restart nginx
```

### Out of Disk Space

```bash
# Check disk usage
df -h

# Clean Docker system
docker system prune -a -f --volumes
```

## 📱 Monitoring

### System Resources

```bash
# Monitor Docker containers
docker stats

# Monitor system resources
htop  # Install with: sudo apt install htop
```

### Application Logs

```bash
# Real-time logs
docker-compose logs -f --tail=100

# Error logs only
docker-compose logs | grep -i error
```

## 🔄 CI/CD Integration (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USERNAME }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /home/$USER/seosites
            git pull origin main
            docker-compose up -d --build
            docker image prune -f
```

## 📞 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables in `.env`
3. Ensure your domain DNS is properly configured
4. Check firewall rules: `sudo ufw status`

## 🎉 Success!

Your application should now be accessible at:
- **Production**: https://yourdomain.com
- **Admin Panel**: https://yourdomain.com/admin/login

Remember to:
- ✅ Change default admin password
- ✅ Set up SSL certificates
- ✅ Configure automated backups
- ✅ Enable monitoring
- ✅ Keep system and Docker images updated
