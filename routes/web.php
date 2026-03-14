<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('upload', 'upload/upload-bank-rx')->name('upload');
});

Route::post('transactions/import', [\App\Http\Controllers\v1\Transaction\BankTransactionController::class, 'import'])->name('transactions.import');

require __DIR__.'/settings.php';
