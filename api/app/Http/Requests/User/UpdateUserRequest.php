<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user() != NULL;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $id = auth()->user()->id;

        return [
            'name' => "required|string|unique:users,name,$id",
            'email' => "required|email|unique:users,email,$id",
            'type' => "required|string",
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        if(! is_scalar($validator->errors()->messages())) {
            $message = array_map('current', $validator->errors()->messages());
        }

        throw new HttpResponseException(response()->json([
            'status' => false,
            'message' => 'Validation failed',
            'errors' => $message ?? $validator->errors()
        ], 422));
    }
}
