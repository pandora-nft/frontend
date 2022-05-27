import { Dispatch, SetStateAction } from "react"
import { LOOTBOX_ABI } from "contract"
import { Lootbox } from "types"
import { useMoralis } from "react-moralis"
import { Modal } from "components"
import { useTx } from "context/transaction"

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  lootbox: Lootbox
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const RefundDialog = ({ open, setOpen, lootbox, setIsSuccess }: Props) => {
  const { account } = useMoralis()
  const { doTx } = useTx()
  const { tickets } = lootbox
  const ownTicket = tickets.filter((ticket) => {
    return ticket.owner.toUpperCase() === account?.toUpperCase() && !ticket.isRefunded
  })

  const refundTickets = async () => {
    const sendOptions = {
      contractAddress: lootbox.address,
      functionName: "refund",
      abi: LOOTBOX_ABI,
      params: {
        tokenIds: ownTicket.map((ticket) => ticket.ticketId),
      },
    }
    const success = await doTx(sendOptions)
    if (success) {
      setIsSuccess(true)
      setOpen(false)
    }
  }

  const content = (
    <>
      <div className="grid grid-rows-2 grid-flow-col">
        {ownTicket.length > 0 ? (
          ownTicket.map((_ticket, index) => {
            return (
              <div key={index} className="border-2 cursor-pointer max-w-sm mt-2">
                <img src={_ticket?.imageURI} alt="ticket" className="w-20 h-auto" />
              </div>
            )
          })
        ) : (
          <div className="text-center">You have no tickets to refund</div>
        )}
      </div>
    </>
  )

  const claimButton = (
    <button
      className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      disabled={ownTicket.length === 0}
      onClick={refundTickets}
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
