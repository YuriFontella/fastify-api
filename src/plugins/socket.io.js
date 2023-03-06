'use strict'

const fp = require('fastify-plugin')

const socket = require('socket.io')

function plugin(fastify, opts, next) {

  try {
    const handler = socket(fastify.server, opts)

    fastify.decorate('io', handler)

    fastify.addHook('onClose', (fastify, done) => {
      fastify.io.close()
      done()
    })

    next()

  } catch (e) {
    next(err)
  }
}

module.exports = fp(async function (fastify) {
  fastify.register(fp(plugin), {
    cors: { origin: '*' }
  })

}, { name: 'socket' })
