import { LOOTBOX_ADDRESS, LOOTBOX_ABI } from "contract"
import { useMoralis, useChain } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
// import { Lootbox } from "types"

export const useLootbox = () => {
  const { enableWeb3, isWeb3Enabled, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  // const [lootbox, setLootbox] = useState<Lootbox>({
  //   address: "",
  //   name: "",
  //   nfts: [],
  // })

  const [name, setName] = useState<string>("")
  const [id, setId] = useState<string>("")

  useEffect(() => {
    const main = async () => {
      const contract = new ethers.Contract(
        chain ? LOOTBOX_ADDRESS[chain.networkId] : "",
        LOOTBOX_ABI,
        moralisProvider
      )
      const name = await contract.name()
      setName(name.toString())
      const id = await contract.id()
      setId(id.toString())
    }

    if (isWeb3Enabled) {
      main()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  return { id, name }
}
