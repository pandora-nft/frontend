import { LOOTBOX_ADDRESS, LOOTBOX_ABI } from "contract"
import { useMoralis, useChain } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export const TestUseLootbox = () => {
  const { enableWeb3, isWeb3Enabled, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const [name, setName] = useState<string>("")
  const [id, setId] = useState<string>("")
  useEffect(() => {
    async function updateUI() {
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
      updateUI()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])
  // console.log(id, name)
  return { id, name }
}
