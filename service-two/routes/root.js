'use strict'

require('dotenv').config();
const axios = require('axios');

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/dummy', async function (request, reply) {
    const dummy = (process.env.RANDOM_TWO ? process.env.RANDOM_TWO : 'service-two')
    return { dummy: dummy }
  })

  fastify.get('/external', async function (request, reply) {
    try {
      const host = (process.env.CONTAINER_ONE ? process.env.CONTAINER_ONE : 'localhost')
      const port = (process.env.API_PORT_ONE ? process.env.API_PORT_ONE : '3001')
      const response = await axios.get('http://' + host + ':' + port + '/dummy');
      return { external: response.data }
    } catch (error) {
      return { error: error.message }
    }
  })
}
