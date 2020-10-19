import express from 'express';
var cors = require('cors');
import * as dotenv from 'dotenv';
dotenv.config();
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
import { retrieveUserNTNFTBadges } from './lib/NTNFT';

// const { compound, testCompound } = require('./compound.js');
// app.post('/compound', compound);

app.post('/isEligibleForLiquidityBadgeVirgin', isEligibleForLiquidityBadgeVirgin);
app.post('/isEligibleForLiquidityBadgeChad', isEligibleForLiquidityBadgeChad);
app.post('/isEligibleForLiquidityCollector', isEligibleForLiquidityCollector);
app.post('/isEligibleForSwapFrenzy', isEligibleForSwapFrenzy);
app.post('/isEligibleForLiquidationWojak', isEligibleForLiquidationWojak);
app.post('/retrieveUserNTNFTBadges', retrieveUserNTNFTBadges);

app.listen(port, function () {
  log('Server is running on ' + port + ' port');
});
