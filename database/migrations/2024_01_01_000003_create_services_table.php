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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Service name');
            $table->text('description')->nullable()->comment('Service description');
            $table->decimal('price', 10, 2)->comment('Service price');
            $table->integer('duration_hours')->default(24)->comment('Estimated duration in hours');
            $table->boolean('is_active')->default(true)->comment('Service availability status');
            $table->timestamps();
            
            $table->index('is_active');
            $table->index(['is_active', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};