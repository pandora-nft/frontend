// pages/lootbox/[bid]
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMoralis, useChain } from "react-moralis"
import { useLootbox } from "hooks"
import { LootboxCanvas } from "canvas"
import {
  NFTCard,
  LoadingIndicator,
  BuyTicketsDialog,
  DepositNFTDialog,
  ClaimNFTDialog,
  NFTDialog,
  RefundDialog,
} from "components"
import { NFT } from "types"
import { ethers } from "ethers"
import { CHAINID_TO_DETAIL, isChainSupport, LOOTBOX_ABI } from "contract"
import { Icon } from "web3uikit"
import { useTx } from "context/transaction"

interface Props {
  lootboxAddress: string
}
//TODO show total ticket, minum ticket
const Bid: React.FC<Props> = () => {
  const router = useRouter()
  const { bid } = router.query

  const { enableWeb3, isWeb3Enabled, account } = useMoralis()
  const { chain } = useChain()
  const { doTx } = useTx()
  const { fetchLootbox, lootbox, isLoading, tickets } = useLootbox()
  const {
    id,
    name,
    address,
    ticketPrice,
    ticketSold,
    nfts,
    drawTimestamp,
    minimumTicketRequired,
    owner,
    isRefundable,
    isDrawn,
  } = lootbox
  const [showClaimNFTDialog, setShowClaimNFTDialog] = useState(false)
  const [showDepositNFTDialog, setShowDepositNFTDialog] = useState(false)
  const [showRefundDialog, setShowRefundDialog] = useState(false)
  const [showBuyTicketsDialog, setShowBuyTicketsDialog] = useState(false)
  const [currentNFT, setCurrentNFT] = useState<NFT>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isWeb3Enabled) {
      if (bid) {
        fetchLootbox("", Number(bid))
      }
    } else {
      enableWeb3()
    }
  }, [bid, isWeb3Enabled, isSuccess, chain?.networkId])

  const onNFTClick = (nft: NFT) => {
    setCurrentNFT(nft)
  }

  // claim revenue by owner of the lootbox
  //  when the lootbox is drawn
  const claimMoney = async () => {
    const sendOptions = {
      contractAddress: lootbox?.address,
      functionName: "withdraw",
      abi: LOOTBOX_ABI,
    }
    doTx(sendOptions)
  }

  // withdraw NFT by owner of the lootbox
  // in case there is no draw occurs
  const withdrawNFT = () => {
    const sendOptions = {
      contractAddress: lootbox?.address,
      functionName: "withdrawNFT",
      abi: LOOTBOX_ABI,
    }
    doTx(sendOptions)
  }

  const isOwner = () => {
    if (!account) {
      return false
    }
    return account.toUpperCase() === owner.toUpperCase()
  }

  const createLabel = (topic: string, value: any) => {
    return (
      <div className="rounded border bg-lightPink border-gray-200 p-4 items-center text-center">
        <h3 className="text-mainPink font-medium">{value}</h3>
        <h3 className="font-bold">{topic}</h3>
      </div>
    )
  }
  const getTicketOwnedCount = () => {
    let count = 0
    for (let ticket of lootbox.tickets) {
      if (ticket.owner.toString().toLowerCase() === account.toString()) count += 1
    }
    return count
  }
  console.log(getTicketOwnedCount())
  const createSubButton = (title: string, onClick: () => void) => {
    return (
      <button
        onClick={onClick}
        className="flex flex-row px-8 py-3 bg-white border border-mainPink text-mainPink
         rounded-xl hover:shadow-2xl transition duration-300
"
      >
        <Icon fill="#E54090" size={28} svg="speedyNode" />
        <h3 className="ml-2 mt-2">{title}</h3>
      </button>
    )
  }

  const createMainButton = (title: string, onClick: () => void) => {
    return (
      <button
        onClick={onClick}
        className="mr-5 flex flex-row px-8 py-3 bg-mainPink text-white
          rounded-xl hover:bg-gray-800 hover:shadow-2xl transition duration-300"
      >
        <Icon fill="#ffffff" size={28} svg="creditCard" />
        <h3 className="ml-2 mt-2">{title}</h3>
      </button>
    )
  }

  const showActionButtons = () => {
    let buyTicketButton,
      depositNFTButton,
      claimNFTButton,
      claimMoneyButton,
      withdrawNFTButton,
      refundTicketButton

    if (!isDrawn) {
      buyTicketButton = createMainButton("Buy Tickets", () => setShowBuyTicketsDialog(true))
      if (isOwner()) {
        depositNFTButton = createSubButton("Deposit NFTs", () => setShowDepositNFTDialog(true))
      }
    } else {
      // if refundable, users can refund, and owner can withdraw NFTs
      if (isRefundable) {
        //TODO: check if have ticket first
        refundTicketButton = createMainButton("Refund Tickets", () => setShowRefundDialog(true))
        if (isOwner()) {
          withdrawNFTButton = createSubButton("Withdraw NFTs", () => withdrawNFT())
        }

        // if draw success owner can claim money, winner can claim NFT
      } else {
        //TODO: check if user is a winner
        claimNFTButton = createMainButton("Claim NFT", () => setShowClaimNFTDialog(true))
        if (isOwner) {
          claimMoneyButton = createMainButton("Claim Money", () => claimMoney())
        }
      }
    }

    return (
      <div className="flex flex-row justify-start">
        {buyTicketButton}
        {depositNFTButton}
        {refundTicketButton}
        {claimNFTButton}
        {claimMoneyButton}
        {withdrawNFTButton}
      </div>
    )
  }

  return (
    <div className="centered border-red-500">
      {isLoading ? (
        <div className="h-[30vh] mt-[10vh] flex flex-col items-center justify-between">
          <LoadingIndicator />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 w-full">
            <div className="rounded-md shadow-md h-100 col-span-1 border border-gray-200">
              <LootboxCanvas />
            </div>
            <div className="flex flex-col justify-between pt-5 ml-10 col-span-2 text-left border-red-500">
              <h1 className="text-4xl font-medium">
                #{id} {name}
              </h1>

              <h3 className="-mt-2 text-xl">{address}</h3>

              <h3 className="text-lg font-medium">
                Owned by{" "}
                <span className="text-mainPink">
                  {account?.toUpperCase() === owner?.toUpperCase() ? "you" : "" + owner}
                </span>
              </h3>

              <div className="rounded-xl border border-gray-200">
                <div className="rounded-t-xl p-5 flex flex-col bg-lightPink">
                  <h3 className="ml-1 font-medium -mb-2">Ticket Price</h3>
                  <div className="ml-1 flex flex-row mb-2 items-center">
                    <Icon
                      fill={
                        isChainSupport(chain) ? CHAINID_TO_DETAIL[chain.chainId].color : "#1e1e1e"
                      }
                      size={26}
                      // @ts-ignore
                      svg={isChainSupport(chain) ? CHAINID_TO_DETAIL[chain.chainId].icon : "eth"}
                    />
                    <h2 className="ml-2 mt-5 font-medium text-3xl">
                      {ethers.utils.formatEther(ticketPrice.toString())}
                    </h2>
                  </div>

                  {showActionButtons()}
                </div>

                <div
                  className="flex flex-row font-medium 
                        border-b border-t border-gray-200 p-4 items-center"
                >
                  <Icon fill="rgb(30,30,30)" size={28} svg="calendar" />{" "}
                  <h3 className="ml-1 mt-3">
                    Draw time:{" "}
                    <span className="text-mainPink">
                      {new Date(drawTimestamp * 1000).toUTCString()}
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-4 gap-5">
                  {createLabel("items", nfts.length)}
                  {createLabel("ticket owned", getTicketOwnedCount())}
                  {createLabel("ticket sold", ticketSold)}
                  {createLabel("ticket required", minimumTicketRequired)}
                </div>
              </div>
            </div>
          </div>

          <h2 className="font-bold mt-20 mb-10">{"What's in the box?"}</h2>
          <div
            className="grid grid-cols-2 lg:grid-cols-3
                     xl:grid-cols-4 3xl:grid-cols-5 5xl:grid-cols-6 gap-5"
          >
            {lootbox.nfts.map((nft, index) => {
              return (
                <div onClick={() => onNFTClick(nft)} key={index}>
                  <NFTCard NFT={nft} />
                </div>
              )
            })}
          </div>

          <NFTDialog open={!!currentNFT} currentNFT={currentNFT} setCurrentNFT={setCurrentNFT} />

          <BuyTicketsDialog
            open={showBuyTicketsDialog}
            setOpen={setShowBuyTicketsDialog}
            lootbox={lootbox}
            setIsSuccess={setIsSuccess}
          />

          <ClaimNFTDialog
            open={showClaimNFTDialog}
            setOpen={setShowClaimNFTDialog}
            lootbox={lootbox}
            tickets={tickets}
          />
          <RefundDialog
            open={showRefundDialog}
            setOpen={setShowRefundDialog}
            lootbox={lootbox}
            tickets={tickets}
          />

          <DepositNFTDialog
            lootbox={lootbox}
            open={showDepositNFTDialog}
            setOpen={setShowDepositNFTDialog}
            setIsSuccess={setIsSuccess}
          />
        </>
      )}
    </div>
  )
}
export default Bid
