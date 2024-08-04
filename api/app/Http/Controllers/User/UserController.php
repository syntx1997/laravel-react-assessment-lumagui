<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\User\UserService;

class UserController extends Controller
{
    public function __construct(protected UserService $service)
    {
        
    }

    public function get(Request $request)
    {
        return $this->service->getUser($request);
    }
}
