<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostLoginRequest;
use App\Http\Requests\PostRegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(PostRegisterRequest $request)
    {
        try {
            return ($user = User::create($request->all()))
                ? response([
                    'status' => true,
                    'message' => 'Pendaftaran berhasil, anda akan dialihkan kehalaman member',
                    'result' => Arr::add($user, 'token', $user->createToken($user->email)->plainTextToken)
                ]) : throw new Exception('Terjadi kesalahan server');
        } catch (Exception $exception){
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
    public function login(PostLoginRequest $request)
    {
        try {
            return Auth::attempt($request->all())
                ? response([
                    'status' => true,
                    'message' => 'Berhasil masuk, anda akan dialihkan dalam 2 detik.',
                    'result' => [
                        'user' => $request,
                        'token' => $request->user()->createToken($request->email)->plainTextToken,
                    ]
                ]) : throw new Exception('Alamat email atau kata sandi salah');
        } catch (Exception $exception) {
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
    public function forget(Request $request)
    {

    }
    public function reset()
    {

    }
    public function logout(Request $request)
    {
        try {
            return $request->user()->tokens()->delete()
                ? response([
                    'status' => true,
                    'message' => 'Berhasil logout, anda akan dialihkan dalam 2 detik.',
                    'result' => null
                ]) : throw new Exception('Terjadi kesalahan server');
        } catch (Exception $exception){
            return response([
                'status' => false,
                'message' => $exception->getMessage(),
                'result' => null
            ], 422);
        }
    }
}
