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
  "0x4": "0xA78AffBFF38e4ae9FD030C52D8eD8a6AFBda9a5D",
  //BNB Testnet
  "0x61": "0x48652d6b881b0BA591241c30Fd80e80Cc6624379",
  //Mumbai
  "0x13881": "0xEd94c13E344859C9A6b18bF217682a7Aba2eEC2F",
  //Fuji
  "0xa869": "0x1dF0D95f834864F2fD91be2996cc465960b00AFc",
  //Avalanche
  // "0xa86a": "",
  //BNB Chain
  // "0x38": "",
  //Polygon Mainnet
  // "0x89": "",
}

export const TICKET_ADDRESS: { [chainId: string]: string } = {
  //Rinkeby
  "0x4": "0xe82967CB8a13Ec6365cd7bFD26457aEdA7DC8Dfb",
  //BNB Testnet
  "0x61": "0xaB62CEd74eC2C52B0A02E118BD51c58f3D1A61cE",
  //Mumbai
  "0x13881": "0x34438266f76F9c82dA25f00946d325E811E9dA25",
  //Fuji
  "0xa869": "0x35C9b674F856A6Ed52E609A08F257255124D40bA",
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
