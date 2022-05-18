import { useLootboxFactory } from "hooks"
import ProfileLayout from "layouts/profileLayout"
import { ReactElement, useEffect } from "react"
import { LootboxCard } from "components"
import { useMoralis } from "react-moralis"

const Lootbox = () => {
  const { enableWeb3, isWeb3Enabled, account } = useMoralis()
  const { lootboxOwned, fetchLootboxOwned } = useLootboxFactory()

  useEffect(() => {
    if (isWeb3Enabled) {
      fetchLootboxOwned(account)
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  return (
    <>
      This is profile/lootbox
      <div className="centered mt-10">
        <div className="grid grid-cols-2 gap-10 border-black p-4">
          {lootboxOwned.map((lootbox) => {
            return (
              <>
                <LootboxCard lootbox={lootbox} />
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

Lootbox.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Lootbox
