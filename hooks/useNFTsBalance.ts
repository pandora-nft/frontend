import { useMoralis, useNFTBalances } from "react-moralis"
import { useEffect } from "react"

export const useNFTsBalance = (address?: string) => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { getNFTBalances, data: NFTBalances } =
    address && address !== ""
      ? useNFTBalances({
          address,
        })
      : useNFTBalances()

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
