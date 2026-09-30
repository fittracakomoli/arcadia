# ============================================
# Stage 1: PHP Dependencies (Composer)
# ============================================
FROM php:8.4-fpm-alpine AS backend-builder

# Install composer system deps
RUN apk add --no-cache zip unzip git libzip-dev \
    && docker-php-ext-install zip

WORKDIR /app

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install PHP dependencies without running scripts (because artisan is not copied yet)
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-scripts --optimize-autoloader

# Copy application source code
COPY . .

# Now we can safely run the post-install scripts since artisan exists
RUN composer dump-autoload --optimize \
    && php artisan package:discover --ansi

# ============================================
# Stage 2: Build frontend assets
# ============================================
FROM node:24-alpine AS frontend-builder

# Install PHP and essential extensions for artisan (needed for Wayfinder)
RUN apk add --no-cache php php-cli php-phar php-mbstring php-openssl php-ctype php-tokenizer php-dom php-xml php-xmlwriter php-fileinfo php-pdo php-session

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install Node dependencies
RUN npm ci --legacy-peer-deps

# Copy the entire PHP application (including vendor folders generated above)
# This is explicitly required because vite plugins often rely on PHP routes (e.g., Wayfinder/Ziggy)
COPY --from=backend-builder /app /app

# Build production assets
RUN npm run build


# ============================================
# Stage 3: PHP application (Production Runtime)
# ============================================
FROM php:8.4-fpm-alpine AS app

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    zip \
    unzip \
    git \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    freetype-dev \
    oniguruma-dev \
    libzip-dev \
    icu-dev \
    linux-headers \
    $PHPIZE_DEPS

# Install PHP extensions
RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl \
        opcache

# Install Redis extension
RUN pecl install redis && docker-php-ext-enable redis

# Set working directory
WORKDIR /var/www/html

# Copy all application files (including vendor) from backend-builder
COPY --from=backend-builder /app .

# Copy built frontend assets from frontend-builder
COPY --from=frontend-builder /app/public/build public/build

# Configure PHP for production
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini

# Copy custom configurations
COPY docker/php/custom.ini /usr/local/etc/php/conf.d/custom.ini
COPY docker/nginx/default.conf /etc/nginx/http.d/default.conf
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Create required directories and set permissions
RUN mkdir -p \
        storage/framework/cache/data \
        storage/framework/sessions \
        storage/framework/views \
        storage/logs \
        bootstrap/cache \
    && chown -R www-data:www-data \
        storage \
        bootstrap/cache \
    && chmod -R 775 \
        storage \
        bootstrap/cache

# Expose port 80
EXPOSE 80

# Copy and set entrypoint
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
CMD ["supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]