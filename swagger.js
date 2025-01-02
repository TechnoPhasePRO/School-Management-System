const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./api-docs/swagger.yaml');
const routes = require('./routes/routes');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', routes);

app.listen(3001, () => {
  console.log('Swagger API documentation available at http://localhost:3001/api-docs');
});