const axios = require('axios');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const compound = async (req, res) => {
    jsonParser(req);
    console.log("POST /Compound received");
    const address = req.body.id;
    console.log("- addr : " + address);
    const result = await theGraphCompound(address);
    const response = compoundTokenList(result);
    console.log(response);
    return res.send(response);
}

const compoundTokenList = (result) => {
    const data = result.data.data.account.tokens;
    const list = [];
    for (x = 0; x < data.length; x++) {
        if (data[x].lifetimeSupplyInterestAccrued > 0 || data[x].lifetimeBorrowInterestAccrued > 0) {
            list[x] = [data[x].symbol, true];
        } else {
            list[x] = [data[x].symbol, false];
        }
    }
    return list;
}

const theGraphCompound = async (address) => {
    try {
        const result = await axios.post(
            'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2',
            {
                query: `{
        account(id: "`+ address + `") {
            id
            tokens(first: 10) {
            id
            symbol
            cTokenBalance
            totalUnderlyingSupplied
            totalUnderlyingRedeemed
            totalUnderlyingBorrowed
            supplyBalanceUnderlying
            lifetimeSupplyInterestAccrued
            borrowBalanceUnderlying
            lifetimeBorrowInterestAccrued
            }
        }
        }`
            }
        );
        return result;
    } catch (error) {
        console.log(error);
        return;
    }
}

// test function
const testCompound = async () => {
    const address = "0x00000000af5a61acaf76190794e3fdf1289288a1";
    const result = await theGraphCompound(address);
    const response = compoundTokenList(result);
    console.log(response);
    return response;
}

module.exports = {
    compound,
    testCompound
}
