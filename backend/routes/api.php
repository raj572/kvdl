<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\CareerApplicationController;

// Contact form submission
// Public Route
Route::post('/contact', [ContactController::class, 'store']);
Route::post('/careers/apply', [CareerApplicationController::class, 'store']);

// Admin Routes (Protected)
Route::middleware('admin.auth')->group(function () {
    Route::get('/admin/careers', [CareerApplicationController::class, 'index']);
    Route::patch('/admin/careers/{id}', [CareerApplicationController::class, 'update']);
    Route::get('/admin/careers/{id}/resume', [CareerApplicationController::class, 'downloadResume']);
});

// Admin authentication
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->middleware('admin.auth');
Route::get('/admin/me', [AdminAuthController::class, 'me'])->middleware('admin.auth');

// Password Reset Routes
Route::post('/admin/password/forgot', [App\Http\Controllers\Auth\PasswordResetController::class, 'sendResetLink']);
Route::post('/admin/password/reset', [App\Http\Controllers\Auth\PasswordResetController::class, 'resetPassword']);

// Get all contacts (admin only)
Route::get('/contacts', [ContactController::class, 'index'])->middleware('admin.auth');

// Blog management
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{blog}', [BlogController::class, 'show']);
Route::post('/blogs', [BlogController::class, 'store'])->middleware('admin.auth');
Route::post('/blogs/upload-media', [BlogController::class, 'uploadMedia'])->middleware('admin.auth');
Route::post('/blogs/{blog}', [BlogController::class, 'update'])->middleware('admin.auth');
Route::delete('/blogs/{blog}', [BlogController::class, 'destroy'])->middleware('admin.auth');
