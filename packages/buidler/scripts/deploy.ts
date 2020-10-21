import { ethers } from '@nomiclabs/buidler';
const log = console.log;

async function main() {
    const minter = await ethers.getContract('BadgeMinter');

    let badgeMinter = await minter.deploy();
    await badgeMinter.deployed();

    log(`BadgeMinter contract address: ${badgeMinter.address}`);

    // 0
    await badgeMinter.addTemplate('Aave', 'isEligibleForSwapFrenzy', 'The user swaps 50 times or more on Aave', 'QmRvdvfdbR4knesJ6ianWn4w3WAiTacfqxA7f1DQd5rBJ2');
    // 1
    await badgeMinter.addTemplate('Aave', 'isEligibleForLiquidationWojak', 'The user got liquididated at least once on Aave', 'QmRvdvfdbR4knesJ6ianWn4w3WAiTacfqxA7f1DQd5rBJ2');
    // 2
    await badgeMinter.addTemplate('Aave', 'isEligibleForDepositFrenzy', 'The user deposited at least once on Aave', 'QmQuLTyVH6AFvTwdF35X6DZXDKTiiiDnrnp9Uoimm9ZNhN');
    // 3
    await badgeMinter.addTemplate('Aave', 'isEligibleForDepositFrenzy3', 'The user deposited at least 3 different tokens on Aave', 'QmaWU2tHSdsiD8X5HUBH6w5V2qaNTpagxR6ow3haXhT46B');
    // 4
    await badgeMinter.addTemplate('Aave', 'isEligibleForDepositFrenzy6', 'The user deposited at least 6 different tokens on Aave', 'QmYvUEjg1sbB4owBTMPgAZ7kF8bAnLYy6WTj17xNeaWCds');
    // 5
    await badgeMinter.addTemplate('Aave', 'isEligibleForBorrowManiac', 'The user borrowed at least once on Aave', 'QmWAzDXUJ7k5zW1eudPgCX5XXceL12rd3fBzNFHPExVrDW');
    // 6
    await badgeMinter.addTemplate('Aave', 'isEligibleForBorrowFrenzy3', 'The user borrowed at least 3 different assets on Aave', 'QmW2ResqCup7bW3YPkVpAWCXNdz6PLRcE2yue2Ktk9eKN9');
    // 7 
    await badgeMinter.addTemplate('Aave', 'isEligibleForBorrowFrenzy6', 'The user borrowed at least 6 different assets on Aave', 'QmZ6EURfShQT9ZhSQ7sjzFxfd9Hx5j4NmeYzte8NSqdCPt');

    // 8
    await badgeMinter.addTemplate('Uniswap', 'isEligibleForLiquidityBadgeVirgin', 'The user has a Virgin position inside a liquidity pool (at least 1%)', 'QmdrbnZdPJUpyF9vf974mpaJskGEQTSEX3PQ96Pt2jfG9K');
    // 9
    await badgeMinter.addTemplate('Uniswap', 'isEligibleForLiquidityBadgeCollector', 'The user has a Collector position inside a liquidity pool (between 1% and 10%)', 'QmPb52banCQ1nt1HsszhqUePTLNNTD5cG98i2AXXChL6jo');
    // 10
    await badgeMinter.addTemplate('Uniswap', 'isEligibleForLiquidityBadgeChad', 'The user has a Chad position inside a liquidity pool (more than 10%)', 'QmVRTyqwKKzoV7FG34Lv8T94VLCme3qEsWqM6W9be64ThN');
    // 11
    await badgeMinter.addTemplate('Uniswap', 'isEligibleForLiquidityCollector', 'The user has provided liquidity to at least 1 pool', 'QmdrbnZdPJUpyF9vf974mpaJskGEQTSEX3PQ96Pt2jfG9K');

    // 12
    await badgeMinter.addTemplate('Compound', 'isEligibleForLiquidationOnceCompound', 'The user has been liquidated at least once on Compound', 'QmPXM5y97Cn55XqdfMKxFaDdKdLfDG5rzHnU4odUKQswdT');
    // 13
    await badgeMinter.addTemplate('Compound', 'isEligibleForBorrowManiacCompound', 'The user borrowed at least once on Compound', 'Qmb4VyZbM5qEY3A6QYhqwBLihSQsGZBAb6pFqRtLRnCeTB');
    // 14
    await badgeMinter.addTemplate('Compound', 'isEligibleForBorrowFrenzy3Compound', 'The user borrowed at least 3 different assets on Compound', 'QmWbuYL4zetvAqkevi1bY8bTN1kSfAeGZ2fNpMXUU1Hvpt');
    // 15
    await badgeMinter.addTemplate('Compound', 'isEligibleForBorrowFrenzy6Compound', 'The user borrowed at least 6 different assets on Compound', 'QmY5P4NkJF71jctLixyetjsSPWSdL412tnvaCyFFJTUscZ');
    // 16
    await badgeMinter.addTemplate('Compound', 'isEligibleForDepositFrenzyCompound', 'The user deposited at least once on Compound', 'QmNmmNFh9n6cGHvmJ9hfU7xMYWnd8EeN3yR9KGx86N9ooW');
    // 17
    await badgeMinter.addTemplate('Compound', 'isEligibleForDepositFrenzy3Compound', 'The user deposited at least 3 different assets on Compound', 'QmXgj6YFiYJXYhw7M3yERqcGUroAAv8pDM7bJT4DX7p2PV');
    // 18
    await badgeMinter.addTemplate('Compound', 'isEligibleForDepositFrenzy6Compound', 'The user deposited at least 6 different assets on Compound', 'QmdoiAP4fnxjEA6PJPPUMWn65mpuUKeiTBtZtSqBHoES5K');

    log(await badgeMinter.getTemplate(0));
    log(await badgeMinter.getTemplate(1));
    log(await badgeMinter.getTemplate(2));
    log(await badgeMinter.getTemplate(3));
    log(await badgeMinter.getTemplate(4));
    log(await badgeMinter.getTemplate(5));
    log(await badgeMinter.getTemplate(6));
    log(await badgeMinter.getTemplate(7));
    log(await badgeMinter.getTemplate(8));
    log(await badgeMinter.getTemplate(9));
    log(await badgeMinter.getTemplate(10));
    log(await badgeMinter.getTemplate(11));
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
