use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('juegos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('jugador1_id');
            $table->unsignedBigInteger('jugador2_id');
            $table->integer('resultado_jugador1');
            $table->integer('resultado_jugador2');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('jugador1_id')->references('id')->on('users');
            $table->foreign('jugador2_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('juegos');
    }
};
