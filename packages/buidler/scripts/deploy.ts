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
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
