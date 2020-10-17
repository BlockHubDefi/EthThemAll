const axios = require('axios');

const queryTheGraph = async (subgraphName, graphQuery) => {
    try {
        const result = await axios.post(
            `https://api.thegraph.com/subgraphs/name/${subgraphName}`,
            {
                query: graphQuery
            }
        );
        return result.data.data;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = {
    queryTheGraph
}
