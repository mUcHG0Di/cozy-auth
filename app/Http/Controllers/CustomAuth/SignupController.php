<?php

namespace App\Http\Controllers\CustomAuth;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomAuth\SignupRequest;
use App\Models\User;
use Illuminate\Http\Request;

class SignupController extends Controller
{
    public function create()
    {
        return inertia('CustomAuth/Signup');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SignupRequest $request)
    {
        $user = User::create($request->all());

        auth()->login($user);

        return redirect()->route('dashboard');
    }
}
