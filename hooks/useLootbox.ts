import { LOOTBOX_ABI, TICKET_ADDRESS } from "contract"
import { useMoralis, useChain, useMoralisWeb3Api } from "react-moralis"
import Moralis from "moralis"
import { useState } from "react"
import { ethers } from "ethers"
import { Chain, Lootbox, NFT } from "types"

export const useLootbox = () => {
  const { web3: moralisProvider } = useMoralis()
  const { chain } = useChain()

  const Web3Api = useMoralisWeb3Api()

  const [lootbox, setLootbox] = useState<Lootbox>({
    address: "",
    name: "",
    nfts: [],
    ticketPrice: "0",
    ticketSold: "0",
    minimumTicketRequired: "0",
    maxTicketPerWallet: "0",
    drawTimestamp: 0,
    isDrawn: false,
  })

  const fetchLootbox = async (lootboxAddress: string) => {
    const lootboxContract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)
    const fetchNfts = await lootboxContract.getAllNFTs()
    // console.log("fetchNFTs", lootboxAddress, fetchNfts)

    let name,
      ticketPrice,
      ticketSold,
      minimumTicketRequired,
      maxTicketPerWallet,
      drawTimestamp,
      isDrawn
    await Promise.all([
      lootboxContract.name(),
      lootboxContract.ticketPrice(),
      lootboxContract.ticketSold(),
      lootboxContract.minimumTicketRequired(),
      lootboxContract.maxTicketPerWallet(),
      lootboxContract.drawTimestamp(),
      lootboxContract.isDrawn(),
    ]).then((values) => {
      name = values[0].toString()
      ticketPrice = Moralis.Units.FromWei(values[1].toString())
      ticketSold = values[2].toString()
      minimumTicketRequired = values[3].toString()
      maxTicketPerWallet = values[4].toString()
      drawTimestamp = values[5].toString()
      isDrawn = values[6].toString()
    })

    let nfts: NFT[] = []
    for (let nft of fetchNfts) {
      const nftAddress = nft._address.toString()
      const tokenId = +nft._tokenId.toString()

      // const nftMetadata = await getNFTMetadata(chain.networkId, nftAddress, tokenId)
      const nftMetadata = await Web3Api.token.getNFTMetadata({
        address: TICKET_ADDRESS[chain.networkId],
        chain: chain.chainId as Chain,
      })
      console.log("nft metadata", nftMetadata)

      nfts.push({
        name: nft.name,
        collectionName: nft.name,
        description: "",
        tokenId: tokenId,
        address: nftAddress,
        imageURI: nft.image,
      })
    }
    const loot: Lootbox = {
      name,
      address: lootboxAddress,
      nfts,
      ticketPrice,
      ticketSold,
      minimumTicketRequired,
      maxTicketPerWallet,
      drawTimestamp,
      isDrawn,
    }

    setLootbox(loot)
    return loot
  }

  return { fetchLootbox, lootbox }
}
