import { MOCKNFT_ABI, MOCK_NFT } from "contract"
import { useTx } from "context/transaction"
import { useChain } from "react-moralis"
import { SetStateAction, Dispatch } from "react"

interface Props {
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const MockNFTButton = ({ setIsSuccess }: Props) => {
  const { chain } = useChain()
  const { doTx } = useTx()

  const mintFreeNFT = async () => {
    const sendOptions = {
      contractAddress: MOCK_NFT[chain.chainId],
      functionName: "mockMint",
      abi: MOCKNFT_ABI,
      params: {
        _amount: 10,
      },
    }
    const isSuccess = await doTx(sendOptions)
    if (isSuccess) {
      setIsSuccess(true)
    }
  }

  return (
    <button
      onClick={mintFreeNFT}
      className="bg-mainPink hover:bg-mainPink/[.9] text-white font-bold py-2 px-4 rounded"
    >
      Get Free 10 Mock NFTs for testing
    </button>
  )
}

export default MockNFTButton
