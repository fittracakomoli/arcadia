<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('organization_settings', function (Blueprint $table) {
            $table->id();
            $table->string('organization_name')->nullable();
            $table->string('cabinet_name')->nullable();
            $table->string('period')->nullable();
            $table->string('logo_horizontal_path')->nullable();
            $table->string('logo_vertical_path')->nullable();
            $table->string('logo_full_path')->nullable();
            $table->string('cover_photo_path')->nullable();
            $table->string('headline')->nullable();
            $table->string('tagline')->nullable();
            $table->text('definition')->nullable();
            $table->string('video_profile_link')->nullable();
            $table->text('vision')->nullable();
            $table->json('mission')->nullable(); // Untuk list misi
            $table->text('name_philosophy')->nullable();
            $table->json('logo_philosophy')->nullable();
            $table->text('address')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->json('contacts')->nullable(); // Untuk list kontak tambahan
            $table->text('google_maps_link')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('organization_settings');
    }
};