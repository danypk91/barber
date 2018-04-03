<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/home', 'HomeController@index')->name('home');
Route::get('/clienti', 'Gestione\Clienti\ClientiController@index');
Route::get('/clienti/table', 'Gestione\Clienti\ClientiController@table');
Route::get('/clienti/form', 'Gestione\Clienti\ClientiController@form');
Route::get('/logout', function(){
    Auth::logout();
    return Redirect::to('login');
});
