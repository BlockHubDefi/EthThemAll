import { ethers, getDefaultProvider, Wallet } from 'ethers';
// import { getInfuraProvider } from './provider';
import BadgeMinterArtifact from './artifacts/BadgeMinter.json';
// const log = console.log;

// Return all the NTNFT a user has inside his wallet
export const retrieveUserNTNFTBadges = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const badgeMinterAddress = process.env.CONTRACT_ADDRESS || '';
    const privateKey = process.env.CONTRACT_PK || '';
    // const adminSigner = new Wallet(privateKey, await getInfuraProvider());
    const adminSigner = new Wallet(privateKey, await getDefaultProvider('http://127.0.0.1:7545'));
    const badgeMinter = new ethers.Contract(badgeMinterAddress, BadgeMinterArtifact.abi, adminSigner);
    const amountOfBadges = await badgeMinter.balanceOf(userAddress);
    if (parseInt(ethers.utils.formatUnits(amountOfBadges, 0)) > 0) {
        let NTNFTList: any[] = [];  
        for (let i = 0; i < parseInt(ethers.utils.formatUnits(amountOfBadges, 0)); i++) {
            const NTNFT_ID = await badgeMinter.tokenOfOwnerByIndex(userAddress, i);
            NTNFTList.push({ templateId: parseInt(ethers.utils.formatUnits(await badgeMinter.getBadgeAssociatedTemplateId(NTNFT_ID), 0)), badgeURI: await badgeMinter.tokenURI(NTNFT_ID), templateData: await badgeMinter.getTemplate(await badgeMinter.getBadgeAssociatedTemplateId(NTNFT_ID)) });
        }
        return res.send({ userNTNFTs: NTNFTList });
    } else {
        return res.send({ userNTNFTs: [] });
    }
}

// Return if the user has a specific bagde template inside his wallet
export const retrieveUserTemplateBadge = async (req: any, res: any) => {
    const userAddress = req.body.userAddress;
    const templateId = req.body.templateId;
    const badgeMinterAddress = process.env.CONTRACT_ADDRESS || '';
    const privateKey = process.env.CONTRACT_PK || '';
    // const adminSigner = new Wallet(privateKey, await getInfuraProvider());
    const adminSigner = new Wallet(privateKey, await getDefaultProvider('http://127.0.0.1:7545'));
    const badgeMinter = new ethers.Contract(badgeMinterAddress, BadgeMinterArtifact.abi, adminSigner);

    const amountOfBadges = await badgeMinter.balanceOf(userAddress);
    if (parseInt(ethers.utils.formatUnits(amountOfBadges, 0)) > 0) {
        for (let i = 0; i < parseInt(ethers.utils.formatUnits(amountOfBadges, 0)); i++) {
            const NTNFT_ID = await badgeMinter.tokenOfOwnerByIndex(userAddress, i);
            const NTNFT_templateId = await badgeMinter.getBadgeAssociatedTemplateId(NTNFT_ID);
            if (NTNFT_templateId == templateId) {
                return res.send({ hasNTNFT: true });
            }
        }
    }
    return res.send({ hasNTNFT: false });
}
