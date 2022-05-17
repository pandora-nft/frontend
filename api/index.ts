import { COVALENT_API_KEY } from "config"
import axios from "axios"

export const getNFTMetadata = async (chainId: number, address: string, tokenId: number) => {
  const res = await axios.get(
    `https://api.covalenthq.com/v1/${chainId}/tokens/${address}/nft_metadata/${tokenId}/?key=${COVALENT_API_KEY}`
  )
  return res.data
}
