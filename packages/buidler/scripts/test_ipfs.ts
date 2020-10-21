import { ethers } from '@nomiclabs/buidler';
const log = console.log;

async function main() {
    const minter = await ethers.getContract('BadgeMinter');

    let badgeMinter = await minter.deploy();
    await badgeMinter.deployed();

    log(`BadgeMinter contract address: ${badgeMinter.address}`);

    await badgeMinter.addTemplate('Aave', 'AaveBadgeTest', 'AaveBadgeTest_description', 'ipfsURI');
    await badgeMinter.addTemplate('Uniswap', 'UniswapBadgeTest', 'UniswapBadgeTest_description', 'ipfsURI');
    await badgeMinter.addTemplate('Compound', 'CompoundBadgeTest', 'CompoundBadgeTest_description', 'ipfsURI');

    log(await badgeMinter.getTemplate(0));
    log(await badgeMinter.getTemplate(1));
    log(await badgeMinter.getTemplate(2));

    await badgeMinter.redeemBadge('0x3ee505ba316879d246a8fd2b3d7ee63b51b44fab', 'DoYouKnowDaWae?', 2);
    // const amountOfBadges = await badgeMinter.balanceOf('0x3ee505ba316879d246a8fd2b3d7ee63b51b44fab');
    const NTNFT_ID = await badgeMinter.tokenOfOwnerByIndex('0x3ee505ba316879d246a8fd2b3d7ee63b51b44fab', 0);
    log(await badgeMinter.tokenURI(NTNFT_ID))
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
