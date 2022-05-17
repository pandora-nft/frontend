import { FACTORY_ADDRESS, FACTORY_ABI, LOOTBOX_ABI } from "contract"
import { useMoralis, useWeb3Contract, useChain } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Lootbox } from "types"

export const useLootboxFactory = () => {
  const { enableWeb3, isWeb3Enabled, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const [allLootboxAddresses, setAllLootboxAddresses] = useState<string[]>([""])
  const [allLootboxes, setAllLootboxes] = useState<Lootbox[]>([])
  console.log(chain ? FACTORY_ADDRESS[chain.networkId] : "")
  const { runContractFunction: getAllLootboxes } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.networkId] : "",
    functionName: "getAllLootboxes",
    abi: FACTORY_ABI,
    params: {},
  })

  useEffect(() => {
    async function updateUI() {
      const lootboxAddresses = (await getAllLootboxes()) as string[]
      setAllLootboxAddresses(lootboxAddresses)

      let lootboxes: Lootbox[] = []
      if (lootboxAddresses)
        for (let addr of lootboxAddresses) {
          const contract = new ethers.Contract(addr, LOOTBOX_ABI, moralisProvider)
          const name = await contract.name()
          lootboxes.push({ name, address: addr })
        }
      setAllLootboxes(lootboxes)
    }

    if (isWeb3Enabled) {
      updateUI()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  return { allLootboxes, allLootboxAddresses }
}
