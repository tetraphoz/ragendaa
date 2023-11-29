<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\Juego;
use Illuminate\Support\Facades\Auth;

class DashboardServiceProvider extends ServiceProvider
{
    public function boot()
    {
        View::composer('dashboard', function ($view) {
            $user = Auth::user();

            $historial = Juego::where('jugador1_id', $user->id)
                ->orWhere('jugador2_id', $user->id)
                ->orderByDesc('created_at')
                ->get();

            $totalPartidas = Juego::where('jugador1_id', $user->id)
                ->orWhere('jugador2_id', $user->id)
                ->count();

            // TODO: Contar correctamente partidas ganadas
            $partidasGanadas = Juego::where(function ($query) use ($user) {
                    $query->where('jugador1_id', $user->id)->whereColumn('resultado_jugador1', '>', 'resultado_jugador2');
                })
                ->orWhere(function ($query) use ($user) {
                    $query->where('jugador2_id', $user->id)->whereColumn('resultado_jugador2', '>', 'resultado_jugador1');
                })
                ->count();

            $porcentajeGanadas = ($totalPartidas > 0) ? ($partidasGanadas / $totalPartidas) * 100 : 0;

            $view->with(compact('historial', 'user', 'totalPartidas', 'partidasGanadas', 'porcentajeGanadas'));
        });
    }
}
