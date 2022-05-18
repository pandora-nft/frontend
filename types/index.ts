export interface Lootbox {
  address: string
  name: string
  nfts: NFT[]
}

export interface NFT {
  tokenId: number
  address: string
  imageURI: string
  name: string
  description: string
}
