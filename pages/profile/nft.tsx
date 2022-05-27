import ProfileLayout from "layouts/profileLayout"
import { ReactElement, useEffect, useState } from "react"
import { useFormatNFTBalances, useSkeleton } from "hooks"
import { NotFound, NFTCard, NFTCardSkeleton, NFTDialog, MockNFTButton } from "components"
import { NFT } from "types"
import { SUPPORT_CHAINID } from "contract"
import { useChain, useMoralis } from "react-moralis"

const Nft = () => {
  const { NFTBalances, isLoading, fetchNFTs } = useFormatNFTBalances()
  const { enableWeb3, isWeb3Enabled, account } = useMoralis()
  const { chain } = useChain()

  const { showSkeleton } = useSkeleton()
  const [currentNFT, setCurrentNFT] = useState<NFT>(null)

  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isWeb3Enabled && chain && account) {
      if (SUPPORT_CHAINID.includes(chain.chainId)) {
        fetchNFTs()
      }
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled, chain, isSuccess, account])

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
        <div className="mb-10 font-normal text-xs">
          <MockNFTButton setIsSuccess={setIsSuccess} />
        </div>
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
