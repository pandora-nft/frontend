import ProfileLayout from "layouts/profileLayout"
import { ReactElement } from "react"
import { useNFTsBalance, useSkeleton } from "hooks"
import { NotFound, NFTCard, NFTCardSkeleton } from "components"

const Nft = () => {
  const { NFTBalances, isLoading } = useNFTsBalance()
  const { showSkeleton } = useSkeleton()

  const showNFTs = () => {
    if (isLoading) {
      return showSkeleton(<NFTCardSkeleton />)
    } else if (!NFTBalances || NFTBalances.result.length === 0) {
      return <NotFound info="You have no NFT yet" />
    } else {
      return (
        <>
          {NFTBalances.result.map((nft, index) => {
            return (
              nft.metadata && (
                <div key={index}>
                  <NFTCard
                    NFT={{
                      name: nft.metadata.name,
                      collectionName: nft.name,
                      description: nft.metadata.description,
                      tokenId: nft.token_id,
                      address: nft.token_address,
                      imageURI: nft.image,
                    }}
                  />
                </div>
              )
            )
          })}
        </>
      )
    }
  }
  return (
    <>
      <div className="container mx-auto max-w-4/5 min-w-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
          {showNFTs()}
        </div>
      </div>
    </>
  )
}

Nft.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}
export default Nft
