import { useLootboxFactory } from "hooks"
import { LootboxCard, LootboxCardSkeleton } from "components"
import Link from "next/link"

const Marketplace = () => {
  const { allLootboxes, isLoading } = useLootboxFactory()

  const showLootboxes = () => {
    if (isLoading) {
      return (
        <>
          {Array(6)
            .fill(null)
            .map((_, index) => {
              return (
                <div key={index}>
                  <LootboxCardSkeleton />
                </div>
              )
            })}
        </>
      )
    } else if (allLootboxes.length === 0) {
      return <h2>No lootbox found</h2>
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
      <div className="grid grid-cols-2 gap-10 p-4">{showLootboxes()}</div>
    </div>
  )
}

export default Marketplace
