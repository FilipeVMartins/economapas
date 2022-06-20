<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use \App\Models\User;
use \App\Models\City;
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


        $capitais = [
            ['Rio Branco', 'AC'],
            ['Maceió', 'AL'],
            ['Macapá', 'AP'],
            ['Manaus', 'AM'],
            ['Salvador', 'BA'],
            ['Fortaleza', 'CE'],
            ['Brasília', 'DF'],
            ['Vitória', 'ES'],
            ['Goiânia', 'GO'],
            ['São Luís', 'MA'],
            ['Cuiabá', 'MT'],
            ['Campo Grande', 'MS'],
            ['Belo Horizonte', 'MG'],
            ['Belém', 'PA'],
            ['João Pessoa', 'PB'],
            ['Curitiba', 'PR'],
            ['Recife', 'PE'],
            ['Teresina', 'PI'],
            ['Rio de Janeiro', 'RJ'],
            ['Natal', 'RN'],
            ['Porto Alegre', 'RS'],
            ['Porto Velho', 'RO'],
            ['Boa Vista', 'RR'],
            ['Florianópolis', 'SC'],
            ['São Paulo', 'SP'],
            ['Aracaju', 'SE'],
            ['Palmas', 'TO']
        ];

        for($i=0; $i<count($capitais); $i++) {
            $city = new City;
            $city->name = $capitais[$i][0];
            $city->state = $capitais[$i][1];
            $city->save();
        }

    }
}
