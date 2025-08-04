<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    /**
     * Display a listing of active services.
     */
    public function index()
    {
        $services = Service::active()
            ->orderBy('name')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'price' => $service->price,
                    'duration_hours' => $service->duration_hours,
                    'formatted_price' => 'Rp ' . number_format((float) $service->price, 0, ',', '.'),
                ];
            });

        return Inertia::render('services/index', [
            'services' => $services
        ]);
    }
}