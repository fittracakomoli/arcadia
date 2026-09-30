#!/bin/sh
set -e

echo "================================================"
echo "  🚀 Starting HIMA ILKOM Internal System"
echo "================================================"

# Create log directory for supervisor
mkdir -p /var/log/supervisor

# Ensure storage directories exist with proper permissions
echo "📁 Setting up storage directories..."
mkdir -p \
    storage/framework/cache/data \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache

chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# Check if APP_KEY is empty or missing, then generate
echo "🔑 Checking APP_KEY..."
if [ -z "$APP_KEY" ]; then
    echo "⚠️ APP_KEY is not set! Generating a new one..."
    if [ ! -f .env ] && [ -f .env.example ]; then
        cp .env.example .env
        echo "📄 Created .env from .env.example"
    elif [ ! -f .env ]; then
        touch .env
        echo "📄 Created empty .env file"
    fi
    php artisan key:generate --force --no-interaction
fi

# Cache configuration for production
echo "⚡ Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

# Run database migrations
echo "🗄️  Running database migrations..."
php artisan migrate --force --seed

# Create storage symlink
echo "🔗 Creating storage symlink..."
php artisan storage:link --force 2>/dev/null || true

echo "================================================"
echo "  ✅ Application is ready!"
echo "  🌐 Listening on port 80"
echo "================================================"

# Execute the main command (supervisord)
exec "$@"