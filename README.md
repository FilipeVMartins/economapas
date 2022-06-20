Teste Economapas, feito com PHP, Laravel 9, React, MySQL, APIs RESTful, SPA, Auth com Laravel Sanctum.

1- A ambiente precisa ter instalado Mysql, PHP, Composer, Node, NPM;
2- Criar uma cópia do arquivo '.env.example' e renomeá-la para '.env';
3- Adicionar credenciais de conexão com um DB/Tabela do Mysql no arquivo '.env';
4- Rodar os scripts para instalar dependências: 'composer install' e 'npm install';
5- Publicar configuração do Sanctum: 'php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"';
6- Rodar migrations e seeder: 'php artisan migrate --seed';
7- Servir localmente: 'php artisan serve';