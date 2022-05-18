export interface Lootbox {
  address: string
  name: string
  minimumTicketRequired: string
  maxTicketPerWallet: string
  ticketPrice: string
  ticketSold: string
  drawTimestamp: number // in unix e.g 1652738315
  isDrawn: boolean
  nfts: NFT[]
}

export interface NFT {
  tokenId: number
  address: string
  imageURI: string
}
