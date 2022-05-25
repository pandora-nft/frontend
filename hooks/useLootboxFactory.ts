import { useMoralis, useChain } from "react-moralis"
import { SUPPORT_CHAINID } from "contract"
import { useEffect, useState } from "react"
import { Lootbox } from "types"
import { useLootbox } from "./useLootbox"

import { useLoading } from "./useLoading"
import { useError } from "context/errors"
import axios from "axios"
export const useLootboxFactory = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()

  const { chain } = useChain()
  const [allLootboxes, setAllLootboxes] = useState<Lootbox[]>([])
  const [lootboxOwned, setLootboxOwned] = useState<Lootbox[]>([])
  const { isLoading, onLoad, onDone } = useLoading()
  const { fetchLootbox } = useLootbox()
  const { setError } = useError()

  const fetchManyLootboxByBid = async (bids: number[]) => {
    let lootboxes: Lootbox[] = []
    const promises = []
    for (let bid of bids) {
      promises.push(fetchLootbox("", bid))
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
  const getAllLootboxes = async () => {
    const singleLootboxes = await axios({
      url: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-lootbox",
      method: "post",
      data: {
        query: `{
              singleLootboxes(owner: "0xafF2671aD7129DC23D05F83fF651601e9d1aea0a" ){
                boxId
                owner
              }
            }
            `,
      },
    })
    let lootboxOwnedBids: number[] = []
    singleLootboxes.data.data.singleLootboxes.map((lootbox) => {
      lootboxOwnedBids.push(Number(lootbox.boxId))
    })
    let lootboxes: Lootbox[] = await fetchManyLootboxByBid(lootboxOwnedBids) //lootboxOwnedAddresses
    return lootboxes
  }

  const fetchLootboxOwned = async (account: string) => {
    const singleLootboxes = await axios({
      url: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-lootbox",
      method: "post",
      data: {
        query: `{
                singleLootboxes(owner: $account ){
                  boxId
                  owner
                }
              }
              `,
      },
    })
    let lootboxOwnedBids: number[] = []
    singleLootboxes.data.data.singleLootboxes.map((lootbox) => {
      if (account.toString().toLowerCase() === lootbox.owner.toString().toLowerCase())
        lootboxOwnedBids.push(Number(lootbox.boxId))
    })
    let lootboxes: Lootbox[] = await fetchManyLootboxByBid(lootboxOwnedBids)

    setLootboxOwned(lootboxes)
    return lootboxes
  }

  useEffect(() => {
    const main = async () => {
      let lootboxes: Lootbox[] = await getAllLootboxes()
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
