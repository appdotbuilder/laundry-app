import React from 'react';
import { Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    duration_hours: number;
    formatted_price: string;
}

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    services: Service[];
    [key: string]: unknown;
}

export default function ServicesIndex({ auth, services }: Props) {
    const getServiceIcon = (name: string) => {
        if (name.includes('Express')) return '⚡';
        if (name.includes('Setrika')) return '✨';
        if (name.includes('Sepatu')) return '👟';
        if (name.includes('Karpet')) return '🏠';
        if (name.includes('Selimut')) return '🛏️';
        return '👕';
    };

    const getDurationText = (hours: number) => {
        if (hours < 24) return `${hours} jam`;
        const days = Math.floor(hours / 24);
        return `${days} hari`;
    };

    return (
        <AppShell user={auth?.user}>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🧺 Daftar Harga Layanan
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Pilih layanan laundry yang sesuai dengan kebutuhan Anda
                    </p>
                    
                    {auth?.user && (
                        <Link href="/orders/create">
                            <Button size="lg" className="mb-6">
                                Buat Pesanan Baru 📝
                            </Button>
                        </Link>
                    )}
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            <div className="text-center mb-4">
                                <div className="text-5xl mb-3">
                                    {getServiceIcon(service.name)}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {service.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    {service.description}
                                </p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Harga per kg:</span>
                                    <span className="text-2xl font-bold text-blue-600">
                                        {service.formatted_price}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Estimasi:</span>
                                    <span className="font-semibold">
                                        {getDurationText(service.duration_hours)}
                                    </span>
                                </div>
                            </div>

                            {auth?.user ? (
                                <Link href={`/orders/create?service=${service.id}`}>
                                    <Button className="w-full">
                                        Pilih Layanan Ini
                                    </Button>
                                </Link>
                            ) : (
                                <Link href="/register">
                                    <Button variant="outline" className="w-full">
                                        Daftar untuk Memesan
                                    </Button>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Additional Information */}
                <div className="mt-12 bg-blue-50 rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                        📋 Informasi Tambahan
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-2">⏰ Jam Operasional</h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>Senin - Jumat: 08:00 - 20:00</li>
                                <li>Sabtu: 08:00 - 18:00</li>
                                <li>Minggu: 09:00 - 17:00</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg mb-2">📞 Kontak</h3>
                            <ul className="text-gray-600 space-y-1">
                                <li>Telepon: (021) 1234-5678</li>
                                <li>WhatsApp: 0812-3456-7890</li>
                                <li>Email: info@laundryapp.com</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Terms */}
                <div className="mt-8 bg-yellow-50 rounded-xl p-6">
                    <h3 className="font-semibold text-lg mb-3">⚠️ Syarat & Ketentuan</h3>
                    <ul className="text-sm text-gray-700 space-y-2">
                        <li>• Minimum order 2 kg untuk layanan regular</li>
                        <li>• Pembayaran dapat dilakukan cash atau transfer</li>
                        <li>• Barang hilang atau rusak akan diganti maksimal 10x harga laundry</li>
                        <li>• Cucian yang tidak diambil dalam 7 hari akan dikenakan biaya penyimpanan</li>
                        <li>• Kami tidak bertanggung jawab atas barang berharga yang tertinggal di saku</li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}