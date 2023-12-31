<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <!-- Scripts -->
        @vite(['resources/css/app.css', 'resources/js/app.js'])
    </head>
    <body class="font-sans antialiased bg-black text-white items-center min-h-screen">
        <div >
            @include('layouts.navigation')

            <!-- Page Heading -->
            @if (isset($header))
                <!-- <header class="bg-black shadow">
                    <div class="max-w-xl mx-auto py-6 px-4 sm:px-6 lg:px-8"> 
                        {{ $header }}
                    </div>
                </header> -->
            @endif

            <!-- Page Content -->
            <main>
                {{ $slot }}
            </main>
        </div>
    </body>
</html>
