import { ethers, getDefaultProvider, Wallet } from 'ethers';
// import { getInfuraProvider } from './provider';
import BadgeMinterArtifact from './artifacts/BadgeMinter.json';
// const log = console.log;

export const retrieveUserNTNFTBadges = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const badgeMinterAddress = process.env.CONTRACT_ADDRESS || '';
    const privateKey = process.env.CONTRACT_PK || '';
    // const adminSigner = new Wallet(privateKey, await getInfuraProvider());
    const adminSigner = new Wallet(privateKey, await getDefaultProvider('http://127.0.0.1:7545'));
    const badgeMinter = new ethers.Contract(badgeMinterAddress, BadgeMinterArtifact.abi, adminSigner);
    const amountOfBadges = await badgeMinter.balanceOf(userAddress);
    if (parseInt(ethers.utils.formatUnits(amountOfBadges, 0)) > 0) {
        let NTNFTList: string[] = [];
        for (let i = 0; i < parseInt(ethers.utils.formatUnits(amountOfBadges, 0)); i++) {
            const NTNFT_ID = await badgeMinter.tokenOfOwnerByIndex(userAddress, i);
            NTNFTList.push(await badgeMinter.tokenURI(NTNFT_ID));
        }
        return res.send({ userNTNFTs: NTNFTList });
    } else {
        return res.send({ userNTNFTs: [] });
    }
}
