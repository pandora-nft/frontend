import { FACTORY_ABI, FACTORY_ADDRESS, LOOTBOX_ABI, ERC721_ABI } from "contract"
import { useMoralis, useChain } from "react-moralis"
import { useState } from "react"
import { ethers } from "ethers"
import { Lootbox, NFT } from "types"
import { getNFTMetadata } from "api"
import { useLoading } from "./useLoading"

export const useLootbox = () => {
  const { web3: moralisProvider } = useMoralis()
  const { chain } = useChain()

  // const Web3Api = useMoralisWeb3Api()
  const { isLoading, onLoad, onDone } = useLoading()
  const [lootbox, setLootbox] = useState<Lootbox>({
    address: "",
    name: "",
    nfts: [],
    isDrawn: false,
    isRefundable: false,
    drawTimestamp: 0,
    ticketPrice: 0,
    minimumTicketRequired: 0,
    maxTicketPerWallet: 0,
    ticketSold: 0,
  })

  const fetchLootbox = async (_lootboxAddress: string, lootboxId?: number) => {
    onLoad()
    let lootboxAddress: string
    if (!isNaN(lootboxId)) {
      const factory = new ethers.Contract(
        FACTORY_ADDRESS[chain.networkId],
        FACTORY_ABI,
        moralisProvider
      )
      lootboxAddress = (await factory.functions.lootboxAddress(lootboxId))[0] as string
    } else {
      lootboxAddress = _lootboxAddress
    }

    const lootboxContract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)
    const {
      name,
      ticketPrice,
      ticketSold,
      minimumTicketRequired,
      maxTicketPerWallet,
      drawTimestamp,
      isDrawn,
      isRefundable,
      fetchNfts,
    } = await fetchLootboxAttrs(lootboxContract)

    const loot: Lootbox = {
      name,
      address: lootboxAddress,
      nfts: fetchNfts,
      isDrawn,
      isRefundable,
      drawTimestamp,
      ticketPrice,
      minimumTicketRequired,
      maxTicketPerWallet,
      ticketSold,
    }

    setLootbox(loot)
    onDone()
    return loot
  }

  const fetchLootboxAttrs = async (lootboxContract: ethers.Contract) => {
    let name,
      ticketPrice,
      ticketSold,
      minimumTicketRequired,
      maxTicketPerWallet,
      drawTimestamp,
      isDrawn,
      isRefundable,
      nfts
    await Promise.all([
      lootboxContract.name(),
      lootboxContract.ticketPrice(),
      lootboxContract.ticketSold(),
      lootboxContract.minimumTicketRequired(),
      lootboxContract.maxTicketPerWallet(),
      lootboxContract.drawTimestamp(),
      lootboxContract.isDrawn(),
      lootboxContract.isRefundable(),
      lootboxContract.getAllNFTs(),
    ]).then((values) => {
      name = values[0].toString()
      ticketPrice = Number(ethers.utils.formatEther(values[1].toString()))
      ticketSold = Number(values[2].toString())
      minimumTicketRequired = Number(values[3].toString())
      maxTicketPerWallet = Number(values[4].toString())
      drawTimestamp = Number(values[5].toString())
      isDrawn = values[6]
      isRefundable = values[7]
      nfts = values[8]
    })

    let fetchNfts: NFT[] = []
    for (const nft of nfts) {
      const fetchNft = await fetchNFTAttrs(nft)
      fetchNfts.push(fetchNft)
    }

    return {
      name,
      ticketPrice,
      ticketSold,
      minimumTicketRequired,
      maxTicketPerWallet,
      drawTimestamp,
      isDrawn,
      isRefundable,
      fetchNfts,
    }
  }

  const fetchNFTAttrs = async (nft: any) => {
    const nftAddress = nft._address.toString()
    const tokenId = +nft._tokenId.toString()

    // let nftMetadata = await Web3Api.token.getNFTMetadata({
    //   address: nftAddress,
    //   chain: "rinkeby",
    // })

    let nftMetadata = (await getNFTMetadata(chain.networkId, nftAddress, tokenId))?.items
    // [0]?.nft_data?.external_data;
    if (isNaN(nftMetadata)) {
      const nftContract = new ethers.Contract(nftAddress, ERC721_ABI, moralisProvider)
      const tokenURI = await nftContract.tokenURI(tokenId)
      const base64 = tokenURI.substr(tokenURI.indexOf(",") + 1)
      nftMetadata = JSON.parse(window.atob(base64))
    } else {
      nftMetadata = nftMetadata[0]?.nft_data?.external_data
    }
    // const nftMetadata = await Web3Api.token.getNFTMetadata({
    //   address: TICKET_ADDRESS[chain.networkId],
    //   chain: CHAIN[chain.networkId],
    // })
    const fetchNft = {
      tokenId,
      address: nftAddress,
      imageURI: nftMetadata?.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
      name: nftMetadata?.name,
      description: nftMetadata?.description,
    }
    return fetchNft
  }

  return { fetchLootbox, lootbox, isLoading }
}
