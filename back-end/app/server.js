const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const {
  isEligibleForLiquidityBadgeChad,
  isEligibleForLiquidityBadgeVirgin,
  isEligibleForLiquidityCollector
} = require('./lib/uniswap.js');

const port = 4000;
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const { compound, testCompound } = require('./compound.js');

app.post('/compound', compound);

app.get('/isEligibleForLiquidityBadgeVirgin', isEligibleForLiquidityBadgeVirgin);
app.get('/isEligibleForLiquidityBadgeChad', isEligibleForLiquidityBadgeChad);
app.get('/isEligibleForLiquidityCollector', isEligibleForLiquidityCollector);

app.listen(port, function () {
  console.log('Server is running on ' + port + ' port');
  testCompound();
});
