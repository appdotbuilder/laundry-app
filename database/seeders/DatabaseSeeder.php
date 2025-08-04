<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create services first
        $this->call(ServiceSeeder::class);

        // Create admin user
        User::factory()->create([
            'name' => 'Admin Laundry',
            'email' => 'admin@laundry.com',
            'role' => 'admin',
            'phone' => '081234567890',
            'address' => 'Jl. Laundry No. 1, Jakarta',
        ]);

        // Create staff user
        User::factory()->create([
            'name' => 'Staff Laundry',
            'email' => 'staff@laundry.com',
            'role' => 'staff',
            'phone' => '081234567891',
            'address' => 'Jl. Laundry No. 2, Jakarta',
        ]);

        // Create customer users
        User::factory()->create([
            'name' => 'Customer Test',
            'email' => 'customer@example.com',
            'role' => 'customer',
            'phone' => '081234567892',
            'address' => 'Jl. Customer No. 1, Jakarta',
        ]);

        // Create additional sample customers
        User::factory(5)->create([
            'role' => 'customer',
        ]);
    }
}
