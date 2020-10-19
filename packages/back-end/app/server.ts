import express from 'express';
var cors = require('cors');
const port = 3001;
const app = express();
app.use(cors());
app.use(express.json());

const log = console.log;

import {
  isEligibleForLiquidityBadgeChad,
  isEligibleForLiquidityBadgeVirgin,
  isEligibleForLiquidityCollector
} from './lib/uniswap';

import {
  isEligibleForSwapFrenzy,
  isEligibleForLiquidationWojak
} from './lib/aave';

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
