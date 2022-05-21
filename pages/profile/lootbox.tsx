import { useLootboxFactory } from "hooks"
import ProfileLayout from "layouts/profileLayout"
import { ReactElement, useEffect } from "react"
import { LootboxCard, LootboxCardSkeleton } from "components"
import { useMoralis } from "react-moralis"

const Lootbox = () => {
  const { enableWeb3, isWeb3Enabled, account } = useMoralis()
  const { lootboxOwned, fetchLootboxOwned, isLoading } = useLootboxFactory()

  useEffect(() => {
    if (isWeb3Enabled) {
      fetchLootboxOwned(account)
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  const showLootboxOwned = () => {
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
    } else if (lootboxOwned.length === 0) {
      return <h2>No lootbox found</h2>
    } else {
      return (
        <>
          {lootboxOwned.map((lootbox) => {
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
    <>
      <div className="centered mt-10">
        <div className="grid grid-cols-2 gap-10 border-black p-4">{showLootboxOwned()}</div>
      </div>
    </>
  )
}

Lootbox.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Lootbox
