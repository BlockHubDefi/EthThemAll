const express = require('express');
const port = 3001;
const app = express();
app.use(express.json());

const log = console.log;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const {
  isEligibleForLiquidityBadgeChad,
  isEligibleForLiquidityBadgeVirgin,
  isEligibleForLiquidityCollector
} = require('./lib/uniswap.js');

const {
  isEligibleForSwapFrenzy,
  isEligibleForLiquidationWojak
} = require('./lib/aave.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// const { compound, testCompound } = require('./compound.js');
// app.post('/compound', compound);

app.post('/isEligibleForLiquidityBadgeVirgin', isEligibleForLiquidityBadgeVirgin);
app.post('/isEligibleForLiquidityBadgeChad', isEligibleForLiquidityBadgeChad);
app.post('/isEligibleForLiquidityCollector', isEligibleForLiquidityCollector);
app.post('/isEligibleForSwapFrenzy', isEligibleForSwapFrenzy);
app.post('/isEligibleForLiquidationWojak', isEligibleForLiquidationWojak);

app.listen(port, function () {
  log('Server is running on ' + port + ' port');
});
