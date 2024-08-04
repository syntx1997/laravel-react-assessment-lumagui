<?php

namespace App\Services\Traits;

use Illuminate\Http\JsonResponse;

trait APIResponseTrait {
    /**
     * Set success 
     * @param ?string $message
     * @param mixed $data
     * @param $statusCode = 201
     * @return JsonResponse
     */
    protected function success(?string $message, mixed $data, $statusCode = 201): JsonResponse
    {
        $payload = [
            'result' => [
                'success' => true,
                'message' => $message,
                'data' => $data,
            ]
        ];

        return response()->json($payload, $statusCode);
    }

     /**
     * Set error
     * @param string|array|null $message
     * @param mixed $data
     * @param $statusCode = 500
     * @return JsonResponse
     */
    public function error($message = 'Internal error', $data = null, $statusCode= 500): JsonResponse
    {
        // reorganize array message
        if(! is_scalar($message)) {
            $message = array_map('current', $message);
        }

        $payload = [
            'result' => [
                'status' => false,
                'message' => $message,
                'data' => $data
            ]
        ];

        return response()->json($payload, $statusCode);
    }
}