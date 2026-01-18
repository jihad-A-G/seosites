#!/bin/bash

# Database Restore Script for SEO Sites
# This script restores MongoDB data from JSON backup files

set -e

echo "🔄 SEO Sites Database Restore"
echo "==============================="
echo ""

# Check if backup directory exists
BACKUP_DIR="/home/jayd/Documents/seosites-backup"
if [ ! -d "$BACKUP_DIR" ]; then
    echo "❌ Error: Backup directory not found: $BACKUP_DIR"
    exit 1
fi

# Check if MongoDB container is running
if ! docker ps | grep -q seosites-mongodb; then
    echo "❌ Error: MongoDB container is not running"
    echo "   Start it with: docker compose up -d mongodb"
    exit 1
fi

echo "📁 Found backup directory: $BACKUP_DIR"
echo ""

# Database name
DB_NAME="seosites"

# Import each collection
echo "📥 Importing collections..."
echo ""

for file in "$BACKUP_DIR"/*.json; do
    if [ -f "$file" ]; then
        # Extract collection name from filename (e.g., seosites.admins.json -> admins)
        filename=$(basename "$file")
        collection=$(echo "$filename" | sed 's/seosites\.\(.*\)\.json/\1/')
        
        echo "  → Importing $collection..."
        
        # Copy file to container
        docker cp "$file" seosites-mongodb:/tmp/
        
        # Import using mongoimport
        docker exec seosites-mongodb mongoimport \
            --db "$DB_NAME" \
            --collection "$collection" \
            --file "/tmp/$filename" \
            --jsonArray \
            --drop 2>/dev/null || \
        docker exec seosites-mongodb mongoimport \
            --db "$DB_NAME" \
            --collection "$collection" \
            --file "/tmp/$filename" \
            --drop
        
        # Clean up temp file
        docker exec seosites-mongodb rm "/tmp/$filename"
        
        echo "     ✅ $collection imported"
    fi
done

echo ""
echo "✅ Database restore completed successfully!"
echo ""
echo "📊 Collections in database:"
docker exec seosites-mongodb mongosh --quiet --eval "db.getSiblingDB('$DB_NAME').getCollectionNames()" | grep -v "^$"

echo ""
echo "🎉 Done! Your database has been restored."
