<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\User\UserService;
use App\Http\Requests\User\UpdateUserRequest;

class UserController extends Controller
{
    public function __construct(protected UserService $service)
    {
        
    }

    public function get(Request $request)
    {
        return $this->service->getUser($request);
    }

    public function update(UpdateUserRequest $request)
    {
        $id = auth()->user()->id;
        return $this->service->update($request->validated(), $id);
    }
}
