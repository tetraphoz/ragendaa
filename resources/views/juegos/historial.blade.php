<h1>Historial</h1>
<table class="border border-gray-300">
    <thead>
        <tr>
            <th cklass="py-2 px-4 border-b">Fecha</th>
            <th class="py-2 px-4 border-b">Jugador 1</th>
            <th class="py-2 px-4 border-b">Jugador 2</th>
            <th class="py-2 px-4 border-b">Resultado Jugador 1</th>
            <th class="py-2 px-4 border-b">Resultado Jugador 2</th>
        </tr>
    </thead>
    <tbody>
        @foreach($historial as $partida)
            <tr class="hover:bg-gray-100">
                <td class="py-2 px-4 border-b">{{ $partida->created_at }}</td>
                <td class="py-2 px-4 border-b">{{ $partida->jugador1->name }}</td>
                <td class="py-2 px-4 border-b">{{ $partida->jugador2->name }}</td>
                <td class="py-2 px-4 border-b">{{ $partida->resultado_jugador1 }}</td>
                <td class="py-2 px-4 border-b">{{ $partida->resultado_jugador2 }}</td>
            </tr>
        @endforeach
    </tbody>
</table>
