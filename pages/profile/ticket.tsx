import { ReactElement } from "react"
import { NFTCard, NFTCardSkeleton, NotFound } from "components"
import { useSkeleton, useTicket } from "hooks"
import ProfileLayout from "layouts/profileLayout"
import { Ticket as TicketType } from "types"
import Link from "next/link"

const Ticket = () => {
  const { tickets, isLoading } = useTicket()
  const { showSkeleton } = useSkeleton()

  const showTickets = () => {
    if (!isLoading) {
      return showSkeleton(<NFTCardSkeleton />)
    } else if (tickets.length === 0) {
      return <NotFound info="You have not bought any ticket yet" />
    } else {
      return (
        <>
          {tickets.map((ticket: TicketType, index) => {
            return (
              <Link key={index} href={`/lootbox/${ticket.lootboxId}`}>
                <a>
                  <NFTCard NFT={ticket} />
                </a>
              </Link>
            )
          })}
        </>
      )
    }
  }

  return (
    <div className="centered mt-10 w-full">
      <div
        className="grid grid-cols-2 lg:grid-cols-3
                   xl:grid-cols-4 3xl:grid-cols-5 5xl:grid-cols-6 gap-5"
      >
        {showTickets()}
      </div>
    </div>
  )
}

Ticket.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Ticket
