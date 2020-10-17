const { queryTheGraph } = require('./graph.js');
const log = console.log;

const isEligibleForSwapFrenzy = async (req, res) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserSwapHistory(userAddress);
  return res.send(eligible);
}

const verifyUserSwapHistory = async (userAddress) => {
  const subgraph = 'aave/protocol';
  const querySwapHistory = `{ user(id: "${userAddress}")
          {
          swapHistory{
            id
          }
        }
      }`;
  const swapHistory = await queryTheGraph(subgraph, querySwapHistory);
  log(JSON.stringify(swapHistory));
  if (swapHistory.user.swapHistory.length > 100) {
    // Store the swap history data inside IPFS meta-data
    // Then call smart-contract and mint badge NTNFT Swap frenzy
    return true;
  }
  return false;
}

const isEligibleForLiquidationWojak = async (req, res) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidationHistory(userAddress);
  return res.send(eligible);
}

const verifyUserLiquidationHistory = async (userAddress) => {
  const subgraph = 'aave/protocol';
  const queryLiquidationHistory = `{
        user(id: "${userAddress}"){
          liquidationCallHistory{
            id
          }
      }}`;
  const liquidationHistory = await queryTheGraph(subgraph, queryLiquidationHistory);
  log(JSON.stringify(liquidationHistory));
  if (liquidationHistory.user.liquidationCallHistory.length > 0) {
    // Store the liquditation history data inside IPFS meta-data
    // Then call smart-contract and mint badge NTNFT Liquidation Wojak
    return true;
  }
  return false;
}

module.exports = {
  isEligibleForSwapFrenzy,
  isEligibleForLiquidationWojak
}
