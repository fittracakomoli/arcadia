<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Underbow extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'logo_path',
        'social_media',
    ];

    protected $casts = [
        'social_media' => 'array', // Otomatis konversi JSON ke Array
    ];
}