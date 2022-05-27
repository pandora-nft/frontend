import { MOCKNFT_ABI, MOCK_NFT } from "contract"
import { useTx } from "context/transaction"
import { useChain } from "react-moralis"
export const MockNFTButton = () => {
  const { chain } = useChain()
  const { doTx } = useTx()
  return (
    <button
      onClick={async () => {
        const sendOptions = {
          contractAddress: MOCK_NFT[chain.chainId],
          functionName: "mockMint",
          abi: MOCKNFT_ABI,
          params: {
            _amount: 10,
          },
        }
        console.log(sendOptions)
        try {
          await doTx(sendOptions)
        } catch {
          console.log()
        }
      }}
      className="bg-mainPink hover:bg-mainPink/[.9] text-white font-bold py-2 px-4 rounded-full"
    >
      Get 10 Test NFTs
    </button>
  )
}

export default MockNFTButton
