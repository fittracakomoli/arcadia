<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('underbows', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('logo_path')->nullable();
            $table->json('social_media')->nullable(); // Untuk menyimpan poin-poin sosial media
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('underbows');
    }
};