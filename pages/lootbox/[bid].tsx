// pages/lootbox/[bid]
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMoralis, useChain } from "react-moralis"
import { useLootbox } from "hooks"
import { LootboxCanvas } from "canvas"
import { LoadingIndicator, Modal } from "components"
import { NFT, Ticket } from "types"
import { ethers } from "ethers"
import { NATIVE } from "network"
import { LOOTBOX_ABI } from "contract"
import { DepositNFTDialog } from "./depositNFT"
interface Props {
  lootboxAddress: string
}
//TODO refactor
//TODO refresh data when tx confirmed
//TODO show total ticket, minum ticket
//what's in the box ui bug when low nft amount
const Bid: React.FC<Props> = () => {
  const router = useRouter()

  const { enableWeb3, isWeb3Enabled, Moralis, account } = useMoralis()
  const { chain } = useChain()
  const { fetchLootbox, lootbox, isLoading, tickets } = useLootbox()
  const [showClaimNFTDialog, setShowClaimNFTDialog] = useState(false)
  const [showDepositNFTDialog, setShowDepositNFTDialog] = useState(false)
  const [showRefundDialog, setShowRefundDialog] = useState(false)
  const [showBuyTicketsDialog, setShowBuyTicketsDialog] = useState(false)

  const [currentNFT, setCurrentNFT] = useState<NFT>()

  const onNFTClick = (nft: NFT) => {
    setCurrentNFT(nft)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      fetchLootbox("", Number(router.query.bid))
    } else {
      enableWeb3()
    }
  }, [router.query.bid, isWeb3Enabled])

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

  const ClaimDialog = () => {
    const [ticket, setTicket] = useState<Ticket>()
    const [isSuccess, setIsSuccess] = useState(false)

    async function claimTickets(tickets: number) {
      const sendOptions = {
        contractAddress: lootbox?.address,
        functionName: "claimNFT",
        abi: LOOTBOX_ABI,
        params: {
          _ticketId: tickets,
        },
      }
      await Moralis.executeFunction(sendOptions)
      setIsSuccess(true)
    }

    const ownWonTicket = tickets?.filter((ticket) => {
      return (
        ticket &&
        ticket.owner?.toLowerCase() === account.toLowerCase() &&
        ticket.isWinner &&
        !ticket.isClaimed
      )
    })
    const content = !isSuccess ? (
      <>
        <div className="grid grid-rows-2 grid-flow-col">
          {ownWonTicket?.length > 0 ? (
            ownWonTicket.map((_ticket, index) => {
              return _ticket.tokenId === ticket?.tokenId ? (
                <div
                  key={index}
                  className="border-2 shadow-lg shadow-indigo-500/40 cursor-pointer max-w-sm mt-2"
                  onClick={() => {
                    if (ticket == _ticket) {
                      setTicket(null)
                    } else {
                      setTicket(_ticket)
                    }
                  }}
                >
                  <img src={_ticket?.imageURI || "error"} alt="" className="w-20 h-auto" />
                </div>
              ) : (
                <div
                  key={index}
                  className="border-2 hover:shadow-xl cursor-pointer max-w-sm mt-2"
                  onClick={() => {
                    if (ticket == _ticket) {
                      setTicket(null)
                    } else {
                      setTicket(_ticket)
                    }
                  }}
                >
                  <img src={_ticket?.imageURI || "error"} alt="" className="w-20 h-auto" />
                </div>
              )
            })
          ) : (
            <div className="text-center">You have no winning tickets to claim</div>
          )}
        </div>
        {ticket && (
          <div className="flex flex-row my-4 space-x-4 justify-center">
            <div className="border-2 shadow-lg shadow-indigo-500/40 cursor-pointer max-w-sm mt-2">
              <img src={ticket?.imageURI || "error"} alt="" className="w-20 h-auto" />
            </div>
            <div className="border-2 shadow-lg shadow-indigo-500/40 cursor-pointer max-w-sm mt-2">
              <img
                src={lootbox?.nfts[ticket?.wonTicket].imageURI || "error"}
                alt=""
                className="w-20 h-auto"
              />
            </div>
          </div>
        )}
      </>
    ) : (
      <div className="flex items-center justify-center">Transaction Submitted 🎉</div>
    )

    const claimButton = (
      <button
        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        disabled={!ticket}
        onClick={() => claimTickets(ticket.tokenId)}
      >
        Claim
      </button>
    )
    return (
      <Modal
        open={showClaimNFTDialog}
        setOpen={setShowClaimNFTDialog}
        title="Claim NFT"
        content={content}
        confirmButton={claimButton}
      />
    )
  }
  const RefundDialog = () => {
    const [isSuccess, setIsSuccess] = useState(false)

    async function refundTickets() {
      const sendOptions = {
        contractAddress: lootbox?.address,
        functionName: "refund",
        abi: LOOTBOX_ABI,
        params: {
          tokenIds: ownTicket?.map((ticket) => ticket?.tokenId),
        },
      }
      await Moralis.executeFunction(sendOptions)
      setIsSuccess(true)
    }

    const ownTicket = tickets?.filter((ticket) => {
      return ticket?.owner?.toLowerCase() === account?.toLowerCase() && !ticket?.isRefunded
    })
    const content = !isSuccess ? (
      <>
        <div className="grid grid-rows-2 grid-flow-col">
          {ownTicket?.length > 0 ? (
            ownTicket.map((_ticket, index) => {
              return (
                <div key={index} className="border-2 cursor-pointer max-w-sm mt-2">
                  <img src={_ticket?.imageURI || "error"} alt="" className="w-20 h-auto" />
                </div>
              )
            })
          ) : (
            <div className="text-center">You have no tickets to refund</div>
          )}
        </div>
      </>
    ) : (
      <div className="flex items-center justify-center">Transaction Submitted 🎉</div>
    )

    const claimButton = (
      <button
        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        disabled={ownTicket?.length === 0}
        onClick={() => refundTickets()}
      >
        Refund All
      </button>
    )
    return (
      <Modal
        open={showRefundDialog}
        setOpen={setShowRefundDialog}
        title="Refund Tickets"
        content={content}
        confirmButton={claimButton}
      />
    )
  }
  const BuyDialog = () => {
    const [value, setValue] = useState<number>()
    const [isSuccess, setIsSuccess] = useState(false)
    async function buyTickets(tickets: number) {
      const sendOptions = {
        contractAddress: lootbox?.address,
        functionName: "buyTickets",
        abi: LOOTBOX_ABI,
        params: {
          _amount: tickets,
        },
        msgValue: (tickets * lootbox?.ticketPrice).toString(),
      }
      console.log(sendOptions)
      await Moralis.executeFunction(sendOptions)
      setIsSuccess(true)
    }

    const content = !isSuccess ? (
      <div className="flex flex-col space-y-4 justify-between">
        <div>
          Ticket Price:
          {lootbox.ticketPrice ? ethers.utils.formatEther(lootbox.ticketPrice.toString()) : "0"}
          {NATIVE[chain?.networkId!]}
        </div>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="Number of tickets..."
          type="number"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <div>
          Total:{" "}
          {value ? ethers.utils.formatEther((lootbox?.ticketPrice * Number(value)).toString()) : 0}{" "}
          {NATIVE[chain?.networkId!]}
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-center">Transaction Submitted 🎉</div>
    )
    const buyButton = (
      <button
        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick={() => buyTickets(value)}
      >
        Buy
      </button>
    )

    return (
      <Modal
        open={showBuyTicketsDialog}
        setOpen={setShowBuyTicketsDialog}
        title={`Buy tickets for ${lootbox?.name}`}
        content={content}
        confirmButton={buyButton}
      />
    )
  }

  return (
    <>
      {isLoading ? (
        <div className="h-[30vh] mt-[10vh] flex flex-col items-center justify-between">
          <LoadingIndicator />
        </div>
      ) : (
        <>
          {lootbox?.owner?.toLowerCase() === account?.toLowerCase() && (
            <div className="mx-20">You are the owner of this Lootbox! 🎉</div>
          )}
          <div className="flex flex-row mx-8 mt-8">
            <div className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] m-8">
              <div className="mx-8">ID: {router.query.bid}</div>
              <div className="h-30 motion-safe:animate-bounce">
                <LootboxCanvas />
              </div>
              <div className="text-sm mx-8">
                <div>Name: {lootbox?.name}</div>

                <div>{`Draw time: ${new Date(lootbox?.drawTimestamp * 1000).toUTCString()}`}</div>
                <div className="flex flex-row-reverse">
                  {!lootbox?.isDrawn && (
                    <>
                      <button
                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        // className="m-2 px-2 rounded border-2 hover:shadow-xl cursor-pointer"
                        onClick={() => setShowBuyTicketsDialog(true)}
                      >
                        Buy Tickets
                      </button>
                      {lootbox?.owner?.toLowerCase() === account?.toLowerCase() && (
                        <button
                          className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          onClick={() => {
                            setShowDepositNFTDialog(true)
                          }}
                        >
                          Deposit NFTs
                        </button>
                      )}
                    </>
                  )}
                  {lootbox?.isDrawn && !lootbox?.isRefundable && (
                    <>
                      <button
                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => setShowClaimNFTDialog(true)}
                      >
                        Claim
                      </button>
                      {lootbox?.owner?.toLowerCase() === account?.toLowerCase() && (
                        <button
                          className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          onClick={async () => {
                            const sendOptions = {
                              contractAddress: lootbox?.address,
                              functionName: "withdraw",
                              abi: LOOTBOX_ABI,
                            }
                            await Moralis.executeFunction(sendOptions)
                          }}
                        >
                          Withdraw Revenue
                        </button>
                      )}
                    </>
                  )}

                  {lootbox?.isRefundable && (
                    <>
                      <button
                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => setShowRefundDialog(true)}
                      >
                        Refund
                      </button>
                      {lootbox?.owner?.toLowerCase() === account?.toLowerCase() && (
                        <button
                          className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          onClick={async () => {
                            const sendOptions = {
                              contractAddress: lootbox?.address,
                              functionName: "withdrawNFT",
                              abi: LOOTBOX_ABI,
                            }
                            await Moralis.executeFunction(sendOptions)
                          }}
                        >
                          withdraw NFT
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div>{"What's in the box?"}</div>
              <div className="grid grid-rows-3 grid-flow-col">
                {lootbox.nfts &&
                  lootbox.nfts?.map((nft, index) => {
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
          <NFTDialog />
          <BuyDialog />
          <ClaimDialog />
          <RefundDialog />
          <DepositNFTDialog
            lootbox={lootbox}
            showDepositNFTDialog={showDepositNFTDialog}
            setShowDepositNFTDialog={setShowDepositNFTDialog}
          />
        </>
      )}
    </>
  )
}
export default Bid
