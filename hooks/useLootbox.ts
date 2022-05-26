import { useState } from "react"
import { useChain } from "react-moralis"
import { Lootbox, Ticket } from "types"
import { getNFTMetadata } from "api"
import { useLoading } from "./useLoading"
import axios from "axios"

export const useLootbox = () => {
  const { chain } = useChain()

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
  const [tickets, setTickets] = useState<Ticket[]>([])
  const fetchLootbox = async (_lootboxAddress: string, lootboxId?: number) => {
    onLoad()
    if (!isNaN(lootboxId)) {
      const result = await axios({
        url: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-lootbox",
        method: "post",
        data: {
          query: `
        query {singleLootbox(id:${lootboxId}){
          id
          drawTimestamp
          ticketPrice
          minimumTicketRequired
          maxTicketPerWallet
          owner
          ticketSold
          numNFT
          isDrawn
          isRefundable
          name
          boxId
          nft{
            id
            collectionName
            collectionSymbol
            address
            tokenId
          }
          tickets{
            owner
            isClaimed
            isWinner
            isRefunded
            ticketId
          }

        }}
        `,
        },
      })
      if (result?.data?.data?.singleLootbox) {
        const singleLootbox: any = result.data.data.singleLootbox
        const loot: Lootbox = {
          id: singleLootbox.id,
          name: singleLootbox.name,
          address: singleLootbox.address,
          nfts: [],
          isDrawn: singleLootbox.isDrawn,
          isRefundable: singleLootbox.isRefundable,
          drawTimestamp: singleLootbox.drawTimestamp,
          ticketPrice: singleLootbox.ticketPrice,
          minimumTicketRequired: singleLootbox.minimumTicketRequired,
          maxTicketPerWallet: singleLootbox.maxTicketPerWallet,
          ticketSold: singleLootbox.ticketSold,
          owner: singleLootbox.owner,
        }

        for (let nft of singleLootbox.nft) {
          const nftAddress = nft.address.toString()
          const tokenId = Number(nft.tokenId)
          const nftMetadata = await getNFTMetadata(chain.chainId, nftAddress, tokenId)

          loot.nfts.push({
            tokenId,
            collectionName: nft.name,
            address: nftAddress,
            imageURI: nftMetadata?.image || null,
            name: nftMetadata?.name || null,
            description: nftMetadata?.description || null,
          })
        }
        setLootbox(loot)
        setTickets(singleLootbox.tickets)
        onDone()
        return loot
      }
    }

    onDone()
    return lootbox
  }

  return { fetchLootbox, lootbox, isLoading, tickets }
}
