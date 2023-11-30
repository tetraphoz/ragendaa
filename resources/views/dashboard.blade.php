<x-app-layout>
    <div class="flex flex-col items-center justify-center min-h-screen">

        <div class="m-8">
            <h1 class="text-3xl font-bold mb-2">Estadisticas de {{ $user->name }}</h1>
            <div class="flex justify-center">
            <p class="m-2">Partidas totales: {{ $totalPartidas }}</p>
            <p class="m-2">Partidas ganadas: {{ $partidasGanadas }}</p>
            <p class="m-2">Porcentaje de partidas ganadas: {{ number_format($porcentajeGanadas, 0) }}%</p>
            </div>
        </div>

<div class="flex justify-center items-center">

    <div class="flex flex-col items-center">
        <a href="/waiting" class="cta-button inline-flex p-5 px-8 py-4 border text-sm leading-4 font-medium rounded-md text-yellow-300 bg-red-800 hover:bg-red-600 hover:text-yellow-200 border-yellow-600 focus:outline-none transition ease-in-out duration-150 mb-8 w-48">
            <button>Empezar a jugar</button>
        </a>

        <a href="/partida" class="cta-button inline-flex p-5 px-8 py-4 border text-sm leading-4 font-medium rounded-md text-yellow-300 bg-blue-800 hover:bg-blue-600 hover:text-yellow-200 border-yellow-600 focus:outline-none transition ease-in-out duration-150 mb-8 w-48">
            <button>Practicar contra CPU</button>
        </a>
    </div>

    <div class="m-8">
        <canvas id="winLossChart" width="400" height="400"></canvas>
    </div>

</div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                var wins = {{ $partidasGanadas }};
                var losses = {{ $partidasGanadas - $totalPartidas }};

                var ctx = document.getElementById('winLossChart').getContext('2d');
                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Ganaste', 'Perdiste'],
                        datasets: [{
                            data: [wins, losses],
                            backgroundColor: ['blue', 'red'],
                        }],
                    },
                });
            });
        </script>

        <div class="flex justify-center items-center">
            <table class="border border-gray-300">
                <thead>
                    <tr>
                        <th class="py-2 px-4 border-b">Fecha</th>
                        <th class="py-2 px-4 border-b">Oponente</th>
                        <th class="py-2 px-4 border-b">Puntuacion de {{$user->name}}</th>
                        <th class="py-2 px-4 border-b">Puntuacion de Oponente</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($historial as $partida)
                        <tr class="hover:bg-gray-100 hover:text-gray-900">
                            <td class="py-2 px-4 border-b">{{ $partida->created_at }}</td>
                            <td class="py-2 px-4 border-b">{{ $partida->jugador2->name }}</td>
                            <td class="py-2 px-4 border-b">{{ $partida->resultado_jugador1 }}</td>
                            <td class="py-2 px-4 border-b">{{ $partida->resultado_jugador2 }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>

    </div>
</x-app-layout>
