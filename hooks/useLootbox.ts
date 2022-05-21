import { FACTORY_ABI, FACTORY_ADDRESS, LOOTBOX_ABI, TICKET_ABI, TICKET_ADDRESS } from "contract"
import { useMoralis, useChain } from "react-moralis"
import { useState } from "react"
import { ethers } from "ethers"
import { Lootbox, NFT, Ticket } from "types"
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
  const [tickets, setTickets] = useState<Ticket[]>()

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

    const ticketContract = new ethers.Contract(
      TICKET_ADDRESS[chain.networkId],
      TICKET_ABI,
      moralisProvider
    )
    const lootboxContract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)

    const fetchNfts = await lootboxContract.getAllNFTs()

    let fetchTickets = []
    if (lootboxId) {
      fetchTickets = await ticketContract.getTicketsForLootbox(lootboxId)
    }

    let name,
      ticketPrice,
      ticketSold,
      minimumTicketRequired,
      maxTicketPerWallet,
      drawTimestamp,
      isDrawn,
      isRefundable
    await Promise.all([
      lootboxContract.name(),
      lootboxContract.ticketPrice(),
      lootboxContract.ticketSold(),
      lootboxContract.minimumTicketRequired(),
      lootboxContract.maxTicketPerWallet(),
      lootboxContract.drawTimestamp(),
      lootboxContract.isDrawn(),
      lootboxContract.isRefundable(),
    ]).then((values) => {
      name = values[0].toString()
      ticketPrice = Number(ethers.utils.formatEther(values[1].toString()))
      ticketSold = Number(values[2].toString())
      minimumTicketRequired = Number(values[3].toString())
      maxTicketPerWallet = Number(values[4].toString())
      drawTimestamp = Number(values[5].toString())
      isDrawn = values[6]
      isRefundable = values[7]
    })

    let nfts: NFT[] = []
    for (const nft of fetchNfts) {
      const nftAddress = nft._address.toString()
      const tokenId = +nft._tokenId.toString()
      const nftMetadata = (await getNFTMetadata(chain.networkId, nftAddress, tokenId))?.data
        ?.items[0]?.nft_data[0]?.external_data

      nfts.push({
        tokenId,
        address: nftAddress,
        imageURI: nftMetadata?.image || null,
        name: nftMetadata?.name || null,
        description: nftMetadata?.description || null,
      })
    }

    let tickets: Ticket[] = []
    for (const ticketId of fetchTickets) {
      let owner, isClaimed, isWinner, isRefunded, wonTicket
      const nftMetadata = (
        await getNFTMetadata(chain.networkId, TICKET_ADDRESS[chain.networkId], ticketId)
      )?.data?.items[0]?.nft_data[0]?.external_data
      await Promise.all([
        ticketContract.ownerOf(ticketId),
        ticketContract.isClaimed(ticketId),
        ticketContract.isWinner(ticketId),
        ticketContract.isRefunded(ticketId),
        lootboxContract.wonTicket(ticketId),
      ]).then((values) => {
        owner = values[0].toString()
        isClaimed = values[1]
        isWinner = values[2]
        isRefunded = values[3]
        wonTicket = values[4]
      })
      tickets.push({
        tokenId: ticketId,
        address: TICKET_ADDRESS[chain.networkId],
        imageURI: nftMetadata?.image || null,
        name: nftMetadata?.name || null,
        description: nftMetadata?.description || null,
        owner,
        isClaimed,
        isWinner,
        isRefunded,
        wonTicket,
      })
    }

    const loot: Lootbox = {
      name,
      address: lootboxAddress,
      nfts,
      isDrawn,
      isRefundable,
      drawTimestamp,
      ticketPrice,
      minimumTicketRequired,
      maxTicketPerWallet,
      ticketSold,
    }
    setLootbox(loot)
    setTickets(tickets)
    onDone()
    return loot
  }

  return { fetchLootbox, lootbox, isLoading, tickets }
}
