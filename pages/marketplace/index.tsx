import { useLootboxFactory, useSkeleton } from "hooks"
import { NotFound, LootboxCard, LootboxCardSkeleton } from "components"
import Link from "next/link"

const Marketplace = () => {
  const { allLootboxes, isLoading } = useLootboxFactory()
  const { showSkeleton } = useSkeleton()

  const showLootboxes = () => {
    if (isLoading) {
      return showSkeleton(<LootboxCardSkeleton />)
    } else if (allLootboxes.length > 0) {
      return <NotFound info="No one create a lootbox yet" />
    } else {
      return (
        <>
          {allLootboxes.map((lootbox) => {
            return (
              <Link key={lootbox.id} href={`/lootbox/${lootbox.id}`}>
                <a>
                  <LootboxCard lootbox={lootbox} />
                </a>
              </Link>
            )
          })}
        </>
      )
    }
  }

  return (
    <div className="centered mt-10">
      <h2 className="font-medium mb-10">Marketplace</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">{showLootboxes()}</div>
    </div>
  )
}

export default Marketplace
