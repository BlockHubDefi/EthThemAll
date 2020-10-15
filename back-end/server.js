const express = require('express');
const axios = require('axios');

const port = 3000;
const app = express();

app.post('/compound', function (req, res) {
  const address = req.body.id;
  const resultat = compound(address);
  const response = tokenList(resultat);
  res.send(response);
})

const testCompound = async () => {
  const address = "0x00000000af5a61acaf76190794e3fdf1289288a1";
  const resultat = await compound(address);
  const response = tokenList(resultat);
  console.log(response);
  return response;
}

const tokenList = (resultat) => {
  const data = resultat.data.data.account.tokens;
  const list = [];
  for (x = 0; x < data.length; x++) {
    if (data[x].lifetimeSupplyInterestAccrued > 0 && data[x].lifetimeBorrowInterestAccrued > 0) {
      list[x] = [data[x].symbol, true];
    } else {
      list[x] = [data[x].symbol, false];
    }
  }
  return list;
}

const compound = async (address) => {
  try {
    const result = await axios.post(
      'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2',
      {
        query: `{
          account(id: "`+ address +`") {
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
  } catch(error) {
    console.log(error);
    return;
  }
}

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
  testCompound();
});
