import { abi as factoryAbi } from "./factory/LootboxFactory.json"
import { abi as lootboxAbi } from "./lootbox/Lootbox.json"
import { abi as ticketAbi } from "./ticket/PandoraTicket.json"
import { abi as erc721Abi } from "./ERC721/ERC721.json"

export { erc721Abi as ERC721_ABI }
export { factoryAbi as FACTORY_ABI }
export { lootboxAbi as LOOTBOX_ABI }
export { ticketAbi as TICKET_ABI }

export const FACTORY_ADDRESS: { [chainId: number]: string } = {
    //Rinkeby
    4: "0xedF72393De2860E0cEc3C1D48865c3D58957556F",
    //BNB Testnet
    97: "0x861543c3B97e193Af95179a052472bb063F9e394",
    //Mumbai
    80001: "0x8dFCdd30170FeAF90DC6C182123A465f7E7Ab080",
    //Fuji
    43113: "0x145C6028c725A1eACA457F1a3f79daC246aE7746",
    //Avalanche
    // 43114: "",
    //BNB Chain
    // 56: "",
    //Polygon Mainnet
    // 137: "",
}

export const TICKET_ADDRESS: { [chainId: number]: string } = {
  //Rinkeby
    //Rinkeby
    4: "0xe5674c9166CAaA4aFb43102aaDAE115910d62eE1",
    //BNB Testnet
    97: "0x54aB2f68c0088C82b36C31614133e478b49b5248",
    //Mumbai
    80001: "0x9E2238f4dB3c6b9307CaaEbdC8289e89aBa38123",
    //Fuji
    43113: "0x2FD95A2C686fB4bd28F42878E0b3BE98850fD7F5",
    //Avalanche
    // 43114: "",
    //BNB Chain
    // 56: "",
    //Polygon Mainnet
    // 137: "",
}
export const LOOTBOX_ADDRESS: { [chainId: number]: string } = {
    //Rinkeby
    4: "0x52c608b955Bcf424cD5D37136b6bA99E7E6DafdF",
    //BNB Testnet
    97: "0x3dCCF4C17FcEb02145c5dDDb5D527BA4E458fC2e",
    //Mumbai
    80001: "0x8Fb154DBEa5B803DdDAc82Da0DC2ef9A8c9D3840",
    //Fuji
    43113: "0x8c41A91E46c85aA8BB5319720f9d8b324d737Fb9",
    //Avalanche
    // 43114: "",   
    //BNB Chain
    // 56: "",
    //Polygon Mainnet
    // 137: "",
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
}

export const CHAINID_TO_DETAIL: { [chainId: string]: CHAIN_DETAIL } = {
  "0x38": {
    name: CHAIN_SUPPORT.BSC,
    shortName: "BSC",
    src: "binance",
  },
  "0x61": {
    name: CHAIN_SUPPORT.BSC_TESTNET,
    shortName: "BSC Testnet",
    src: "testnet",
  },
  "0x89": {
    name: CHAIN_SUPPORT.POLYGON,
    shortName: "Polygon",
    src: "polygon",
  },
  "0x13881": {
    name: CHAIN_SUPPORT.POLYGON_MUMBAI,
    shortName: "Mumbai",
    src: "testnet",
  },
  "0xa86a": {
    name: CHAIN_SUPPORT.AVALANCHE,
    shortName: "Avax",
    src: "avalanche",
  },
  "0xa869": {
    name: CHAIN_SUPPORT.AVALANCHE_FUJI,
    shortName: "Fuji",
    src: "testnet",
  },
}
