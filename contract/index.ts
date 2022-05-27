import { abi as factoryAbi } from "./factory/LootboxFactory.json"
import { abi as lootboxAbi } from "./lootbox/Lootbox.json"
import { abi as ticketAbi } from "./ticket/PandoraTicket.json"
import { abi as erc721Abi } from "./ERC721/ERC721.json"
import mockNFTAbi from "./mockNFT/MockNFT.json"

export { erc721Abi as ERC721_ABI }
export { factoryAbi as FACTORY_ABI }
export { lootboxAbi as LOOTBOX_ABI }
export { ticketAbi as TICKET_ABI }
export { mockNFTAbi as MOCKNFT_ABI }

export const FACTORY_ADDRESS: { [chainId: string]: string } = {
  //Rinkeby
  "0x4": "0xA78AffBFF38e4ae9FD030C52D8eD8a6AFBda9a5D",
  //BNB Testnet
  "0x61": "0xc632F5b06C85d8C6ff80Ad858Bb43dd3a86aee06",
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
  "0x61": "0xeE57309b221060F03c96e585d88f7C7B282fc2cf",
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
export const MOCK_NFT: { [chainId: string]: string } = {
  //BNB Testnet
  "0x61": "0xe1EF0CF6fDb12104778D596E943898b64596C7D7",
  //Mumbai
  "0x13881": "0xdcE112b4557014b43e63F37A5C7924f19B7001Fa",
  //Fuji
  "0xa869": "0x2446784D598c04Cc617E6d17A343c6CCdA133724",
  //Avalanche
  // 43114: "",
  //BNB Chain
  // 56: "",
  //Polygon Mainnet
  // 137: "",
}
// with mainnet but no contract deployed yet!
// export const SUPPORT_CHAINID = ["0x38", "0x61", "0x89", "0x13881", "0xa86a", "0xa869"]

// only testnet
export const SUPPORT_CHAINID = ["0x61", "0x13881", "0xa869"]

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
  scan: string
  currency: string
}

export const CHAINID_TO_DETAIL: { [chainId: string]: CHAIN_DETAIL } = {
  "0x38": {
    name: CHAIN_SUPPORT.BSC,
    shortName: "BSC",
    src: "binance",
    icon: "bnb",
    color: "#e7b527",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-chapel",
    scan: "https://bscscan.com/tx/",
    currency: "BNB",
  },
  "0x61": {
    name: CHAIN_SUPPORT.BSC_TESTNET,
    shortName: "BSC Testnet",
    src: "binance",
    icon: "bnb",
    color: "#e7b527",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-chapel",
    scan: "https://testnet.bscscan.com/tx/",
    currency: "BNB",
  },
  "0x89": {
    name: CHAIN_SUPPORT.POLYGON,
    shortName: "Polygon",
    src: "polygon",
    icon: "matic",
    color: "#6f38d6",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-mumbai",
    scan: "https://polygonscan.com/tx/",
    currency: "MATIC",
  },
  "0x13881": {
    name: CHAIN_SUPPORT.POLYGON_MUMBAI,
    shortName: "Mumbai",
    src: "polygon",
    icon: "matic",
    color: "#6f38d6",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-mumbai",
    scan: "https://mumbai.polygonscan.com/tx/",
    currency: "MATIC",
  },
  "0xa86a": {
    name: CHAIN_SUPPORT.AVALANCHE,
    shortName: "Avax",
    src: "avalanche",
    icon: "avax",
    color: "#d0443b",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-fuji",
    scan: "https://snowtrace.io/tx/",
    currency: "AVAX",
  },
  "0xa869": {
    name: CHAIN_SUPPORT.AVALANCHE_FUJI,
    shortName: "Fuji",
    src: "avalanche",
    icon: "avax",
    color: "#d0443b",
    api: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-fuji",
    scan: "https://testnet.snowtrace.io/tx/",
    currency: "AVAX",
  },
}
