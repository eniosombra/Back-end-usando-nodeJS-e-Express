const express = require("express");
const server = express();
server.use(express.json());
server.listen(3000);

/** Totalizador das requisições */
let countReq = 0;

//** Array de projetos da aplicação */
let projects = [];

/**
 * Middleware que checa a existência de um Projeto no array.
 * Se o projeto existir, então cria um nova variável dentro da (req)
 * Caso contrário, envia uma mensagem de erro informando que o projeto não existe.
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);

  if (projectIndex === -1)
    return res.status(400).json({ error: `Project ID:${id} not found!` });

  req.projectIndex = projectIndex;
  return next();
}

/**
 * Middle que totaliza as requisições
 */
function logRequests(req, res, next) {
  countReq++;
  console.log("Total requests:", countReq);
  return next();
}

/** Rota global */
server.use(logRequests);

/** Rota para CADASTRAR um Projeto */
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  projects.push({ id: id, title: title, tasks: [] });
  return res.json(projects);
});

/** Rota para LISTAR todos os Projetos */
server.get("/projects", (req, res) => {
  return res.json(projects);
});

/** Rota para ATUALIZAR um Projeto */
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;
  projects[req.projectIndex].title = title;
  return res.json(projects);
});

/** Rota para DELETAR um Projeto */
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  projects.splice(req.projectIndex, 1);
  return res.json(projects);
});

/** Rota para CADASTRAR uma TAREFA em um Projeto */
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  let taskTitle = req.body.title;
  projects[req.projectIndex].tasks.push(taskTitle);
  return res.json(projects[req.projectIndex]);
});
