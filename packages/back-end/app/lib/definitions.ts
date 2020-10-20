export type metadata = {
    name: string,
    description: string,
    defiTribe: string,
    IPFS_data: string
}

export type Template = {
    id: number
    name: string,
    defiTribe: string,
    description: string,
    image: string,
}

export const UniswapWhitelisted: string[] = ['WETH', 'YFI', 'USDC', 'DAI', 'SNX', 'UNI', 'sUSD', 'CRV'];
