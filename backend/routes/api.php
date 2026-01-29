<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\AdminAuthController;

// Contact form submission
Route::post('/contact', [ContactController::class, 'store']);

// Admin authentication
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::post('/admin/logout', [AdminAuthController::class, 'logout'])->middleware('admin.auth');
Route::get('/admin/me', [AdminAuthController::class, 'me'])->middleware('admin.auth');

// Get all contacts (admin only)
Route::get('/contacts', [ContactController::class, 'index'])->middleware('admin.auth');

// Blog management
Route::get('/blogs', [BlogController::class, 'index']);
Route::post('/blogs', [BlogController::class, 'store'])->middleware('admin.auth');
Route::delete('/blogs/{blog}', [BlogController::class, 'destroy'])->middleware('admin.auth');
