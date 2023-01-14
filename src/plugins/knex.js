'use strict'

const fp = require('fastify-plugin')
const knex = require('knex')

const { resolve } = require('path')

const knexfile = require(resolve('config/knexfile'))

function plugin(app, opts, next) {

  try {
    const handler = knex(opts)

    app
      .decorate('knex', handler)
      .addHook('onClose', (instance, done) => {

        if (instance.knex === handler) {
          instance.knex.destroy()
          delete instance.knex
        }

        done()
      })

    next()

  } catch (err) {
    next(err)
  }
}

module.exports = fp(async (app) => {
  app.register(fp(plugin), knexfile[process.env.NODE_ENV])
})