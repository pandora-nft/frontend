import { Modal } from "components"
import { ERC721_ABI, LOOTBOX_ABI } from "contract"
import { useNFTsBalance } from "hooks"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { Lootbox } from "types"
//TODO tell user if dont have to approve,
//TODO refresh when tx confirmed
export const DepositNFTDialog = ({
  lootbox,
  showDepositNFTDialog,
  setShowDepositNFTDialog,
}: {
  lootbox: Lootbox
  showDepositNFTDialog: boolean
  setShowDepositNFTDialog: Dispatch<SetStateAction<boolean>>
}) => {
  const [nfts, setNFTS] = useState<any[]>([])
  const [isSuccess, setIsSuccess] = useState(false)
  const { NFTBalances } = useNFTsBalance()
  const [isNFTSelected, setIsNFTSelected] = useState(false)
  const { Moralis, account } = useMoralis()
  async function depositNFT() {
    const sendOptions = {
      contractAddress: lootbox?.address,
      functionName: "depositNFTs",
      abi: LOOTBOX_ABI,
      params: {
        _nfts: nfts.map((nft) => [nft.token_address, nft.token_id]),
      },
    }
    await Moralis.executeFunction(sendOptions)
    setIsSuccess(true)
  }
  useEffect(() => {
    if (nfts) {
      for (const nft of nfts) {
        const sendOptions = {
          contractAddress: nft.token_address,
          functionName: "isApprovedForAll",
          abi: ERC721_ABI,
          params: {
            owner: account,
            operator: lootbox?.address,
          },
        }
        Moralis.executeFunction(sendOptions).then((res) => {
          if (res) {
            nft.isApproved = true
          } else {
            nft.isApproved = false
          }
        })
      }
    }
  }, [nfts, Moralis])
  const content = !isSuccess ? (
    <>
      {isNFTSelected ? (
        <>
          <div className="grid grid-cols-3 grid-flow-row gap-2 place-items-center">
            {nfts.map((nft, index) => {
              return nft.isApproved ? (
                <div
                  key={index}
                  className="border-2 shadow-lg margin-auto shadow-yellow-500/40 border-yellow-400 max-w-sm mt-2 w-20 h-auto scale-105"
                >
                  <img src={nft?.image || "error"} alt="" />
                </div>
              ) : (
                <div
                  key={index}
                  className="border-2 shadow-lg margin-auto cursor-pointer max-w-sm mt-2 w-20 h-auto"
                  onClick={async () => {
                    const sendOptions = {
                      contractAddress: nft.token_address,
                      functionName: "setApprovalForAll",
                      abi: ERC721_ABI,
                      params: {
                        approved: true,
                        operator: lootbox?.address,
                      },
                    }
                    await Moralis.executeFunction(sendOptions)
                  }}
                >
                  <img src={nft?.image || "error"} alt="" />
                </div>
              )
            })}
          </div>
          <div className="max-w-xs text-sm m-4 italic">
            Note: Please approve greyed out NFTs to deposit them by clicking.
          </div>
        </>
      ) : (
        <div className="grid grid-rows-3 grid-flow-col">
          {NFTBalances?.result?.length > 0 ? (
            NFTBalances.result?.map((_nft, index) => {
              return (
                _nft.metadata &&
                (nfts?.includes(_nft) ? (
                  <div
                    key={index}
                    className="border-2 shadow-lg shadow-red-500/40 border-red-500 cursor-pointer max-w-sm mt-2 scale-110"
                    onClick={() => {
                      const i = nfts.indexOf(_nft)
                      setNFTS([...nfts.slice(0, i), ...nfts.slice(i + 1, nfts.length)])
                    }}
                  >
                    <img src={_nft?.image || "error"} alt="" className="w-20 h-auto" />
                  </div>
                ) : (
                  <div
                    key={index}
                    className="border-2 hover:shadow-xl cursor-pointer max-w-sm mt-2"
                    onClick={() => {
                      setNFTS([...nfts, _nft])
                    }}
                  >
                    <img src={_nft?.image || "error"} alt="" className="w-20 h-auto" />
                  </div>
                ))
              )
            })
          ) : (
            <div className="text-center">You have no NFT</div>
          )}
        </div>
      )}
    </>
  ) : (
    <div className="flex items-center justify-center">Transaction Submitted 🎉</div>
  )

  const depositButton = (
    <>
      <button
        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        disabled={!nfts}
        onClick={() => {
          if (!isNFTSelected) {
            setIsNFTSelected(true)
          } else {
            depositNFT()
          }
        }}
      >
        Proceed
      </button>
      {isNFTSelected && (
        <button
          className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          disabled={!nfts}
          onClick={() => setIsNFTSelected(false)}
        >
          Back
        </button>
      )}
    </>
  )
  return (
    <Modal
      open={showDepositNFTDialog}
      setOpen={setShowDepositNFTDialog}
      title="Deposit NFTs"
      content={content}
      confirmButton={depositButton}
    />
  )
}

export default DepositNFTDialog
