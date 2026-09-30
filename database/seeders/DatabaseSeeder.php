<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Hima Ilkom UNNES',
            'email' => 'himailkom@mail.unnes.ac.id',
            'role' => 'admin',
            'password' => Hash::make('himailkom'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
