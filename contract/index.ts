import factoryAbi from "./factory/abi.json"
import { abi as lootboxAbi } from "./lootbox/abi.json"
import { abi as ticketAbi } from "./ticket/abi.json"

export { factoryAbi as FACTORY_ABI }
export { lootboxAbi as LOOTBOX_ABI }
export { ticketAbi as TICKET_ABI }

export const FACTORY_ADDRESS: { [chainId: number]: string } = {
  // Rinkeby
  4: "0x5bFA17FBC6F5d73f63B676D2fBBb675a49fD9194",
  // BNB Testnet
  97: "0x5dA7a5af90fe291cE1bef49C819273A78F82D450",
  // Polygon Testnet
  80001: "0x88ec0FB3FF771AeF0CACbC0d84b583BC31D35f92",
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
  80001: "0x53Bc9CFc5da4b91983d2112B9601337a199C0B0f",

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
  80001: "0xb566800236bd8627c51746312ae73CD09F63cC3d",

  //BNB Chain
  56: "",
  //Polygon Mainnet
  137: "",
}
