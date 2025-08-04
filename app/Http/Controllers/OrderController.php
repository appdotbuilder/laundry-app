<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderStatusRequest;
use App\Models\Order;
use App\Models\Service;
use App\Models\Notification;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     */
    public function index()
    {
        $user = auth()->user();
        
        $query = Order::with(['service', 'user']);
        
        if ($user->isCustomer()) {
            $query->where('user_id', $user->id);
        }
        
        $orders = $query->latest()->paginate(10)->through(function ($order) {
            return [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'service_name' => $order->service->name,
                'customer_name' => $order->user->name,
                'quantity' => $order->quantity,
                'total_price' => $order->total_price,
                'formatted_price' => 'Rp ' . number_format((float) $order->total_price, 0, ',', '.'),
                'status' => $order->status,
                'status_label' => $order->status_label,
                'pickup_date' => $order->pickup_date?->format('d/m/Y H:i'),
                'estimated_completion' => $order->estimated_completion?->format('d/m/Y H:i'),
                'created_at' => $order->created_at->format('d/m/Y H:i'),
                'notes' => $order->notes,
                'staff_notes' => $order->staff_notes,
            ];
        });

        return Inertia::render('orders/index', [
            'orders' => $orders,
            'is_staff' => $user->isStaff(),
        ]);
    }

    /**
     * Show the form for creating a new order.
     */
    public function create()
    {
        $services = Service::active()
            ->orderBy('name')
            ->get()
            ->map(function ($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'price' => $service->price,
                    'formatted_price' => 'Rp ' . number_format((float) $service->price, 0, ',', '.'),
                    'duration_hours' => $service->duration_hours,
                ];
            });

        return Inertia::render('orders/create', [
            'services' => $services
        ]);
    }

    /**
     * Store a newly created order.
     */
    public function store(StoreOrderRequest $request)
    {
        $service = Service::findOrFail($request->service_id);
        $totalPrice = $service->price * $request->quantity;
        
        $order = Order::create([
            'order_number' => Order::generateOrderNumber(),
            'user_id' => auth()->id(),
            'service_id' => $request->service_id,
            'quantity' => $request->quantity,
            'total_price' => $totalPrice,
            'notes' => $request->notes,
            'pickup_date' => $request->pickup_date,
            'estimated_completion' => now()->addHours($service->duration_hours),
        ]);

        // Create notification for the customer
        Notification::create([
            'user_id' => auth()->id(),
            'order_id' => $order->id,
            'type' => 'order_created',
            'title' => 'Pesanan Dibuat',
            'message' => 'Pesanan ' . $order->order_number . ' berhasil dibuat dan sedang menunggu konfirmasi.',
        ]);

        return redirect()->route('orders.show', $order)
            ->with('success', 'Pesanan berhasil dibuat!');
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        $user = auth()->user();
        
        // Check authorization
        if ($user->isCustomer() && $order->user_id !== $user->id) {
            abort(403);
        }

        $orderData = [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'service' => [
                'name' => $order->service->name,
                'description' => $order->service->description,
            ],
            'customer' => [
                'name' => $order->user->name,
                'email' => $order->user->email,
                'phone' => $order->user->phone,
                'address' => $order->user->address,
            ],
            'quantity' => $order->quantity,
            'total_price' => $order->total_price,
            'formatted_price' => 'Rp ' . number_format((float) $order->total_price, 0, ',', '.'),
            'status' => $order->status,
            'status_label' => $order->status_label,
            'pickup_date' => $order->pickup_date?->format('d/m/Y H:i'),
            'estimated_completion' => $order->estimated_completion?->format('d/m/Y H:i'),
            'completed_at' => $order->completed_at?->format('d/m/Y H:i'),
            'created_at' => $order->created_at->format('d/m/Y H:i'),
            'notes' => $order->notes,
            'staff_notes' => $order->staff_notes,
        ];

        return Inertia::render('orders/show', [
            'order' => $orderData,
            'is_staff' => $user->isStaff(),
            'statuses' => Order::$statuses,
        ]);
    }

    /**
     * Update the order status (staff only).
     */
    public function update(UpdateOrderStatusRequest $request, Order $order)
    {
        $oldStatus = $order->status;
        
        $order->update([
            'status' => $request->status,
            'staff_notes' => $request->staff_notes,
            'completed_at' => $request->status === 'completed' ? now() : null,
        ]);

        // Create notification for status change
        if ($oldStatus !== $request->status) {
            Notification::create([
                'user_id' => $order->user_id,
                'order_id' => $order->id,
                'type' => 'status_updated',
                'title' => 'Status Pesanan Diperbarui',
                'message' => 'Status pesanan ' . $order->order_number . ' diubah menjadi: ' . Order::$statuses[$request->status],
            ]);
        }

        return redirect()->route('orders.show', $order)
            ->with('success', 'Status pesanan berhasil diperbarui!');
    }
}