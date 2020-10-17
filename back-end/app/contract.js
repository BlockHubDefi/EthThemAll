const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider();
const signer = provider.getSigner()

const badgeMinterAddress = "eththemall.eth";

const badgeMinterAbi = require('../artifacts/badgeMinter.json');

const badgeMinterContract = new ethers.Contract(badgeMinterAddress, badgeMinterAbi, provider);
const badgeMinterWithSigner = contract.connect(signer);
