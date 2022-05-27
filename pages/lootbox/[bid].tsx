// pages/lootbox/[bid]
import Router from "next/router"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMoralis, useChain, useNFTBalances } from "react-moralis"
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
  NotFound,
} from "components"
import { convertToCountdown } from "utils"
import { NFT, Chain } from "types"
import { ethers } from "ethers"
import { CHAINID_TO_DETAIL, isChainSupport, LOOTBOX_ABI } from "contract"
import { Icon, Tooltip } from "web3uikit"
import { useTx } from "context/transaction"

interface Props {
  lootboxAddress: string
}
//TODO show total ticket, minum ticket
const Bid: React.FC<Props> = () => {
  const router = useRouter()
  const { bid } = router.query

  const [isCopy, setIsCopy] = useState(false)
  const { enableWeb3, isWeb3Enabled, account, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const { doTx } = useTx()
  const { fetchLootbox, lootbox, isLoading } = useLootbox()
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
  const { time, metric } = convertToCountdown(drawTimestamp)

  const [showClaimNFTDialog, setShowClaimNFTDialog] = useState(false)
  const [showDepositNFTDialog, setShowDepositNFTDialog] = useState(false)
  const [showRefundDialog, setShowRefundDialog] = useState(false)
  const [showBuyTicketsDialog, setShowBuyTicketsDialog] = useState(false)
  const [currentNFT, setCurrentNFT] = useState<NFT>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [balance, setBalance] = useState(0)
  // const [showBalance, setShowBalance] = useState("0")

  const [isNFTAlreadyWithdrawn, setIsNFTAlreadyWithdrawn] = useState(false)

  const { getNFTBalances } = useNFTBalances()

  useEffect(() => {
    if (isWeb3Enabled && chain && bid) {
      const main = async () => {
        const loot = await fetchLootbox("", Number(bid))
        if (!loot.address || loot.address === "") {
          return Router.push("/marketplace")
        }

        // get nfts of lootbox
        const nftMetadata = await getNFTBalances({
          params: {
            chain: chain.chainId as Chain,
            address: loot.address,
          },
        })
        const result = nftMetadata?.result
        if (result?.length === 0) {
          setIsNFTAlreadyWithdrawn(true)
        }

        // get native balance of lootbox
        const balance = await moralisProvider.getBalance(loot.address)
        setBalance(Number(balance.toString()))

        // const currency = isChainSupport(chain) ? CHAINID_TO_DETAIL[chain.chainId].currency : ""
        // const showBalance = ethers.utils.formatEther(balance.toString()) + " " + currency
        // setShowBalance(showBalance)
      }

      main()
    } else {
      enableWeb3()
    }
  }, [bid, isWeb3Enabled, isSuccess, chain])

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
    await doTx(sendOptions)
    setIsSuccess(true)
  }

  // withdraw NFT by owner of the lootbox
  // in case there is no draw occurs
  const withdrawNFT = async () => {
    const sendOptions = {
      contractAddress: lootbox?.address,
      functionName: "withdrawNFT",
      abi: LOOTBOX_ABI,
    }
    await doTx(sendOptions)
    setIsSuccess(true)
  }

  const isOwner = () => {
    if (!account) {
      return false
    }
    return account.toUpperCase() === owner.toUpperCase()
  }

  const createLabel = (topic: string, value: any) => {
    return (
      <div className="p-4 items-center text-center">
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
  const createSubButton = (title: string, onClick: () => void) => {
    return (
      <button
        onClick={onClick}
        className="flex flex-row px-8 py-3 bg-white border border-mainPink text-mainPink
         rounded-xl hover:shadow-2xl transition duration-300"
      >
        <Icon fill="#E54090" size={28} svg="speedyNode" />
        <h3 className="ml-2 mt-2">{title}</h3>
      </button>
    )
  }

  const createDisableButton = (title: string) => {
    return (
      <button
        disabled
        className="mr-5 flex flex-row px-8 py-3 bg-gray-400 text-white
          rounded-xl"
      >
        <Icon fill="#ffffff" size={28} svg="creditCard" />
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
        if (isOwner() && nfts.length > 0) {
          if (isNFTAlreadyWithdrawn) {
            withdrawNFTButton = createDisableButton("NFT Withdrawn")
          } else {
            withdrawNFTButton = createSubButton("Withdraw NFTs", () => withdrawNFT())
          }
        }

        // if draw success owner can claim money, winner can claim NFT
      } else {
        //TODO: check if user is a winner
        claimNFTButton = createMainButton("Claim NFT", () => setShowClaimNFTDialog(true))
        if (isOwner) {
          if (balance > 0) {
            claimMoneyButton = createMainButton("Claim Money", () => claimMoney())
          } else {
            claimMoneyButton = createDisableButton("Money Claimed")
          }
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

  const showStatus = () => {
    if (time === "Ended" && !isRefundable && !isDrawn) {
      return "Drawing"
    } else if (isRefundable) {
      return "Canceled"
    } else if (isDrawn && !isRefundable) {
      return "Completed"
    } else {
      return "Countdown"
    }
  }
  return (
    <div className="centered">
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

              {/* <h3 className="-mt-2 text-md">Address: {address}</h3> */}
              <div className="w-fit -mt-4">
                <Tooltip position="right" content={<h4>{isCopy ? "Copied" : "Copy"}</h4>}>
                  <h4
                    onMouseLeave={() => setIsCopy(false)}
                    onClick={() => {
                      navigator.clipboard.writeText(address)
                      setIsCopy(true)
                    }}
                    className="p-2 w-fit border-gray-200 text-sm flex flex-col 
                      font-medium text-gray-500 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-200"
                  >
                    Address: {address}
                  </h4>
                </Tooltip>
              </div>

              <h3 className="ml-2 text-lg font-medium">
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
                  <div className="ml-5 flex flex-row -pr-10">
                    <Icon fill="rgb(30,30,30)" size={36} svg="calendar" />

                    <div className="ml-1 mt-3">
                      <h3>Draw time </h3>
                      <h3 className="text-mainPink">
                        {new Date(drawTimestamp * 1000).toUTCString()}
                      </h3>
                    </div>
                  </div>

                  <div className="ml-20 flex flex-row items-center justify-center">
                    <Icon fill="rgb(30,30,30)" size={36} svg="atomicApi" />{" "}
                    <div className="ml-1 mt-3">
                      <h3>Time left </h3>
                      <h3 className="text-mainPink">
                        {time} {metric}
                      </h3>
                    </div>
                  </div>

                  <div className="ml-24 flex flex-row items-center justify-center">
                    <Icon fill="rgb(30,30,30)" size={36} svg="eye" />{" "}
                    <div className="ml-1 mt-3">
                      <h3>Status </h3>
                      <h3 className="text-mainPink">{showStatus()}</h3>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-5 bg-lightPink rounded-b-xl">
                  {/* {createLabel("balance", showBalance)} */}
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
            {nfts.length > 0 ? (
              nfts.map((nft, index) => {
                return (
                  <div onClick={() => onNFTClick(nft)} key={index}>
                    <NFTCard NFT={nft} />
                  </div>
                )
              })
            ) : (
              <NotFound info="Nothing in the box yet" />
            )}
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
            setIsSuccess={setIsSuccess}
          />
          <RefundDialog
            open={showRefundDialog}
            setOpen={setShowRefundDialog}
            lootbox={lootbox}
            setIsSuccess={setIsSuccess}
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
