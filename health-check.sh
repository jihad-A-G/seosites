#!/bin/bash

# Deployment Health Check Script
# This script checks the health status of all services

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   SEO Sites Deployment Health Check   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Check if Docker is running
echo -e "${YELLOW}🐳 Checking Docker...${NC}"
if ! docker info > /dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Docker is running${NC}"
echo ""

# Check if containers are running
echo -e "${YELLOW}📦 Checking Containers...${NC}"
echo ""

CONTAINERS=("seosites-nginx" "seosites-frontend" "seosites-backend" "seosites-mongodb")
ALL_HEALTHY=true

for container in "${CONTAINERS[@]}"; do
    if docker ps --format '{{.Names}}' | grep -q "^${container}$"; then
        # Check if container is healthy
        HEALTH=$(docker inspect --format='{{.State.Health.Status}}' $container 2>/dev/null || echo "no-healthcheck")
        STATUS=$(docker inspect --format='{{.State.Status}}' $container)
        
        if [ "$HEALTH" == "healthy" ] || ([ "$HEALTH" == "no-healthcheck" ] && [ "$STATUS" == "running" ]); then
            echo -e "${GREEN}✅ $container - Running & Healthy${NC}"
        else
            echo -e "${YELLOW}⚠️  $container - Running but not healthy (Status: $HEALTH)${NC}"
            ALL_HEALTHY=false
        fi
    else
        echo -e "${RED}❌ $container - Not running${NC}"
        ALL_HEALTHY=false
    fi
done

echo ""

# Check disk space
echo -e "${YELLOW}💾 Checking Disk Space...${NC}"
DISK_USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt 80 ]; then
    echo -e "${RED}❌ Warning: Disk usage is at ${DISK_USAGE}%${NC}"
else
    echo -e "${GREEN}✅ Disk usage is at ${DISK_USAGE}%${NC}"
fi
echo ""

# Check Docker disk usage
echo -e "${YELLOW}🐋 Checking Docker Disk Usage...${NC}"
docker system df
echo ""

# Check container logs for errors (last 100 lines)
echo -e "${YELLOW}📋 Recent Errors in Logs...${NC}"
ERRORS=$(docker-compose logs --tail=100 2>&1 | grep -i "error\|failed\|exception" || echo "")
if [ -z "$ERRORS" ]; then
    echo -e "${GREEN}✅ No recent errors found${NC}"
else
    echo -e "${YELLOW}⚠️  Recent errors detected:${NC}"
    echo "$ERRORS" | head -10
fi
echo ""

# Test API health endpoint
echo -e "${YELLOW}🔍 Testing API Health Endpoint...${NC}"
API_HEALTH=$(docker exec seosites-backend wget -qO- http://localhost:5000/api/health 2>/dev/null || echo "")
if [ ! -z "$API_HEALTH" ]; then
    echo -e "${GREEN}✅ API is responding${NC}"
    echo "   Response: $API_HEALTH"
else
    echo -e "${RED}❌ API is not responding${NC}"
    ALL_HEALTHY=false
fi
echo ""

# Test frontend
echo -e "${YELLOW}🌐 Testing Frontend...${NC}"
FRONTEND_STATUS=$(docker exec seosites-frontend wget --spider -S http://localhost:3000 2>&1 | grep "HTTP/" | awk '{print $2}' || echo "")
if [ "$FRONTEND_STATUS" == "200" ]; then
    echo -e "${GREEN}✅ Frontend is responding${NC}"
else
    echo -e "${RED}❌ Frontend is not responding (Status: $FRONTEND_STATUS)${NC}"
    ALL_HEALTHY=false
fi
echo ""

# Check MongoDB
echo -e "${YELLOW}🗄️  Testing MongoDB...${NC}"
MONGO_STATUS=$(docker exec seosites-mongodb mongosh --eval "db.adminCommand('ping')" --quiet 2>/dev/null || echo "")
if [[ "$MONGO_STATUS" == *"ok"* ]]; then
    echo -e "${GREEN}✅ MongoDB is responding${NC}"
else
    echo -e "${RED}❌ MongoDB is not responding${NC}"
    ALL_HEALTHY=false
fi
echo ""

# Check Nginx
echo -e "${YELLOW}🔧 Testing Nginx Configuration...${NC}"
NGINX_CONFIG=$(docker exec seosites-nginx nginx -t 2>&1 || echo "")
if [[ "$NGINX_CONFIG" == *"successful"* ]]; then
    echo -e "${GREEN}✅ Nginx configuration is valid${NC}"
else
    echo -e "${RED}❌ Nginx configuration has errors${NC}"
    echo "$NGINX_CONFIG"
    ALL_HEALTHY=false
fi
echo ""

# Check SSL certificate (if exists)
echo -e "${YELLOW}🔒 Checking SSL Certificate...${NC}"
if [ -f "certbot/conf/live/*/fullchain.pem" ]; then
    CERT_PATH=$(find certbot/conf/live -name "fullchain.pem" | head -1)
    CERT_EXPIRY=$(openssl x509 -enddate -noout -in "$CERT_PATH" 2>/dev/null | cut -d= -f2)
    DAYS_LEFT=$(( ($(date -d "$CERT_EXPIRY" +%s) - $(date +%s)) / 86400 ))
    
    if [ "$DAYS_LEFT" -lt 30 ]; then
        echo -e "${YELLOW}⚠️  SSL certificate expires in $DAYS_LEFT days${NC}"
        echo "   Expiry: $CERT_EXPIRY"
    else
        echo -e "${GREEN}✅ SSL certificate is valid (expires in $DAYS_LEFT days)${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  No SSL certificate found${NC}"
fi
echo ""

# Check recent backups
echo -e "${YELLOW}💾 Checking Backups...${NC}"
if [ -d "backups" ]; then
    LATEST_BACKUP=$(ls -t backups/*.tar.gz 2>/dev/null | head -1)
    if [ ! -z "$LATEST_BACKUP" ]; then
        BACKUP_AGE=$(( ($(date +%s) - $(stat -c %Y "$LATEST_BACKUP")) / 86400 ))
        BACKUP_SIZE=$(du -h "$LATEST_BACKUP" | cut -f1)
        
        if [ "$BACKUP_AGE" -lt 7 ]; then
            echo -e "${GREEN}✅ Recent backup found${NC}"
            echo "   Latest: $(basename $LATEST_BACKUP) ($BACKUP_SIZE, $BACKUP_AGE days old)"
        else
            echo -e "${YELLOW}⚠️  Latest backup is $BACKUP_AGE days old${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  No backups found${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Backup directory does not exist${NC}"
fi
echo ""

# Summary
echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
if [ "$ALL_HEALTHY" = true ]; then
    echo -e "${BLUE}║${NC}  ${GREEN}✅ All Systems Operational${NC}           ${BLUE}║${NC}"
else
    echo -e "${BLUE}║${NC}  ${YELLOW}⚠️  Some Issues Detected${NC}             ${BLUE}║${NC}"
fi
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Quick stats
echo -e "${YELLOW}📊 Quick Stats:${NC}"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}"
echo ""

# Helpful commands
echo -e "${YELLOW}💡 Helpful Commands:${NC}"
echo "   View logs:        docker-compose logs -f [service]"
echo "   Restart service:  docker-compose restart [service]"
echo "   Check status:     docker-compose ps"
echo "   Run backup:       ./backup.sh"
echo ""

if [ "$ALL_HEALTHY" = true ]; then
    exit 0
else
    exit 1
fi
