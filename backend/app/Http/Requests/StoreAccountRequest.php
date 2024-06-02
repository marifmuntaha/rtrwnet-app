<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAccountRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'bank' => 'required|string',
            'number' => 'required|string',
            'name' => 'required|string',
            'description' => 'nullable|string',
        ];
    }
    public function attributes(): array
    {
        return [
            'bank' => 'Nama Bank',
            'number' => 'Nomor Rekening',
            'name' => 'Nama Pemilik',
            'description' => 'Diskripsi',
        ];
    }

    public function prepareForValidation(): void
    {
        $this->merge(['user' => $this->user()->id]);
    }
}
