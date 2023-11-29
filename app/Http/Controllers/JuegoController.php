<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Http\Controllers\Controller;


class JuegoController extends Controller
{
    public function historial(): View
    {
        $user = Auth::user();
        $historial = Juego::where('jugador1_id', $user->id)
            ->orWhere('jugador2_id', $user->id)
            ->orderByDesc('created_at')
            ->get();


        return view('juegos.historial', compact('historial'));
    }

    public function porcentajeGanadas(): View
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
