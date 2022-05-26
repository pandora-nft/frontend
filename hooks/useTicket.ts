import { useEffect, useState } from "react"
import { TICKET_ADDRESS, TICKET_ABI, SUPPORT_CHAINID } from "contract"
import { useMoralis, useChain } from "react-moralis"

import { useLoading } from "./useLoading"

import { ethers } from "ethers"
import { Ticket } from "types"
import axios from "axios"

export const useTicket = () => {
  const { isWeb3Enabled, enableWeb3, account, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const { isLoading, onLoad, onDone } = useLoading()
  // still not working => THE  GRAPH of ticket need to return address , tokenid and some more crucial data
  const fetchTicket = async (account: string) => {
    onLoad()
    const ret_tickets: Ticket[] = []
    const result = await axios({
      url: "https://api.thegraph.com/subgraphs/name/pannavich/pandora-nft-mumbai",
      method: "post",
      data: {
        query: `
          query {
            tickets(where: {
              owner: "0xafF2671aD7129DC23D05F83fF651601e9d1aea0a"
            }
            ){
            id
            owner
            name
            image
            description
            ticketId
            isWinner
            isClaimed
            isRefunded
            lootbox{
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
            }
          }
        }
          `,
      },
    })
    if (account && result?.data?.data?.tickets) {
      const tickets: any = result.data.data.tickets
      for (let singleTicket of tickets) {
        if (singleTicket.owner.toString().toLowerCase() !== account.toString().toLowerCase())
          continue
        let nftMetadata = {
          name: singleTicket.name,
          image: singleTicket.image,
          description: singleTicket.description,
        }
        if (singleTicket.isWinner) {
          const ticketContract = new ethers.Contract(
            TICKET_ADDRESS[chain.chainId],
            TICKET_ABI,
            moralisProvider
          )
          const tokenURI = await ticketContract.tokenURI(singleTicket.ticketId)
          const base64 = tokenURI.substr(tokenURI.indexOf(",") + 1)
          nftMetadata = JSON.parse(window.atob(base64))
          nftMetadata.image = nftMetadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
        }
        const ticket = {
          tokenId: singleTicket.ticketId,
          collectionName: singleTicket.collectionName,
          address: TICKET_ADDRESS[chain.chainId],
          imageURI: nftMetadata?.image || null,
          name: nftMetadata?.name || null,
          description: nftMetadata?.description || null,
          owner: singleTicket.owner,
          isClaimed: singleTicket.isClaimed,
          isWinner: singleTicket.isWinner,
          isRefunded: singleTicket.isRefunded,
          lootboxId: singleTicket.lootbox.boxId,
        }
        ret_tickets.push(ticket)
      }
      setTickets(ret_tickets)
      onDone()
      return ret_tickets
    }

    onDone()
    return ret_tickets
  }

  useEffect(() => {
    fetchTicket(account)
    onDone()

    if (isWeb3Enabled && chain) {
      onLoad()
      fetchTicket(account)
      if (!SUPPORT_CHAINID.includes(chain.chainId)) {
        return
      }
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled, chain, account])

  return { fetchTicket, tickets, isLoading }
}
