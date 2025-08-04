<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of user notifications.
     */
    public function index()
    {
        $notifications = Notification::where('user_id', auth()->id())
            ->with('order')
            ->latest()
            ->paginate(20)
            ->through(function ($notification) {
                return [
                    'id' => $notification->id,
                    'type' => $notification->type,
                    'title' => $notification->title,
                    'message' => $notification->message,
                    'is_read' => $notification->is_read,
                    'created_at' => $notification->created_at->format('d/m/Y H:i'),
                    'order_number' => $notification->order?->order_number,
                    'order_id' => $notification->order?->id,
                ];
            });

        // Mark all as read
        Notification::where('user_id', auth()->id())
            ->where('is_read', false)
            ->update(['is_read' => true]);

        return Inertia::render('notifications/index', [
            'notifications' => $notifications
        ]);
    }


}