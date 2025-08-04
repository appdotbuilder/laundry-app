import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    stats?: {
        total_orders?: number;
        pending_orders?: number;
        completed_orders?: number;
        revenue?: number;
    };
    recent_orders?: {
        id: number;
        order_number: string;
        service_name: string;
        customer_name?: string;
        formatted_price: string;
        status: string;
        status_label: string;
        created_at: string;
    }[];
    [key: string]: unknown;
}

export default function Dashboard({ auth, stats, recent_orders }: Props) {
    const isStaff = auth.user.role === 'staff' || auth.user.role === 'admin';
    const isCustomer = auth.user.role === 'customer';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="text-3xl">
                            {isStaff ? '👨‍💼' : '👤'}
                        </span>
                        <div>
                            <h1 className="text-2xl font-bold">
                                Selamat datang, {auth.user.name}! 
                            </h1>
                            <p className="opacity-90">
                                {isStaff ? 'Dashboard Staff Laundry' : 'Dashboard Pelanggan'}
                            </p>
                        </div>
                    </div>
                    <p className="text-blue-100">
                        {isStaff 
                            ? 'Kelola pesanan dan layani pelanggan dengan baik'
                            : 'Nikmati layanan laundry terpercaya dengan mudah'
                        }
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {isCustomer && (
                        <>
                            <Link href="/orders/create">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="text-3xl mb-3">📝</div>
                                    <h3 className="font-semibold text-lg mb-2">Buat Pesanan</h3>
                                    <p className="text-gray-600 text-sm">Pesan layanan laundry baru</p>
                                </div>
                            </Link>
                            
                            <Link href="/orders">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="text-3xl mb-3">📦</div>
                                    <h3 className="font-semibold text-lg mb-2">Pesanan Saya</h3>
                                    <p className="text-gray-600 text-sm">Lihat dan lacak pesanan</p>
                                </div>
                            </Link>
                        </>
                    )}
                    
                    {isStaff && (
                        <>
                            <Link href="/orders">
                                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="text-3xl mb-3">📋</div>
                                    <h3 className="font-semibold text-lg mb-2">Kelola Pesanan</h3>
                                    <p className="text-gray-600 text-sm">Update status pesanan</p>
                                </div>
                            </Link>
                        </>
                    )}
                    
                    <Link href="/services">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-3xl mb-3">💰</div>
                            <h3 className="font-semibold text-lg mb-2">Daftar Harga</h3>
                            <p className="text-gray-600 text-sm">Lihat semua layanan</p>
                        </div>
                    </Link>
                    
                    <Link href="/notifications">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-3xl mb-3">🔔</div>
                            <h3 className="font-semibold text-lg mb-2">Notifikasi</h3>
                            <p className="text-gray-600 text-sm">Lihat pemberitahuan</p>
                        </div>
                    </Link>
                </div>

                {/* Statistics (for staff) */}
                {isStaff && stats && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Pesanan</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.total_orders || 0}
                                    </p>
                                </div>
                                <div className="text-3xl">📊</div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Pesanan Pending</p>
                                    <p className="text-2xl font-bold text-yellow-600">
                                        {stats.pending_orders || 0}
                                    </p>
                                </div>
                                <div className="text-3xl">⏳</div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Pesanan Selesai</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {stats.completed_orders || 0}
                                    </p>
                                </div>
                                <div className="text-3xl">✅</div>
                            </div>
                        </div>
                        
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Pendapatan</p>
                                    <p className="text-2xl font-bold text-blue-600">
                                        Rp {(stats.revenue || 0).toLocaleString('id-ID')}
                                    </p>
                                </div>
                                <div className="text-3xl">💰</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-semibold">
                            {isStaff ? '📋 Pesanan Terbaru' : '📦 Aktivitas Terbaru'}
                        </h2>
                    </div>
                    
                    <div className="p-6">
                        {recent_orders && recent_orders.length > 0 ? (
                            <div className="space-y-4">
                                {recent_orders.slice(0, 5).map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className="text-2xl">📦</div>
                                            <div>
                                                <p className="font-medium">{order.order_number}</p>
                                                <p className="text-sm text-gray-600">
                                                    {order.service_name} • {order.formatted_price}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                                {order.status_label}
                                            </span>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {order.created_at}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                
                                <div className="text-center pt-4">
                                    <Link href="/orders">
                                        <Button variant="outline">
                                            Lihat Semua Pesanan
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-3">📋</div>
                                <p className="text-gray-600 mb-4">
                                    {isStaff ? 'Belum ada pesanan dari pelanggan' : 'Belum ada aktivitas'}
                                </p>
                                {isCustomer && (
                                    <Link href="/orders/create">
                                        <Button>
                                            Buat Pesanan Pertama
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Getting Started (for new customers) */}
                {isCustomer && (!recent_orders || recent_orders.length === 0) && (
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                        <h3 className="text-lg font-semibold text-blue-900 mb-4">
                            🚀 Mulai Menggunakan LaundryApp
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium text-blue-800">1. Lihat Daftar Harga</h4>
                                <p className="text-blue-700 text-sm">
                                    Cek berbagai layanan dan harga yang tersedia
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-blue-800">2. Buat Pesanan</h4>
                                <p className="text-blue-700 text-sm">
                                    Pilih layanan dan jadwalkan pengambilan
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-blue-800">3. Lacak Progress</h4>
                                <p className="text-blue-700 text-sm">
                                    Pantau status cucian secara real-time
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-blue-800">4. Terima Notifikasi</h4>
                                <p className="text-blue-700 text-sm">
                                    Dapatkan pemberitahuan saat cucian siap
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}