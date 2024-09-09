

**README**
==========

**Laravel Application Installation Guide**
------------------------------------------

### Introduction

This is a Laravel application that provides authentication using Laravel Sanctum and a custom authentication system. This guide will walk you through the steps to install and set up the application.

### Requirements

* PHP 7.4 or higher
* MySQL 5.7 or higher
* Composer
* Node.js (for frontend dependencies)

### Installation Steps

#### Step 1: Clone the Repository

 Clone the repository using Git:
```bash
git clone https://github.com/mUchG0Di/cozy-auth.git
```
#### Step 2: Install Dependencies

 Install the dependencies using Composer:
```bash
composer install
```
#### Step 3: Set up Environment Variables

 Create a copy of the `.env.example` file and rename it to `.env`. Update the environment variables as needed:
```bash
cp .env.example .env
```
#### Step 4: Generate Application Key

 Generate a new application key:
```bash
php artisan key:generate
```
#### Step 5: Run Migrations

 Run the database migrations:
```bash
php artisan migrate
```
#### Step 6: Install Frontend Dependencies

 Install the frontend dependencies using Node.js:
```bash
npm install
```
#### Step 7: Build Frontend Assets

 Build the frontend assets:
```bash
npm run dev
```
#### Step 8: Start the Server

 Start the Laravel development server:
```bash
php artisan serve
```

#### Step 9: Build Frontend Assets

 Build the frontend assets:
```bash
npm run dev
# or
npm run build
```

#### Step 10: Access the Application

 Access the application in your web browser:
```
http://localhost:8000
```
### Authentication

The application provides two authentication systems:

* Laravel Sanctum: Access the Laravel Sanctum form at `http://localhost:8000/login`
* Custom Auth: Access the custom authentication form at `http://localhost:8000/custom/auth/login`

You can find the links for each Authentication system in: `http://localhost:8000/`

### Troubleshooting

If you encounter any issues during the installation process, please reach out to me.
