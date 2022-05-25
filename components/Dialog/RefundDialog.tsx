import { Dispatch, SetStateAction, useState } from "react"
import { LOOTBOX_ABI } from "contract"
import { Lootbox, Ticket } from "types"
import { useMoralis } from "react-moralis"
import { Modal } from "components"

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  lootbox: Lootbox
  tickets: Ticket[]
}

export const RefundDialog = ({ open, setOpen, lootbox, tickets }: Props) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const { account, Moralis } = useMoralis()

  const ownTicket = tickets.filter((ticket) => {
    return ticket.owner.toUpperCase() === account?.toUpperCase() && !ticket.isRefunded
  })

  async function refundTickets() {
    const sendOptions = {
      contractAddress: lootbox.address,
      functionName: "refund",
      abi: LOOTBOX_ABI,
      params: {
        tokenIds: ownTicket.map((ticket) => ticket.tokenId),
      },
    }

    await Moralis.executeFunction(sendOptions)
    setIsSuccess(true)
  }

  const content = !isSuccess ? (
    <>
      <div className="grid grid-rows-2 grid-flow-col">
        {ownTicket.length > 0 ? (
          ownTicket.map((_ticket, index) => {
            return (
              <div key={index} className="border-2 cursor-pointer max-w-sm mt-2">
                <img src={_ticket?.imageURI || "error"} alt="" className="w-20 h-auto" />
              </div>
            )
          })
        ) : (
          <div className="text-center">You have no tickets to refund</div>
        )}
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center">Transaction Submitted 🎉</div>
  )

  const claimButton = (
    <button
      className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      disabled={ownTicket.length === 0}
      onClick={() => refundTickets()}
    >
      Refund All
    </button>
  )

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title="Refund Tickets"
      content={content}
      confirmButton={claimButton}
    />
  )
}
