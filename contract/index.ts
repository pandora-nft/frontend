import factoryAbi from "./factory/abi.json"
import lootboxAbi from "./lootbox/abi.json"
import ticketAbi from "./ticket/abi.json"

export { factoryAbi as FACTORY_ABI }
export { lootboxAbi as LOOTBOX_ABI }
export { ticketAbi as TICKET_ABI }

export const FACTORY_ADDRESS: { [chainId: number]: string } = {
  // Rinkeby
  4: "0x0406b6DEA38F9D3E616E29E2837FBDfC65F328A2",
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
  4: "0x36DF42342293ab2fbff56360dAb65498f1675156",
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
  4: "0x09F0fec74a6f350e7e03d8d694228144473F5332",
  //BNB Testnet
  97: "0x24Fd4716985DAee8cDcaACDC5B3A06F15b498374",
  //Polygon Testnet
  80001: "0xb566800236bd8627c51746312ae73CD09F63cC3d",

  //BNB Chain
  56: "",
  //Polygon Mainnet
  137: "",
}
