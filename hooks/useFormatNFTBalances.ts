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

  const formatNFTs = async (data: any) => {
    let nfts: NFT[] = []

    // for (let i = 0; i < data?.result.length; i++) {
    await data?.result.forEach((nft) => {
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
        nfts.push({
          id,
          name,
          collectionName,
          description,
          imageURI,
          tokenId,
          address,
        })
      } else {
        if (nft.token_uri) {
          axios.get(nft.token_uri).then((res) => {
            imageURI = res.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")
            name = res.data.name
            nfts.push({
              id,
              name,
              collectionName,
              description,
              imageURI,
              tokenId,
              address,
            })
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
              nfts.push({
                id,
                name,
                collectionName,
                description,
                imageURI,
                tokenId,
                address,
              })
            })
          })
        }
      }

      // nfts.push({
      //   id,
      //   name,
      //   collectionName,
      //   description,
      //   imageURI,
      //   tokenId,
      //   address,
      // })
    })
    await setTimeout(() => {
      setNFTBalances(nfts)
      onDone()
    }, 1000)

    return nfts
  }

  const fetchNFTs = async () => {
    onLoad()
    const data = await getNFTBalances()
    await formatNFTs(data)
  }

  return { getNFTBalances, formatNFTs, NFTBalances, isLoading, fetchNFTs }
}
