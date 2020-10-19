import { queryTheGraph } from './graph';
import { addToIPFS } from './ipfs';
import { redeemBadge } from './minting';
const log = console.log;

// If the user swaps 50 times or more on Aave
export const isEligibleForSwapFrenzy = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserSwapHistory(userAddress);
  return res.send(eligible);
}

// If the user borrowed more than 1 times on Aave
export const isEligibleForBorrowFrenzy = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserBorrowHistory(userAddress);
  return res.send(eligible);
}

// If the user borrowed more than 1 times on Aave
export const isEligibleForBorrowFrenzy3Tokens = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserBorrowHistory3Tokens(userAddress);
  return res.send(eligible);
}

// If the user borrowed more than 1 times on Aave
export const isEligibleForBorrowFrenzy6Tokens = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserBorrowHistory6Tokens(userAddress);
  return res.send(eligible);
}

// If the user deposited more than 1 times on Aave
export const isEligibleForDepositFrenzy = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserDepositHistory(userAddress);
  return res.send(eligible);
}

// If the user deposited 3 different tokens or more on Aave
export const isEligibleForDepositFrenzy3Tokens = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserDepositHistory3Tokens(userAddress);
  return res.send(eligible);
}

// If the user deposited 6 different tokens or more on Aave
export const isEligibleForDepositFrenzy6Tokens = async (req: any, res: any) => {
  const userAddress = req.body.userAddress;
  const eligible = await verifyUserDepositHistory6Tokens(userAddress);
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
  if (swapHistory?.user?.swapHistory?.length >= 50) {
    // Store the swap history data inside IPFS meta-data
    const URI = await addToIPFS({
      name: 'isEligibleForSwapFrenzy',
      description: 'The user swaps 50 times or more on Aave',
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

const verifyUserDepositHistory = async (userAddress: string) => {
  const subgraph = 'aave/protocol';
  const queryDepositHistory = `{
        user(id: "${userAddress}") {
          depositHistory {
            id
            amount
            reserve{
              name
            }
          }
      }}`;
  const depositHistory = await queryTheGraph(subgraph, queryDepositHistory);
  log(JSON.stringify(depositHistory));
  if (depositHistory?.user?.depositHistory?.length > 0) {
    // Store the liquditation history data inside IPFS meta-data
    const URI = await addToIPFS({
      name: 'isEligibleForDepositFrenzy',
      description: 'The user deposited more than 1 times on Aave',
      image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
      dataProof: depositHistory.user.depositHistory
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

const verifyUserDepositHistory3Tokens = async (userAddress: string) => {
  const subgraph = 'aave/protocol';
  const queryDepositHistory = `{
        user(id: "${userAddress}") {
          depositHistory {
            id
            amount
            reserve{
              name
            }
          }
      }}`;
  const depositHistory = await queryTheGraph(subgraph, queryDepositHistory);
  log(JSON.stringify(depositHistory));
  if (depositHistory?.user?.depositHistory?.length >= 3) {
    let tmpTokens: string[] = [];
    let count: number = 0;
    for (let i = 0; i < depositHistory?.user?.depositHistory?.length; i++) {
      if (!tmpTokens.includes(depositHistory?.user?.depositHistory[i]?.reserve.name)) {
        tmpTokens.push(depositHistory?.user?.depositHistory[i]?.reserve.name);
        count++;
      }
    }
    if (count >= 3) {
      // Store the liquditation history data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForDepositFrenzy3',
        description: 'The user deposited more than 3 different tokens on Aave',
        image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
        dataProof: depositHistory.user.depositHistory
      });
      // Then call smart-contract and mint badge NTNFT Liquidation Wojak
      try {
        log(URI);
        const tx = await redeemBadge(userAddress, URI.path, 1);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
  }
  return { isEligible: false }
}

const verifyUserDepositHistory6Tokens = async (userAddress: string) => {
  const subgraph = 'aave/protocol';
  const queryDepositHistory = `{
        user(id: "${userAddress}") {
          depositHistory {
            id
            amount
            reserve{
              name
            }
          }
      }}`;
  const depositHistory = await queryTheGraph(subgraph, queryDepositHistory);
  log(JSON.stringify(depositHistory));
  if (depositHistory?.user?.depositHistory?.length >= 6) {
    let tmpTokens: string[] = [];
    let count: number = 0;
    for (let i = 0; i < depositHistory?.user?.depositHistory?.length; i++) {
      if (!tmpTokens.includes(depositHistory?.user?.depositHistory[i]?.reserve.name)) {
        tmpTokens.push(depositHistory?.user?.depositHistory[i]?.reserve.name);
        count++;
      }
    }
    if (count >= 6) {
      // Store the liquditation history data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForDepositFrenzy',
        description: 'The user deposited more than 6 different tokens on Aave',
        image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
        dataProof: depositHistory.user.depositHistory
      });
      // Then call smart-contract and mint badge NTNFT Liquidation Wojak
      try {
        log(URI);
        const tx = await redeemBadge(userAddress, URI.path, 1);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
  }
  return { isEligible: false }
}

const verifyUserBorrowHistory = async (userAddress: string) => {
  const subgraph = 'aave/protocol';
  const queryBorrowHistory = `{
        user(id: "${userAddress}") {
          borrowHistory {
            id
            amount
            timestamp
            reserve {
              name
            }
          }
      }}`;
  const borrowHistory = await queryTheGraph(subgraph, queryBorrowHistory);
  log(JSON.stringify(borrowHistory));
  if (borrowHistory?.user?.borrowHistory?.length > 0) {
    // Store the liquditation history data inside IPFS meta-data
    const URI = await addToIPFS({
      name: 'isEligibleForBorrowManiac',
      description: 'The user borrowed more than 1 times on Aave',
      image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
      dataProof: borrowHistory.user.borrowHistory
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
// To-do: Borrowed more than x token amount on Aave

const verifyUserBorrowHistory3Tokens = async (userAddress: string) => {
  const subgraph = 'aave/protocol';
  const queryBorrowHistory = `{
        user(id: "${userAddress}") {
          borrowHistory {
            id
            amount
            timestamp
            reserve {
              name
            }
          }
      }}`;
  const borrowHistory = await queryTheGraph(subgraph, queryBorrowHistory);
  log(JSON.stringify(borrowHistory));
  if (borrowHistory?.user?.borrowHistory?.length >= 3) {
    let tmpTokens: string[] = [];
    let count: number = 0;
    for (let i = 0; i < borrowHistory?.user?.borrowHistory?.length; i++) {
      if (!tmpTokens.includes(borrowHistory?.user?.borrowHistory[i]?.reserve.name)) {
        tmpTokens.push(borrowHistory?.user?.borrowHistory[i]?.reserve.name);
        count++;
      }
    }
    if (count >= 3) {
      // Store the liquditation history data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForBorrowFrenzy3',
        description: 'The user borrowed more than 3 different assets on Aave',
        image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
        dataProof: borrowHistory.user.borrowHistory
      });
      // Then call smart-contract and mint badge NTNFT Liquidation Wojak
      try {
        log(URI);
        const tx = await redeemBadge(userAddress, URI.path, 1);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
  }
  return { isEligible: false }
}

const verifyUserBorrowHistory6Tokens = async (userAddress: string) => {
  const subgraph = 'aave/protocol';
  const queryBorrowHistory = `{
        user(id: "${userAddress}") {
          borrowHistory {
            id
            amount
            timestamp
            reserve {
              name
            }
          }
      }}`;
  const borrowHistory = await queryTheGraph(subgraph, queryBorrowHistory);
  log(JSON.stringify(borrowHistory));
  if (borrowHistory?.user?.borrowHistory?.length >= 6) {
    let tmpTokens: string[] = [];
    let count: number = 0;
    for (let i = 0; i < borrowHistory?.user?.borrowHistory?.length; i++) {
      if (!tmpTokens.includes(borrowHistory?.user?.borrowHistory[i]?.reserve.name)) {
        tmpTokens.push(borrowHistory?.user?.borrowHistory[i]?.reserve.name);
        count++;
      }
    }
    if (count >= 6) {
      // Store the liquditation history data inside IPFS meta-data
      const URI = await addToIPFS({
        name: 'isEligibleForBorrowFrenzy3',
        description: 'The user borrowed more than 6 different assets on Aave',
        image: 'QmYaRBMTUBve6Uqtgwh4GhLjZzoi99mxVr1pGozSCrYThn',
        dataProof: borrowHistory.user.borrowHistory
      });
      // Then call smart-contract and mint badge NTNFT Liquidation Wojak
      try {
        log(URI);
        const tx = await redeemBadge(userAddress, URI.path, 1);
        return { isEligible: true, tx: tx };
      } catch (e) { return { isEligible: false }; }
    }
  }
  return { isEligible: false }
}