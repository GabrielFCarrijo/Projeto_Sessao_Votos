const { request, response } = require("express");
const express = require("express");

const allTodos = [{ name: "aaaa", status: false }];
const todosRoutes = express.Router();
const todosVotos = express.Router();
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

// INSERCAO DE VOTOS

todosRoutes.post("/votos", async(request, response) => {
    const {sessao, estado, voto} = request.body;
    const votos = await prisma.votos.create({
      data:{
        sessao,
        estado,
        voto,
      },
    });
    return response.status(201).json(votos)
});

todosRoutes.get("/votos", async (request, response) => {
  const votos = await prisma.votos.findMany();
  return response.status(200).json(votos);
});

todosRoutes.put("/votos", async (request, response) => {
  const {sessao, estado, id, voto} = request.body;

    if(!id) {
      return response.status(400).json("Id é obrigatorio")
    }
  
    const votoAlredyExist = await prisma.votos.findUnique({where : {id}});

    if(!votoAlredyExist) {
      return response.status(404).json("Voto not exist");
    }

  const votos = await prisma.votos.update({
    where: {
      id,
    },
    data: {
      sessao,
      estado,
      voto,
    },
  });

  return response.status(200).json(votos);
});

todosRoutes.delete("/votos/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id is mandatory");
  }

  const votoAlreadyExist = await prisma.votos.findUnique({
    where: { id: intId },
  });

  if (!votoAlreadyExist) {
    return response.status(404).json("Voto not exist");
  }

  await prisma.votos.delete({ where: { id: intId } });

  return response.status(200).send();
});

// INSERCAO DE SESSAO

todosRoutes.post("/todos", async (request, response) => {
  const { name } = request.body;
  const todo = await prisma.todo.create({
    data: {
      name,
    },
  });
  
  return response.status(201).json(todo);
});

todosRoutes.get("/todos", async (request, response) => {
  const todos = await prisma.todo.findMany();
  return response.status(200).json(todos);
});

todosRoutes.put("/todos", async (request, response) => {
  const {name, id, status} = request.body;

    if(!id) {
      return response.status(400).json("Id é obrigatorio")
    }
  
    const todoAlredyExist = await prisma.todo.findUnique({where : {id}});

    if(!todoAlredyExist) {
      return response.status(404).json("Todo not exist");
    }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });

  return response.status(200).json(todo);
});

todosRoutes.delete("/todos/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json("Id is mandatory");
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: intId },
  });

  if (!todoAlreadyExist) {
    return response.status(404).json("Todo not exist");
  }

  await prisma.todo.delete({ where: { id: intId } });

  return response.status(200).send();
});

module.exports = todosRoutes;
