<?php

use App\Http\Controllers\ServiceController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public services page
Route::get('/services', [ServiceController::class, 'index'])->name('services.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = auth()->user();
        $data = [];
        
        if ($user->isStaff()) {
            // Staff dashboard data
            $data['stats'] = [
                'total_orders' => \App\Models\Order::count(),
                'pending_orders' => \App\Models\Order::where('status', 'pending')->count(),
                'completed_orders' => \App\Models\Order::where('status', 'completed')->count(),
                'revenue' => \App\Models\Order::where('status', 'completed')->sum('total_price'),
            ];
            $data['recent_orders'] = \App\Models\Order::with(['service', 'user'])
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'order_number' => $order->order_number,
                        'service_name' => $order->service->name,
                        'customer_name' => $order->user->name,
                        'formatted_price' => 'Rp ' . number_format((float) $order->total_price, 0, ',', '.'),
                        'status' => $order->status,
                        'status_label' => $order->status_label,
                        'created_at' => $order->created_at->format('d/m/Y H:i'),
                    ];
                });
        } else {
            // Customer dashboard data
            $data['recent_orders'] = \App\Models\Order::with('service')
                ->where('user_id', $user->id)
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($order) {
                    return [
                        'id' => $order->id,
                        'order_number' => $order->order_number,
                        'service_name' => $order->service->name,
                        'formatted_price' => 'Rp ' . number_format((float) $order->total_price, 0, ',', '.'),
                        'status' => $order->status,
                        'status_label' => $order->status_label,
                        'created_at' => $order->created_at->format('d/m/Y H:i'),
                    ];
                });
        }
        
        return Inertia::render('dashboard', $data);
    })->name('dashboard');
    
    // Orders
    Route::resource('orders', OrderController::class)->except(['edit', 'destroy']);
    
    // Notifications
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
