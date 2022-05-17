import { useMoralis, useWeb3Contract, useChain } from "react-moralis"
import { FACTORY_ADDRESS, FACTORY_ABI, LOOTBOX_ABI } from "contract"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Lootbox, NFT } from "types"
import { getNFTMetadata } from "api"

export const useLootboxFactory = () => {
  const { enableWeb3, isWeb3Enabled, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const [allLootboxes, setAllLootboxes] = useState<Lootbox[]>([])

  const { runContractFunction: getAllLootboxes } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.networkId] : "",
    functionName: "getAllLootboxes",
    abi: FACTORY_ABI,
    params: {},
  })

  const getLootboxData = async (lootboxAddress: string) => {
    const lootboxContract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)
    const fetchNfts = lootboxContract.getAllNFTs()

    let nfts: NFT[] = []
    for (let nft of fetchNfts) {
      const nftAddress = nft.address.toString()
      const tokenId = nft.tokenId.toString()

      const nftMetadata = await getNFTMetadata(chain.networkId, nftAddress, tokenId)
      console.log("nft metadata", nftMetadata)

      nfts.push({ tokenId, address: nftAddress, imageURI: "" })
    }
    const name = await lootboxContract.name()
    const lootbox: Lootbox = { name, address: lootboxAddress, nfts }

    return lootbox
  }

  useEffect(() => {
    const main = async () => {
      // const lootboxAddresses = ["0x24Fd4716985DAee8cDcaACDC5B3A06F15b498374"]
      const lootboxAddresses = (await getAllLootboxes()) as string[]

      let lootboxes: Lootbox[] = []
      for (let addr of lootboxAddresses) {
        const lootbox: Lootbox = await getLootboxData(addr)
        lootboxes.push(lootbox)
      }
      // console.log(lootboxes)
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
