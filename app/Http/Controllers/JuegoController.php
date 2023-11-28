<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class JuegoController extends Controller
{
    public function historial()
    {
        $user = Auth::user();
        $historial = Juego::where('jugador1_id', $user->id)
            ->orWhere('jugador2_id', $user->id)
            ->orderByDesc('created_at')
            ->get();

        return view('juegos.historial', compact('user', 'historial'));
    }

    public function porcentajeGanadas()
    {
        $user = Auth::user();
        $totalPartidas = Juego::where('jugador1_id', $user->id)
            ->orWhere('jugador2_id', $user->id)
            ->count();
        $partidasGanadas = Juego::where(function ($query) use ($user) {
                $query->where('jugador1_id', $user->id)->whereColumn('resultado_jugador1', '>', 'resultado_jugador2');
            })
            ->orWhere(function ($query) use ($user) {
                $query->where('jugador2_id', $user->id)->whereColumn('resultado_jugador2', '>', 'resultado_jugador1');
            })
            ->count();

        $porcentajeGanadas = ($totalPartidas > 0) ? ($partidasGanadas / $totalPartidas) * 100 : 0;

        return view('juegos.porcentaje', compact('user', 'porcentajeGanadas'));
    }

    public function create()
    {
        $jugadores = User::all();
        return view('juegos.create', compact('jugadores'));
    }

    public function store(Request $request)
    {
        $request->validate([
            'jugador1_id' => 'required|exists:users,id',
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

        return redirect()->route('juegos.historial')
            ->with('success', 'Partida creada exitosamente.');
    }
}
