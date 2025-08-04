<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Order>
     */
    protected $model = Order::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $service = Service::factory()->create();
        $quantity = $this->faker->numberBetween(1, 5);
        $totalPrice = (float) $service->price * $quantity;
        $pickupDate = $this->faker->dateTimeBetween('+1 day', '+7 days');
        
        return [
            'order_number' => Order::generateOrderNumber(),
            'user_id' => User::factory(),
            'service_id' => $service->id,
            'quantity' => $quantity,
            'total_price' => $totalPrice,
            'status' => $this->faker->randomElement(['pending', 'processing', 'washing', 'ready', 'completed']),
            'notes' => $this->faker->optional()->sentence(),
            'staff_notes' => $this->faker->optional()->sentence(),
            'pickup_date' => $pickupDate,
            'estimated_completion' => now()->addHours($service->duration_hours),
        ];
    }
}