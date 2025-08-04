<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique()->comment('Unique order identifier');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->integer('quantity')->default(1)->comment('Quantity of items');
            $table->decimal('total_price', 10, 2)->comment('Total order price');
            $table->enum('status', ['pending', 'processing', 'washing', 'drying', 'ironing', 'ready', 'completed', 'cancelled'])
                  ->default('pending')->comment('Order status');
            $table->text('notes')->nullable()->comment('Customer notes');
            $table->text('staff_notes')->nullable()->comment('Staff internal notes');
            $table->datetime('pickup_date')->nullable()->comment('Customer pickup date');
            $table->datetime('estimated_completion')->nullable()->comment('Estimated completion date');
            $table->datetime('completed_at')->nullable()->comment('Actual completion date');
            $table->timestamps();
            
            $table->index('order_number');
            $table->index('user_id');
            $table->index('status');
            $table->index(['status', 'created_at']);
            $table->index('pickup_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};