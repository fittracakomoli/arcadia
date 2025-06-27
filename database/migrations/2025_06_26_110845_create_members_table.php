<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position'); // Jabatan, e.g., "Ketua Himpunan"
            $table->string('division'); // Divisi, e.g., "BPH", "Kominfo"
            $table->string('photo_path')->nullable();
            $table->json('social_media')->nullable(); // Untuk menyimpan link medsos (e.g., LinkedIn, Instagram)
            $table->string('period'); // Periode kabinet, e.g., "2025"
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};