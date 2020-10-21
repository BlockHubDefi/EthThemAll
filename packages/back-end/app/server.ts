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
  isEligibleForSwapFrenzyAave,
  isEligibleForLiquidationWojakAave,
  isEligibleForBorrowFrenzyAave,
  isEligibleForBorrowFrenzy3TokensAave,
  isEligibleForBorrowFrenzy6TokensAave,
  isEligibleForDepositFrenzyAave,
  isEligibleForDepositFrenzy3TokensAave,
  isEligibleForDepositFrenzy6TokensAave
} from './lib/aave';

import {
  isEligibleForBorrowFrenzyCompound
} from './lib/compound';

import { 
  retrieveUserNTNFTBadges,
  retrieveUserTemplateBadge
} from './lib/NTNFT';

app.post('/isEligibleForBorrowFrenzyCompound', isEligibleForBorrowFrenzyCompound);
app.post('/isEligibleForLiquidityBadgeCollectorUniswap', isEligibleForLiquidityBadgeCollector); // templateID: 9 // If the user has a Collecor position inside a liquidity pool (between 1 and 10%)
app.post('/isEligibleForLiquidityBadgeVirginUniswap', isEligibleForLiquidityBadgeVirgin);       // templateID: 8 // If the user has a Virgin position inside a liquidity pool (at least 1%)
app.post('/isEligibleForLiquidityBadgeChadUniswap', isEligibleForLiquidityBadgeChad);           // templateID: 10 // If the user has a Chad position inside a liquidity pool (more than 10%)
app.post('/isEligibleForLiquidityCollectorUniswap', isEligibleForLiquidityCollector);           // templateID: 11 // If the user has provided liquidity to at least 1 pool
app.post('/isEligibleForDepositFrenzy3TokensAave', isEligibleForDepositFrenzy3TokensAave);          // templateID: 3 // If the user deposited at least 3 different tokens on Aave
app.post('/isEligibleForDepositFrenzy6TokensAave', isEligibleForDepositFrenzy6TokensAave);          // templateID: 4 // If the user deposited at least 6 different tokens on Aave
app.post('/isEligibleForBorrowFrenzy3TokensAave', isEligibleForBorrowFrenzy3TokensAave);            // templateID: 6 // If the user borrowed at least 3 different tokens on Aave
app.post('/isEligibleForBorrowFrenzy6TokensAave', isEligibleForBorrowFrenzy6TokensAave);            // templateID: 7 // If the user borrowed at least 6 different tokens on Aave
app.post('/isEligibleForLiquidationWojakAave', isEligibleForLiquidationWojakAave);                  // templateID: 1 // If the user got liquididated at least once on Aave (can add more)
app.post('/isEligibleForDepositFrenzyAave', isEligibleForDepositFrenzyAave);                        // templateID: 2 // If the user deposited at least once on Aave
app.post('/isEligibleForBorrowFrenzyAave', isEligibleForBorrowFrenzyAave);                          // templateID: 5 // If the user borrowed at least once on Aave
app.post('/isEligibleForSwapFrenzyAave', isEligibleForSwapFrenzyAave);                              // templateID: 0 // If the user swaps 50 times or more on Aave
app.post('/retrieveUserNTNFTBadges', retrieveUserNTNFTBadges); // Return all the NTNFT a user has inside his wallet
app.post('/hasTemplateBadge', retrieveUserTemplateBadge); // Return if the user has a specific bagde template inside his wallet

app.listen(port, function () {
  log('Server is running on ' + port + ' port');
});
