import ProfileLayout from "layouts/profileLayout"
import { ReactElement, useState } from "react"
import { useNFTsBalance, useSkeleton } from "hooks"
import { NotFound, NFTCard, NFTCardSkeleton, NFTDialog } from "components"
import { NFT } from "types"

const Nft = () => {
  const { NFTBalances, isLoading } = useNFTsBalance()
  const { showSkeleton } = useSkeleton()
  const [currentNFT, setCurrentNFT] = useState<NFT>(null)

  const onNFTClick = (nft: NFT) => {
    setCurrentNFT(nft)
  }

  const showNFTs = () => {
    if (isLoading) {
      return showSkeleton(<NFTCardSkeleton />)
    } else if (!NFTBalances || NFTBalances.result.length === 0) {
      return <NotFound info="You have no NFT yet" />
    } else {
      return (
        <>
          {NFTBalances ? (
            NFTBalances.result.map((nft, index) => {
              const NFT = {
                name: nft?.metadata?.name,
                collectionName: nft?.name,
                description: nft?.metadata?.description,
                tokenId: nft?.token_id,
                address: nft?.token_address,
                imageURI: nft?.image,
              }
              return (
                <div onClick={() => onNFTClick(NFT)} key={index}>
                  <NFTCard NFT={NFT} />
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

      <div className="container mt-10 mx-auto max-w-4/5 min-w-sm">
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
