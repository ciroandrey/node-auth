const swaggerJsdoc = require('swagger-jsdoc');
const schemas = require('./schemas');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sua API',
      version: '1.0.0',
      description: 'Documentação da sua API',
    },
    components: {
        schemas: schemas, 
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
