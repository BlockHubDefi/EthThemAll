const express = require('express');
const axios = require('axios');

const port = 3000;
const app = express();

app.post('/compound', function (req, res) {

  res.send('<h1>Hello World!</h1>');
})

app.listen(port, function () {
  console.log("Server is running on "+ port +" port");
});

const compound = async () => {
  try {
    const result = await axios.post(
      'https://api.thegraph.com/subgraphs/name/graphprotocol/compound-v2',
      {
        query: `
        {

        }`
      }
    );
    console.log(result);
  } catch(error) {
    console.log(error);
  }
}