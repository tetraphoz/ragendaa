<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <x-pong.tablero/>
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 center">
                    Historial
                </div>
                <!-- @@forelse ($Juegos as $Juego) -->
                    <!-- Display game details here -->
                    <div class="p-6 border-b border-gray-200">
                        <!-- Game details go here -->
                        <!-- <p>@{{ $game->name }}</p> -->
                        <!-- Add other game details as needed -->
                    </div>
                    <!-- @@empty -->
                    <div class="p-6 text-gray-900">
                        No hay juegos en el historial.
                    </div>
                    <!-- @@endforelse -->
            </div>
        </div>
    </div>
</x-app-layout>
