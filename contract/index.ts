import factoryAbi from "./factory/abi.json"
import { abi as lootboxAbi } from "./lootbox/abi.json"
import { abi as ticketAbi } from "./ticket/abi.json"
import { abi as erc721Abi } from "./ERC721/ERC721.json"

export { erc721Abi as ERC721_ABI }
export { factoryAbi as FACTORY_ABI }
export { lootboxAbi as LOOTBOX_ABI }
export { ticketAbi as TICKET_ABI }

export const FACTORY_ADDRESS: { [chainId: number]: string } = {
  // Rinkeby
  4: "0x5bFA17FBC6F5d73f63B676D2fBBb675a49fD9194",
  // BNB Testnet
  97: "0x5dA7a5af90fe291cE1bef49C819273A78F82D450",
  // Polygon Testnet
  80001: "0xA9Fe6ad0e6Aff73b46C5e3E69ec90A05cc7603e3",
  // BNB Chain
  56: "",
  // Polygon Mainnet
  137: "",
}

export const TICKET_ADDRESS: { [chainId: number]: string } = {
  //Rinkeby
  4: "0x075303223c073e51E8e1a85a4895732f4Ccadc11",
  //BNB Testnet
  97: "0x36DF42342293ab2fbff56360dAb65498f1675156",
  //Polygon Testnet
  80001: "0xd83281072244164bbe9217f1EeA98D7229EBCCA8",

  //BNB Chain
  56: "",
  //Polygon Mainnet
  137: "",
}
export const LOOTBOX_ADDRESS: { [chainId: number]: string } = {
  //Rinkeby
  4: "0x382C6F730503Ec5846Af16081f75B68290a79A14",
  //BNB Testnet
  97: "0x24Fd4716985DAee8cDcaACDC5B3A06F15b498374",
  //Polygon Testnet
  80001: "0x72967D8fF07BA40De2c8EB26A468fFc3A83cf1eC",

  //BNB Chain
  56: "",
  //Polygon Mainnet
  137: "",
}
