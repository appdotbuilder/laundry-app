<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Service>
     */
    protected $model = Service::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $services = [
            ['name' => 'Cuci Kering', 'description' => 'Layanan cuci dan kering standar', 'price' => 8000, 'duration' => 24],
            ['name' => 'Cuci Setrika', 'description' => 'Layanan cuci, kering, dan setrika', 'price' => 12000, 'duration' => 48],
            ['name' => 'Cuci Express', 'description' => 'Layanan cuci express dalam 6 jam', 'price' => 15000, 'duration' => 6],
            ['name' => 'Cuci Sepatu', 'description' => 'Layanan khusus cuci sepatu', 'price' => 25000, 'duration' => 72],
            ['name' => 'Cuci Karpet', 'description' => 'Layanan cuci karpet dan permadani', 'price' => 35000, 'duration' => 96],
        ];

        $service = $this->faker->randomElement($services);

        return [
            'name' => $service['name'],
            'description' => $service['description'],
            'price' => $service['price'],
            'duration_hours' => $service['duration'],
            'is_active' => true,
        ];
    }
}