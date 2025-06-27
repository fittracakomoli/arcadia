<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrganizationSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_name', 'cabinet_name', 'period',
        'logo_horizontal_path', 'logo_vertical_path', 'logo_full_path',
        'cover_photo_path', 'headline', 'tagline', 'definition',
        'video_profile_link', 'vision', 'mission', 'name_philosophy',
        'logo_philosophy', 'address', 'email', 'phone', 'contacts',
        'google_maps_link'
    ];

    protected $casts = [
        'mission' => 'array',
        'contacts' => 'array',
        'logo_philosophy' => 'array',
    ];
}