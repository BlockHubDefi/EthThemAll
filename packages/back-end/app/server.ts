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
  isEligibleForLiquidationWojak,
  isEligibleForBorrowFrenzy,
  isEligibleForBorrowFrenzy3Tokens,
  isEligibleForBorrowFrenzy6Tokens,
  isEligibleForDepositFrenzy,
  isEligibleForDepositFrenzy3Tokens,
  isEligibleForDepositFrenzy6Tokens
} from './lib/aave';

import { 
  retrieveUserNTNFTBadges,
  retrieveUserTemplateBadge
} from './lib/NTNFT';

// const { compound, testCompound } = require('./compound.js');
// app.post('/compound', compound);

app.post('/isEligibleForLiquidityBadgeVirginUniswap', isEligibleForLiquidityBadgeVirgin);
app.post('/isEligibleForLiquidityBadgeChadUniswap', isEligibleForLiquidityBadgeChad);
app.post('/isEligibleForLiquidityCollectorUniswap', isEligibleForLiquidityCollector);
app.post('/isEligibleForLiquidationWojakAave', isEligibleForLiquidationWojak);
app.post('/isEligibleForDepositFrenzy3TokensAave', isEligibleForDepositFrenzy3Tokens);
app.post('/isEligibleForDepositFrenzy6TokensAave', isEligibleForDepositFrenzy6Tokens);
app.post('/isEligibleForBorrowFrenzy3TokensAave', isEligibleForBorrowFrenzy3Tokens);
app.post('/isEligibleForBorrowFrenzy6TokensAave', isEligibleForBorrowFrenzy6Tokens);
app.post('/isEligibleForDepositFrenzyAave', isEligibleForDepositFrenzy);
app.post('/isEligibleForBorrowFrenzyAave', isEligibleForBorrowFrenzy);
app.post('/isEligibleForSwapFrenzyAave', isEligibleForSwapFrenzy);
app.post('/retrieveUserNTNFTBadges', retrieveUserNTNFTBadges);
app.post('/hasTemplateBadge', retrieveUserTemplateBadge);

app.listen(port, function () {
  log('Server is running on ' + port + ' port');
});
