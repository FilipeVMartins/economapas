<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        
        $user1 = new User;
        $user1->name = 'joao';
        $user1->email = 'joao@test.com';
        $user1->password = Hash::make('1234');
        $user1->save();

        
        $user2 = new User;
        $user2->name = 'maria';
        $user2->email = 'maria@test.com';
        $user2->password = Hash::make('5678');
        $user2->save();


    }
}
