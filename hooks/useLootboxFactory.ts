import { useMoralis, useWeb3Contract, useChain } from "react-moralis"
import { FACTORY_ADDRESS, FACTORY_ABI } from "contract"
import { useEffect, useState } from "react"
import { Lootbox } from "types"
import { useLootbox } from "./useLootbox"

export const useLootboxFactory = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { chain } = useChain()
  const [allLootboxes, setAllLootboxes] = useState<Lootbox[]>([])
  const { fetchLootbox } = useLootbox()
  const { runContractFunction: getAllLootboxes } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.networkId] : "",
    functionName: "getAllLootboxes",
    abi: FACTORY_ABI,
    params: {},
  })

  useEffect(() => {
    const main = async () => {
      const lootboxAddresses = (await getAllLootboxes()) as string[]

      let lootboxes: Lootbox[] = []
      for (let addr of lootboxAddresses) {
        const lootbox: Lootbox = await fetchLootbox(addr)
        lootboxes.push(lootbox)
      }
      setAllLootboxes(lootboxes)
    }

    if (isWeb3Enabled) {
      main()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  return { allLootboxes }
}
