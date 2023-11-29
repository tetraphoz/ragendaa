<x-app-layout>
  <div class="dashboard">
    <div class="message">
      <p>Bienvenido de vuelta!</p>
    </div>

        <a href="/waiting" class="cta-button">
            <button> Empezar a jugar </button>
        </a>

    @include('juegos.historial')
  </div>
</x-app-layout>
