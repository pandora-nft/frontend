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
  "0x4": "0xedF72393De2860E0cEc3C1D48865c3D58957556F",
  //BNB Testnet
  "0x61": "0x861543c3B97e193Af95179a052472bb063F9e394",
  //Mumbai
  "0x13881": "0x8dFCdd30170FeAF90DC6C182123A465f7E7Ab080",
  //Fuji
  "0xa869": "0x145C6028c725A1eACA457F1a3f79daC246aE7746",
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
  "0x4": "0xe5674c9166CAaA4aFb43102aaDAE115910d62eE1",
  //BNB Testnet
  "0x61": "0x54aB2f68c0088C82b36C31614133e478b49b5248",
  //Mumbai
  "0x13881": "0x9E2238f4dB3c6b9307CaaEbdC8289e89aBa38123",
  //Fuji
  "0xa869": "0x2FD95A2C686fB4bd28F42878E0b3BE98850fD7F5",
  //Avalanche
  // "0xa86a": "",
  //BNB Chain
  // "0x38": "",
  //Polygon Mainnet
  // "0x89": "",
}

export const SUPPORT_CHAINID = ["0x38", "0x61", "0x89", "0x13881", "0xa86a", "0xa869"]

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
}

export const CHAINID_TO_DETAIL: { [chainId: string]: CHAIN_DETAIL } = {
  "0x38": {
    name: CHAIN_SUPPORT.BSC,
    shortName: "BSC",
    src: "binance",
    icon: "bnb",
    color: "#e7b527",
  },
  "0x61": {
    name: CHAIN_SUPPORT.BSC_TESTNET,
    shortName: "BSC Testnet",
    src: "testnet",
    icon: "bnb",
    color: "#e7b527",
  },
  "0x89": {
    name: CHAIN_SUPPORT.POLYGON,
    shortName: "Polygon",
    src: "polygon",
    icon: "matic",
    color: "#6f38d6",
  },
  "0x13881": {
    name: CHAIN_SUPPORT.POLYGON_MUMBAI,
    shortName: "Mumbai",
    src: "testnet",
    icon: "matic",
    color: "#6f38d6",
  },
  "0xa86a": {
    name: CHAIN_SUPPORT.AVALANCHE,
    shortName: "Avax",
    src: "avalanche",
    icon: "avax",
    color: "#d0443b",
  },
  "0xa869": {
    name: CHAIN_SUPPORT.AVALANCHE_FUJI,
    shortName: "Fuji",
    src: "testnet",
    icon: "avax",
    color: "#d0443b",
  },
}
