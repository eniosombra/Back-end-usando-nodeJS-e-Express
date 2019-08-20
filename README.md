# Aplicação back-end usando NodeJS e Express

### Essa aplicação disponibiliza um servidor Back-end com funcionalidades para (cadastrar/alterar/atualizar/excluir) PROJETOS e dentro de cada projeto é possível cadastrar TAREFAS.

## Rotas

- `POST /projects`: Recebe `id` e `title` dentro corpo de cadastrar um novo projeto;

- `GET /projects`: Lista todos projetos e suas tarefas;

- `PUT /projects/:id`: Recebe `title` dentro do corpo da requisição e altera apenas o título do projeto com o `id` presente nos parâmetros da rota;

- `DELETE /projects/:id`: Deleta o projeto com o `id` presente nos parâmetros da rota;

- `POST /projects/:id/tasks`: Receber um campo `title` e armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do `id` presente nos parâmetros da rota;

## Middlewares

- logRequests: Utilizado na rota global para totalizar a quantidade de requisições;
- checkProjectExists: Verifica a existência ou não de um projeto nas rotas onde são obrigatórias o ID do projeto.

## Informações para instalar e executar a aplicação

```
1. Clone ou faça o download deste repositório git
2. $ yarn install
3. $ yarn start
```
