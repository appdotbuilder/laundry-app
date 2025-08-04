<?php

namespace Database\Factories;

use App\Models\Notification;
use App\Models\User;
use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Notification>
     */
    protected $model = Notification::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = [
            ['type' => 'order_created', 'title' => 'Pesanan Dibuat', 'message' => 'Pesanan baru berhasil dibuat'],
            ['type' => 'status_updated', 'title' => 'Status Diperbarui', 'message' => 'Status pesanan telah diperbarui'],
            ['type' => 'order_ready', 'title' => 'Pesanan Siap', 'message' => 'Pesanan siap untuk diambil'],
            ['type' => 'order_completed', 'title' => 'Pesanan Selesai', 'message' => 'Pesanan telah selesai'],
        ];

        $notif = $this->faker->randomElement($types);

        return [
            'user_id' => User::factory(),
            'order_id' => Order::factory(),
            'type' => $notif['type'],
            'title' => $notif['title'],
            'message' => $notif['message'],
            'is_read' => $this->faker->boolean(30), // 30% chance of being read
        ];
    }
}