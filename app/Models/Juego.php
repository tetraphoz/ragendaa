<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Juego extends Model
{
    use HasFactory;

    protected $fillable = [
        'jugador1_id',
        'jugador2_id',
        'resultado_jugador1',
        'resultado_jugador2',
    ];

    public function jugador1()
    {
        return $this->belongsTo(User::class, 'jugador1_id');
    }

    public function jugador2()
    {
        return $this->belongsTo(User::class, 'jugador2_id');
    }
}
