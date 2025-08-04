<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        $services = [
            [
                'name' => 'Cuci Kering',
                'description' => 'Layanan cuci dan kering standar untuk pakaian sehari-hari',
                'price' => 8000,
                'duration_hours' => 24,
                'is_active' => true,
            ],
            [
                'name' => 'Cuci Setrika',
                'description' => 'Layanan lengkap cuci, kering, dan setrika rapi',
                'price' => 12000,
                'duration_hours' => 48,
                'is_active' => true,
            ],
            [
                'name' => 'Cuci Express',
                'description' => 'Layanan cuci cepat selesai dalam 6 jam',
                'price' => 15000,
                'duration_hours' => 6,
                'is_active' => true,
            ],
            [
                'name' => 'Cuci Sepatu',
                'description' => 'Layanan khusus cuci sepatu dengan perawatan premium',
                'price' => 25000,
                'duration_hours' => 72,
                'is_active' => true,
            ],
            [
                'name' => 'Cuci Karpet',
                'description' => 'Layanan cuci karpet, permadani, dan barang besar lainnya',
                'price' => 35000,
                'duration_hours' => 96,
                'is_active' => true,
            ],
            [
                'name' => 'Cuci Selimut',
                'description' => 'Layanan cuci selimut tebal dan bed cover',
                'price' => 20000,
                'duration_hours' => 48,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}