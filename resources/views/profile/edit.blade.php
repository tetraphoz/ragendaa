<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-center text-yellow-300 leading-tight">
            {{ __('Profile') }}
        </h2>
    </x-slot>

    <div class="flex flex-col m-8">
        <div class="max-w-7xl m-auto sm:px-6 lg:px-8 space-y-6">
            
                    @include('profile.partials.update-profile-information-form')

                    @include('profile.partials.update-password-form')

                    @include('profile.partials.delete-user-form')
        </div>
    </div>
</x-app-layout>
