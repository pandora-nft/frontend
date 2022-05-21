import { useEffect, useState } from "react"
import { TICKET_ADDRESS, TICKET_ABI } from "contract"
import { useMoralis, useChain, useMoralisWeb3Api } from "react-moralis"
import { Chain } from "types"
import { useLoading } from "./useLoading"
import { getNFTMetadata } from "api"
import { ethers } from "ethers"

export const useTicket = () => {
  const Web3Api = useMoralisWeb3Api()
  const { isWeb3Enabled, enableWeb3, account, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const [tickets, setTickets] = useState([])
  const { isLoading, onLoad, onDone } = useLoading()

  const fetchTicket = async (ticketId: number) => {
    const ticketContract = new ethers.Contract(
      TICKET_ADDRESS[chain.networkId],
      TICKET_ABI,
      moralisProvider
    )

    let owner, isClaimed, isWinner, isRefunded
    const nftMetadata = (
      await getNFTMetadata(chain.networkId, TICKET_ADDRESS[chain.networkId], ticketId)
    )?.data?.items[0]?.nft_data[0]?.external_data

    await Promise.all([
      ticketContract.ownerOf(ticketId),
      ticketContract.isClaimed(ticketId),
      ticketContract.isWinner(ticketId),
      ticketContract.isRefunded(ticketId),
    ]).then((values) => {
      owner = values[0].toString()
      isClaimed = values[1]
      isWinner = values[2]
      isRefunded = values[3]
    })

    const ticket = {
      tokenId: ticketId,
      collectionName: nftMetadata?.name || null,
      address: TICKET_ADDRESS[chain.networkId],
      imageURI: nftMetadata?.image || null,
      name: nftMetadata?.name || null,
      description: nftMetadata?.description || null,
      owner,
      isClaimed,
      isWinner,
      isRefunded,
    }

    return ticket
  }

  useEffect(() => {
    const main = async () => {
      const options = {
        chain: chain.chainId as Chain,
        address: account,
        token_address: TICKET_ADDRESS[chain.networkId],
      }
      const response = await Web3Api.account.getNFTsForContract(options)
      let tickets = []
      for (let tk of response.result) {
        const ticket = await fetchTicket(Number(tk.token_id))
        tickets.push(ticket)
      }
      setTickets(tickets)
      onDone()
    }

    if (isWeb3Enabled) {
      onLoad()
      main()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  return { fetchTicket, tickets, isLoading }
}
