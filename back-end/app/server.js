const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const port = 4000;
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const { compound, testCompound } = require('./compound.js')

app.post('/compound', compound);

app.listen(port, function () {
  console.log('Server is running on '+ port +' port');
  testCompound();
});
