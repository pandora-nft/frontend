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
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const ClaimNFTDialog = ({ open, setOpen, lootbox, setIsSuccess }: Props) => {
  const [selectedTicket, setSelectedTicket] = useState<Ticket>(null)

  const { account } = useMoralis()
  const { doTx } = useTx()
  const { tickets } = lootbox

  async function claimTickets(ticketId: number) {
    const sendOptions = {
      contractAddress: lootbox?.address,
      functionName: "claimNFT",
      abi: LOOTBOX_ABI,
      params: {
        _ticketId: ticketId,
      },
    }

    setOpen(false)
    const success = await doTx(sendOptions)
    if (success) {
      setIsSuccess(true)
    }
  }

  const ownWonTicket = tickets?.filter((ticket) => {
    // console.log("ticket: ", ticket)
    return (
      ticket &&
      ticket.owner?.toLowerCase() === account.toLowerCase() &&
      ticket.isWinner &&
      !ticket.isClaimed
    )
  })

  const content = (
    <>
      <div className="grid grid-cols-2 grid-flow-row gap-10 max-h-[500px] overflow-auto">
        {!selectedTicket && ownWonTicket?.length > 0 ? (
          ownWonTicket.map((_ticket, index) => {
            return _ticket.tokenId === selectedTicket?.tokenId ? (
              <div className="border-2 rounded bg-lightPink flex flex-row my-4 space-x-4 justify-center">
                <div
                  key={index}
                  className="border-2 shadow-lg shadow-mainPink cursor-pointer max-w-sm"
                  onClick={() => {
                    if (selectedTicket == _ticket) {
                      setSelectedTicket(null)
                    } else {
                      setSelectedTicket(_ticket)
                    }
                  }}
                >
                  <img src={_ticket?.imageURI} alt="ticket" className="w-32 h-auto" />
                </div>
                <div className="border-2 shadow-lg cursor-pointer max-w-sm">
                  <img src={_ticket.wonNFT.imageURI} alt="won-ticket" className="w-32 h-auto" />
                </div>
              </div>
            ) : (
              <div className="border-2 rounded bg-lightPink flex flex-row my-4 space-x-4 justify-center">
                <div
                  key={index}
                  className="border-2 hover:shadow-xl hover:shadow-green-500 cursor-pointer max-w-sm"
                  onClick={() => {
                    if (selectedTicket == _ticket) {
                      setSelectedTicket(null)
                    } else {
                      setSelectedTicket(_ticket)
                    }
                  }}
                >
                  <img src={_ticket?.imageURI} alt="ticket" className="w-32 h-auto" />
                </div>
                <div className="border-2 shadow-lg shadow-mainPink max-w-sm">
                  <img src={_ticket.wonNFT.imageURI} alt="won-nft" className="w-32 h-auto" />
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
          <div className="border-2 shadow-lg shadow-mainPink cursor-pointer max-w-sm mt-2">
            <img src={selectedTicket?.imageURI} alt="ticket" className="w-32 h-auto" />
          </div>
          <div className="border-2 shadow-lg shadow-mainPink cursor-pointer max-w-sm mt-2">
            <img src={selectedTicket?.wonNFT?.imageURI} alt="won-ticket" className="w-32 h-auto" />
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
