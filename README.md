Teste Economapas, feito com PHP, Laravel 9, React, MySQL, APIs RESTful, SPA, Auth com Laravel Sanctum.<br />
<br />
1- A ambiente precisa ter instalado Mysql, PHP, Composer, Node, NPM;<br />
2- Criar uma cópia do arquivo '.env.example' e renomeá-la para '.env';<br />
3- Adicionar credenciais de conexão com um DB/Tabela do Mysql no arquivo '.env';<br />
4- Rodar os scripts para instalar dependências: 'composer install' e 'npm install';<br />
5- Publicar configuração do Sanctum: 'php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"';<br />
6- Rodar migrations e seeder: 'php artisan migrate --seed';<br />
7- Servir localmente: 'php artisan serve';<br />