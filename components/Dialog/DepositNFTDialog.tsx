import { Modal } from "components"
import { useTx } from "context/transaction"
import { ERC721_ABI, LOOTBOX_ABI } from "contract"
import { useNFTsBalance } from "hooks"
import { Dispatch, SetStateAction, useState } from "react"
import { useMoralis } from "react-moralis"
import { Lootbox, NFT } from "types"
import { ethers } from "ethers"
import { LoadingIndicator } from "components/LoadingIndicator"
import { useError } from "context/errors"

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  lootbox: Lootbox
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const DepositNFTDialog = ({ lootbox, open, setOpen, setIsSuccess }: Props) => {
  const [selectingNFTs, setSelectingNFTs] = useState<NFT[]>([])
  const [selectingIds, setSelectingIds] = useState<string[]>([])
  const [approvedIds, setApprovedIds] = useState<string[]>([])

  const { NFTBalances } = useNFTsBalance()
  const [isApprovingState, setIsApprovingState] = useState(false)

  const { Moralis, web3: moralisProvider } = useMoralis()
  const { doTx } = useTx()
  const { setError } = useError()

  const { address } = lootbox

  const listenApproval = (nft: NFT) => {
    const nftContract = new ethers.Contract(nft.address, ERC721_ABI, moralisProvider)

    nftContract.on("Approval", (_owner, _approved, _tokenId) => {
      if (_approved.toUpperCase() === address.toUpperCase()) {
        const i = selectingNFTs.indexOf(nft)
        setSelectingNFTs([
          ...selectingNFTs.slice(0, i),
          {
            ...nft,
            isApproved: true,
          },
          ...selectingNFTs.slice(i + 1),
        ])
        setApprovedIds((prevState) => [...prevState, nft.id])
        // nftContract.off("Approval", (_owner, _approved, _tokenId))
      }
    })
  }
  const depositNFT = async () => {
    let depositingNFTs = []
    for (const selectingNFT of selectingNFTs) {
      if (!selectingNFT.isApproved && !approvedIds.includes(selectingNFT.id)) {
        setError("Please approve all selected nfts to proceed!")
        return
      }
      depositingNFTs.push([selectingNFT.address, selectingNFT.tokenId])
    }
    const sendOptions = {
      contractAddress: address,
      functionName: "depositNFTs",
      abi: LOOTBOX_ABI,
      params: {
        _nfts: depositingNFTs,
      },
    }

    setOpen(false)
    await doTx(sendOptions)
    setIsSuccess(true)
  }

  // useEffect(() => {
  //   if (!lootbox) {
  //     Router.push("/marketplace")
  //   }
  //   if (nfts) {
  //     for (const nft of nfts) {
  //       const sendOptions = {
  //         contractAddress: nft.token_address,
  //         functionName: "isApprovedForAll",
  //         abi: ERC721_ABI,
  //         params: {
  //           owner: account,
  //           operator: lootbox?.address,
  //         },
  //       }
  //       Moralis.executeFunction(sendOptions).then((res) => {
  //         if (res) {
  //           nft.isApproved = true
  //         } else {
  //           nft.isApproved = false
  //         }
  //       })
  //     }
  //   }
  // }, [nfts, Moralis])

  const showSelectingNFTByState = (selectingNFT: NFT) => {
    if (selectingNFT.isApproved || approvedIds.includes(selectingNFT.id)) {
      return (
        <div className="border-4 shadow-lg margin-auto shadow-green-500/40 border-green-400 max-w-sm mt-2 w-20 h-auto">
          <img src={selectingNFT.imageURI} alt="nft" />
        </div>
      )
    } else if (selectingNFT.isApproving) {
      return (
        <div className="relative">
          <div className="border-2 opacity-50 shadow-lg margin-auto max-w-sm mt-2 w-20 h-auto">
            <img src={selectingNFT.imageURI} alt="nft" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <LoadingIndicator />
          </div>
        </div>
      )
    } else {
      return (
        <div
          className="border-2 shadow-lg margin-auto cursor-pointer max-w-sm mt-2 w-20 h-auto hover:border-yellow-400 hover:scale-105"
          onClick={() => approve(selectingNFT)}
        >
          <img src={selectingNFT.imageURI} alt="nft" />
        </div>
      )
    }
  }

  const showSelectingNFTs = () => {
    return selectingNFTs.map((selectingNFT, index) => {
      return <div key={index}> {showSelectingNFTByState(selectingNFT)}</div>
    })
  }

  const approve = async (nft: NFT) => {
    const i = selectingNFTs.indexOf(nft)
    try {
      setSelectingNFTs([
        ...selectingNFTs.slice(0, i),
        {
          ...nft,
          isApproving: true,
        },
        ...selectingNFTs.slice(i + 1),
      ])

      const sendOptions = {
        contractAddress: nft.address,
        functionName: "approve",
        abi: ERC721_ABI,
        params: {
          to: address,
          tokenId: nft.tokenId,
        },
      }
      listenApproval(nft)

      const tx = await Moralis.executeFunction(sendOptions)
      // @ts-ignore
      await tx.wait()
    } catch (err) {
      setError(err.message)
    } finally {
      setSelectingNFTs([
        ...selectingNFTs.slice(0, i),
        {
          ...nft,
          isApproving: false,
        },
        ...selectingNFTs.slice(i + 1, selectingNFTs.length),
      ])
    }
  }

  const content = (
    <>
      {isApprovingState ? (
        <>
          <div className="grid grid-cols-4 place-items-center">{showSelectingNFTs()}</div>
          <div className="max-w-xs text-sm m-4 italic">
            Note: Please approve NFTs for Pandora to deposit them by clicking.
          </div>
        </>
      ) : (
        // px-5 grid grid-cols-4 min-h-[300px] max-h-[400px] overflow-auto"
        <div className="grid grid-rows-4 grid-flow-col">
          {NFTBalances.length > 0 ? (
            NFTBalances.map((_nft, index) => {
              return selectingIds.includes(_nft.id) ? (
                <div
                  key={index}
                  className="border-2 shadow-lg shadow-mainPink/40 border-mainPink cursor-pointer max-w-sm mt-2 scale-110"
                  onClick={() => {
                    const snfts = selectingNFTs.filter((snft) => snft.id !== _nft.id)
                    const sids = selectingIds.filter((id) => id !== _nft.id)
                    setSelectingIds(sids)
                    setSelectingNFTs(snfts)
                  }}
                >
                  <img src={_nft.imageURI} alt="nft" className="m-auto h-full" />
                </div>
              ) : (
                <div
                  key={index}
                  className="border-2 hover:shadow-xl cursor-pointer max-w-sm mt-2"
                  onClick={() => {
                    setSelectingNFTs([...selectingNFTs, _nft])
                    setSelectingIds([...selectingIds, _nft.id])
                  }}
                >
                  <img src={_nft.imageURI} alt="nft" className="m-auto h-full" />
                </div>
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
        className={`background-transparent font-bold uppercase px-6 py-2 
        text-sm outline-none focus:outline-none mr-1 mb-1 
        ease-linear transition-all duration-150
        ${selectingNFTs.length == 0 && "text-gray-400"}`}
        disabled={selectingNFTs.length == 0}
        onClick={() => {
          if (!isApprovingState) {
            setIsApprovingState(true)
          } else {
            depositNFT()
          }
        }}
      >
        Proceed
      </button>
      {isApprovingState && (
        <button
          className="background-transparent font-bold uppercase px-6 py-2 
          text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear 
          transition-all duration-150"
          disabled={!isApprovingState}
          onClick={() => setIsApprovingState(false)}
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
