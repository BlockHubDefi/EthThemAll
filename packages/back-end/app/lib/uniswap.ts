import { queryTheGraph } from './graph';
import { addToIPFS } from './ipfs';
import { redeemBadge } from './minting';
import { UniswapWhitelisted } from './definitions';
const log = console.log;

// If the user has a Chad position inside a liquidity pool (more than 10%)
export const isEligibleForLiquidityBadgeChad = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidityPositionChad(userAddress);
  return res.send(eligible);
}

// If the user has a Collecor position inside a liquidity pool (between 1 and 10%)
export const isEligibleForLiquidityBadgeCollector = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidityPositionCollector(userAddress);
  return res.send(eligible);
}


// If the user has a Virgin position inside a liquidity pool (less than 1%)
export const isEligibleForLiquidityBadgeVirgin = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidityPositionVirgin(userAddress);
  return res.send(eligible);
}

// If the user has provided liquidity to at least 1 pool
export const isEligibleForLiquidityCollector = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserLiquidityCollection(userAddress);
  return res.send(eligible);
}

const verifyUserLiquidityPositionVirgin = async (userAddress: string) => {
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
  for (let i = 0; i < userLiquidityPosition?.user?.liquidityPositions?.length; i++) {
    const liquidityPosition = userLiquidityPosition?.user?.liquidityPositions[i];
    const queryPairLiquiditySupply = `{pair (id:"${liquidityPosition.id.slice(0, userAddress.length)}"){
            totalSupply
          }}`;
    const pairLiquiditySupply = await queryTheGraph(subgraph, queryPairLiquiditySupply);
    if ((
      ((liquidityPosition.liquidityTokenBalance / pairLiquiditySupply.pair.totalSupply)) * 100 >= 1) && (liquidityPosition.liquidityTokenBalance > 0) && (( liquidityPosition.pair.token1.symbol == 'WETH' && UniswapWhitelisted.includes(liquidityPosition.pair.token0.symbol) ) || ( liquidityPosition.pair.token0.symbol == 'WETH' && UniswapWhitelisted.includes(liquidityPosition.pair.token1.symbol)))) {
      // Store the liquidity pool data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForLiquidityBadgeVirgin',
        description: 'The user has a Virgin position inside a liquidity pool (at least 1%)',
        image: 'QmRvdvfdbR4knesJ6ianWn4w3WAiTacfqxA7f1DQd5rBJ2',
        dataProof: liquidityPosition
      });
      // Then call smart-contract and mint badge NTNFT Virgin
      try {
        log(URI);
        const tx = await redeemBadge(userAddress, URI.path, 8);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
  }
  return { isEligible: false };
}

const verifyUserLiquidityPositionCollector = async (userAddress: string) => {
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
  for (let i = 0; i < userLiquidityPosition?.user?.liquidityPositions?.length; i++) {
    const liquidityPosition = userLiquidityPosition?.user?.liquidityPositions[i];
    const queryPairLiquiditySupply = `{pair (id:"${liquidityPosition.id.slice(0, userAddress.length)}"){
            totalSupply
          }}`;
    const pairLiquiditySupply = await queryTheGraph(subgraph, queryPairLiquiditySupply);
    if ((((liquidityPosition.liquidityTokenBalance / pairLiquiditySupply?.pair.totalSupply)) * 100 > 1) && (((liquidityPosition.liquidityTokenBalance / pairLiquiditySupply?.pair.totalSupply)) * 100 <= 10) && (( liquidityPosition.pair.token1.symbol == 'WETH' && UniswapWhitelisted.includes(liquidityPosition.pair.token0.symbol) ) || ( liquidityPosition.pair.token0.symbol == 'WETH' && UniswapWhitelisted.includes(liquidityPosition.pair.token1.symbol))) ) {
      // Store the liquidity pool data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForLiquidityBadgeCollector',
        description: 'The user has a Collector position inside a liquidity pool (between 1% and 10%)',
        image: 'QmRvdvfdbR4knesJ6ianWn4w3WAiTacfqxA7f1DQd5rBJ2',
        dataProof: liquidityPosition
      });      // Then call smart-contract and mint badge NTNFT Chad
      try {
        log(URI);
        const tx = await redeemBadge(userAddress, URI.path, 9);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
  }
  return { isEligible: false };
}

const verifyUserLiquidityPositionChad = async (userAddress: string) => {
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
  for (let i = 0; i < userLiquidityPosition?.user?.liquidityPositions?.length; i++) {
    const liquidityPosition = userLiquidityPosition?.user?.liquidityPositions[i];
    const queryPairLiquiditySupply = `{pair (id:"${liquidityPosition.id.slice(0, userAddress.length)}"){
            totalSupply
          }}`;
    const pairLiquiditySupply = await queryTheGraph(subgraph, queryPairLiquiditySupply);
    if ((((liquidityPosition.liquidityTokenBalance / pairLiquiditySupply?.pair.totalSupply)) * 100 > 10) && (( liquidityPosition.pair.token1.symbol == 'WETH' && UniswapWhitelisted.includes(liquidityPosition.pair.token0.symbol) ) || ( liquidityPosition.pair.token0.symbol == 'WETH' && UniswapWhitelisted.includes(liquidityPosition.pair.token1.symbol))) ) {
      // Store the liquidity pool data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForLiquidityBadgeChad',
        description: 'The user has a Chad position inside a liquidity pool (more than 10%)',
        image: 'QmRvdvfdbR4knesJ6ianWn4w3WAiTacfqxA7f1DQd5rBJ2',
        dataProof: liquidityPosition
      });      // Then call smart-contract and mint badge NTNFT Chad
      try {
        log(URI);
        const tx = await redeemBadge(userAddress, URI.path, 10);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
  }
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
  if (userLiquidityPosition?.user?.liquidityPositions?.length > 0) {
    // Store all the pools data inside IPFS meta-data
    const URI = await addToIPFS({
      name: 'isEligibleForLiquidityCollector',
      description: 'The user has provided liquidity to at least 1 pool',
      image: 'QmRvdvfdbR4knesJ6ianWn4w3WAiTacfqxA7f1DQd5rBJ2',
      dataProof: userLiquidityPosition.user.liquidityPositions
    });
    // Then call smart-contract and mint badge NTNFT Liquidity pool Collector
    try {
      log(URI);
      const tx = await redeemBadge(userAddress, URI.path, 11);
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
