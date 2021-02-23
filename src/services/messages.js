'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {

  app.decorate('message', {
    token: token,
    login: login,
    permission: permission,
    validation: validation
  })

  function token (reply) {
    return reply.code(401).send('Token inválido')
  }

  function login (reply) {
    return reply.code(401).send('Faça o login novamente')
  }

  function permission (reply) {
    return reply.code(401).send('Você não tem permissão para acessar essa rota')
  }

  function validation (reply) {
    return reply.code(400).send('Todos os campos são obrigatórios')
  }
})
