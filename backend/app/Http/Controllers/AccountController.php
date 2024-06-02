<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Http\Resources\AccountResource;
use App\Models\Account;
use Exception;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $account = new Account();
        $account = $request->user()->role != 1
            ? $account->whereUser($request->user()->id)
            : $account;
        return response([
            'success' => true,
            'message' => null,
            'result' => AccountResource::collection($account->get()),
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request)
    {
        try {
            return ($account = Account::create($request->all))
                ? response([
                    'success' => true,
                    'message' => 'Data Rekening berhasil ditambahkan',
                    'result' => new AccountResource($account),
                ], 201) : throw new Exception("Terjadi kesalahan server.");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        return response([
            'success' => true,
            'message' => null,
            'result' => new AccountResource($account),
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, Account $account)
    {
        try {
            return $account->update(array_filter($request->all()))
            ? response([
                'success' => true,
                'message' => 'Data Rekening berhasil diperbarui',
                'result' => new AccountResource($account),
            ]) : throw new Exception("Terjadi kesalahan server.");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null,
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        try {
            return $account->delete()
                ? response([
                    'success' => true,
                    'message' => 'Data Rekening berhasil dihapus',
                    'result' => null,
                ]) : throw new Exception("Terjadi kesalahan server.");
        } catch (Exception $exception){
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
                'result' => null,
            ], 422);
        }
    }
}
