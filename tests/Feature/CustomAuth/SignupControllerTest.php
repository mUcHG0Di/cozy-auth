<?php

namespace Tests\Feature\CustomAuth;

use App\Models\User;
use Illuminate\Testing\TestResponse;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;

class SignupControllerTest extends TestCase
{
    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create(['email' => 'existing-test@mail.com']);
    }

    public function testCanRenderLoginPage(): void
    {
        $this->get(uri: 'custom/auth/signup')
            ->assertOk();
    }

    public function testCanPerformSignup(): void
    {
        $this->postSignup()
            ->assertRedirect(uri: '/dashboard')
            ->assertCookie(cookieName: 'laravel_session');
    }

    public function testCannotUseRepeatedEmail(): void
    {
        $this->postSignup(email: $this->user->email)
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
            ->assertJsonFragment(['errors' => ['email' => ['The email has already been taken.']]]);
    }

    public function testThrottlesSignup(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $this->postSignup(password: 'wrong-password')
                ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY)
                ->assertJsonStructure(['errors' => ['password']]);
        }

        $this->postSignup(password: 'Abc12345@!8706')
            ->assertStatus(Response::HTTP_TOO_MANY_REQUESTS);
    }

    private function postSignup(string $email = 'test@mail.com', string $password = 'Abc12345@!8706'): TestResponse
    {
        return $this->postJson(uri: 'custom/auth/signup', data: [
            'username' => 'test',
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
            'agreed_to_terms' => true,
        ]);
    }
}
