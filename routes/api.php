<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [App\Http\Controllers\AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function() {

    Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);

    Route::get('/cities', [App\Http\Controllers\CityController::class, 'index'])->name('cities');

    Route::get('/groups', [App\Http\Controllers\GroupController::class, 'index'])->name('groups.index');
    Route::post('/groups', [App\Http\Controllers\GroupController::class, 'store'])->name('groups.store');
    Route::patch('/groups', [App\Http\Controllers\GroupController::class, 'update'])->name('groups.update');
    Route::delete('/groups', [App\Http\Controllers\GroupController::class, 'destroy'])->name('groups.destroy');

});