import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface Order {
    id: number;
    order_number: string;
    service: {
        name: string;
        description: string;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    quantity: number;
    total_price: number;
    formatted_price: string;
    status: string;
    status_label: string;
    pickup_date: string;
    estimated_completion: string;
    completed_at: string;
    created_at: string;
    notes: string;
    staff_notes: string;
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
    order: Order;
    is_staff: boolean;
    statuses: Record<string, string>;
    [key: string]: unknown;
}

export default function OrdersShow({ auth, order, is_staff, statuses }: Props) {
    const [showStatusForm, setShowStatusForm] = useState(false);
    
    const { data, setData, patch, processing, errors } = useForm({
        status: order.status,
        staff_notes: order.staff_notes || '',
    });

    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            processing: 'bg-blue-100 text-blue-800 border-blue-200',
            washing: 'bg-indigo-100 text-indigo-800 border-indigo-200',
            drying: 'bg-purple-100 text-purple-800 border-purple-200',
            ironing: 'bg-pink-100 text-pink-800 border-pink-200',
            ready: 'bg-green-100 text-green-800 border-green-200',
            completed: 'bg-gray-100 text-gray-800 border-gray-200',
            cancelled: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
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

    const handleStatusUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('orders.update', order.id), {
            onSuccess: () => {
                setShowStatusForm(false);
            },
        });
    };

    const getStatusProgress = (status: string) => {
        const steps = ['pending', 'processing', 'washing', 'drying', 'ironing', 'ready', 'completed'];
        const currentIndex = steps.indexOf(status);
        if (status === 'cancelled') return 0;
        return ((currentIndex + 1) / steps.length) * 100;
    };

    return (
        <AppShell user={auth.user}>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <Link 
                                href="/orders" 
                                className="text-blue-600 hover:text-blue-700 mb-2 inline-block"
                            >
                                ← Kembali ke Daftar Pesanan
                            </Link>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                📦 {order.order_number}
                            </h1>
                            <p className="text-gray-600">
                                Dibuat pada {order.created_at}
                            </p>
                        </div>
                        
                        {is_staff && (
                            <Button
                                onClick={() => setShowStatusForm(!showStatusForm)}
                                variant={showStatusForm ? "outline" : "default"}
                            >
                                {showStatusForm ? 'Batal Update' : '✏️ Update Status'}
                            </Button>
                        )}
                    </div>

                    {/* Status Progress */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Status Pesanan</h2>
                            <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)} {order.status_label}
                            </span>
                        </div>
                        
                        {order.status !== 'cancelled' && (
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                                <div 
                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${getStatusProgress(order.status)}%` }}
                                ></div>
                            </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <div className="text-gray-500">Estimasi Selesai</div>
                                <div className="font-medium">{order.estimated_completion}</div>
                            </div>
                            <div>
                                <div className="text-gray-500">Tanggal Ambil</div>
                                <div className="font-medium">{order.pickup_date}</div>
                            </div>
                            {order.completed_at && (
                                <div>
                                    <div className="text-gray-500">Selesai Pada</div>
                                    <div className="font-medium">{order.completed_at}</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status Update Form (Staff Only) */}
                    {is_staff && showStatusForm && (
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-6">
                            <h3 className="text-lg font-semibold mb-4">Update Status Pesanan</h3>
                            <form onSubmit={handleStatusUpdate} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status Baru
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) => setData('status', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {Object.entries(statuses).map(([key, label]) => (
                                            <option key={key} value={key}>
                                                {label}
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.status} className="mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Catatan Staff
                                    </label>
                                    <textarea
                                        value={data.staff_notes}
                                        onChange={(e) => setData('staff_notes', e.target.value)}
                                        placeholder="Tambahkan catatan internal..."
                                        rows={3}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <InputError message={errors.staff_notes} className="mt-1" />
                                </div>

                                <div className="flex space-x-3">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? '⏳ Memproses...' : '💾 Update Status'}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowStatusForm(false)}
                                    >
                                        Batal
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    <div className="grid lg:grid-cols-2 gap-6">
                        {/* Order Details */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">📋 Detail Pesanan</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500">Layanan</div>
                                    <div className="font-medium">{order.service.name}</div>
                                    <div className="text-sm text-gray-600">{order.service.description}</div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-500">Jumlah</div>
                                        <div className="font-medium">{order.quantity} kg</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500">Total Harga</div>
                                        <div className="font-bold text-blue-600 text-lg">
                                            {order.formatted_price}
                                        </div>
                                    </div>
                                </div>

                                {order.notes && (
                                    <div>
                                        <div className="text-sm text-gray-500 mb-2">Catatan Pelanggan</div>
                                        <div className="bg-gray-50 p-3 rounded-lg text-sm">
                                            {order.notes}
                                        </div>
                                    </div>
                                )}

                                {order.staff_notes && (
                                    <div>
                                        <div className="text-sm text-gray-500 mb-2">Catatan Staff</div>
                                        <div className="bg-blue-50 p-3 rounded-lg text-sm">
                                            {order.staff_notes}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-semibold mb-4">👤 Info Pelanggan</h2>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500">Nama</div>
                                    <div className="font-medium">{order.customer.name}</div>
                                </div>
                                
                                <div>
                                    <div className="text-sm text-gray-500">Email</div>
                                    <div className="font-medium">{order.customer.email}</div>
                                </div>
                                
                                {order.customer.phone && (
                                    <div>
                                        <div className="text-sm text-gray-500">Telepon</div>
                                        <div className="font-medium">{order.customer.phone}</div>
                                    </div>
                                )}
                                
                                {order.customer.address && (
                                    <div>
                                        <div className="text-sm text-gray-500">Alamat</div>
                                        <div className="font-medium">{order.customer.address}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Timeline for completed orders */}
                    {order.status === 'completed' && (
                        <div className="mt-6 bg-green-50 rounded-xl p-6 border border-green-200">
                            <div className="text-center">
                                <div className="text-4xl mb-2">🎉</div>
                                <h3 className="text-lg font-semibold text-green-800 mb-2">
                                    Pesanan Telah Selesai!
                                </h3>
                                <p className="text-green-700">
                                    Terima kasih telah menggunakan layanan kami. 
                                    Jangan lupa berikan rating dan review! ⭐
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}