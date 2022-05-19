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

export type Chain =
  | "eth"
  | "0x1"
  | "ropsten"
  | "0x3"
  | "rinkeby"
  | "0x4"
  | "goerli"
  | "0x5"
  | "kovan"
  | "0x2a"
  | "polygon"
  | "0x89"
  | "mumbai"
  | "0x13881"
  | "bsc"
  | "0x38"
  | "bsc testnet"
  | "0x61"
  | "avalanche"
  | "0xa86a"
  | "avalanche testnet"
  | "0xa869"
  | "fantom"
  | "0xfa"
  | undefined
