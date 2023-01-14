'use script'

const fp = require('fastify-plugin')

const crypto = require('crypto')

const plugin = async (app, opts) => {
  app.decorate('crypto', {
    token: () => {
      return new Promise((resolve) => {
        crypto.randomBytes(32, (error, data) => {
          resolve(data.toString('base64'))
        })
      })
    },

    hash: (token) => {
      return crypto.createHmac('sha512', opts.salt).update(token).digest('base64')
    },

    encrypt: encrypt,

    decrypt: decrypt
  })

  const config = Object.values({
    algorithm: 'aes-192-ecb',
    key: 'xyz@A9xZy0W90@XwzY09xYz@',
    init: null
  })

  function encrypt(data) {
    const cipher = crypto.createCipheriv(...config)

    return cipher
      .update(data, 'utf8', 'base64')
      .concat(cipher.final('base64'))
  }

  function decrypt(data) {
    const decipher = crypto.createDecipheriv(...config)

    return decipher
      .update(data, 'base64', 'utf8')
      .concat(decipher.final('utf8'))
  }
}

module.exports = fp(async (app) => {
  app.register(fp(plugin), { salt: '87@@1$' })
})
