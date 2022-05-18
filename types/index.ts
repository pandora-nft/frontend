export interface Lootbox {
  address: string
  name: string
  nfts: NFT[]
  isDrawn: boolean
  isRefundable: boolean
  drawTimestamp: number
  ticketPrice: number
  minimumTicketRequired: number
  maxTicketPerWallet: number
  ticketSold: number
}

export interface NFT {
  tokenId: number
  address: string
  imageURI: string
  name: string
  description?: string
}
