const axios = require('axios');

const aave = async (req, res) => {
    const address = req.body.id;
    const result = await theGraphAave(address);
} 

const theGraphAave = async (address) => {
    try {
        const result = await axios.post(
        'https://api.thegraph.com/subgraphs/name/aave/protocol',
        {
            query: ``
        }
        );
        return result;
    } catch(error) {
        console.log(error);
        return;
    }
}

module.exports = {
    aave
}