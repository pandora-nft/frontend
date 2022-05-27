import { useMoralis, useNFTBalances } from "react-moralis"
import { useState } from "react"
import { useLoading } from "./useLoading"
import { NFT } from "types"
import axios from "axios"
import { ERC721_ABI } from "contract"

// fetch nft of user
export const useFormatNFTBalances = () => {
  const { Moralis } = useMoralis()
  const { getNFTBalances } = useNFTBalances()
  const [NFTBalances, setNFTBalances] = useState<NFT[]>([])
  const { isLoading, onLoad, onDone } = useLoading()

  const formatNFTs = (data: any) => {
    onLoad()
    let nfts: NFT[] = []

    for (let i = 0; i < data?.result.length; i++) {
      const nft = data.result[i]
      let id, name, imageURI, description, collectionName, tokenId, address

      tokenId = nft.token_id
      address = nft.token_address
      id = tokenId + "_" + address
      collectionName = nft.name

      if (nft.metadata) {
        const metadata = JSON.parse(nft.metadata)
        imageURI = metadata.image.replace("ipfs://", "https://ipfs.io/ipfs/")
        name = metadata.name
        description = metadata.description
      } else {
        if (nft.token_uri) {
          axios.get(nft.token_uri).then((res) => {
            imageURI = res.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")
            name = res.data.name
          })
        } else {
          const readOptions = {
            contractAddress: nft.token_address,
            functionName: "tokenURI",
            abi: ERC721_ABI,
            params: {
              tokenId: nft.token_id,
            },
          }

          Moralis.executeFunction(readOptions).then((tokenURI) => {
            const endpoint = tokenURI.toString().replace("ipfs://", "https://ipfs.io/ipfs/")
            axios.get(endpoint).then((res) => {
              imageURI = res.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")
              name = res.data.name
            })
          })
        }
      }

      nfts.push({
        id,
        name,
        collectionName,
        description,
        imageURI,
        tokenId,
        address,
      })
    }

    setNFTBalances(nfts)
    onDone()
    return nfts
  }

  const fetchNFTs = async () => {
    onLoad()
    const data = await getNFTBalances()
    await formatNFTs(data)

    onDone()
  }

  // useEffect(() => {
  //   if (isWeb3Enabled) {
  //     main()
  //   } else {
  //     enableWeb3()
  //   }
  // }, [isWeb3Enabled, chain])

  return { getNFTBalances, formatNFTs, NFTBalances, isLoading, fetchNFTs }
}
