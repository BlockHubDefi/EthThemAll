const { queryTheGraph } = require('./graph.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const log = console.log;

// If the user has a Chad position inside a liquidity pool (more than 50%)
const isEligibleForLiquidityBadgeChad = async (req, res) => {
    // jsonParser(req);
    const userAddress = "";
    // const address = req.body.id;
    const eligible = await verifyUserLiquidityPosition(userAddress, true);
    return res.send(eligible);
}

// If the user has a Virgin position inside a liquidity pool (less than 0.01%)
const isEligibleForLiquidityBadgeVirgin = async (req, res) => {
    // jsonParser(req);
    const userAddress = "";
    // const address = req.body.id;
    const eligible = await verifyUserLiquidityPosition(userAddress, false);
    return res.send(eligible);
}

const verifyUserLiquidityPosition = async (userAddress, isChad) => {
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
    // log(JSON.stringify(userLiquidityPosition));
    userLiquidityPosition.user.liquidityPositions.forEach(async (liquidityPosition) => {
        const queryPairLiquiditySupply = `{pair (id:"${liquidityPosition.id.slice(0, userAddress.length)}"){
            totalSupply
          }}`;
        const pairLiquiditySupply = await queryTheGraph(subgraph, queryPairLiquiditySupply);
        if ((((liquidityPosition.liquidityTokenBalance / pairLiquiditySupply.pair.totalSupply)) * 100 > 50) && (isChad)) {
            // call smart-contract and mint badge NTNFT Chad
            return true;
        }
        if ((((liquidityPosition.liquidityTokenBalance / pairLiquiditySupply.pair.totalSupply)) * 100 < 0.01) && (liquidityPosition.liquidityTokenBalance > 0) &&(!isChad)) {
            // call smart-contract and mint badge NTNFT Virgin
            return true;
        }
    });
    return false;
}

// If the user has provided liquidity to more than 50 different pools
const isEligibleForLiquidityCollector = async (req, res) => {
  // jsonParser(req);
  const userAddress = "";
  // const address = req.body.id;
  const eligible = await verifyUserLiquidityCollection(userAddress);
  return res.send(eligible);
}

const verifyUserLiquidityCollection = async (userAddress) => {
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
  // log(JSON.stringify(userLiquidityPosition));
  if(userLiquidityPosition.user.liquidityPositions.length > 49){
    // call smart-contract and mint badge NTNFT Liquidity pool Collector
    return true;
  }
  return false;
}

// For the impermanent loss warrior, reuse that query instead of the user query:
// # Liquidity position with id: // WETH-DAI liquidity pool for instance
// #   liquidityPosition(id: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11-0x6B175474E89094C44Da98b954EedeAC495271d0F"){
// #   	  user {
// #         id
// #       }
// #     liquidityTokenBalance
// #   }

module.exports = {
    isEligibleForLiquidityBadgeChad,
    isEligibleForLiquidityBadgeVirgin,
    isEligibleForLiquidityCollector
}
