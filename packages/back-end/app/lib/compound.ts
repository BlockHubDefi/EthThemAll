import axios from 'axios';
import { addToIPFS } from './ipfs';
import { redeemBadge } from './minting';
const log = console.log;

export const isEligibleForBorrowFrenzyCompound = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const eligible = await verifyUserBorrowHistory(userAddress);
    return res.send(eligible);
}

export const isEligibleForBorrowFrenzy3TokensCompound = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const eligible = await verifyUserBorrowHistory3Tokens(userAddress);
    return res.send(eligible);
}

export const isEligibleForBorrowFrenzy6TokensCompound = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const eligible = await verifyUserBorrowHistory6Tokens(userAddress);
    return res.send(eligible);
}

export const isEligibleForDepositFrenzyCompound = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const eligible = await verifyUserDepositHistory(userAddress);
    return res.send(eligible);
}

export const isEligibleForDepositFrenzy3TokensCompound = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const eligible = await verifyUserDepositHistory3Tokens(userAddress);
    return res.send(eligible);
}

export const isEligibleForDepositFrenzy6TokensCompound = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const eligible = await verifyUserDepositHistory6Tokens(userAddress);
    return res.send(eligible);
}

const queryCoumpoundApi = async (compoundApi: string, query: string) => {
    try {
        const result = await axios.post(
            `https://api.compound.finance/api/v2/${compoundApi}`,
            { query }
        );
        return result;
    } catch (error) {
        log(error);
        return;
    }
}

// const verifyUserLiquidationHistory = async (userAddress: string) => {
//     const subgraph = 'aave/protocol';
//     const queryLiquidationHistory = `{
//           user(id: "${userAddress}"){
//             liquidationCallHistory{
//               id
//             }
//         }}`;
//     const liquidationHistory = await queryCoumpoundApi(compoundApi, queryLiquidationHistory);
//     log(JSON.stringify(liquidationHistory));
//     if (liquidationHistory?.user?.liquidationCallHistory?.length > 0) {
//       // Store the liquditation history data inside IPFS meta-data
//       const URI = await addToIPFS({
//         name: 'isEligibleForLiquidationWojak',
//         description: 'The user got liquididated at least once on Aave',
//         image: 'QmRvdvfdbR4knesJ6ianWn4w3WAiTacfqxA7f1DQd5rBJ2',
//         dataProof: liquidationHistory.user.liquidationCallHistory
//       });
//       // Then call smart-contract and mint badge NTNFT Liquidation Wojak
//       try {
//         log(URI);
//         const tx = await redeemBadge(userAddress, URI.path, 1);
//         return { isEligible: true, tx: tx };
//       } catch (e) { return { isEligible: false }; }
//     }
//     return { isEligible: false }
//   }

const verifyUserBorrowHistory = async (userAddress: string) => {
    const compoundApi = "account";
    const queryBorrowHistory = `{"addresses": "${userAddress}"}`;
    const borrowHistory = await queryCoumpoundApi(compoundApi, queryBorrowHistory);
    log(borrowHistory);
    if (borrowHistory) {
        const URI = await addToIPFS({
            name: 'isEligibleForBorrowManiacCompound',
            description: 'The user borrowed at least once on Compound',
            image: ''
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 5);
            return { isEligible: true, tx: tx };
          } catch (e) { return { isEligible: false }; }
        }
        return { isEligible: false };
}

const verifyUserBorrowHistory3Tokens = async (userAddress: string) => {
    const compoundApi = "account";
    const queryBorrowHistory = `{"addresses": "${userAddress}"}`;
    const borrowHistory = await queryCoumpoundApi(compoundApi, queryBorrowHistory);
    log(borrowHistory);
    if (borrowHistory) {
        const URI = await addToIPFS({
            name: 'isEligibleForBorrowFrenzy3Compound',
            description: 'The user borrowed at least 3 different assets on Compound',
            image: ''
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 5);
            return { isEligible: true, tx: tx };
          } catch (e) { return { isEligible: false }; }
        }
        return { isEligible: false };
}

const verifyUserBorrowHistory6Tokens = async (userAddress: string) => {
    const compoundApi = "account";
    const queryBorrowHistory = `{"addresses": "${userAddress}"}`;
    const borrowHistory = await queryCoumpoundApi(compoundApi, queryBorrowHistory);
    log(borrowHistory);
    if (borrowHistory) {
        const URI = await addToIPFS({
            name: 'isEligibleForBorrowFrenzy6Compound',
            description: 'The user borrowed at least 6 different assets on Compound',
            image: ''
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 5);
            return { isEligible: true, tx: tx };
          } catch (e) { return { isEligible: false }; }
        }
        return { isEligible: false };
}

const verifyUserDepositHistory = async (userAddress: string) => {
    const compoundApi = "account";
    const queryDepositHistory = `{"addresses": "${userAddress}"}`;
    const depositHistory = await queryCoumpoundApi(compoundApi, queryDepositHistory);
    log(depositHistory);
    if (depositHistory) {
        const URI = await addToIPFS({
            name: 'isEligibleForDepositFrenzyCompound',
            description: 'The user deposited at least once on Compound',
            image: ''
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 5);
            return { isEligible: true, tx: tx };
          } catch (e) { return { isEligible: false }; }
        }
        return { isEligible: false };
}

const verifyUserDepositHistory3Tokens = async (userAddress: string) => {
    const compoundApi = "account";
    const queryDepositHistory = `{"addresses": "${userAddress}"}`;
    const depositHistory = await queryCoumpoundApi(compoundApi, queryDepositHistory);
    log(depositHistory);
    if (depositHistory) {
        const URI = await addToIPFS({
            name: 'isEligibleForDepositFrenzy3Compound',
            description: 'The user deposited at least 3 different tokens on Compound',
            image: ''
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 5);
            return { isEligible: true, tx: tx };
          } catch (e) { return { isEligible: false }; }
        }
        return { isEligible: false };
}

const verifyUserDepositHistory6Tokens = async (userAddress: string) => {
    const compoundApi = "account";
    const queryDepositHistory = `{"addresses": "${userAddress}"}`;
    const depositHistory = await queryCoumpoundApi(compoundApi, queryDepositHistory);
    log(depositHistory);
    if (depositHistory) {
        const URI = await addToIPFS({
            name: 'isEligibleForDepositFrenzy6Compound',
            description: 'The user deposited at least 6 different tokens on Compound',
            image: ''
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 5);
            return { isEligible: true, tx: tx };
          } catch (e) { return { isEligible: false }; }
        }
        return { isEligible: false };
}