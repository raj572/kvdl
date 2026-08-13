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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('reraid')->nullable();
            $table->string('type')->default('completed'); // completed, ongoing
            $table->string('title');
            $table->string('image')->nullable(); // main cover image
            $table->string('location')->nullable();
            $table->string('pincode')->nullable();
            $table->string('rating')->default('4.0');
            $table->json('amneties')->nullable(); // amenities list
            $table->json('highlights')->nullable(); // highlights list
            $table->json('images')->nullable(); // gallery images list
            $table->string('brochure')->nullable(); // project brochure pdf
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
