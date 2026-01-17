# ⚡ Quick Start Guide - Docker Deployment

## 🎯 TL;DR - Deploy in 5 Minutes

### 1. Clone & Configure

```bash
git clone <your-repo> seosites && cd seosites
cp .env.example .env
nano .env  # Update JWT_SECRET, Cloudinary credentials, and domain
```

### 2. Build & Deploy

```bash
docker-compose up -d --build
```

### 3. Create Admin User

```bash
docker exec -it seosites-backend npm run seed
```

**Default credentials:** admin@seosites.com / admin123

### 4. Setup SSL (Production Only)

```bash
./setup-ssl.sh yourdomain.com your-email@example.com
```

---

## 📋 Detailed Setup

### Prerequisites

- Ubuntu 20.04+ VPS (2GB RAM minimum)
- Domain pointed to VPS IP
- Docker & Docker Compose installed

### Quick Docker Installation

```bash
# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again for group changes
```

### Environment Variables (.env)

**Required variables:**

```bash
# Generate strong secret: openssl rand -base64 32
JWT_SECRET=your-super-secret-jwt-key

# Get from cloudinary.com
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Production URLs
FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Architecture

```
Internet → Nginx (Port 80/443)
            ↓
            ├→ Frontend (Next.js :3000)
            ├→ Backend (Express :5000)
            └→ MongoDB (:27017)
```

### Services

- **nginx**: Reverse proxy, SSL termination, load balancing
- **frontend**: Next.js application (standalone mode)
- **backend**: Express API with TypeScript
- **mongodb**: Database with persistent storage
- **certbot**: SSL certificate management (optional)

---

## 🚀 Common Commands

### View Logs

```bash
docker-compose logs -f              # All services
docker-compose logs -f backend      # Backend only
docker-compose logs -f frontend     # Frontend only
```

### Restart Services

```bash
docker-compose restart              # All services
docker-compose restart nginx        # Nginx only
```

### Stop/Start

```bash
docker-compose down                 # Stop all
docker-compose up -d                # Start all
docker-compose up -d --build        # Rebuild & start
```

### Database Backup

```bash
docker exec seosites-mongodb mongodump --out=/dump
docker cp seosites-mongodb:/dump ./backup-$(date +%Y%m%d)
```

### Update Application

```bash
git pull origin main
docker-compose up -d --build
docker image prune -f
```

---

## 🔒 SSL Configuration

### Option 1: Automatic (Recommended)

```bash
./setup-ssl.sh yourdomain.com admin@yourdomain.com
```

### Option 2: Manual

```bash
# Stop nginx
docker-compose stop nginx

# Get certificate
docker run -it --rm \
  -v $(pwd)/certbot/conf:/etc/letsencrypt \
  -v $(pwd)/certbot/www:/var/www/certbot \
  -p 80:80 \
  certbot/certbot certonly --standalone \
  --email admin@yourdomain.com \
  --agree-tos \
  -d yourdomain.com \
  -d www.yourdomain.com

# Update nginx/nginx.conf
# Comment HTTP block, uncomment HTTPS block

# Start nginx
docker-compose start nginx
```

---

## 🐛 Troubleshooting

### Check Service Health

```bash
docker-compose ps
```

All services should show "healthy" status.

### Container Won't Start

```bash
docker-compose logs <service-name>
docker stats
```

### Port Already in Use

```bash
# Check what's using the port
sudo lsof -i :80
sudo lsof -i :443

# Stop the conflicting service
sudo systemctl stop apache2  # or nginx
```

### Database Issues

```bash
# Access MongoDB shell
docker exec -it seosites-mongodb mongosh

# Check database
> show dbs
> use seosites
> show collections
```

### Nginx Configuration Test

```bash
docker exec seosites-nginx nginx -t
```

---

## 📊 Monitoring

### Resource Usage

```bash
docker stats
```

### Disk Space

```bash
df -h
docker system df
```

### Clean Up

```bash
# Remove unused images
docker image prune -f

# Remove unused volumes (⚠️ careful!)
docker volume prune -f

# Clean everything
docker system prune -a -f
```

---

## 🔐 Security Checklist

- [ ] Change default admin password
- [ ] Generate strong JWT_SECRET
- [ ] Setup SSL certificates
- [ ] Configure firewall (UFW)
- [ ] Enable automated backups
- [ ] Keep Docker images updated
- [ ] Monitor logs regularly

### Firewall Setup

```bash
sudo apt install ufw
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 🎯 Production Checklist

Before going live:

- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Admin password changed
- [ ] Firewall configured
- [ ] Backup strategy implemented
- [ ] Monitoring setup
- [ ] Domain DNS configured
- [ ] Test all functionality

---

## 📱 Access Points

- **Website**: https://yourdomain.com
- **Admin Panel**: https://yourdomain.com/admin/login
- **API**: https://yourdomain.com/api
- **Health Check**: https://yourdomain.com/api/health

---

## 💡 Tips

1. **Always backup** before updates
2. **Test in staging** first
3. **Monitor logs** regularly
4. **Keep images updated** monthly
5. **Use strong passwords**
6. **Enable HTTPS** in production
7. **Setup automated backups**

---

## 📞 Need Help?

1. Check logs: `docker-compose logs -f`
2. Verify environment: `docker-compose ps`
3. Test configuration: `docker exec seosites-nginx nginx -t`
4. Review DEPLOYMENT.md for detailed guide

---

## 🎉 That's it!

Your SEO Sites application is now running in production with:
- ✅ Docker containerization
- ✅ Nginx reverse proxy
- ✅ SSL/HTTPS support
- ✅ Automatic restarts
- ✅ Health monitoring
- ✅ Persistent database

Happy deploying! 🚀
