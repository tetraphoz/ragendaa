<x-app-layout>
    <div class="dashboard">


        <div class=" flex justify-center items-center h-screen">
        <table class="border border-gray-300">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b">Fecha</th>
                    <th class="py-2 px-4 border-b">Jugador 1</th>
                    <th class="py-2 px-4 border-b">Jugador 2</th>
                    <th class="py-2 px-4 border-b">Resultado Jugador 1</th>
                    <th class="py-2 px-4 border-b">Resultado Jugador 2</th>
                </tr>
            </thead>
            <tbody>
                @foreach($historial as $partida)
                    <tr class="hover:bg-gray-100 hover:text-gray-900">
                        <td class="py-2 px-4 border-b">{{ $partida->created_at }}</td>
                        <td class="py-2 px-4 border-b">{{ $partida->jugador1->name }}</td>
                        <td class="py-2 px-4 border-b">{{ $partida->jugador2->name }}</td>
                        <td class="py-2 px-4 border-b">{{ $partida->resultado_jugador1 }}</td>
                        <td class="py-2 px-4 border-b">{{ $partida->resultado_jugador2 }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
</div>

<div class=" flex justify-center items-center">
        <a href="/waiting" class="cta-button inline-flex items-center px-8 py-8 border text-sm leading-4 font-medium rounded-md text-yellow-300 bg-red-800 hover:bg-red-600 hover:text-yellow-200 border-yellow-600 focus:outline-none transition ease-in-out duration-150">
            <button> Empezar a jugar </button>
        </a>
        </div>

        <h1>Porcentaje de partidas ganadas de {{ $user->name }}</h1>

        <p>Partidas totales: {{ $totalPartidas }}</p>
        <p>Partidas ganadas: {{ $partidasGanadas }}</p>
        <p>Porcentaje de partidas ganadas: {{ number_format($porcentajeGanadas, 2) }}%</p>
    </div>
</x-app-layout>
