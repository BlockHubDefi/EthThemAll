import { ethers } from '@nomiclabs/buidler';
const log = console.log;

async function main() {
    const minter = await ethers.getContract('BadgeMinter');

    let badgeMinter = await minter.deploy();
    await badgeMinter.deployed();

    log(`BadgeMinter contract address: ${badgeMinter.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
