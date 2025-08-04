<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->isCustomer();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'service_id' => 'required|exists:services,id',
            'quantity' => 'required|integer|min:1|max:100',
            'notes' => 'nullable|string|max:1000',
            'pickup_date' => 'required|date|after:now',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'service_id.required' => 'Pilih layanan yang diinginkan.',
            'service_id.exists' => 'Layanan yang dipilih tidak tersedia.',
            'quantity.required' => 'Jumlah barang harus diisi.',
            'quantity.integer' => 'Jumlah barang harus berupa angka.',
            'quantity.min' => 'Jumlah barang minimal 1.',
            'quantity.max' => 'Jumlah barang maksimal 100.',
            'pickup_date.required' => 'Tanggal pengambilan harus diisi.',
            'pickup_date.date' => 'Format tanggal tidak valid.',
            'pickup_date.after' => 'Tanggal pengambilan harus setelah hari ini.',
            'notes.max' => 'Catatan maksimal 1000 karakter.',
        ];
    }
}