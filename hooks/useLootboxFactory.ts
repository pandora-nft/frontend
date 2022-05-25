import { useMoralis, useWeb3Contract, useChain } from "react-moralis"
import { FACTORY_ADDRESS, FACTORY_ABI, SUPPORT_CHAINID } from "contract"
import { useEffect, useState } from "react"
import { Lootbox } from "types"
import { useLootbox } from "./useLootbox"
import { ethers } from "ethers"
import { useLoading } from "./useLoading"
import { useError } from "context/errors"

export const useLootboxFactory = () => {
  const { enableWeb3, isWeb3Enabled, web3: moralisProvider } = useMoralis()

  const { chain } = useChain()
  const [allLootboxes, setAllLootboxes] = useState<Lootbox[]>([])
  const [lootboxOwned, setLootboxOwned] = useState<Lootbox[]>([])
  const { isLoading, onLoad, onDone } = useLoading()
  const { fetchLootbox } = useLootbox()
  const { setError } = useError()

  const { runContractFunction: getAllLootboxes } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.chainId] : "",
    functionName: "getAllLootboxes",
    abi: FACTORY_ABI,
  })

  const fetchManyLootboxByAddresses = async (lootboxAddresses: string[]) => {
    let lootboxes: Lootbox[] = []

    const promises = []

    for (let addr of lootboxAddresses) {
      promises.push(fetchLootbox(addr))
    }

    await Promise.all(promises)
      .then((results) => {
        for (const result of results) {
          lootboxes.push(result)
        }
      })
      .catch((err) => {
        setError(err.message)
      })

    return lootboxes
  }

  const fetchLootboxOwned = async (account: string) => {
    const lootboxFactoryContract = new ethers.Contract(
      FACTORY_ADDRESS[chain.chainId],
      FACTORY_ABI,
      moralisProvider
    )
    const lootboxOwnedAddresses = await lootboxFactoryContract.getLootboxesOwnedByUser(account)

    let lootboxes: Lootbox[] = await fetchManyLootboxByAddresses(lootboxOwnedAddresses)

    setLootboxOwned(lootboxes)
    return lootboxes
  }

  useEffect(() => {
    const main = async () => {
      const lootboxAddresses = (await getAllLootboxes()) as string[]

      let lootboxes: Lootbox[] = await fetchManyLootboxByAddresses(lootboxAddresses)

      setAllLootboxes(lootboxes)
      onDone()
    }

    if (isWeb3Enabled && chain) {
      onLoad()
      if (!SUPPORT_CHAINID.includes(chain.chainId)) {
        return
      }
      main()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled, chain])

  return { allLootboxes, fetchLootboxOwned, lootboxOwned, isLoading }
}
