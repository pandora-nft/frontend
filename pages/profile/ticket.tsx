import { ReactElement } from "react"
import { NFTCard, NFTCardSkeleton } from "components"
import { useSkeleton, useTicket } from "hooks"
import ProfileLayout from "layouts/profileLayout"
import { Ticket as TicketType } from "types"

const Ticket = () => {
  const { tickets, isLoading } = useTicket()
  const { showSkeleton } = useSkeleton()

  const showTickets = () => {
    if (isLoading) {
      return showSkeleton(<NFTCardSkeleton />)
    } else if (tickets.length === 0) {
      return <h2>You have not bought any ticket yet!</h2>
    } else {
      return (
        <>
          {tickets.map((ticket: TicketType, index) => {
            return (
              <div key={index}>
                <NFTCard NFT={ticket} />
              </div>
            )
          })}
        </>
      )
    }
  }

  return (
    <div className="container mx-auto max-w-4/5 min-w-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
        {showTickets()}
      </div>
    </div>
  )
}

Ticket.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Ticket
