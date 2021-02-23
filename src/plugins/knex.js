'use strict'

const fp = require('fastify-plugin')

const db = require('../../knexfile')

module.exports = fp(async (app) => {

  app.register(require('fastify-knexjs'), db.development, err => console.error(err))

})
