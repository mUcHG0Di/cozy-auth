<?php

namespace App\Http\Controllers\CustomAuth;
use App\Http\Controllers\Controller;
use App\Http\Requests\CustomAuth\LoginRequest;

class LoginController extends Controller
{
    public function create()
    {
        return inertia('CustomAuth/Login');
    }

    public function store(LoginRequest $customLoginRequest)
    {
        $customLoginRequest->authenticate();
        $customLoginRequest->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }

    public function destroy()
    {
        auth()->logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    }
}
