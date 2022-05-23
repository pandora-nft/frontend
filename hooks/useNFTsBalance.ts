import { useChain, useMoralis, useNFTBalances } from "react-moralis"
import { useEffect } from "react"
import { useLoading } from "./useLoading"

export const useNFTsBalance = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { getNFTBalances, data: NFTBalances } = useNFTBalances()
  const { isLoading, onLoad, onDone } = useLoading()
  const { chain } = useChain()

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

  return { NFTBalances, isLoading }
}
