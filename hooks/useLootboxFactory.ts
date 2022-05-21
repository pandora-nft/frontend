import { useMoralis, useWeb3Contract, useChain } from "react-moralis"
import { FACTORY_ADDRESS, FACTORY_ABI } from "contract"
import { useEffect, useState } from "react"
import { Lootbox } from "types"
import { useLootbox } from "./useLootbox"
import { ethers } from "ethers"
import { useLoading } from "./useLoading"

export const useLootboxFactory = () => {
  const { enableWeb3, isWeb3Enabled, web3: moralisProvider } = useMoralis()

  const { chain } = useChain()
  const [allLootboxes, setAllLootboxes] = useState<Lootbox[]>([])
  const [lootboxOwned, setLootboxOwned] = useState<Lootbox[]>([])
  const { isLoading, onLoad, onDone } = useLoading()
  const { fetchLootbox } = useLootbox()

  const { runContractFunction: getAllLootboxes } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.networkId] : "",
    functionName: "getAllLootboxes",
    abi: FACTORY_ABI,
  })

  const fetchLootboxOwned = async (account: string) => {
    const lootboxFactoryContract = new ethers.Contract(
      FACTORY_ADDRESS[chain.networkId],
      FACTORY_ABI,
      moralisProvider
    )
    const lootboxOwnedAddresses = await lootboxFactoryContract.getLootboxesOwnedByUser(account)

    let lootboxes: Lootbox[] = []
    for (let addr of lootboxOwnedAddresses) {
      const lootbox = await fetchLootbox(addr)
      lootboxes.push(lootbox)
    }

    setLootboxOwned(lootboxes)
    return lootboxes
  }

  useEffect(() => {
    const main = async () => {
      onLoad()

      const lootboxAddresses = (await getAllLootboxes()) as string[]

      let lootboxes: Lootbox[] = []
      for (let addr of lootboxAddresses) {
        const lootbox: Lootbox = await fetchLootbox(addr)
        lootboxes.push(lootbox)
      }
      setAllLootboxes(lootboxes)
      onDone()
    }

    if (isWeb3Enabled) {
      main()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  return { allLootboxes, fetchLootboxOwned, lootboxOwned, isLoading }
}
