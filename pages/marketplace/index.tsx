import { useLootboxFactory } from "pages/api/factory/useLootboxFactory"

const Marketplace = () => {
  const { allLootboxes } = useLootboxFactory()

  return (
    <>
      This is Market place
      <div className="flex flex-col border border-black p-4">
        <h2>All lootbox</h2>
        {allLootboxes.map(({ address, name }) => {
          return (
            <h3 key={address}>
              {address}: {name}
            </h3>
          )
        })}
      </div>
    </>
  )
}

export default Marketplace
