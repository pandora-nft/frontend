import { useEffect, useState } from "react"
import { TICKET_ADDRESS, SUPPORT_CHAINID } from "contract"
import { useMoralis, useChain } from "react-moralis"

import { useLoading } from "./useLoading"

import { Ticket } from "types"
import axios from "axios"
import { CHAINID_TO_DETAIL } from "contract"

export const useTicket = () => {
  const { isWeb3Enabled, enableWeb3, account } = useMoralis()
  const { chain } = useChain()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const { isLoading, onLoad, onDone } = useLoading()

  const fetchTicket = async (account: string) => {
    onLoad()
    const ret_tickets: Ticket[] = []
    const result = await axios.post(CHAINID_TO_DETAIL[chain?.chainId].api, {
      query: `
          query tickets($account: String!){
            tickets(where: {
              owner: $account
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
      variables: {
        account: account,
      },
    })
    if (account && result?.data?.data?.tickets) {
      const tickets: any = result.data.data.tickets
      for (let singleTicket of tickets) {
        if (singleTicket.owner.toString().toUpperCase() !== account.toString().toUpperCase())
          continue
        const ticket = {
          ticketId: singleTicket.ticketId,
          tokenId: singleTicket.ticketId,
          collectionName: singleTicket.collectionName,
          address: TICKET_ADDRESS[chain?.chainId],
          name: singleTicket.name || null,
          imageURI: singleTicket.image?.replace("ipfs://", "https://ipfs.io/ipfs/") || null,
          description: singleTicket.description || null,
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
    } else {
      onDone()
      return ret_tickets
    }
  }

  useEffect(() => {
    if (isWeb3Enabled && chain?.chainId) {
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
