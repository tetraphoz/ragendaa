<x-app-layout>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <!-- Botón para salir de la partida -->
                <button id="salirPartida" class="btn btn-danger">Salir de la Partida</button>

                <!-- Contenedor del juego -->
                <div id="juego" class="max-w-md"></div>
            </div>
        </div>
    </div>

    <!-- Otras secciones, scripts, etc. -->

    <!-- Script para el juego -->
    <script type="module" src="{{ Vite::asset('resources/js/tablero.ts') }}" defer></script>

    <!-- Puedes agregar más scripts, estilos, etc., según sea necesario -->

    <script>
        // Puedes agregar eventos o funciones aquí, por ejemplo, para manejar el clic del botón
        document.getElementById('salirPartida').addEventListener('click', function () {
            // Lógica para salir de la partida, redirigir a otra página, etc.
            // Puedes implementar una función en tu script de juego para manejar esto
            // Ejemplo: juego.salirPartida();
        });
    </script>
</x-app-layout>
