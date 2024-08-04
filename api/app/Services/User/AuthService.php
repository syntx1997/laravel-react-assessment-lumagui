<?php

namespace App\Services\User;

use App\Models\User;
use App\Services\Traits\APIResponseTrait;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class AuthService {
    use APIResponseTrait;

    protected $salt;

    public function __construct()
    {
        $this->salt = env('SECRET_SALT') || '123456';
    }

    public function register(array $params): JsonResponse
    {
        $user = User::create($params);

        return $this->success('Successfully registered', $user, Response::HTTP_OK);
    }

    public function login(array $params): JsonResponse
    {
        $hashedPassword = bcrypt($params['password']);

        $user = User::where([
            'email' => $params['email'],
            'password' => $hashedPassword
        ]);

        if(empty($user)) {
            return $this->error('Username or password is incorrect', Response::HTTP_BAD_REQUEST);
        }

        // Generate Token
        $token = $user->createToken($this->salt)->plainTextToken;

        $data = [
            'token' => $token
        ];

        return $this->success('Successfully logged in', $data, Response::HTTP_OK);
    }
}