import axios from 'axios';

export const queryTheGraph = async (subgraphName: string, graphQuery: string) => {
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
