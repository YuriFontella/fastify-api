'use strict'

module.exports = async (app) => {

  app.route({
    method: 'POST',
    url: '/',
    preHandler: app.auth([
      app.verifyUser,
      app.registerToken,
      app.saveConnection
    ], { run: 'all' }),

    handler: (request, reply) => {

      if (request.token) {

        reply.send({ token: request.token })
      }

      throw Error('Houve algum problema')
    }
  })

}
