import { queryTheGraph } from './graph';
import { addToIPFS } from './ipfs';
import { redeemBadge } from './minting';
const log = console.log;

// If the user swaps more than 100 times on Aave
export const isEligibleForSwapFrenzy = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserSwapHistory(userAddress);
  return res.send(eligible);
}

// If the user got liquididated at least once on Aave (can add more)
export const isEligibleForLiquidationWojak = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidationHistory(userAddress);
  return res.send(eligible);
}

const verifyUserSwapHistory = async (userAddress: string) => {
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
  if (swapHistory?.user?.swapHistory?.length > 100) {
    // Store the swap history data inside IPFS meta-data
    const URI = await addToIPFS({
      name: 'isEligibleForSwapFrenzy',
      description: 'The user swaps more than 100 times on Aave',
      image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
      dataProof: swapHistory.user.swapHistory
    });
    // Then call smart-contract and mint badge NTNFT Swap frenzy
    try {
      log(URI);
      const tx = await redeemBadge(userAddress, URI.path, 1);
      return { isEligible: true, tx: tx };
    } catch (e) { return { isEligible: false }; }
  }
  return { isEligible: false };
}

const verifyUserLiquidationHistory = async (userAddress: string) => {
  const subgraph = 'aave/protocol';
  const queryLiquidationHistory = `{
        user(id: "${userAddress}"){
          liquidationCallHistory{
            id
          }
      }}`;
  const liquidationHistory = await queryTheGraph(subgraph, queryLiquidationHistory);
  log(JSON.stringify(liquidationHistory));
  if (liquidationHistory?.user?.liquidationCallHistory?.length > 0) {
    // Store the liquditation history data inside IPFS meta-data
    const URI = await addToIPFS({
      name: 'isEligibleForLiquidationWojak',
      description: 'The user got liquididated at least once on Aave',
      image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
      dataProof: liquidationHistory.user.liquidationCallHistory
    });
    // Then call smart-contract and mint badge NTNFT Liquidation Wojak
    try {
      log(URI);
      const tx = await redeemBadge(userAddress, URI.path, 1);
      return { isEligible: true, tx: tx };
    } catch (e) { return { isEligible: false }; }
  }
  return { isEligible: false }
}
