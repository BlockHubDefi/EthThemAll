import { queryTheGraph } from './graph';
import { addToIPFS } from './ipfs';
import { redeemBadge } from './minting';
const log = console.log;

// If the user has a Chad position inside a liquidity pool (more than 50%)
export const isEligibleForLiquidityBadgeChad = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidityPosition(userAddress, true);
  return res.send(eligible);
}

// If the user has a Virgin position inside a liquidity pool (less than 0.01%)
export const isEligibleForLiquidityBadgeVirgin = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidityPosition(userAddress, false);
  return res.send(eligible);
}

// If the user has provided liquidity to more than 50 different pools
export const isEligibleForLiquidityCollector = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidityCollection(userAddress);
  return res.send(eligible);
}

const verifyUserLiquidityPosition = async (userAddress: string, isChad: boolean) => {
  const subgraph = 'uniswap/uniswap-v2';
  const queryLiquidityPositions = `{user (id: "${userAddress}") {
        liquidityPositions {
          id
          pair {
            token0 {
              symbol
            }
            token1 {
              symbol
            }
          }
          liquidityTokenBalance
        }
      }}`;
  const userLiquidityPosition = await queryTheGraph(subgraph, queryLiquidityPositions);
  log(JSON.stringify(userLiquidityPosition));
  userLiquidityPosition?.user?.liquidityPositions?.forEach(async (liquidityPosition: any) => {
    const queryPairLiquiditySupply = `{pair (id:"${liquidityPosition.id.slice(0, userAddress.length)}"){
            totalSupply
          }}`;
    const pairLiquiditySupply = await queryTheGraph(subgraph, queryPairLiquiditySupply);
    if ((((liquidityPosition.liquidityTokenBalance / pairLiquiditySupply?.pair.totalSupply)) * 100 > 50) && (isChad)) {
      // Store the liquidity pool data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForLiquidityBadgeChad',
        description: 'The user has a Chad position inside a liquidity pool (more than 50%)',
        image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
        dataProof: liquidityPosition
      });      // Then call smart-contract and mint badge NTNFT Chad
      try {
        const tx = await redeemBadge(userAddress, URI, 1);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
    if ((
      ((liquidityPosition.liquidityTokenBalance / pairLiquiditySupply.pair.totalSupply)) * 100 < 0.01) && (liquidityPosition.liquidityTokenBalance > 0) && (!isChad)) {
      // Store the liquidity pool data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForLiquidityBadgeVirgin',
        description: 'The user has a Virgin position inside a liquidity pool (less than 0.01%)',
        image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
        dataProof: liquidityPosition
      });
      // Then call smart-contract and mint badge NTNFT Virgin
      try {
        const tx = await redeemBadge(userAddress, URI, 1);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
  });
  return { isEligible: false };
}

const verifyUserLiquidityCollection = async (userAddress: string) => {
  const subgraph = 'uniswap/uniswap-v2';
  const queryLiquidityPositions = `{user (id: "${userAddress}") {
      liquidityPositions {
        id
        pair {
          token0 {
            symbol
          }
          token1 {
            symbol
          }
        }
        liquidityTokenBalance
      }
    }}`;
  const userLiquidityPosition = await queryTheGraph(subgraph, queryLiquidityPositions);
  log(JSON.stringify(userLiquidityPosition));
  if (userLiquidityPosition?.user?.liquidityPositions?.length > 49) {
    // Store all the pools data inside IPFS meta-data
    const URI = await addToIPFS({
      name: 'isEligibleForLiquidityCollector', 
      description: 'The user has provided liquidity to more than 50 different pools', 
      image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn', 
      dataProof: userLiquidityPosition.user.liquidityPositions 
    });
    // Then call smart-contract and mint badge NTNFT Liquidity pool Collector
    try {
      log(URI);
      const tx = await redeemBadge(userAddress, URI, 1);
      return { isEligible: true, tx: tx };
    } catch (e) { return { isEligible: false }; }
  }
  return { isEligible: false };
}

// For the impermanent loss warrior, reuse that query instead of the user query:
// # Liquidity position with id: // WETH-DAI liquidity pool for instance
// #   liquidityPosition(id: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11-0x6B175474E89094C44Da98b954EedeAC495271d0F"){
// #   	  user {
// #         id
// #       }
// #     liquidityTokenBalance
// #   }
