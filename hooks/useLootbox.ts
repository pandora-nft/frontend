import { LOOTBOX_ABI, TICKET_ADDRESS } from "contract"
import { useMoralis, useChain, useMoralisWeb3Api } from "react-moralis"
import { useState } from "react"
import { ethers } from "ethers"
import { Lootbox, NFT } from "types"

export const useLootbox = () => {
  const { web3: moralisProvider } = useMoralis()
  const { chain } = useChain()

  const Web3Api = useMoralisWeb3Api()

  const [lootbox, setLootbox] = useState<Lootbox>({
    address: "",
    name: "",
    nfts: [],
  })

  const fetchLootbox = async (lootboxAddress: string) => {
    const lootboxContract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)
    const fetchNfts = await lootboxContract.getAllNFTs()
    console.log("fetchNFTs", lootboxAddress, fetchNfts)

    let nfts: NFT[] = []
    for (let nft of fetchNfts) {
      const nftAddress = nft._address.toString()
      const tokenId = +nft._tokenId.toString()

      // const nftMetadata = await getNFTMetadata(chain.networkId, nftAddress, tokenId)
      const nftMetadata = await Web3Api.token.getNFTMetadata({
        address: TICKET_ADDRESS[chain.networkId],
        chain: "rinkeby",
      })
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
