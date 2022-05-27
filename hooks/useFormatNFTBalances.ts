import { useChain, useMoralis, useNFTBalances } from "react-moralis"
import { useEffect, useState } from "react"
import { useLoading } from "./useLoading"
import { NFT } from "types"
import axios from "axios"

// fetch nft of user
export const useFormatNFTBalances = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { getNFTBalances } = useNFTBalances()
  const [NFTBalances, setNFTBalances] = useState<NFT[]>([])
  const { isLoading, onLoad, onDone } = useLoading()
  const { chain } = useChain()

  const formatNFTs = async (data: any) => {
    let nfts: NFT[] = []

    data?.result?.map(async (nft: any) => {
      if (!nft) {
        return
      }

      let id, name, imageURI, description, collectionName, tokenId, address
      collectionName = nft.name
      tokenId = nft.token_id
      address = nft.token_address
      id = tokenId + "_" + address
      if (nft.metadata) {
        const metadata = JSON.parse(nft.metadata)
        imageURI = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
        name = metadata.name
        description = metadata.description
        nfts.push({
          id,
          name,
          collectionName,
          description: description ? description : null,
          tokenId,
          address,
          imageURI,
        })
      } else {
        if (nft.token_uri) {
          try {
            const res = await axios.get(nft.token_uri)
            imageURI = res.data.image
            name = res.data.name
            nfts.push({
              id,
              name,
              collectionName,
              description: description ? description : null,
              tokenId,
              address,
              imageURI,
            })
          } catch (err) {
            console.error("err", err.message)
          }
        }
      }
    })
    setNFTBalances(nfts)
  }

  const main = async () => {
    onLoad()
    const data = await getNFTBalances()
    await formatNFTs(data)
    onDone()
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      main()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled, chain])

  return { getNFTBalances, formatNFTs, main, NFTBalances, isLoading }
}
