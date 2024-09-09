<?php

namespace App\Http\Requests\CustomAuth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'username' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                'unique:users,email',
            ],
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
                    ->numbers()
                    ->mixedCase()
                    ->uncompromised(),
            ],
            'agreed_to_terms' => ['required'],
        ];
    }

    protected function passedValidation(): void
    {
        $this->replace([
            ...$this->except('password_confirmation'),
            'password' => bcrypt($this->input('password'))
        ]);
    }
}
