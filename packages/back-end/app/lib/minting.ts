import { ethers, getDefaultProvider, Wallet } from 'ethers';
// import { getInfuraProvider } from './provider';
import BadgeMinterArtifact from './artifacts/BadgeMinter.json';

export const redeemBadge = async (userAddress: string, URI_: string, templateId: number) => {
  const badgeMinterAddress = process.env.CONTRACT_ADDRESS || '';
  const privateKey = process.env.CONTRACT_PK || '';
  // const adminSigner = new Wallet(privateKey, await getInfuraProvider());
  const adminSigner = new Wallet(privateKey, await getDefaultProvider('http://127.0.0.1:7545'));
  const badgeMinter = new ethers.Contract(badgeMinterAddress, BadgeMinterArtifact.abi, adminSigner);
  return await badgeMinter.redeemBadge(userAddress, URI_, templateId);
}
