import { LOOTBOX_ABI } from "contract"
import { useMoralis } from "react-moralis"
import { useState } from "react"
import { ethers } from "ethers"
import { Lootbox } from "types"

export const useLootbox = () => {
  const { web3: moralisProvider } = useMoralis()
  const [lootbox, setLootbox] = useState<Lootbox>({
    address: "",
    name: "",
    nfts: [],
  })

  const fetchLootbox = async (lootboxAddress: string) => {
    const contract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)
    const name = await contract.name()

    //TODO: fetch nfts from this lootbox
    setLootbox({
      address: lootboxAddress,
      name: name.toString(),
      nfts: [], // put fetch nfts in here
    })
  }

  return { fetchLootbox, lootbox }
}
