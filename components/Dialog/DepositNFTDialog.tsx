import { Modal } from "components"
import { useTx } from "context/transaction"
import { ERC721_ABI, LOOTBOX_ABI } from "contract"
import { useNFTsBalance } from "hooks"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { Lootbox } from "types"
import Router from "next/router"

//TODO tell user if dont have to approve,
//TODO refresh when tx confirmed

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  lootbox: Lootbox
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const DepositNFTDialog = ({ lootbox, open, setOpen, setIsSuccess }: Props) => {
  const [nfts, setNFTS] = useState<any[]>([])
  const { NFTBalances } = useNFTsBalance()
  const [isNFTSelected, setIsNFTSelected] = useState(false)
  const { Moralis, account } = useMoralis()
  const { doTx } = useTx()

  const { address } = lootbox

  const depositNFT = async () => {
    const sendOptions = {
      contractAddress: address,
      functionName: "depositNFTs",
      abi: LOOTBOX_ABI,
      params: {
        _nfts: nfts.map((nft) => [nft.token_address, nft.token_id]),
      },
    }

    await doTx(sendOptions)
    setOpen(false)
    setIsSuccess(true)
  }

  useEffect(() => {
    if (!lootbox) {
      Router.push("/marketplace")
    }
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

  const approve = async (tokenAddress: string, tokenId: number) => {
    // const sendOptions = {
    //   contractAddress: tokenAddress,
    //   functionName: "setApprovalForAll",
    //   abi: ERC721_ABI,
    //   params: {
    //     approved: true,
    //     operator: lootbox?.address,
    //   },
    // }

    const sendOptions = {
      contractAddress: tokenAddress,
      functionName: "approve",
      abi: ERC721_ABI,
      params: {
        to: address,
        tokenId,
      },
    }

    await doTx(sendOptions)
  }
  const content = (
    <>
      {isNFTSelected ? (
        <>
          <div className="grid grid-cols-4 place-items-center">
            {nfts.map((nft, index) => {
              return nft.isApproved ? (
                <div
                  key={index}
                  className="border-4 shadow-lg margin-auto shadow-green-500/40 border-green-400 max-w-sm mt-2 w-20 h-auto"
                >
                  <img src={nft?.image || "error"} alt="nft" />
                </div>
              ) : (
                <div
                  key={index}
                  className="border-2 shadow-lg margin-auto cursor-pointer max-w-sm mt-2 w-20 h-auto hover:border-green-400 hover:scale-105"
                  onClick={() => approve(nft.token_address, nft.token_id)}
                >
                  <img src={nft?.image || "error"} alt="" />
                </div>
              )
            })}
          </div>
          <div className="max-w-xs text-sm m-4 italic">
            Note: Please approve NFTs for Pandora to deposit them by clicking.
          </div>
        </>
      ) : (
        // px-5 grid grid-cols-4 min-h-[300px] max-h-[400px] overflow-auto"
        <div className="grid grid-rows-4 grid-flow-col">
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
                    <img src={_nft?.image} alt="nft" className="w-32" />
                  </div>
                ) : (
                  <div
                    key={index}
                    className="border-2 hover:shadow-xl cursor-pointer mt-2"
                    onClick={() => {
                      setNFTS([...nfts, _nft])
                    }}
                  >
                    <img src={_nft?.image} alt="nft" className="h-full" />
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
  )

  const depositButton = (
    <>
      <button
        className="background-transparent font-bold uppercase px-6 py-2 
        text-sm outline-none focus:outline-none mr-1 mb-1 
        ease-linear transition-all duration-150"
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
          className="background-transparent font-bold uppercase px-6 py-2 
          text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear 
          transition-all duration-150"
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
      open={open}
      onClose={() => setOpen(false)}
      title="Deposit NFTs"
      content={content}
      confirmButton={depositButton}
    />
  )
}
