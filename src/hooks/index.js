'use strict'

const fp = require('fastify-plugin')
const fs = require('fs')

module.exports = fp(async (app) => {

  app.addHook('onRequest', async (request, reply) => {

    try {

      const token = request.headers['x-access-token']

      if (token) {

        const jwt = app.jwt.verify(token)

        let [user] = await app.knex('users')
          .select('users.id', 'users.role', 'tokens.is_revoked')
          .innerJoin('tokens', 'users.id', 'tokens.user_id')
          .where('users.id', jwt.token)
          .orderBy('tokens.id', 'desc')
          .limit(1)

        if (!user) {

          throw Error('Usuário não autenticado')
        }

        else {

          request.user = { id: user.id, role: [user.role] }
        }
      }

    }

    catch (e) {

      console.log(e)

      throw Error(e.message)
    }
  })

  app.addHook('onError', (request, reply, error, done) => {
    fs.appendFileSync('error.log', JSON.stringify(error.message) + '\n')
    done()
  })
})
