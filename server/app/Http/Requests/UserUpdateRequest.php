<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules["id"] = ["required", "string"];
        $rules["action"] = ["required", "string"];

        if (request()->input("action") == "modifyUser") {
            $rules["name"] = ["required", "string"];
            $rules["email"] = ["required", "email"];
            $rules["password"] = ["required", "string", "min:4", "max:6"];
            $rules["date_of_birth"] = ["required", "date_format:Y-m-d"];
        } else if (request()->input("action") == "deleteUser") {

        }

        return $rules;
        
    }
}
