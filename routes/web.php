<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JuegoController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Route::middleware('auth')->group(function () {
    Route::get('/juegos/historial', [JuegoController::class, 'historial'])->name('components.juegos.historial');
    Route::get('/juegos/porcentaje', [JuegoController::class, 'porcentajeGanadas'])->name('juegos.porcentaje');
    Route::get('/juegos/create', [JuegoController::class, 'create'])->name('juegos.create');
    Route::post('/juegos/store', [JuegoController::class, 'store'])->name('juegos.store');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/waiting', function () {
    return view('waiting');
})->middleware(['auth', 'verified'])->name('waiting');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
