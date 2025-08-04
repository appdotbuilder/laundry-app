import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Notification {
    id: number;
    type: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
    order_number: string;
    order_id: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    notifications: {
        data: Notification[];
        links: PaginationLink[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    [key: string]: unknown;
}

export default function NotificationsIndex({ auth, notifications }: Props) {
    const getNotificationIcon = (type: string) => {
        const icons = {
            order_created: '📝',
            status_updated: '🔄',
            order_ready: '✅',
            order_completed: '🎉',
        };
        return icons[type as keyof typeof icons] || '🔔';
    };

    const getNotificationColor = (type: string, isRead: boolean) => {
        if (isRead) return 'bg-gray-50 border-gray-200';
        
        const colors = {
            order_created: 'bg-blue-50 border-blue-200',
            status_updated: 'bg-yellow-50 border-yellow-200',
            order_ready: 'bg-green-50 border-green-200',
            order_completed: 'bg-purple-50 border-purple-200',
        };
        return colors[type as keyof typeof colors] || 'bg-blue-50 border-blue-200';
    };

    return (
        <AppShell user={auth.user}>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            🔔 Notifikasi
                        </h1>
                        <p className="text-gray-600">
                            Semua pemberitahuan terkait pesanan laundry Anda
                        </p>
                    </div>

                    {notifications.data.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔕</div>
                            <h3 className="text-xl font-semibold mb-2">Belum ada notifikasi</h3>
                            <p className="text-gray-600 mb-6">
                                Notifikasi akan muncul di sini ketika ada update pesanan
                            </p>
                            <Link href="/orders/create">
                                <Button size="lg">
                                    Buat Pesanan Pertama 🚀
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {notifications.data.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-6 rounded-xl border transition-all hover:shadow-md ${getNotificationColor(notification.type, notification.is_read)}`}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <div className="text-3xl">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className={`font-semibold ${!notification.is_read ? 'text-gray-900' : 'text-gray-700'}`}>
                                                        {notification.title}
                                                    </h3>
                                                    <span className="text-sm text-gray-500">
                                                        {notification.created_at}
                                                    </span>
                                                </div>
                                                
                                                <p className={`mb-3 ${!notification.is_read ? 'text-gray-800' : 'text-gray-600'}`}>
                                                    {notification.message}
                                                </p>
                                                
                                                {notification.order_number && notification.order_id && (
                                                    <div className="flex items-center space-x-4">
                                                        <span className="text-sm text-gray-500">
                                                            Pesanan: {notification.order_number}
                                                        </span>
                                                        <Link href={`/orders/${notification.order_id}`}>
                                                            <Button size="sm" variant="outline">
                                                                Lihat Pesanan 👁️
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                )}
                                                
                                                {!notification.is_read && (
                                                    <div className="mt-2">
                                                        <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                                                        <span className="ml-2 text-xs text-blue-600 font-medium">
                                                            Baru
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {notifications.links && notifications.links.length > 3 && (
                                <div className="mt-8 flex justify-center">
                                    <div className="flex space-x-2">
                                        {notifications.links.map((link, index: number) => (
                                            <Link
                                                key={index}
                                                href={link.url || '#'}
                                                className={`px-3 py-2 rounded-lg text-sm ${
                                                    link.active
                                                        ? 'bg-blue-600 text-white'
                                                        : link.url
                                                        ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Quick Actions */}
                    <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-lg mb-4">Aksi Cepat</h3>
                        <div className="flex flex-wrap gap-3">
                            <Link href="/orders">
                                <Button variant="outline">
                                    📦 Lihat Semua Pesanan
                                </Button>
                            </Link>
                            <Link href="/orders/create">
                                <Button variant="outline">
                                    ➕ Buat Pesanan Baru
                                </Button>
                            </Link>
                            <Link href="/services">
                                <Button variant="outline">
                                    💰 Lihat Daftar Harga
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}