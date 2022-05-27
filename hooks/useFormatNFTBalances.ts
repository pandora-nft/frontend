import { useChain, useMoralis, useNFTBalances } from "react-moralis"
import { useEffect, useState } from "react"
import { useLoading } from "./useLoading"
import { NFT } from "types"
import axios from "axios"
import { ERC721_ABI } from "contract"

// fetch nft of user
export const useFormatNFTBalances = () => {
  const { enableWeb3, isWeb3Enabled, Moralis } = useMoralis()
  const { getNFTBalances } = useNFTBalances()
  const [NFTBalances, setNFTBalances] = useState<NFT[]>([])
  const { isLoading, onLoad, onDone } = useLoading()
  const { chain } = useChain()

  const formatNFTs = async (data: any) => {
    onLoad()
    let nfts: NFT[] = []
    await data?.result?.map(async (nft: any) => {
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
            imageURI = res.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")
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
        } else {
          try {
            const readOptions = {
              contractAddress: nft.token_address,
              functionName: "tokenURI",
              abi: ERC721_ABI,
              params: {
                tokenId: nft.token_id,
              },
            }
            const tokenURI = await Moralis.executeFunction(readOptions)
            const res = await axios.get(
              tokenURI.toString().replace("ipfs://", "https://ipfs.io/ipfs/")
            )
            imageURI = res.data.image.replace("ipfs://", "https://ipfs.io/ipfs/")
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
    onDone()
    return nfts
  }

  const fetchNFTs = async () => {
    const data = await getNFTBalances()
    const nfts = await formatNFTs(data)
    console.log(nfts)
    return nfts
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

  return { getNFTBalances, formatNFTs, main, NFTBalances, isLoading, fetchNFTs }
}
