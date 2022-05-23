import { COVALENT_API_KEY } from "config"
import axios from "axios"

export const getNFTMetadata = async (chainId: string, address: string, tokenId: number) => {
  const chain = parseInt(chainId, 16)
  const res = await axios.get(
    `https://api.covalenthq.com/v1/${chain}/tokens/${address}/nft_metadata/${tokenId}/?key=${COVALENT_API_KEY}`
  )
  return res.data?.data?.items[0]?.nft_data[0]?.external_data
}
