import { Modal } from "components"
import { useTx } from "context/transaction"
import { ERC721_ABI, LOOTBOX_ABI } from "contract"
import { useFormatNFTBalances } from "hooks"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { useMoralis } from "react-moralis"
import { Lootbox, NFT } from "types"
import { ethers } from "ethers"
import { LoadingIndicator } from "components/LoadingIndicator"
import { useError } from "context/errors"
import { NotFound } from "components/NotFound"

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  lootbox: Lootbox
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const DepositNFTDialog = ({ lootbox, open, setOpen, setIsSuccess }: Props) => {
  const [selectingNFTs, setSelectingNFTs] = useState<NFT[]>([])
  const [selectingIds, setSelectingIds] = useState<string[]>([])
  const { NFTBalances, isLoading, main: fetchNFTBalance } = useFormatNFTBalances()
  const [isApprovingState, setIsApprovingState] = useState(false)

  const [isRefreshing, setIsRefreshing] = useState(false)
  const { Moralis, web3: moralisProvider } = useMoralis()
  const { doTx } = useTx()
  const { setError } = useError()
  const { address } = lootbox

  const listenApproval = (nft: NFT) => {
    const nftContract = new ethers.Contract(nft.address, ERC721_ABI, moralisProvider)
    nftContract.on("Approval", (_owner, _approved, _tokenId) => {
      if (_approved.toUpperCase() === address.toUpperCase()) {
        checkApproval()
      }
    })
  }

  useEffect(() => {
    if (open && NFTBalances.length === 0) {
      fetchNFTBalance()
    }
  }, [open])

  const checkApproval = async () => {
    let fetchNFTs: NFT[] = []
    setIsRefreshing(true)
    for (const checkNFT of selectingNFTs) {
      const sendOptions = {
        contractAddress: checkNFT.address,
        functionName: "getApproved",
        abi: ERC721_ABI,
        params: {
          tokenId: checkNFT.tokenId,
        },
      }
      const approvedAddress = await Moralis.executeFunction(sendOptions)
      // @ts-ignore
      if (approvedAddress && approvedAddress.toUpperCase() === address.toUpperCase()) {
        fetchNFTs.push({ ...checkNFT, isApproved: true, isApproving: false })
      } else {
        fetchNFTs.push({ ...checkNFT, isApproved: false, isApproving: false })
      }
    }
    setSelectingNFTs(fetchNFTs)
    setIsRefreshing(false)
  }

  const depositNFT = async () => {
    let depositingNFTs = []
    for (const selectingNFT of selectingNFTs) {
      if (!selectingNFT.isApproved) {
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

  const showSelectingNFTByState = (selectingNFT: NFT) => {
    if (selectingNFT.isApproved) {
      return (
        <div className="border-4 shadow-lg margin-auto shadow-green-500/40 border-green-400 max-w-md mt-2 w-32 h-auto">
          <img src={selectingNFT.imageURI} alt="nft" />
        </div>
      )
    } else if (selectingNFT.isApproving) {
      return (
        <div className="relative">
          <div className="border-4 opacity-50 shadow-lg margin-auto max-w-md mt-2 w-32 h-auto">
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
          className="border-4 shadow-lg margin-auto cursor-pointer max-w-md mt-2 w-32 h-auto hover:border-yellow-400 hover:scale-105"
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

  const showRefreshButton = (onClick: () => Promise<void>, isLoading: boolean) => {
    return (
      <button className="text-gray-500 hover:text-gray-800" onClick={onClick}>
        {isLoading ? <LoadingIndicator /> : "refresh"}
      </button>
    )
  }

  const content = (
    <div className="flex flex-col justify-start min-w-[600px]">
      {isApprovingState ? (
        <>
          {showRefreshButton(checkApproval, isRefreshing)}
          <div className="min-h-[300px] max-h-[450px] overflow-auto gap-1 grid grid-cols-4 place-items-center">
            {showSelectingNFTs()}
          </div>
          <div className="font-light text-sm m-4 italic">
            Note: Please click each one to approve depositing NFTs in the pandora lootbox.
          </div>
        </>
      ) : (
        // px-5 grid grid-cols-4 min-h-[300px] max-h-[400px] overflow-auto"
        <div className="w-full grid gap-1 grid-cols-4 min-h-[300px] max-h-[500px] overflow-auto">
          {NFTBalances.length > 0 ? (
            NFTBalances.map((_nft, index) => {
              return selectingIds.includes(_nft.id) ? (
                <div
                  key={index}
                  className="border-4 shadow-lg shadow-mainPink/40 
                  border-mainPink cursor-pointer
                   max-w-md mt-2 w-32"
                  onClick={() => {
                    const snfts = selectingNFTs.filter((snft) => snft.id !== _nft.id)
                    const sids = selectingIds.filter((id) => id !== _nft.id)
                    setSelectingIds(sids)
                    setSelectingNFTs(snfts)
                  }}
                >
                  <img src={_nft.imageURI} alt="nft" className="" />
                </div>
              ) : (
                <div
                  key={index}
                  className="hover:scale-105 border-4 hover:shadow-xl cursor-pointer w-32 max-w-md mt-2"
                  onClick={() => {
                    setSelectingNFTs([...selectingNFTs, _nft])
                    setSelectingIds([...selectingIds, _nft.id])
                  }}
                >
                  <img src={_nft.imageURI} alt="nft" className="" />
                </div>
              )
            })
          ) : (
            <div className="col-span-4">
              {showRefreshButton(fetchNFTBalance, isLoading)}
              <NotFound info="You have no NFT" />
            </div>
          )}
        </div>
      )}
    </div>
  )

  const showContent = isLoading ? <LoadingIndicator /> : <>{content}</>

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
            checkApproval()
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
      content={showContent}
      confirmButton={depositButton}
    />
  )
}
