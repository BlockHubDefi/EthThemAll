import IpfsHttpClient from 'ipfs-http-client';
const ipfs = IpfsHttpClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
// const log = console.log;
import { metadata } from './definitions';

export const generateNFTMetadata = async (_name: string, _description: string, _defiTribe: string, _IPFS_data: string) => {
    const tmpNFTData: metadata = {
        name: _name,
        description: _description,
        defiTribe: _defiTribe,
        IPFS_data: _IPFS_data
    };
    return (await addToIPFS(tmpNFTData));
}

export const addToIPFS = async (dataToUpload: any) => {
    return await ipfs.add(JSON.stringify(dataToUpload));
}
