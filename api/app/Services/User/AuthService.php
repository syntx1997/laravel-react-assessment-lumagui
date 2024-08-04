<?php

namespace App\Services\User;

use App\Libraries\PassCrypt;
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
        $params['password'] = PassCrypt::encrypt($this->salt, $params['password']);
        $user = User::create($params);

        return $this->success('Successfully registered', $user, Response::HTTP_OK);
    }

    public function login(array $params)
    {
        $user = User::where('email', $params['email'])->first();

        $decryptPassword = PassCrypt::decrypt($this->salt, $user->password);

        if($decryptPassword != $params['password']) {
            return $this->error('Password is incorrect', Response::HTTP_BAD_REQUEST);
        }

        // Generate Token
        $token = $user->createToken($this->salt)->plainTextToken;

        $data = [
            'token' => $token
        ];

        return $this->success('Successfully logged in', $data, Response::HTTP_OK);
    }
}