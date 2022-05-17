import { useMoralis, useNFTBalances } from "react-moralis"
import { useEffect } from "react"

export const useNFTsBalance = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { getNFTBalances, data: NFTBalances } = useNFTBalances()

  useEffect(() => {
    const main = async () => {
      await getNFTBalances()
    }
    if (isWeb3Enabled) {
      main()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  return { NFTBalances }
}
