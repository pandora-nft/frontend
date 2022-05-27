import ProfileLayout from "layouts/profileLayout"
import { ReactElement, useState } from "react"
import { useFormatNFTBalances, useSkeleton } from "hooks"
import { NotFound, NFTCard, NFTCardSkeleton, NFTDialog } from "components"
import { NFT } from "types"

const Nft = () => {
  const { NFTBalances, isLoading } = useFormatNFTBalances()
  const { showSkeleton } = useSkeleton()
  const [currentNFT, setCurrentNFT] = useState<NFT>(null)

  const onNFTClick = (nft: NFT) => {
    setCurrentNFT(nft)
  }

  const showNFTs = () => {
    if (isLoading) {
      return showSkeleton(<NFTCardSkeleton />)
    } else if (NFTBalances.length === 0) {
      return <NotFound info="You have no NFT yet" />
    } else {
      return (
        <>
          {NFTBalances ? (
            NFTBalances.map((nft, index) => {
              return (
                <div onClick={() => onNFTClick(nft)} key={index}>
                  <NFTCard NFT={nft} />
                </div>
              )
            })
          ) : (
            <></>
          )}
        </>
      )
    }
  }
  return (
    <>
      <NFTDialog open={!!currentNFT} currentNFT={currentNFT} setCurrentNFT={setCurrentNFT} />

      <div className="centered mt-10">
        <div
          className="grid grid-cols-2 lg:grid-cols-3
                     xl:grid-cols-4 3xl:grid-cols-5 5xl:grid-cols-6 gap-5"
        >
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
