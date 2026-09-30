<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\NewsController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AgendaController;
use App\Http\Controllers\Admin\MemberController;
use App\Http\Controllers\Admin\GalleryController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\Admin\UnderbowController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\OrganizationSettingController;

Route::get('/', [PageController::class, 'home'])->name('home');

Route::get('/about', [PageController::class, 'about'])->name('about');

Route::get('/structure', [PageController::class, 'structure'])->name('structure.index');

Route::get('/underbow', [PageController::class, 'underbow'])->name('underbow');

Route::get('/activity', [PageController::class, 'activity'])->name('activity.index');

Route::get('/news', [PageController::class, 'newsIndex'])->name('news.index');
Route::get('/news/{news:slug}', [PageController::class, 'newsShow'])->name('news.show');

Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::post('/contact', [PageController::class, 'sendContactMessage'])->name('contact.send');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // --- TAMBAHKAN GRUP ROUTE ADMIN DI SINI ---
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
        Route::resource('users', UserController::class);
        Route::get('organization', [OrganizationSettingController::class, 'index'])->name('organization.index');
        Route::post('organization', [OrganizationSettingController::class, 'update'])->name('organization.update');
        Route::resource('underbow', UnderbowController::class);
        Route::resource('news', NewsController::class);
        Route::resource('members', MemberController::class);
        Route::resource('activities', ActivityController::class);
        Route::resource('agendas', AgendaController::class);
        Route::resource('gallery', GalleryController::class);
        Route::resource('messages', MessageController::class);
        Route::post('messages/{message}/reply', [MessageController::class, 'reply'])->name('messages.reply');
    });
});

Route::fallback(function () {
    return Inertia::render('NotFound')->toResponse(request())->setStatusCode(404);
});

require __DIR__.'/auth.php';
