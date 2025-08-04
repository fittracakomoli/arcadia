<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/881d6159bd8d5f13b3c97f8cc87ddc92f2c3636a3edafde01b2402652c6dceea/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Register the Composer autoloader...
require __DIR__.'/881d6159bd8d5f13b3c97f8cc87ddc92f2c3636a3edafde01b2402652c6dceea/vendor/autoload.php';

// Bootstrap Laravel and handle the request...
/** @var Application $app */
$app = require_once __DIR__.'/881d6159bd8d5f13b3c97f8cc87ddc92f2c3636a3edafde01b2402652c6dceea/bootstrap/app.php';

$app->handleRequest(Request::capture());
