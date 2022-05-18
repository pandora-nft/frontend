import { FACTORY_ABI, FACTORY_ADDRESS, LOOTBOX_ABI, ERC721_ABI } from "contract"
import { useMoralis, useChain, useMoralisWeb3Api } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Lootbox, NFT } from "types"
import { CHAIN } from "network"
import { getNFTMetadata } from "api"

export const useLootbox = () => {
  const { web3: moralisProvider } = useMoralis()
  const { chain } = useChain()

  // const Web3Api = useMoralisWeb3Api()

  const [lootbox, setLootbox] = useState<Lootbox>({
    address: "",
    name: "",
    nfts: [],
  })

  const fetchLootbox = async (_lootboxAddress: string, lootboxId?: number) => {
    let lootboxAddress: string
    if (!isNaN(lootboxId)) {
      const factory = new ethers.Contract(
        FACTORY_ADDRESS[chain.networkId],
        FACTORY_ABI,
        moralisProvider
      )
      lootboxAddress = (await factory.functions.lootboxAddress(lootboxId))[0] as string
    } else {
      lootboxAddress = _lootboxAddress
    }
    const lootboxContract = new ethers.Contract(lootboxAddress, LOOTBOX_ABI, moralisProvider)
    const fetchNfts = await lootboxContract.getAllNFTs()

    let nfts: NFT[] = []
    for (const nft of fetchNfts) {
      const nftAddress = nft._address.toString()
      const tokenId = +nft._tokenId.toString()
      let nftMetadata = (await getNFTMetadata(chain.networkId, nftAddress, tokenId))?.items
      // [0]?.nft_data?.external_data;
      if (isNaN(nftMetadata)) {
        const nftContract = new ethers.Contract(nftAddress, ERC721_ABI, moralisProvider)
        const tokenURI = await nftContract.tokenURI(tokenId)
        const base64 = tokenURI.substr(tokenURI.indexOf(",") + 1)
        nftMetadata = JSON.parse(window.atob(base64))
      } else {
        nftMetadata = nftMetadata[0]?.nft_data?.external_data
      }
      // const nftMetadata = await Web3Api.token.getNFTMetadata({
      //   address: TICKET_ADDRESS[chain.networkId],
      //   chain: CHAIN[chain.networkId],
      // })

      nfts.push({
        tokenId,
        address: nftAddress,
        imageURI: nftMetadata?.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
        name: nftMetadata?.name,
        description: nftMetadata?.description,
      })
    }
    const name = (await lootboxContract.functions.name()).toString()
    const loot: Lootbox = { name, address: lootboxAddress, nfts }

    setLootbox(loot)
    return loot
  }

  return { fetchLootbox, lootbox }
}
