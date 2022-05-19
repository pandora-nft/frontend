import { useLootboxFactory } from "hooks"
import { LootboxCard } from "components"

const Marketplace = () => {
  const { allLootboxes } = useLootboxFactory()

  return (
    <div className="centered mt-10">
      <h2 className="font-medium mb-10">Marketplace</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 pt-6 border-black p-4">
        {allLootboxes.map((lootbox) => {
          return (
            <>
              <LootboxCard lootbox={lootbox} />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default Marketplace
