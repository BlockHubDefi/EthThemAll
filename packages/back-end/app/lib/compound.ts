import { addToIPFS } from './ipfs';
import { redeemBadge } from './minting';
import { queryCoumpound } from './api/compound';
const log = console.log;

// export const isEligibleForLiquidationCompound = async (req: any, res: any) => {
//     const userAddress = req.body.userAddress;
//     const eligible = await verifyUserLiquidationHistory(userAddress);
//     return res.send(eligible);
// }

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

// const verifyUserLiquidationHistory = async (userAddress: string) => {
//     const endpoint = "account";
//     const queryLiquidationHistory = `addresses[]=${userAddress}`;
//     const liquidationHistory = await queryCoumpound(endpoint, queryLiquidationHistory);
//     log(JSON.stringify(liquidationHistory));
//     for (let x = 0; x < liquidationHistory.accounts[0].tokens.length; x++) {
//         if (liquidationHistory.accounts[0].health.value < 1) {
//             const URI = await addToIPFS({
//                 name: 'isEligibleForLiquidationOnceCompound',
//                 description: 'The user has been liquidated at least once on Compound',
//                 image: 'QmPXM5y97Cn55XqdfMKxFaDdKdLfDG5rzHnU4odUKQswdT',
//                 dataProof: liquidationHistory.accounts[0]
//             });
//             try {
//                 log(URI);
//                 const tx = await redeemBadge(userAddress, URI.path, 12);
//                 return { isEligible: true, tx: tx };
//             } catch (e) { return { isEligible: false }; }
//         }
//     }
//     return { isEligible: false };
// }

const verifyUserBorrowHistory = async (userAddress: string) => {
    const endpoint = "account";
    const queryBorrowHistory = `addresses[]=${userAddress}`;
    const borrowHistory = await queryCoumpound(endpoint, queryBorrowHistory);
    log(JSON.stringify(borrowHistory));
    for (let x = 0; x < borrowHistory.accounts[0].tokens.length; x++) {
        if (parseFloat(borrowHistory.accounts[0].tokens[x].lifetime_borrow_interest_accrued.value) > 0) {
            const URI = await addToIPFS({
                name: 'isEligibleForBorrowManiacCompound',
                description: 'The user borrowed at least once on Compound',
                image: 'Qmb4VyZbM5qEY3A6QYhqwBLihSQsGZBAb6pFqRtLRnCeTB',
                dataProof: borrowHistory.accounts[0].tokens[x].lifetime_borrow_interest_accrued
            });
            try {
                log(URI);
                const tx = await redeemBadge(userAddress, URI.path, 13);
                return { isEligible: true, tx: tx };
            } catch (e) { return { isEligible: false }; }
        }
    }
    return { isEligible: false };
}

const verifyUserBorrowHistory3Tokens = async (userAddress: string) => {
    const endpoint = "account";
    const queryBorrowHistory = `addresses[]=${userAddress}`;
    const borrowHistory = await queryCoumpound(endpoint, queryBorrowHistory);
    log(JSON.stringify(borrowHistory));
    let count = 0;
    for (let x = 0; x < borrowHistory.accounts[0].tokens.length; x++) {
        if (parseFloat(borrowHistory.accounts[0].tokens[x].lifetime_borrow_interest_accrued.value) > 0) {
            count += 1;
        }
    }
    if (count >= 3) {
        const URI = await addToIPFS({
            name: 'isEligibleForBorrowFrenzy3Compound',
            description: 'The user borrowed at least 3 different assets on Compound',
            image: 'QmWbuYL4zetvAqkevi1bY8bTN1kSfAeGZ2fNpMXUU1Hvpt',
            dataProof: borrowHistory.accounts[0]
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 14);
            return { isEligible: true, tx: tx };
        } catch (e) { return { isEligible: false }; }
    }
    return { isEligible: false };
}

const verifyUserBorrowHistory6Tokens = async (userAddress: string) => {
    const endpoint = "account";
    const queryBorrowHistory = `addresses[]=${userAddress}`;
    const borrowHistory = await queryCoumpound(endpoint, queryBorrowHistory);
    log(JSON.stringify(borrowHistory));
    let count = 0;
    for (let x = 0; x < borrowHistory.accounts[0].tokens.length; x++) {
        if (parseFloat(borrowHistory.accounts[0].tokens[x].lifetime_borrow_interest_accrued.value) > 0) {
            count += 1;
        }
    }
    if (count >= 6) {
        const URI = await addToIPFS({
            name: 'isEligibleForBorrowFrenzy6Compound',
            description: 'The user borrowed at least 6 different assets on Compound',
            image: 'QmY5P4NkJF71jctLixyetjsSPWSdL412tnvaCyFFJTUscZ',
            dataProof: borrowHistory.accounts[0]
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 15);
            return { isEligible: true, tx: tx };
        } catch (e) { return { isEligible: false }; }
    }
    return { isEligible: false };
}

const verifyUserDepositHistory = async (userAddress: string) => {
    const endpoint = "account";
    const queryBorrowHistory = `addresses[]=${userAddress}`;
    const borrowHistory = await queryCoumpound(endpoint, queryBorrowHistory);
    log(JSON.stringify(borrowHistory));
    for (let x = 0; x < borrowHistory.accounts[0].tokens.length; x++) {
        if (parseFloat(borrowHistory.accounts[0].tokens[x].lifetime_supply_interest_accrued.value) > 0) {
            const URI = await addToIPFS({
                name: 'isEligibleForDepositFrenzyCompound',
                description: 'The user deposited at least once on Compound',
                image: 'QmNmmNFh9n6cGHvmJ9hfU7xMYWnd8EeN3yR9KGx86N9ooW',
                dataProof: borrowHistory.accounts[0].tokens[x].lifetime_supply_interest_accrued
            });
            try {
                log(URI);
                const tx = await redeemBadge(userAddress, URI.path, 16);
                return { isEligible: true, tx: tx };
            } catch (e) { return { isEligible: false }; }
        }
    }
    return { isEligible: false };
}

const verifyUserDepositHistory3Tokens = async (userAddress: string) => {
    const endpoint = "account";
    const queryDepositHistory = `addresses[]=${userAddress}`;
    const depositHistory = await queryCoumpound(endpoint, queryDepositHistory);
    log(JSON.stringify(depositHistory));
    let count = 0;
    for (let x = 0; x < depositHistory.accounts[0].tokens.length; x++) {
        if (parseFloat(depositHistory.accounts[0].tokens[x].lifetime_supply_interest_accrued.value) > 0) {
            count += 1;
        }
    }
    if (count >= 3) {
        const URI = await addToIPFS({
            name: 'isEligibleForDepositFrenzy3Compound',
            description: 'The user deposited at least 3 different assets on Compound',
            image: 'QmXgj6YFiYJXYhw7M3yERqcGUroAAv8pDM7bJT4DX7p2PV',
            dataProof: depositHistory.accounts[0]
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 17);
            return { isEligible: true, tx: tx };
        } catch (e) { return { isEligible: false }; }
    }
    return { isEligible: false };
}

const verifyUserDepositHistory6Tokens = async (userAddress: string) => {
    const endpoint = "account";
    const queryDepositHistory = `addresses[]=${userAddress}`;
    const depositHistory = await queryCoumpound(endpoint, queryDepositHistory);
    log(JSON.stringify(depositHistory));
    let count = 0;
    for (let x = 0; x < depositHistory.accounts[0].tokens.length; x++) {
        if (parseFloat(depositHistory.accounts[0].tokens[x].lifetime_supply_interest_accrued.value) > 0) {
            count += 1;
        }
    }
    if (count >= 6) {
        const URI = await addToIPFS({
            name: 'isEligibleForDepositFrenzy6Compound',
            description: 'The user deposited at least 6 different assets on Compound',
            image: 'QmdoiAP4fnxjEA6PJPPUMWn65mpuUKeiTBtZtSqBHoES5K',
            dataProof: depositHistory.accounts[0]
        });
        try {
            log(URI);
            const tx = await redeemBadge(userAddress, URI.path, 18);
            return { isEligible: true, tx: tx };
        } catch (e) { return { isEligible: false }; }
    }
    return { isEligible: false };
}
