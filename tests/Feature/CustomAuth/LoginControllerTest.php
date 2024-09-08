<?php

namespace Tests\Feature\CustomAuth;

use App\Models\User;
use Illuminate\Testing\TestResponse;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class LoginControllerTest extends TestCase
{
    private User $user;

    protected function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create([
            'email' => 'user@mail.com',
        ]);
    }

    public function testCanRenderLoginPage(): void
    {
        $this->get(uri: 'custom/auth/login')
            ->assertOk();
    }

    public function testCanPerformLogin(): void
    {
        $this->postLogin()
            ->assertRedirect(uri: '/dashboard')
            ->assertCookie(cookieName: 'laravel_session');
    }

    public function testThrottlesLogin(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postLogin(password: 'wrong-password')
                ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $this->postLogin(password: 'wrong-password')
            ->assertStatus(Response::HTTP_TOO_MANY_REQUESTS);
    }

    public function testCanLogout(): void
    {
        auth()->loginUsingId($this->user->id);

        $this->post('custom/auth/logout')
            ->assertRedirect();

        $this->assertFalse(auth()->check());
    }

    private function postLogin(string $password = 'password'): TestResponse
    {
        return $this->postJson('custom/auth/login', [
            'email' => $this->user->email,
            'password' => $password,
        ]);
    }
}
