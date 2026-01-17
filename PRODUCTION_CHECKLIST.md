# 🎯 Production Deployment Checklist

Use this checklist to ensure your SEO Sites application is production-ready.

## ⚙️ Pre-Deployment

### Environment Configuration
- [ ] `.env` file created from `.env.example`
- [ ] Strong `JWT_SECRET` generated (32+ characters)
  ```bash
  openssl rand -base64 32
  ```
- [ ] Cloudinary credentials configured
  - [ ] `CLOUDINARY_CLOUD_NAME`
  - [ ] `CLOUDINARY_API_KEY`
  - [ ] `CLOUDINARY_API_SECRET`
- [ ] Domain URLs updated
  - [ ] `FRONTEND_URL`
  - [ ] `NEXT_PUBLIC_API_URL`
  - [ ] `NEXT_PUBLIC_SITE_URL`
- [ ] `NODE_ENV=production` set

### Server Setup
- [ ] VPS provisioned (minimum 2GB RAM)
- [ ] Ubuntu 20.04+ installed
- [ ] SSH access configured
- [ ] Domain DNS pointing to VPS IP
  - [ ] A record for `yourdomain.com`
  - [ ] A record for `www.yourdomain.com`
- [ ] Docker installed
- [ ] Docker Compose installed
- [ ] Git installed

### Security
- [ ] Firewall configured (UFW)
  ```bash
  sudo ufw allow ssh
  sudo ufw allow 80/tcp
  sudo ufw allow 443/tcp
  sudo ufw enable
  ```
- [ ] SSH key-based authentication enabled
- [ ] Root login disabled
- [ ] Fail2ban installed (optional but recommended)

## 🚀 Deployment

### Initial Setup
- [ ] Repository cloned to VPS
- [ ] `.env` file configured on server
- [ ] Docker containers built
  ```bash
  docker-compose up -d --build
  ```
- [ ] All containers running and healthy
  ```bash
  docker-compose ps
  ```

### Database Setup
- [ ] Admin user seeded
  ```bash
  docker exec -it seosites-backend npm run seed
  ```
- [ ] Default admin password changed immediately
- [ ] Initial content populated

### SSL/HTTPS Setup
- [ ] `nginx/nginx.conf` updated with domain name
- [ ] SSL certificate obtained
  ```bash
  ./setup-ssl.sh yourdomain.com admin@yourdomain.com
  ```
- [ ] HTTP to HTTPS redirect enabled
- [ ] SSL configuration uncommented in nginx.conf
- [ ] Nginx restarted
- [ ] HTTPS working correctly

## ✅ Post-Deployment Verification

### Functionality Testing
- [ ] Website loads at `https://yourdomain.com`
- [ ] Admin panel accessible at `/admin/login`
- [ ] Admin login working
- [ ] Projects page displaying correctly
- [ ] Services page displaying correctly
- [ ] Portfolio page displaying correctly
- [ ] Contact form working (email composition)
- [ ] Image uploads working (Cloudinary)
- [ ] All internal links working
- [ ] Mobile responsiveness verified

### Performance Checks
- [ ] Page load times acceptable (< 3 seconds)
- [ ] Images optimized and loading
- [ ] API responses fast (< 500ms)
- [ ] No console errors in browser
- [ ] Health check endpoint responding
  ```bash
  curl https://yourdomain.com/api/health
  ```

### Security Verification
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] Security headers present
  ```bash
  curl -I https://yourdomain.com
  ```
- [ ] Rate limiting working
- [ ] CORS configured correctly
- [ ] Admin panel requires authentication
- [ ] JWT tokens working
- [ ] No sensitive data in client-side code

### Monitoring Setup
- [ ] Health checks configured
- [ ] Log rotation enabled
- [ ] Disk space monitoring
- [ ] Container auto-restart policies active
- [ ] Backup script configured
  ```bash
  chmod +x backup.sh
  ```
- [ ] Automated backup scheduled (cron job)
  ```bash
  crontab -e
  # Add: 0 2 * * * /path/to/backup.sh
  ```

## 🔧 Maintenance

### Regular Tasks (Weekly)
- [ ] Check logs for errors
  ```bash
  docker-compose logs --tail=100
  ```
- [ ] Monitor disk usage
  ```bash
  df -h
  docker system df
  ```
- [ ] Verify backups are running
- [ ] Check SSL certificate expiry
  ```bash
  openssl x509 -in certbot/conf/live/yourdomain.com/cert.pem -text -noout | grep "Not After"
  ```

### Regular Tasks (Monthly)
- [ ] Update system packages
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```
- [ ] Update Docker images
  ```bash
  docker-compose pull
  docker-compose up -d
  ```
- [ ] Clean up old Docker images
  ```bash
  docker image prune -f
  ```
- [ ] Review and clean old backups
- [ ] Check for application updates

### Emergency Procedures
- [ ] Backup restoration tested
- [ ] Rollback procedure documented
- [ ] Emergency contacts list created
- [ ] Downtime communication plan ready

## 📊 Performance Optimization

- [ ] Nginx gzip compression enabled
- [ ] Static asset caching configured
- [ ] Database indexes optimized
- [ ] Image optimization verified
- [ ] CDN considered for static assets (optional)

## 🎨 Content Management

- [ ] All service descriptions added
- [ ] All service icons configured
- [ ] Portfolio projects uploaded
- [ ] Project images optimized
- [ ] Testimonials added
- [ ] Company information updated
- [ ] About page content completed
- [ ] Contact information verified

## 📱 SEO & Marketing

- [ ] Meta tags configured
- [ ] OpenGraph images set
- [ ] Sitemap generated (if implemented)
- [ ] Google Analytics added (if desired)
- [ ] Google Search Console configured
- [ ] Robots.txt configured (if needed)

## 📝 Documentation

- [ ] README.md updated with deployment info
- [ ] API documentation reviewed
- [ ] Admin user guide created (if needed)
- [ ] Change log maintained
- [ ] Known issues documented

## 🎉 Go-Live Checklist

### Final Checks Before Launch
- [ ] All checklist items above completed
- [ ] Final content review
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)
- [ ] Contact email verified (`info@seosites.dev`)
- [ ] Social media links working (if applicable)
- [ ] Legal pages present (Privacy Policy, Terms of Service)
- [ ] Team notified of launch
- [ ] Monitoring alerts configured

### Launch Day
- [ ] Final backup created
- [ ] DNS changes propagated (check with `dig yourdomain.com`)
- [ ] SSL certificate valid and trusted
- [ ] All services running
- [ ] Traffic monitoring active
- [ ] Support channels ready

### Post-Launch (First 24 Hours)
- [ ] Monitor error logs
- [ ] Check analytics (if configured)
- [ ] Verify email functionality
- [ ] Test all critical user paths
- [ ] Check performance metrics
- [ ] Gather initial user feedback

## ✅ Completion

**Deployment completed on:** _______________

**Deployed by:** _______________

**Production URL:** _______________

**Notes:**
_____________________________________
_____________________________________
_____________________________________

---

## 🆘 Quick Reference

**View Logs:**
```bash
docker-compose logs -f [service]
```

**Restart Service:**
```bash
docker-compose restart [service]
```

**Check Status:**
```bash
docker-compose ps
```

**Backup Database:**
```bash
./backup.sh
```

**Update Application:**
```bash
git pull origin main
docker-compose up -d --build
```

**Emergency Stop:**
```bash
docker-compose down
```

**Emergency Start:**
```bash
docker-compose up -d
```

---

**Good luck with your deployment! 🚀**
