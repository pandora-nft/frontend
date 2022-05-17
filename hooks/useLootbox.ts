import { LOOTBOX_ABI } from "contract"
import { useMoralis, useChain } from "react-moralis"
import { useState } from "react"
import { ethers } from "ethers"
import { Lootbox, NFT } from "types"
import { getNFTMetadata } from "api"

export const useLootbox = () => {
  const { web3: moralisProvider } = useMoralis()
  const { chain } = useChain()

  const [lootbox, setLootbox] = useState<Lootbox>({
    address: "",
    name: "",
    nfts: [],
  })

  const fetchLootbox = async (lootboxAddress: string) => {
    const lootboxContract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)
    const fetchNfts = await lootboxContract.getAllNFTs()

    let nfts: NFT[] = []
    for (let nft of fetchNfts) {
      const nftAddress = nft.address.toString()
      const tokenId = +nft.tokenId.toString()

      const nftMetadata = await getNFTMetadata(chain.networkId, nftAddress, tokenId)
      console.log("nft metadata", nftMetadata)

      nfts.push({ tokenId, address: nftAddress, imageURI: "" })
    }
    const name = (await lootboxContract.name()).toString()
    const loot: Lootbox = { name, address: lootboxAddress, nfts }

    setLootbox(loot)
    return loot
  }

  return { fetchLootbox, lootbox }
}
