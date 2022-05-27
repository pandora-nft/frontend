import { useChain, useMoralis, useNFTBalances } from "react-moralis"
import { useEffect, useState } from "react"
import { useLoading } from "./useLoading"
import { NFT } from "types"
import axios from "axios"

// fetch nft of user
export const useFormatNFTBalances = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { getNFTBalances, data, error } = useNFTBalances()
  const [NFTBalances, setNFTBalances] = useState<NFT[]>([])
  const { isLoading, onLoad, onDone } = useLoading()
  const { chain } = useChain()

  const formatNFTs = async () => {
    console.log({ data, error })
    if (data) {
      console.log("data", data)
      let nfts: NFT[] = []

      data?.result?.map(async (nft) => {
        if (!nft) {
          return
        }
        let id, name, imageURI, description, collectionName, tokenId, address
        collectionName = nft.name
        tokenId = nft.token_id
        address = nft.token_address
        id = tokenId + "_" + address
        if (nft.metadata) {
          imageURI = nft.metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
          name = nft.metadata.name
          description = nft.metadata.description
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
            const res = await axios.get(nft.token_uri)
            if (!res || !res.data) {
              return
            }

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
          }
        }
      })
      setNFTBalances(nfts)
    }
    // return nfts
  }

  const main = async () => {
    onLoad()
    console.log("here1")

    await getNFTBalances()
    console.log("here2")
    await formatNFTs()
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
