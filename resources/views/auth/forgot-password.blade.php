<x-guest-layout>
    <div class="mb-4 text-sm text-black">
        Haz olvidado tu contraseña? Introduce tu correo y te mandaremos un mensaje con un link para resetearla.
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Correo')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Enviar correo') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout>
