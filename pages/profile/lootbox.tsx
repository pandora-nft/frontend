import { useLootboxFactory, useSkeleton } from "hooks"
import ProfileLayout from "layouts/profileLayout"
import { ReactElement, useEffect } from "react"
import { NotFound, LootboxCard, LootboxCardSkeleton } from "components"
import { useChain, useMoralis } from "react-moralis"
import Link from "next/link"
import { SUPPORT_CHAINID } from "contract"

const Lootbox = () => {
  const { enableWeb3, isWeb3Enabled, account } = useMoralis()
  const { lootboxOwned, fetchLootboxOwned, isLoading } = useLootboxFactory()
  const { showSkeleton } = useSkeleton()
  const { chain } = useChain()

  useEffect(() => {
    if (isWeb3Enabled) {
      if (!SUPPORT_CHAINID.includes(chain.chainId)) {
        return
      } else {
        if (account) fetchLootboxOwned(account)
      }
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled, chain])

  const showLootboxOwned = () => {
    if (isLoading) {
      return showSkeleton(<LootboxCardSkeleton />)
    } else if (lootboxOwned.length === 0) {
      return <NotFound info="You have not create any lootbox yet" />
    } else {
      return (
        <>
          {lootboxOwned.map((lootbox) => {
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
    <>
      <div className="mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 4xl:grid-cols-4 gap-5">
          {showLootboxOwned()}
        </div>
      </div>
    </>
  )
}

Lootbox.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Lootbox
