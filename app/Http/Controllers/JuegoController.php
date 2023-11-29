<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;


class JuegoController extends Controller
{

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'jugador2_id' => 'required|exists:users,id',
            'resultado_jugador1' => 'required|integer',
            'resultado_jugador2' => 'required|integer',
        ]);

        Juego::create([
            'jugador1_id' => Auth::id(),
            'jugador2_id' => $request->jugador2_id,
            'resultado_jugador1' => $request->resultado_jugador1,
            'resultado_jugador2' => $request->resultado_jugador2,
        ]);

        return redirect('/dashboard');
    }
}
