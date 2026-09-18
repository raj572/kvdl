<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\CareerApplicationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PodcastController;

// Public Routes
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/careers/apply', [CareerApplicationController::class, 'store']);
Route::get('/projects', [ProjectController::class, 'index']);
Route::get('/projects/{id}', [ProjectController::class, 'show']);
Route::get('/podcasts', [PodcastController::class, 'index']);

// Admin Authentication (Rate Limited)
Route::middleware(['throttle:60,1'])->group(function () {
    Route::post('/admin/login', [AdminAuthController::class, 'login']);
    Route::post('/super-admin/login', [AdminAuthController::class, 'superAdminLogin']);
    Route::post('/admin/password/forgot', [App\Http\Controllers\Admin\ForgotPasswordController::class, 'sendResetLink']);
    Route::post('/admin/password/reset', [App\Http\Controllers\Admin\ResetPasswordController::class, 'reset']);
});

// Admin Protected Routes
Route::middleware('admin.auth')->prefix('admin')->group(function () {
    Route::post('/logout', [AdminAuthController::class, 'logout']);
    Route::get('/me', [AdminAuthController::class, 'me']);

    // Profile Management
    Route::post('/profile/update-email', [App\Http\Controllers\Admin\ProfileController::class, 'updateEmail']);
    Route::get('/verify-email/{token}', [App\Http\Controllers\Admin\ProfileController::class, 'verifyEmail']);

    // Resource Routes
    Route::get('/careers', [CareerApplicationController::class, 'index']);
    Route::patch('/careers/{id}', [CareerApplicationController::class, 'update']);
    Route::get('/careers/{id}/resume', [CareerApplicationController::class, 'downloadResume']);

    // Podcast Management Routes
    Route::get('/podcasts', [PodcastController::class, 'adminIndex']);
    Route::post('/podcasts', [PodcastController::class, 'store']);
    Route::post('/podcasts/{id}', [PodcastController::class, 'update']);
    Route::delete('/podcasts/{id}', [PodcastController::class, 'destroy']);
});


// Super-Admin Protected Routes
Route::middleware('super_admin.auth')->prefix('super-admin')->group(function () {
    Route::get('/me', [AdminAuthController::class, 'me']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::post('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
});

// Blog Routes (Mixed Access)
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{blog}', [BlogController::class, 'show']);

Route::middleware('admin.auth')->group(function () {
    Route::get('/contacts', [ContactController::class, 'index']);

    Route::post('/blogs', [BlogController::class, 'store']);
    Route::post('/blogs/upload-media', [BlogController::class, 'uploadMedia']);
    Route::post('/blogs/{blog}', [BlogController::class, 'update']);
    Route::delete('/blogs/{blog}', [BlogController::class, 'destroy']);
});

