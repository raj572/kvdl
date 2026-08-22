<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'reraid',
        'type',
        'title',
        'image',
        'location',
        'pincode',
        'rating',
        'amneties',
        'highlights',
        'images',
        'floorplan',
        'brochure',
        'description',
    ];

    protected $casts = [
        'amneties' => 'array',
        'highlights' => 'array',
        'images' => 'array',
        'floorplan' => 'array',
    ];
}
