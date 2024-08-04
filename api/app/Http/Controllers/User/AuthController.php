<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\StoreRegisterRequest;
use App\Services\User\AuthService;
use App\Http\Requests\User\StoreLoginRequest;

class AuthController extends Controller
{
    public function __construct(protected AuthService $service)
    {

    }

    public function register(StoreRegisterRequest $request)
    {
        return $this->service->register($request->validated());
    }

    public function login(StoreLoginRequest $request)
    {
        return $this->service->login($request->validated());
    }
}
