<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\AuthController;

Route::prefix('/auth')->controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});