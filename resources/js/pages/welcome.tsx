import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            🧺
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">LaundryApp</h1>
                    </div>
                    <div className="space-x-4">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Daftar
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="mb-6">
                        <span className="text-6xl">🧺</span>
                    </div>
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        Laundry Mudah & Terpercaya
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Solusi laundry modern untuk kebutuhan Anda. Pesan online, lacak status real-time, 
                        dan nikmati layanan berkualitas dengan harga terjangkau.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href="/services">
                            <Button size="lg" className="px-8 py-3 text-lg">
                                Lihat Daftar Harga 💰
                            </Button>
                        </Link>
                        {!auth?.user && (
                            <Link href="/register">
                                <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                    Mulai Sekarang ✨
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl mb-4">📱</div>
                        <h3 className="text-lg font-semibold mb-2">Pesan Online</h3>
                        <p className="text-gray-600 text-sm">
                            Pesan layanan laundry kapan saja melalui aplikasi
                        </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl mb-4">🔍</div>
                        <h3 className="text-lg font-semibold mb-2">Lacak Status</h3>
                        <p className="text-gray-600 text-sm">
                            Pantau progress cucian Anda secara real-time
                        </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl mb-4">🔔</div>
                        <h3 className="text-lg font-semibold mb-2">Notifikasi</h3>
                        <p className="text-gray-600 text-sm">
                            Dapatkan pemberitahuan saat cucian siap diambil
                        </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                        <div className="text-3xl mb-4">⭐</div>
                        <h3 className="text-lg font-semibold mb-2">Kualitas Terjamin</h3>
                        <p className="text-gray-600 text-sm">
                            Staf berpengalaman dengan peralatan modern
                        </p>
                    </div>
                </div>

                {/* Services Preview */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
                    <h3 className="text-3xl font-bold text-center mb-8">Layanan Kami</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center p-6 border border-gray-100 rounded-lg">
                            <div className="text-4xl mb-4">👕</div>
                            <h4 className="font-semibold text-lg mb-2">Cuci Kering</h4>
                            <p className="text-gray-600 mb-3">Cuci dan kering standar</p>
                            <p className="text-2xl font-bold text-blue-600">Rp 8.000</p>
                            <p className="text-sm text-gray-500">per kg</p>
                        </div>
                        
                        <div className="text-center p-6 border border-gray-100 rounded-lg">
                            <div className="text-4xl mb-4">✨</div>
                            <h4 className="font-semibold text-lg mb-2">Cuci Setrika</h4>
                            <p className="text-gray-600 mb-3">Cuci, kering, dan setrika</p>
                            <p className="text-2xl font-bold text-blue-600">Rp 12.000</p>
                            <p className="text-sm text-gray-500">per kg</p>
                        </div>
                        
                        <div className="text-center p-6 border border-gray-100 rounded-lg">
                            <div className="text-4xl mb-4">⚡</div>
                            <h4 className="font-semibold text-lg mb-2">Express</h4>
                            <p className="text-gray-600 mb-3">Selesai dalam 6 jam</p>
                            <p className="text-2xl font-bold text-blue-600">Rp 15.000</p>
                            <p className="text-sm text-gray-500">per kg</p>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/services">
                            <Button variant="outline" size="lg">
                                Lihat Semua Layanan 📋
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* How It Works */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-bold mb-8">Cara Kerja</h3>
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">1️⃣</span>
                            </div>
                            <h4 className="font-semibold mb-2">Daftar Akun</h4>
                            <p className="text-gray-600 text-sm">Buat akun dan lengkapi profil Anda</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">2️⃣</span>
                            </div>
                            <h4 className="font-semibold mb-2">Pilih Layanan</h4>
                            <p className="text-gray-600 text-sm">Pilih jenis layanan sesuai kebutuhan</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">3️⃣</span>
                            </div>
                            <h4 className="font-semibold mb-2">Lacak Progress</h4>
                            <p className="text-gray-600 text-sm">Pantau status cucian secara real-time</p>
                        </div>
                        
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">4️⃣</span>
                            </div>
                            <h4 className="font-semibold mb-2">Ambil Cucian</h4>
                            <p className="text-gray-600 text-sm">Ambil cucian yang sudah bersih dan rapi</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white">
                    <h3 className="text-3xl font-bold mb-4">Siap Memulai?</h3>
                    <p className="text-xl mb-8 opacity-90">
                        Bergabunglah dengan ribuan pelanggan yang puas dengan layanan kami
                    </p>
                    <div className="space-x-4">
                        <Link href="/register">
                            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                                Daftar Gratis 🚀
                            </Button>
                        </Link>
                        <Link href="/services">
                            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-blue-600">
                                Lihat Harga 💰
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-600">
                    <p>&copy; 2024 LaundryApp. Semua hak dilindungi.</p>
                </footer>
            </div>
        </div>
    );
}