import { Signer, Wallet, constants, Contract } from 'ethers';
import { ethers } from '@nomiclabs/buidler';
import chai from 'chai';
const { expect, assert } = chai;
import { deployContract, solidity } from 'ethereum-waffle';
import BadgeMinterArtifact from '../artifacts/BadgeMinter.json';
import { BadgeMinter } from '../typechain/BadgeMinter';
import { Template } from './definitions';

chai.use(solidity); // Chai wrapper for the solidity EVM
const ZERO: string = constants.AddressZero;
// For debugging: 
const log = console.log;
ethers.errors.setLogLevel('error');

const _template: Template = {
    id: 0,
    defiTribe: 'BlockHub',
    name: 'BlockHub tribe brother',
    image: 'https://ipfs.io/ipfs/Qmb5cTZH7JFpS4r4XpmSWv9GDWgWHCg6dAsqJ1656RygVd?filename=pepe_coder.png',
    description: 'join the BlockHub tribe achievement',
}
const URI_: string = 'Qmb5cTZH7JFpS4r4XpmSWv9GDWgWHCg6dAsqJ1656RygVd';

describe('BadgeMinter', () => {
    let signers: Signer[];
    let badgeMinter: BadgeMinter;

    before(async () => {
        signers = await ethers.getSigners();
        badgeMinter = (await deployContract(
            <Wallet>signers[0],
            BadgeMinterArtifact,
            []
        )) as BadgeMinter;
    });

    describe('Deployment', () => {
        it('deploy the BadgeMinter with a proper contract address', async () => {
            expect(badgeMinter.address).to.properAddress;
        });
    });

    describe('Templates', () => {
        it('can create a new Template', async () => {
            await expect(
                badgeMinter.addTemplate(_template.defiTribe, _template.name, _template.description, _template.image)
            ).to.emit(badgeMinter, 'TemplateCreated')
                .withArgs(_template.id, _template.defiTribe, _template.name, _template.description, _template.image);
            const _templateData: any = await badgeMinter.getTemplate(_template.id);
            assert.isNotEmpty(_templateData);
            expect(_templateData[0]).to.equal(_template.defiTribe);
            expect(_templateData[1]).to.equal(_template.name);
            expect(_templateData[2]).to.equal(_template.image);
            expect(_templateData[3]).to.equal(_template.description);
        });

        it('can update an existing Template', async () => {
            await expect(
                badgeMinter.updateTemplate(_template.id, _template.defiTribe, _template.name, _template.description, _template.image)
            ).to.emit(badgeMinter, 'TemplateUpdated')
                .withArgs(_template.id, _template.defiTribe, _template.name, _template.description, _template.image);
            const _templateData: any = await badgeMinter.getTemplate(_template.id);
            assert.isNotEmpty(_templateData);
            expect(_templateData[0]).to.equal(_template.defiTribe);
            expect(_templateData[1]).to.equal(_template.name);
            expect(_templateData[2]).to.equal(_template.image);
            expect(_templateData[3]).to.equal(_template.description);
        });

        it('cannot create a new Template if the caller is not a Templater', async () => {
            const badgeMinter_ = badgeMinter.connect(signers[9]);
            await expect(badgeMinter_.addTemplate(_template.defiTribe, _template.name, _template.description, _template.image))
                .to.be.revertedWith('Caller must be an authorized Templater.');
        });

        it('cannot update an existing Template if the caller is not a Templater', async () => {
            const badgeMinter_ = badgeMinter.connect(signers[9]);
            await expect(badgeMinter_.updateTemplate(_template.id, _template.defiTribe, _template.name, _template.description, _template.image))
                .to.be.revertedWith('Caller must be an authorized Templater.');
        });
    });

    describe('Minting', () => {
        it('can mint a NTNFT', async () => {
            const receiptMinting = await badgeMinter.redeemBadge(await signers[0].getAddress(), URI_, _template.id);
            assert.isNotEmpty(receiptMinting);
        });

        it('can check the user NTNFT balance', async () => {
            const NTNFTbalance_account0 = await badgeMinter.balanceOf(await signers[0].getAddress());
            assert.isAbove(parseInt(ethers.utils.formatUnits(NTNFTbalance_account0, 0)), 0, 'NTNFT Balance should not be empty.');
        });

        it('can retrieve the NTNFT id of the user account', async () => {
            const NTNFT_ID = await badgeMinter.tokenOfOwnerByIndex(await signers[0].getAddress(), 0);
            expect(parseInt(ethers.utils.formatUnits(NTNFT_ID, 0))).to.eq(0);
            const URIOfNTNFT = await badgeMinter.tokenURI(NTNFT_ID);
            assert.isNotEmpty(URIOfNTNFT);
            expect(URIOfNTNFT).to.eq(`ipfs://ipfs/${URI_}`);
        });

        it('cannot transfer NTNFT', async () => {
            await expect(badgeMinter.transferFrom(await signers[0].getAddress(), await signers[1].getAddress(), 0))
                .to.be.revertedWith('BadgeMinter: badge transfer disabled for NTNFTs.');
        });

        it('cannot mint a NTNFT if the caller is not an Admin', async () => {
            const badgeMinter_ = badgeMinter.connect(signers[1]);
            await expect(badgeMinter_.redeemBadge(await signers[0].getAddress(), URI_, _template.id))
                .to.be.revertedWith('Caller must be an authorized Admin.');
        });

        it('cannot mint a NTNFT from a non-existing Template', async () => {
            await expect(badgeMinter.redeemBadge(await signers[0].getAddress(), URI_, 1000))
                .to.be.revertedWith('Template id does not exist.');
        });

        it('cannot mint the same NTNFT to a user more than once', async () => {
            await expect(badgeMinter.redeemBadge(await signers[0].getAddress(), URI_, _template.id))
                .to.be.revertedWith('The caller has already redeemed the badge for this user address.');
        });
    });

    describe('Role Management and Authorization', () => {
        it('can add a new Templater', async () => {
            await badgeMinter.addTemplater(await signers[1].getAddress());
            const badgeMinter_ = badgeMinter.connect(signers[1]);
            await expect(
                badgeMinter_.updateTemplate(_template.id, _template.defiTribe, _template.name, _template.description, _template.image)
            ).to.emit(badgeMinter_, 'TemplateUpdated')
                .withArgs(_template.id, _template.defiTribe, _template.name, _template.description, _template.image);
            const _templateData: any = await badgeMinter_.getTemplate(_template.id);
            assert.isNotEmpty(_templateData);
            expect(_templateData[0]).to.equal(_template.defiTribe);
            expect(_templateData[1]).to.equal(_template.name);
            expect(_templateData[2]).to.equal(_template.image);
            expect(_templateData[3]).to.equal(_template.description);
        });

        it('can remove an existing Templater', async () => {
            await badgeMinter.removeTemplater(await signers[1].getAddress());
            const badgeMinter_ = badgeMinter.connect(signers[1]);
            await expect(badgeMinter_.updateTemplate(_template.id, _template.defiTribe, _template.name, _template.description, _template.image))
                .to.be.revertedWith('Caller must be an authorized Templater.');
        });

        it('cannot add a new Templater if the caller is not an Admin', async () => {
            const badgeMinter_ = badgeMinter.connect(signers[9]);
            await expect(badgeMinter_.addTemplater(await signers[9].getAddress()))
                .to.be.revertedWith('Caller must be an authorized Admin.');
        });

        it('cannot remove an existing Templater if the caller is not an Admin', async () => {
            const badgeMinter_ = badgeMinter.connect(signers[1]);
            await expect(badgeMinter_.removeTemplater(await signers[0].getAddress()))
                .to.be.revertedWith('Caller must be an authorized Admin.');
        });
    });

});
