import { abi as factoryAbi } from "./factory/LootboxFactory.json"
import { abi as lootboxAbi } from "./lootbox/Lootbox.json"
import { abi as ticketAbi } from "./ticket/PandoraTicket.json"
import { abi as erc721Abi } from "./ERC721/ERC721.json"

export { erc721Abi as ERC721_ABI }
export { factoryAbi as FACTORY_ABI }
export { lootboxAbi as LOOTBOX_ABI }
export { ticketAbi as TICKET_ABI }

export const FACTORY_ADDRESS: { [chainId: string]: string } = {
  //Rinkeby
  "0x4": "0x53D5A5Ee0DC444DcB681fF11ae8a630e79F2A577",
  //BNB Testnet
  "0x61": "0x86490bA09C96F36f288A618E0f11b09A97E427Da",
  //Mumbai
  "0x13881": "0xeE9185C9Bfe2942c2421e82E028192f7a174d96C",
  //Fuji
  "0xa869": "0xc674C8275Fa1C07b15E5B8B8056984d4940eC2c3",
  //Avalanche
  // "0xa86a": "",
  //BNB Chain
  // "0x38": "",
  //Polygon Mainnet
  // "0x89": "",
}

export const TICKET_ADDRESS: { [chainId: string]: string } = {
  //Rinkeby
  //Rinkeby
  "0x4": "0xe1B562e5C935f6a9cBB732F97aF3d57ffE3875d0",
  //BNB Testnet
  "0x61": "0x624b980A80008307939aD769D5e0C2a8C2d25DE1",
  //Mumbai
  "0x13881": "0xA584A32D8b72C5FAb6fb8b10d7Ae74241225F8fC",
  //Fuji
  "0xa869": "0xf5BF0F9e8741e8d174C2D0DAE2302823Af22d660",
  //Avalanche
  // "0xa86a": "",
  //BNB Chain
  // "0x38": "",
  //Polygon Mainnet
  // "0x89": "",
}

export const SUPPORT_CHAINID = ["0x38", "0x61", "0x89", "0x13881", "0xa86a", "0xa869"]

export const isChainSupport = (chain: any) => {
  if (!chain || !chain.chainId) {
    return false
  }
  if (!SUPPORT_CHAINID.includes(chain.chainId)) {
    return false
  }
  return true
}

export enum CHAIN_SUPPORT {
  "BSC" = "Binace Smart Chain",
  "BSC_TESTNET" = "Binance Smart Chain Testnet",
  "POLYGON" = "Polygon",
  "POLYGON_MUMBAI" = "Polygon Testnet Mumbai",
  "AVALANCHE" = "Avalanche",
  "AVALANCHE_FUJI" = "Avalanche Testnet Fuji",
}

interface CHAIN_DETAIL {
  name: CHAIN_SUPPORT
  shortName: string
  src: string
  icon: string
  color: string
  api: string
}

export const CHAINID_TO_DETAIL: { [chainId: string]: CHAIN_DETAIL } = {
  "0x38": {
    name: CHAIN_SUPPORT.BSC,
    shortName: "BSC",
    src: "binance",
    icon: "bnb",
    color: "#e7b527",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-chapel",
  },
  "0x61": {
    name: CHAIN_SUPPORT.BSC_TESTNET,
    shortName: "BSC Testnet",
    src: "testnet",
    icon: "bnb",
    color: "#e7b527",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-chapel",
  },
  "0x89": {
    name: CHAIN_SUPPORT.POLYGON,
    shortName: "Polygon",
    src: "polygon",
    icon: "matic",
    color: "#6f38d6",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-mumbai",
  },
  "0x13881": {
    name: CHAIN_SUPPORT.POLYGON_MUMBAI,
    shortName: "Mumbai",
    src: "testnet",
    icon: "matic",
    color: "#6f38d6",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-mumbai",
  },
  "0xa86a": {
    name: CHAIN_SUPPORT.AVALANCHE,
    shortName: "Avax",
    src: "avalanche",
    icon: "avax",
    color: "#d0443b",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-fuji",
  },
  "0xa869": {
    name: CHAIN_SUPPORT.AVALANCHE_FUJI,
    shortName: "Fuji",
    src: "testnet",
    icon: "avax",
    color: "#d0443b",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-fuji",
  },
}
