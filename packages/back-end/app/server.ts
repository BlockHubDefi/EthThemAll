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
  isEligibleForLiquidityCollector,
  isEligibleForLiquidityBadgeCollector
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

app.post('/isEligibleForLiquidityBadgeCollectorUniswap', isEligibleForLiquidityBadgeCollector); // templateID: 9 // If the user has a Collecor position inside a liquidity pool (between 1 and 10%)
app.post('/isEligibleForLiquidityBadgeVirginUniswap', isEligibleForLiquidityBadgeVirgin);       // templateID: 8 // If the user has a Virgin position inside a liquidity pool (at least 1%)
app.post('/isEligibleForLiquidityBadgeChadUniswap', isEligibleForLiquidityBadgeChad);           // templateID: 10 // If the user has a Chad position inside a liquidity pool (more than 10%)
app.post('/isEligibleForLiquidityCollectorUniswap', isEligibleForLiquidityCollector);           // templateID: 11 // If the user has provided liquidity to at least 1 pool
app.post('/isEligibleForDepositFrenzy3TokensAave', isEligibleForDepositFrenzy3Tokens);          // templateID: 3 // If the user deposited at least 3 different tokens on Aave
app.post('/isEligibleForDepositFrenzy6TokensAave', isEligibleForDepositFrenzy6Tokens);          // templateID: 4 // If the user deposited at least 6 different tokens on Aave
app.post('/isEligibleForBorrowFrenzy3TokensAave', isEligibleForBorrowFrenzy3Tokens);            // templateID: 6 // If the user borrowed at least 3 different tokens on Aave
app.post('/isEligibleForBorrowFrenzy6TokensAave', isEligibleForBorrowFrenzy6Tokens);            // templateID: 7 // If the user borrowed at least 6 different tokens on Aave
app.post('/isEligibleForLiquidationWojakAave', isEligibleForLiquidationWojak);                  // templateID: 1 // If the user got liquididated at least once on Aave (can add more)
app.post('/isEligibleForDepositFrenzyAave', isEligibleForDepositFrenzy);                        // templateID: 2 // If the user deposited at least once on Aave
app.post('/isEligibleForBorrowFrenzyAave', isEligibleForBorrowFrenzy);                          // templateID: 5 // If the user borrowed at least once on Aave
app.post('/isEligibleForSwapFrenzyAave', isEligibleForSwapFrenzy);                              // templateID: 0 // If the user swaps 50 times or more on Aave
app.post('/retrieveUserNTNFTBadges', retrieveUserNTNFTBadges); // Return all the NTNFT a user has inside his wallet
app.post('/hasTemplateBadge', retrieveUserTemplateBadge); // Return if the user has a specific bagde template inside his wallet

app.listen(port, function () {
  log('Server is running on ' + port + ' port');
});
