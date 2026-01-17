#!/bin/bash

# Automated Database Backup Script for SEO Sites
# This script creates a backup of the MongoDB database and keeps only the last 7 days

set -e

# Configuration
BACKUP_DIR="/home/$USER/seosites/backups"
DATE=$(date +%Y%m%d-%H%M%S)
RETENTION_DAYS=7

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🗄️  Starting MongoDB Backup${NC}"
echo "================================="

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Check if MongoDB container is running
if ! docker ps | grep -q seosites-mongodb; then
    echo -e "${RED}❌ Error: MongoDB container is not running${NC}"
    exit 1
fi

# Create backup
echo "📦 Creating backup..."
docker exec seosites-mongodb mongodump --out=/dump 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ MongoDB dump created successfully"
else
    echo -e "${RED}❌ Failed to create MongoDB dump${NC}"
    exit 1
fi

# Copy backup from container to host
echo "📁 Copying backup to host..."
docker cp seosites-mongodb:/dump $BACKUP_DIR/mongodb-$DATE

if [ $? -eq 0 ]; then
    echo "✅ Backup copied successfully"
    
    # Clean up dump inside container
    docker exec seosites-mongodb rm -rf /dump
    
    # Compress backup
    echo "🗜️  Compressing backup..."
    cd $BACKUP_DIR
    tar -czf mongodb-$DATE.tar.gz mongodb-$DATE
    rm -rf mongodb-$DATE
    
    BACKUP_SIZE=$(du -h mongodb-$DATE.tar.gz | cut -f1)
    echo "✅ Backup compressed: mongodb-$DATE.tar.gz ($BACKUP_SIZE)"
else
    echo -e "${RED}❌ Failed to copy backup${NC}"
    exit 1
fi

# Clean up old backups (keep only last 7 days)
echo "🧹 Cleaning up old backups (keeping last $RETENTION_DAYS days)..."
find $BACKUP_DIR -name "mongodb-*.tar.gz" -mtime +$RETENTION_DAYS -delete

REMAINING_BACKUPS=$(ls -1 $BACKUP_DIR/mongodb-*.tar.gz 2>/dev/null | wc -l)
echo "✅ Cleanup complete. $REMAINING_BACKUPS backup(s) remaining"

echo ""
echo -e "${GREEN}🎉 Backup completed successfully!${NC}"
echo "   Location: $BACKUP_DIR/mongodb-$DATE.tar.gz"
echo "   Size: $BACKUP_SIZE"
echo "================================="
