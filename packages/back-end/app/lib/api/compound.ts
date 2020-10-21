import axios from 'axios';

export const queryCoumpound = async (endpoint: string, params: string) => {
    try {
        const result = await axios.get(
            `https://api.compound.finance/api/v2/${endpoint}?${params}`,
        );
        return result.data;
    } catch (error) {
        return;
    }
}
