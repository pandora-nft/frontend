import { Dispatch, SetStateAction, useState } from "react"
import { LOOTBOX_ABI } from "contract"
import { Lootbox, Ticket } from "types"
import { useMoralis } from "react-moralis"
import { Modal } from "components"
import { useTx } from "context/transaction"

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  lootbox: Lootbox
  tickets: Ticket[]
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const ClaimNFTDialog = ({ open, setOpen, lootbox, tickets, setIsSuccess }: Props) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket>(null)

  const { account } = useMoralis()
  const { doTx } = useTx()

  async function claimTickets(ticketId: number) {
    const sendOptions = {
      contractAddress: lootbox?.address,
      functionName: "claimNFT",
      abi: LOOTBOX_ABI,
      params: {
        _ticketId: ticketId,
      },
    }

    // await Moralis.executeFunction(sendOptions)
    const success = await doTx(sendOptions)
    if (success) {
      setOpen(false)
      setIsSuccess(true)
    }
  }

  const ownWonTicket = tickets?.filter((ticket) => {
    return (
      ticket &&
      ticket.owner?.toLowerCase() === account.toLowerCase() &&
      ticket.isWinner &&
      !ticket.isClaimed
    )
  })

  const content = (
    <>
      <div className="grid grid-rows-2 grid-flow-col">
        {!selectedTicket && ownWonTicket?.length > 0 ? (
          ownWonTicket.map((_ticket, index) => {
            return _ticket.tokenId === selectedTicket?.tokenId ? (
              <div className="border-2 rounded bg-lightPink flex flex-row my-4 space-x-4 justify-center">
                <div
                  key={index}
                  className="border-2 shadow-lg shadow-indigo-500/40 cursor-pointer max-w-sm"
                  onClick={() => {
                    if (selectedTicket == _ticket) {
                      setSelectedTicket(null)
                    } else {
                      setSelectedTicket(_ticket)
                    }
                  }}
                >
                  <img src={_ticket?.imageURI} alt="ticket" className="w-20 h-auto" />
                </div>
                <div className="border-2 shadow-lg shadow-indigo-500/40 cursor-pointer max-w-sm">
                  <img
                    // src={lootbox?.nfts[ticket?.wonNFT.id].imageURI}
                    src={_ticket.wonNFT?.imageURI}
                    alt="won-ticket"
                    className="w-20 h-auto"
                  />
                </div>
              </div>
            ) : (
              <div className="border-2 rounded bg-lightPink flex flex-row my-4 space-x-4 justify-center">
                <div
                  key={index}
                  className="border-2 hover:shadow-xl cursor-pointer max-w-sm"
                  onClick={() => {
                    if (selectedTicket == _ticket) {
                      setSelectedTicket(null)
                    } else {
                      setSelectedTicket(_ticket)
                    }
                  }}
                >
                  <img src={_ticket?.imageURI} alt="ticket" className="w-20 h-auto" />
                </div>
                <div className="border-2 shadow-lg shadow-indigo-500/40 cursor-pointer max-w-sm">
                  <img
                    // src={lootbox?.nfts[ticket?.wonNFT.id].imageURI}
                    src={_ticket.wonNFT?.imageURI}
                    alt="won-ticket"
                    className="w-20 h-auto"
                  />
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center">
            {ownWonTicket?.length > 0 ? "" : "You have no winning tickets to claim"}
          </div>
        )}
      </div>

      {selectedTicket && (
        <div className="flex flex-row my-4 space-x-4 justify-center">
          <div className="border-2 shadow-lg shadow-indigo-500/40 cursor-pointer max-w-sm mt-2">
            <img src={selectedTicket?.imageURI} alt="ticket" className="w-20 h-auto" />
          </div>
          <div className="border-2 shadow-lg shadow-indigo-500/40 cursor-pointer max-w-sm mt-2">
            <img
              // src={lootbox?.nfts[ticket?.wonNFT.id].imageURI}
              src={selectedTicket?.wonNFT?.imageURI}
              alt="won-ticket"
              className="w-20 h-auto"
            />
          </div>
        </div>
      )}
    </>
  )

  const claimButton = (
    <button
      className={`background-transparent font-bold uppercase px-6 py-2 
      text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear 
      transition-all duration-150 ${!selectedTicket && "text-gray-400"}`}
      disabled={!selectedTicket}
      onClick={() => claimTickets(selectedTicket.tokenId)}
    >
      Claim
    </button>
  )
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false)
        setSelectedTicket(null)
      }}
      title="Claim NFT"
      content={content}
      confirmButton={claimButton}
    />
  )
}
