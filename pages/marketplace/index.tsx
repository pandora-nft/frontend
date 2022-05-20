import { useLootboxFactory } from "hooks"
import { LootboxCard, LootboxCardSkeleton } from "components"

const Marketplace = () => {
  const { allLootboxes, isLoading } = useLootboxFactory()

  const showLootboxes = () => {
    if (isLoading) {
      return (
        <>
          {Array(6)
            .fill(null)
            .map(() => {
              return (
                <>
                  <LootboxCardSkeleton />
                </>
              )
            })}
        </>
      )
    } else if (allLootboxes.length) {
      return <h2>No lootbox found</h2>
    } else {
      return (
        <>
          {allLootboxes.map((lootbox) => {
            return (
              <>
                <LootboxCard lootbox={lootbox} />
              </>
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
