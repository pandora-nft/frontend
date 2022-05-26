import { useChain, useMoralis, useNFTBalances } from "react-moralis"
import { useEffect, useState } from "react"
import { useLoading } from "./useLoading"
import { NFT } from "types"

export const useNFTsBalance = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { getNFTBalances, data, isFetching } = useNFTBalances()
  const [NFTBalances, setNFTBalances] = useState<NFT[]>([])
  const { isLoading, onLoad, onDone } = useLoading()
  const { chain } = useChain()

  useEffect(() => {
    if (data) {
      let nfts: NFT[] = []
      data?.result?.map((nft) => {
        if (nft?.metadata) {
          nfts.push({
            id: nft?.token_id + "_" + nft?.token_address,
            name: nft?.metadata?.name,
            collectionName: nft?.name,
            description: nft?.metadata?.description,
            tokenId: nft?.token_id,
            address: nft?.token_address,
            imageURI: nft?.image,
          })
        }
      })
      setNFTBalances(nfts)
    }
  }, [isFetching])

  useEffect(() => {
    const main = async () => {
      await getNFTBalances()
      onDone()
    }
    if (isWeb3Enabled) {
      onLoad()
      main()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled, chain])

  return { getNFTBalances, NFTBalances, isLoading }
}
