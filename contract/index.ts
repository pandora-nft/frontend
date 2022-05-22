import { abi as factoryAbi } from "./factory/LootboxFactory.json"
import { abi as lootboxAbi } from "./lootbox/Lootbox.json"
import { abi as ticketAbi } from "./ticket/PandoraTicket.json"
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
  80001: "0x8c7cf4db37B42cc231B0e821Dae03c842d8D367f",
  //Fuji
  43113: "",
  //Avax
  43114: "",
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
  80001: "0x11Eb327528F2f760143BC5d19D8E9E71ABcf405d",
  //Fuji
  43113: "",
  //Avax
  43114: "",
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
  80001: "0xbEBEc9f178E732052763Eba026A877e2F357A53F",
  //Fuji
  43113: "",
  //Avax
  43114: "",
  //BNB Chain
  56: "",
  //Polygon Mainnet
  137: "",
}
