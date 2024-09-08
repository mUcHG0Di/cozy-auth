<?php

use App\Http\Controllers\CustomAuth\LoginController;
use App\Http\Controllers\CustomAuth\RegisterController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::prefix('custom/auth')->group(function () {
    Route::middleware('custom-guest')->group(function () {
        Route::get('/login', [LoginController::class, 'create']);
        Route::post('/login', [LoginController::class, 'store'])
            ->middleware('throttle:5,1');
        Route::get('/signup', [RegisterController::class, 'create']);
        Route::post('/signup', [RegisterController::class, 'store']);
    });

    Route::middleware('custom-auth')->group(function () {
        Route::post('/logout', [LoginController::class, 'destroy']);
    });
});
