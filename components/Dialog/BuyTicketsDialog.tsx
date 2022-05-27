import { Dispatch, SetStateAction, useState } from "react"
import { ethers } from "ethers"
import { Lootbox } from "types"
import { useChain } from "react-moralis"
import { Icon } from "web3uikit"
import { isChainSupport, CHAINID_TO_DETAIL, LOOTBOX_ABI } from "contract"
import { Modal } from "components"
import { useTx } from "context/transaction"

interface Props {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  lootbox: Lootbox
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

export const BuyTicketsDialog = ({ open, setOpen, lootbox, setIsSuccess }: Props) => {
  const { chain } = useChain()
  const { doTx } = useTx()
  const { id, address, ticketPrice } = lootbox
  const [amount, setAmount] = useState<number>(1)

  const buyTickets = async () => {
    const sendOptions = {
      contractAddress: address,
      functionName: "buyTickets",
      abi: LOOTBOX_ABI,
      params: {
        _amount: amount,
      },
      msgValue: (amount * ticketPrice).toString(),
    }

    await doTx(sendOptions)
    setOpen(false)
    setIsSuccess(true)
  }

  const content = (
    <div className="flex flex-col space-y-4 justify-between">
      <div className="flex flex-row">
        <h3 className="font-medium mr-2 mt-3">
          Ticket Price: {ticketPrice ? ethers.utils.formatEther(ticketPrice.toString()) : "0"}
        </h3>
        <Icon
          fill={isChainSupport(chain) ? CHAINID_TO_DETAIL[chain.chainId].color : "#1e1e1e"}
          size={20}
          // @ts-ignore
          svg={isChainSupport(chain) ? CHAINID_TO_DETAIL[chain.chainId].icon : "eth"}
        />
      </div>
      <input
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
        placeholder="Number of tickets..."
        type="number"
        min={1}
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div className="flex flex-row justify-end">
        <h3 className="font-medium mr-2 mt-3">
          Total: {amount ? ethers.utils.formatEther((ticketPrice * Number(amount)).toString()) : 0}{" "}
        </h3>
        <Icon
          fill={isChainSupport(chain) ? CHAINID_TO_DETAIL[chain.chainId].color : "#1e1e1e"}
          size={26}
          // @ts-ignore
          svg={isChainSupport(chain) ? CHAINID_TO_DETAIL[chain.chainId].icon : "eth"}
        />
      </div>
    </div>
  )
  const buyButton = (
    <button
      className="background-transparent font-bold u
      ppercase px-6 py-2 text-sm 
      outline-none focus:outline-none mr-1 
      mb-1 ease-linear transition-all duration-150"
      onClick={buyTickets}
    >
      Buy
    </button>
  )

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title={`Buy tickets for lootbox #${id}`}
      content={content}
      confirmButton={buyButton}
    />
  )
}
