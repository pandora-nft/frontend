import { FACTORY_ABI, FACTORY_ADDRESS, LOOTBOX_ABI, TICKET_ABI, TICKET_ADDRESS } from "contract"
import { useMoralis, useChain } from "react-moralis"
import { useState } from "react"
import { ethers } from "ethers"
import { Lootbox, NFT, Ticket } from "types"
import { getNFTMetadata } from "api"
import { useLoading } from "./useLoading"
import { useTicket } from "./useTicket"

export const useLootbox = () => {
  const { web3: moralisProvider } = useMoralis()
  const { chain } = useChain()

  // const Web3Api = useMoralisWeb3Api()
  const { fetchTicket } = useTicket()
  const { isLoading, onLoad, onDone } = useLoading()
  const [lootbox, setLootbox] = useState<Lootbox>({
    id: 0,
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
    owner: "",
  })
  const [tickets, setTickets] = useState<Ticket[]>()

  const fetchLootbox = async (_lootboxAddress: string, lootboxId?: number) => {
    onLoad()
    let lootboxAddress: string
    if (!isNaN(lootboxId)) {
      const factory = new ethers.Contract(
        FACTORY_ADDRESS[chain.chainId],
        FACTORY_ABI,
        moralisProvider
      )
      lootboxAddress = (await factory.functions.lootboxAddress(lootboxId))[0] as string
    } else {
      lootboxAddress = _lootboxAddress
    }

    const ticketContract = new ethers.Contract(
      TICKET_ADDRESS[chain.chainId],
      TICKET_ABI,
      moralisProvider
    )
    const lootboxContract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)

    const fetchNfts = await lootboxContract.getAllNFTs()

    let ticketIds = []
    if (!isNaN(lootboxId)) {
      ticketIds = await ticketContract.getTicketsForLootbox(lootboxId)
    }

    let id,
      name,
      ticketPrice,
      ticketSold,
      minimumTicketRequired,
      maxTicketPerWallet,
      drawTimestamp,
      isDrawn,
      isRefundable,
      owner
    await Promise.all([
      lootboxContract.id(),
      lootboxContract.name(),
      lootboxContract.ticketPrice(),
      lootboxContract.ticketSold(),
      lootboxContract.minimumTicketRequired(),
      lootboxContract.maxTicketPerWallet(),
      lootboxContract.drawTimestamp(),
      lootboxContract.isDrawn(),
      lootboxContract.isRefundable(),
      lootboxContract.owner(),
    ]).then((values) => {
      id = Number(values[0].toString())
      name = values[1].toString()
      ticketPrice = Number(values[2].toString())
      ticketSold = Number(values[3].toString())
      minimumTicketRequired = Number(values[4].toString())
      maxTicketPerWallet = Number(values[5].toString())
      drawTimestamp = Number(values[6].toString())
      isDrawn = values[7]
      isRefundable = values[8]
      owner = values[9].toString()
    })

    let nfts: NFT[] = []
    for (const nft of fetchNfts) {
      const nftAddress = nft._address.toString()
      const tokenId = +nft._tokenId.toString()
      const nftMetadata = await getNFTMetadata(chain.chainId, nftAddress, tokenId)

      nfts.push({
        tokenId,
        collectionName: nft.name,
        address: nftAddress,
        imageURI: nftMetadata?.image || null,
        name: nftMetadata?.name || null,
        description: nftMetadata?.description || null,
      })
    }

    let _tickets: Ticket[] = []
    for (const ticketId of ticketIds) {
      let ticket: Ticket
      Promise.all([fetchTicket(ticketId), lootboxContract.wonTicket(ticketId)]).then((values) => {
        ticket = values[0]
        ticket.wonTicket = Number(values[1])
        _tickets.push(ticket)
      })
    }
    const loot: Lootbox = {
      id,
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
      owner,
    }
    setLootbox(loot)
    setTickets(_tickets)
    onDone()
    return loot
  }

  return { fetchLootbox, lootbox, isLoading, tickets }
}
