<x-guest-layout>
<h1>Porcentaje de partidas ganadas de {{ $user->name }}</h1>

<p>Partidas totales: {{ $totalPartidas }}</p>
<p>Partidas ganadas: {{ $partidasGanadas }}</p>
<p>Porcentaje de partidas ganadas: {{ number_format($porcentajeGanadas, 2) }}%</p>
</x-guest-layout>