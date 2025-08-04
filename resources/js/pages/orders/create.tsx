import React, { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';

interface Service {
    id: number;
    name: string;
    price: number;
    formatted_price: string;
    duration_hours: number;
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
    services: Service[];
    [key: string]: unknown;
}

export default function OrdersCreate({ auth, services }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        service_id: '',
        quantity: 1,
        notes: '',
        pickup_date: '',
    });

    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [totalPrice, setTotalPrice] = useState(0);

    // Set minimum pickup date to tomorrow
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const minDateString = minDate.toISOString().slice(0, 16);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const serviceId = urlParams.get('service');
        if (serviceId) {
            setData('service_id', serviceId);
            const service = services.find(s => s.id === parseInt(serviceId));
            if (service) {
                setSelectedService(service);
                setTotalPrice(service.price * data.quantity);
            }
        }
    }, [services, data.quantity, setData]);

    const handleServiceChange = (serviceId: string) => {
        setData('service_id', serviceId);
        const service = services.find(s => s.id === parseInt(serviceId));
        setSelectedService(service || null);
        if (service) {
            setTotalPrice(service.price * data.quantity);
        }
    };

    const handleQuantityChange = (quantity: number) => {
        setData('quantity', quantity);
        if (selectedService) {
            setTotalPrice(selectedService.price * quantity);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('orders.store'));
    };

    const getDurationText = (hours: number) => {
        if (hours < 24) return `${hours} jam`;
        const days = Math.floor(hours / 24);
        return `${days} hari`;
    };

    return (
        <AppShell user={auth.user}>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            📝 Buat Pesanan Baru
                        </h1>
                        <p className="text-gray-600">
                            Isi form di bawah untuk membuat pesanan laundry
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Service Selection */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Pilih Layanan *
                            </label>
                            <div className="grid gap-3">
                                {services.map((service) => (
                                    <label
                                        key={service.id}
                                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                            data.service_id === service.id.toString()
                                                ? 'border-blue-500 bg-blue-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="service_id"
                                            value={service.id}
                                            checked={data.service_id === service.id.toString()}
                                            onChange={(e) => handleServiceChange(e.target.value)}
                                            className="mr-3"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">{service.name}</span>
                                                <span className="font-bold text-blue-600">
                                                    {service.formatted_price}/kg
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                Estimasi: {getDurationText(service.duration_hours)}
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <InputError message={errors.service_id} className="mt-2" />
                        </div>

                        {/* Quantity */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Jumlah (kg) *
                            </label>
                            <div className="flex items-center space-x-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuantityChange(Math.max(1, data.quantity - 1))}
                                    disabled={data.quantity <= 1}
                                >
                                    -
                                </Button>
                                <input
                                    type="number"
                                    value={data.quantity}
                                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                    min="1"
                                    max="100"
                                    className="w-20 text-center border border-gray-300 rounded-lg px-3 py-2"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleQuantityChange(Math.min(100, data.quantity + 1))}
                                    disabled={data.quantity >= 100}
                                >
                                    +
                                </Button>
                            </div>
                            <InputError message={errors.quantity} className="mt-2" />
                        </div>

                        {/* Pickup Date */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Tanggal & Waktu Pengambilan *
                            </label>
                            <input
                                type="datetime-local"
                                value={data.pickup_date}
                                onChange={(e) => setData('pickup_date', e.target.value)}
                                min={minDateString}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-sm text-gray-500 mt-2">
                                Pilih kapan Anda ingin mengambil cucian
                            </p>
                            <InputError message={errors.pickup_date} className="mt-2" />
                        </div>

                        {/* Notes */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Catatan Tambahan
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="Tulis catatan khusus untuk pesanan Anda (opsional)"
                                rows={3}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <InputError message={errors.notes} className="mt-2" />
                        </div>

                        {/* Order Summary */}
                        {selectedService && (
                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                                <h3 className="font-semibold text-lg mb-4">📋 Ringkasan Pesanan</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Layanan:</span>
                                        <span className="font-medium">{selectedService.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Jumlah:</span>
                                        <span className="font-medium">{data.quantity} kg</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Harga per kg:</span>
                                        <span className="font-medium">{selectedService.formatted_price}</span>
                                    </div>
                                    <div className="border-t border-blue-200 pt-2 mt-2">
                                        <div className="flex justify-between text-lg font-bold">
                                            <span>Total:</span>
                                            <span className="text-blue-600">
                                                Rp {totalPrice.toLocaleString('id-ID')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-600 mt-2">
                                        Estimasi selesai: {getDurationText(selectedService.duration_hours)}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit */}
                        <div className="flex space-x-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex-1"
                                size="lg"
                            >
                                {processing ? '⏳ Memproses...' : '🚀 Buat Pesanan'}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.get('/services')}
                                size="lg"
                            >
                                Batal
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}