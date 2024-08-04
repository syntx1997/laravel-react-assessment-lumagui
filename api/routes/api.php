<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\UserController;

Route::prefix('/auth')->controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login')->name('login');
});

Route::prefix('/user')->controller(UserController::class)->group(function () {
Route::get('/get', 'get')->middleware('auth:sanctum');
});