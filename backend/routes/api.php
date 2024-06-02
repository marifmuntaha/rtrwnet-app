<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/auth/register', AuthController::class.'@register');
Route::post('/auth/login', AuthController::class.'@login');
Route::group(['middleware' => 'auth:sanctum'], function (){
    Route::apiResource('/master/account', AccountController::class);
    Route::post('/auth/logout', AuthController::class.'@logout');
});
