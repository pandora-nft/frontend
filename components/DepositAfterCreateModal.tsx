import { LoadingIndicator, Modal } from "components"
import { ERC721_ABI, LOOTBOX_ABI } from "contract"
import { useNFTsBalance } from "hooks"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { Lootbox, NFT } from "types"

export const DepositAfterCreateModal = ({
  lootbox,
  showDepositNFTDialog,
  setShowDepositNFTDialog,
  bid,
}: {
  lootbox: Lootbox
  showDepositNFTDialog: boolean
  setShowDepositNFTDialog: Dispatch<SetStateAction<boolean>>
  bid: number
}) => {
  const [nfts, setNFTS] = useState<any[]>([])
  const [isSuccess, setIsSuccess] = useState(false)
  const { NFTBalances } = useNFTsBalance()
  const [isNFTSelected, setIsNFTSelected] = useState(false)
  const { Moralis, account } = useMoralis()
  const isLoading = false
  const [currentNFT, setCurrentNFT] = useState<NFT>()

  const onNFTClick = (nft: NFT) => {
    setCurrentNFT(nft)
  }

  const NFTDialog = () => {
    const content = (
      <div className="flex flex-col space-y-4 justify-between items-center">
        <img className="w-40" src={currentNFT?.imageURI} alt="image" />
        <div className="w-100">Address: {currentNFT?.address}</div>
        <div className="w-100">Description: {currentNFT?.description} </div>
      </div>
    )
    return (
      <Modal
        open={!!currentNFT}
        setOpen={setCurrentNFT}
        title={currentNFT?.name}
        content={content}
      />
    )
  }
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

  const lootboxContent = (
    <>
      {isLoading ? (
        <div className="h-[30vh] mt-[10vh] flex flex-col items-center justify-between">
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {lootbox?.owner?.toLowerCase() === account?.toLowerCase() && (
            <div className="mx-8">You are the owner of this Lootbox! 🎉</div>
          )}
          <div className="flex-col mx-8 mt-8  ">
            <div className="shadow-[0_15px_30px_-10px_rgba(0,0,0,0.3)] p-4 m-4">
              <div className="mx-8">ID: {bid}</div>
              <div className="text-sm mx-8">
                <div>Name: {lootbox?.name}</div>
                <div>{`Draw time: ${new Date(lootbox?.drawTimestamp * 1000).toUTCString()}`}</div>
                <div className="flex flex-row-reverse"></div>
              </div>
            </div>
            <div>
              <div>{"What's in the box?"}</div>
              <div className="grid grid-rows-3 grid-flow-col">
                {lootbox.nfts &&
                  lootbox.nfts.map((nft, index) => {
                    return (
                      <div
                        key={index}
                        className="border-2 hover:shadow-xl cursor-pointer max-w-sm mt-2"
                        onClick={() => onNFTClick(nft)}
                      >
                        <img src={nft?.imageURI || "error"} alt="" className="w-20 h-auto" />
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )

  const depositNFTcontent = !isSuccess ? (
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
        <>
          <div>
            <h3>Select your NFTs to deposit</h3>
          </div>
          <div className="grid grid-rows-2 grid-flow-col p-2 gap-2">
            {NFTBalances?.result?.length > 0 ? (
              NFTBalances.result?.map((_nft, index) => {
                return (
                  _nft.metadata &&
                  (nfts?.includes(_nft) ? (
                    <div
                      key={index}
                      className="border-2 shadow-lg shadow-mainPink/40 border-mainPink cursor-pointer max-w-sm mt-2 scale-110"
                      onClick={() => {
                        const i = nfts.indexOf(_nft)
                        setNFTS([...nfts.slice(0, i), ...nfts.slice(i + 1, nfts.length)])
                      }}
                    >
                      <img
                        src={_nft?.image || "error"}
                        alt=""
                        className="block object-cover object-center w-full h-20  rounded-lg"
                      />
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="border-2 hover:shadow-xl cursor-pointer max-w-sm mt-2"
                      onClick={() => {
                        setNFTS([...nfts, _nft])
                      }}
                    >
                      <img
                        src={_nft?.image || "error"}
                        alt=""
                        className="block object-cover object-center w-full h-20  rounded-lg"
                      />
                    </div>
                  ))
                )
              })
            ) : (
              <div className="text-center">You have no NFT</div>
            )}
          </div>
        </>
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

  const content = (
    <div className="flex">
      <div className="border-r ">{lootboxContent}</div>
      <div className="pl-6">{depositNFTcontent}</div>
      <NFTDialog />
    </div>
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
