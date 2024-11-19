# API BACKEND CHECKIN 

- instalacao: 
```sh 
npm install 
```
```sh
 npm run dev 
```
```sh
#.env 

DB_HOST=host_name
DB_USERNAME=user_name
DB_PASSWORD=password
DB_NAME=databaseName

```

- Tabelas que serão utilizadas do Banco de dados 
```
admins : Acesso para login
tenants: Dados da empresa / logo / cor 
(tem um campo que se relaciona com admins)
eventos: listagem dos eventos 
(tem um campo que se relaciona com tenant)
ingressos: Listagem dos participantes 
(tem um campo que relaciona com evento)

```
```sh 
# ayload do token

```

- Rotas Criadas:
```sh
App.post('/auth/login', Login);
App.get('/ingressos', ingressosController.List);
App.get('/ingressos/:id', ingressosController.getIngressosById);
App.put('/ingressos', ingressosController.UpdateStatus)
App.get('/eventos', eventosController.List);

```


