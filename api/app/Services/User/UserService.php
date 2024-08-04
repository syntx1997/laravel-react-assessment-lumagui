<?php

namespace App\Services\User;

use App\Models\User;
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

    public function update(array $params, int $id)
    {
        $user = User::find($id);
        $user->update($params);

        return $this->success('Successfully updated', $user, Response::HTTP_OK);
    }
}