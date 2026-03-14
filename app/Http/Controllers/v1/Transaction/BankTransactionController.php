<?php

namespace App\Http\Controllers\v1\Transaction;

use App\Http\Controllers\Controller;
use App\Imports\CimbTransactionImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class BankTransactionController extends Controller
{
    //
    // public function __invoke(Request $request)
    // {
    //     throw new \Exception('Not implemented');
    // }

    public function import(Request $request)
    {
        $request->validate([
            'file' => [
                'required',
                'file',
                'mimes:csv,xlsx,xls,txt',
                'max:10240', // 10 MB
            ],
        ]);

        try {
            $import = new CimbTransactionImport();
            Excel::import($import, $request->file('file'));
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to initialize import: ' . $e->getMessage()], 500);
        }
    }   
}
