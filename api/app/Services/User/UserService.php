<?php

namespace App\Services\User;

use App\Services\Traits\APIResponseTrait;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserService {
    use APIResponseTrait;

    public function getUser(Request $request)
    {
        $user = $request->user();

        return $this->success('Successfully fetched', $user, Response::HTTP_OK);
    }
}