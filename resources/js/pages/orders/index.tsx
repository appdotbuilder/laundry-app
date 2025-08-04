import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Order {
    id: number;
    order_number: string;
    service_name: string;
    customer_name: string;
    quantity: number;
    total_price: number;
    formatted_price: string;
    status: string;
    status_label: string;
    pickup_date: string;
    estimated_completion: string;
    created_at: string;
    notes: string;
    staff_notes: string;
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
    orders: {
        data: Order[];
        links: PaginationLink[];
        meta: {
            current_page: number;
            last_page: number;
            per_page: number;
            total: number;
        };
    };
    is_staff: boolean;
    [key: string]: unknown;
}

export default function OrdersIndex({ auth, orders, is_staff }: Props) {
    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            washing: 'bg-indigo-100 text-indigo-800',
            drying: 'bg-purple-100 text-purple-800',
            ironing: 'bg-pink-100 text-pink-800',
            ready: 'bg-green-100 text-green-800',
            completed: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusIcon = (status: string) => {
        const icons = {
            pending: '⏳',
            processing: '🔄',
            washing: '🧼',
            drying: '🌬️',
            ironing: '🔥',
            ready: '✅',
            completed: '🎉',
            cancelled: '❌',
        };
        return icons[status as keyof typeof icons] || '📋';
    };

    return (
        <AppShell user={auth.user}>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {is_staff ? '📋 Kelola Pesanan' : '📦 Pesanan Saya'}
                        </h1>
                        <p className="text-gray-600">
                            {is_staff 
                                ? 'Kelola dan update status semua pesanan pelanggan'
                                : 'Lihat dan lacak status pesanan laundry Anda'
                            }
                        </p>
                    </div>
                    {!is_staff && (
                        <Link href="/orders/create">
                            <Button size="lg">
                                ➕ Pesanan Baru
                            </Button>
                        </Link>
                    )}
                </div>

                {orders.data.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold mb-2">
                            {is_staff ? 'Belum ada pesanan' : 'Belum ada pesanan'}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {is_staff 
                                ? 'Belum ada pesanan dari pelanggan'
                                : 'Anda belum pernah membuat pesanan laundry'
                            }
                        </p>
                        {!is_staff && (
                            <Link href="/orders/create">
                                <Button size="lg">
                                    Buat Pesanan Pertama 🚀
                                </Button>
                            </Link>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid gap-6">
                            {orders.data.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-3">
                                                <span className="text-2xl">
                                                    {getStatusIcon(order.status)}
                                                </span>
                                                <div>
                                                    <h3 className="font-semibold text-lg">
                                                        {order.order_number}
                                                    </h3>
                                                    <p className="text-gray-600">
                                                        {order.service_name}
                                                        {is_staff && (
                                                            <> • {order.customer_name}</>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <div className="text-sm text-gray-500">Jumlah & Total</div>
                                                    <div className="font-medium">
                                                        {order.quantity} kg • {order.formatted_price}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Tanggal Pesan</div>
                                                    <div className="font-medium">{order.created_at}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Ambil Pada</div>
                                                    <div className="font-medium">{order.pickup_date}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-500">Estimasi Selesai</div>
                                                    <div className="font-medium">{order.estimated_completion}</div>
                                                </div>
                                            </div>

                                            {order.notes && (
                                                <div className="mb-4">
                                                    <div className="text-sm text-gray-500 mb-1">Catatan Pelanggan</div>
                                                    <div className="text-sm bg-gray-50 p-3 rounded-lg">
                                                        {order.notes}
                                                    </div>
                                                </div>
                                            )}

                                            {order.staff_notes && (
                                                <div className="mb-4">
                                                    <div className="text-sm text-gray-500 mb-1">Catatan Staff</div>
                                                    <div className="text-sm bg-blue-50 p-3 rounded-lg">
                                                        {order.staff_notes}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="lg:ml-6 lg:text-right">
                                            <div className="mb-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                                                    {order.status_label}
                                                </span>
                                            </div>
                                            <Link href={`/orders/${order.id}`}>
                                                <Button size="sm">
                                                    Lihat Detail 👁️
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {orders.links && orders.links.length > 3 && (
                            <div className="mt-8 flex justify-center">
                                <div className="flex space-x-2">
                                    {orders.links.map((link, index: number) => (
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
            </div>
        </AppShell>
    );
}