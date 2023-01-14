'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (app) => {

  app
    .decorate('verifyUser', async (request, reply, done) => {

      try {

        const user = await app.knex('users').where('name', request.body.name).first()

        if (user) {
          const password = app.bcrypt.decrypt(request.body.password, user.password)

          if (password) {
            request.user = { id: user.id }
          }

          else reply.code(404).send('Usuário ou senha incorretos')
        }

      }

      catch (e) {

        throw Error(e.message)
      }

    })
    .decorate('registerToken', (request) => {

      try {

        if (request.user) {

          request.token = app.jwt.sign({ token: request.user.id })
        }

      }

      catch (e) {

        throw Error(e.message)
      }

    })
    .decorate('saveConnection', async (request) => {

      try {

        if (request.access_token) {

          await app.knex('tokens').insert({ user_id: request.user.id })
        }

      } catch (e) {

        throw Error(e.message)

      }

    })
    .register(require('@fastify/auth'))
})
