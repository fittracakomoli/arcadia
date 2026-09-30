<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'division',
        'photo_path',
        'social_media',
        'period',
    ];

    protected $casts = [
        'social_media' => 'array', // Otomatis konversi JSON ke array
    ];
}