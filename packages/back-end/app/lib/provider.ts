import { ethers } from 'ethers';

export const getInfuraProvider = async () => {
    return new ethers.providers.InfuraProvider(process.env.INFURA_API_NETWORK, process.env.INFURA_API_KEY);
}
