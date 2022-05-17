import { useMoralis, useNFTBalances } from "react-moralis"
import { useEffect } from "react"

export const useNFTsBalance = () => {
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { getNFTBalances, data } = useNFTBalances()
  useEffect(() => {
    async function updateUI() {
      await getNFTBalances()
    }
    if (isWeb3Enabled) {
      updateUI()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])
  return { data }
}
