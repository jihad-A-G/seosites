# 🎉 Getting Started - SEO Sites Deployment

Welcome! This guide will help you deploy your SEO Sites application to production.

## 📋 What You Need

- **VPS Server**: Ubuntu 20.04+ with 2GB RAM minimum
- **Domain Name**: Pointed to your VPS IP address
- **Cloudinary Account**: For image hosting (free tier works)
- **30 Minutes**: That's all it takes!

---

## 🚀 Three Ways to Deploy

### 1️⃣ Super Quick (5 Minutes)

For experienced users who want to deploy fast:

```bash
git clone <repo> seosites && cd seosites
cp .env.example .env && nano .env
docker-compose up -d --build
docker exec -it seosites-backend npm run seed
./setup-ssl.sh yourdomain.com
```

✅ Done! See **[QUICKSTART.md](QUICKSTART.md)** for details.

---

### 2️⃣ Guided Setup (15 Minutes)

Step-by-step with explanations:

#### Step 1: Prepare Your Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Logout and login again
exit
```

#### Step 2: Get the Code

```bash
git clone <your-repository-url> seosites
cd seosites
```

#### Step 3: Configure Environment

```bash
# Copy example file
cp .env.example .env

# Edit with your details
nano .env
```

Update these values:
```env
JWT_SECRET=<generate-with: openssl rand -base64 32>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

#### Step 4: Deploy

```bash
# Start all services
docker-compose up -d --build

# Wait 2 minutes for build...
# Then create admin user
docker exec -it seosites-backend npm run seed
```

#### Step 5: Setup SSL (Production)

```bash
# Update nginx config with your domain
nano nginx/nginx.conf
# (Replace 'your-domain.com' with actual domain)

# Run SSL setup
./setup-ssl.sh yourdomain.com admin@yourdomain.com
```

✅ Your site is live at `https://yourdomain.com`!

---

### 3️⃣ Complete Guide (30 Minutes)

For first-time deployment with full understanding:

See **[DEPLOYMENT.md](DEPLOYMENT.md)** for:
- Detailed explanations of each step
- Security configuration
- Firewall setup
- Backup configuration
- Monitoring setup
- Troubleshooting guide

---

## ✅ After Deployment

### 1. Access Your Site

- **Website**: https://yourdomain.com
- **Admin Panel**: https://yourdomain.com/admin/login

**Default Credentials**:
- Email: `admin@seosites.com`
- Password: `admin123`

⚠️ **Change password immediately!**

### 2. Verify Everything Works

Run the health check:
```bash
./health-check.sh
```

All should show ✅ green checkmarks.

### 3. Setup Automated Backups

```bash
# Make backup script executable (already done)
chmod +x backup.sh

# Add to crontab for daily backups at 2 AM
crontab -e
# Add this line:
0 2 * * * /home/$USER/seosites/backup.sh >> /home/$USER/seosites/backup.log 2>&1
```

### 4. Configure Firewall

```bash
sudo apt install ufw
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

---

## 📚 Documentation Guide

**New to deployment?** → Start with [QUICKSTART.md](QUICKSTART.md)  
**Need detailed steps?** → Read [DEPLOYMENT.md](DEPLOYMENT.md)  
**Want checklist?** → Use [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md)  
**Docker info?** → See [DOCKER_SETUP.md](DOCKER_SETUP.md)  
**API reference?** → Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)

---

## 🛠️ Useful Commands

```bash
# Check if everything is running
docker-compose ps
./health-check.sh

# View logs
docker-compose logs -f

# Restart a service
docker-compose restart <service-name>

# Update application
git pull origin main
docker-compose up -d --build

# Backup database
./backup.sh

# Check resource usage
docker stats
```

---

## 🆘 Common Issues

### "Port 80 already in use"

```bash
sudo systemctl stop apache2
# or
sudo systemctl stop nginx
```

### "MongoDB connection failed"

```bash
# Wait 30 seconds for MongoDB to start
docker-compose logs mongodb
```

### "Can't access admin panel"

```bash
# Did you run the seed script?
docker exec -it seosites-backend npm run seed
```

### "Images not loading"

Check Cloudinary credentials in `.env` file.

---

## 🎯 Production Checklist

Before you launch:

- [ ] Environment variables configured
- [ ] SSL certificate installed
- [ ] Admin password changed
- [ ] Firewall configured
- [ ] Backups scheduled
- [ ] All pages tested
- [ ] Mobile tested
- [ ] Contact form working

Use [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) for complete list.

---

## 💡 Pro Tips

1. **Test locally first**: Run `docker-compose up` without `-d` to see output
2. **Monitor logs**: Keep `docker-compose logs -f` running in a separate terminal
3. **Regular backups**: Run `./backup.sh` before major updates
4. **Health checks**: Run `./health-check.sh` weekly
5. **Keep updated**: `git pull && docker-compose up -d --build` monthly

---

## 🎊 You're All Set!

Your SEO Sites application is now:
- ✅ Running in production
- ✅ Secured with HTTPS
- ✅ Backed up automatically
- ✅ Monitored for health
- ✅ Ready for users

**Need help?** Check the documentation files or run `./health-check.sh` to diagnose issues.

**Happy deploying!** 🚀

---

## 📞 Quick Reference

| Task | Command |
|------|---------|
| Deploy | `docker-compose up -d --build` |
| Status | `docker-compose ps` or `./health-check.sh` |
| Logs | `docker-compose logs -f` |
| Restart | `docker-compose restart` |
| Backup | `./backup.sh` |
| Update | `git pull && docker-compose up -d --build` |
| SSL Setup | `./setup-ssl.sh yourdomain.com` |

---

**For detailed guides, see:**
- [QUICKSTART.md](QUICKSTART.md) - Fast deployment
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete guide
- [DOCKER_SETUP.md](DOCKER_SETUP.md) - Docker details
- [PRODUCTION_CHECKLIST.md](PRODUCTION_CHECKLIST.md) - Launch checklist
