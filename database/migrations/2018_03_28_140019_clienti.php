<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Clienti extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nominativi', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome');
            $table->string('cognome');
            $table->date('data_nascita')->nullable();
            $table->string('luogo_nascita');
            $table->string('sesso');
            $table->string('indirizzo');
            $table->string('telefono');
            $table->string('email');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nominativi');
    }
}
