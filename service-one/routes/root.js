'use strict'

require('dotenv').config();
const axios = require('axios');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/dummy', async function (request, reply) {
    const dummy = (process.env.RANDOM_ONE ? process.env.RANDOM_ONE : 'service-one')
    return { dummy: dummy }
  })

  fastify.get('/external', async function (request, reply) {
    try {
      const host = (process.env.CONTAINER_TWO ? process.env.CONTAINER_TWO : 'localhost')
      const port = (process.env.API_PORT_TWO ? process.env.API_PORT_TWO : '3002')
      const response = await axios.get('http://' + host + ':' + port + '/dummy');
      return { external: response.data }
    } catch (error) {
      return { error: error.message }
    }
  })
}
