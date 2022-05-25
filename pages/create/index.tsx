import { useState } from "react"
import { CryptoLogos, Illustration } from "web3uikit"
import { useChain, useWeb3Contract, useMoralis } from "react-moralis"
import { useLootbox } from "hooks"
import { FACTORY_ABI, FACTORY_ADDRESS, CHAINID_TO_DETAIL } from "contract"
import { ethers } from "ethers"
import { CreateForm } from "components/inputs/CreateForm"
import { DepositAfterCreateModal } from "../../components/DepositAfterCreateModal"
import { LoadingIndicator } from "components"
import { chainType } from "web3uikit/dist/components/CryptoLogos/types"
import { shortenAddress } from "utils"
const initialFormData = {
  name: "",
  ticketPrice: 0.001,
  minimumTicketRequired: 1,
  drawDays: 1, //1day = 24*60*60 s
  drawHours: 0,
  drawMinutes: 0,
  drawSeconds: 0,
}

const Create = () => {
  const { account, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const { fetchLootbox, lootbox, isLoading } = useLootbox()
  const [formData, setFormData] = useState(initialFormData)
  const [showDepositNFTDialog, setShowDepositNFTDialog] = useState<boolean>(false)
  const [bid, setBid] = useState<number>(0)
  const [isListened, setIsListened] = useState(true)
  const { runContractFunction: deployLootbox } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.networkId] : "",
    functionName: "deployLootbox(string,uint256,uint256,uint256)",
    abi: FACTORY_ABI,
    params: {
      _name: formData.name,
      _drawTimestamp:
        Math.floor(Date.now() / 1000) +
        formData.drawDays * (24 * 60 * 60) +
        formData.drawHours * (60 * 60) +
        formData.drawMinutes * 60 +
        formData.drawSeconds,
      _ticketPrice: ethers.utils.parseEther(formData.ticketPrice.toString()).toString(),
      _minimumTicketRequired: formData.minimumTicketRequired,
    },
  })
  async function handleFormSumbit(e) {
    e.preventDefault()
    await deployLootbox()
    setIsListened(false)
    setFormData(initialFormData)
  }

  const handleEventListener = async (bid: number) => {
    await fetchLootbox("", bid)
    setShowDepositNFTDialog(true)
  }

  if (chain?.networkId) {
    const factory = new ethers.Contract(
      FACTORY_ADDRESS[chain.chainId],
      FACTORY_ABI,
      moralisProvider
    )
    if (!isListened) {
      factory.on("LootboxDeployed", (lootboxId, lootboxAddress, owner) => {
        setIsListened(true)
        const listened_bid = Number(ethers.utils.formatUnits(lootboxId, 0))
        if (account?.toString().toLowerCase() == owner?.toString().toLowerCase()) {
          setBid(listened_bid)
          handleEventListener(listened_bid)
        }
      })
    }
  }
  const createChain = (chainId: string) => {
    const { name, src } = CHAINID_TO_DETAIL[chainId]

    return (
      <div
        className={
          " text-gray-700 text-red rounded-xl p-4 m-2 flex flex-rows justify-start items-center h-20"
        }
      >
        <div className="w-[70px]">
          {src === "testnet" ? (
            <Illustration height="70px" width="70px" logo="comingSoon" />
          ) : (
            <div className="ml-[8px]">
              <CryptoLogos chain={src as chainType} size="50px" />
            </div>
          )}
        </div>
        <div>
          <h3 className="ml-6 font-bold">{name}</h3>
          <h4 className="ml-6 font-normal">{shortenAddress(account)}</h4>
        </div>
      </div>
    )
  }

  return (
    <div className="w-0.8 p-16 grid justify-items-center ">
      <div className="grid pl-16 w-full justify-items-start ">
        <h2 className="text-[42px] font-bold">Create Single LootBox </h2>
      </div>

      <div className="pl-16 pt-8 justify-items-start rounded-xl  w-full ">
        <div className="flex items-center  w-fit bg-gray-50 border-2 border-gray-200  rounded-xl shadow-xl text-lg font-bold  bg-gray-50 p-4">
          <div>{chain?.chainId ? createChain(chain?.chainId) : <></>}</div>
          {chain ? (
            <div>
              <div className="w-fit items-center p-1.5 mr-2 text-sm font-semibold text-green-800 bg-green-100 rounded-xl dark:bg-green-200 dark:text-green-800">
                connected
              </div>
            </div>
          ) : (
            <div>
              <span className="inline-flex items-center p-1 mr-2 text-sm font-semibold text-red-800 bg-red-100 rounded-xl dark:bg-red-200 dark:text-red-800">
                disconnected
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Form */}
      <div className="grid pl-16 pt-8 justify-items-start rounded-lg  w-full ">
        <div className="w-3/4">
          <form onSubmit={(e) => handleFormSumbit(e)} className="w-full max-w-lg">
            <CreateForm formData={formData} setFormData={setFormData} />

            {isLoading || !isListened ? (
              <button
                type="button"
                className="text-white pt-4 mt-4 bg-mainPink hover:bg-mainPink/[.9] focus:ring-4 focus:outline-none focus:bg-mainPink/[.9] font-medium rounded-lg text-m w-full sm:w-auto px-5 py-2.5 text-center dark:bg-mainPink dark:hover:mainPink/[.9] dark:focus:mainPink/[.9]"
              >
                <LoadingIndicator />
              </button>
            ) : (
              <button
                type="submit"
                className="text-white pt-4 mt-4 bg-mainPink hover:bg-mainPink/[.9] focus:ring-4 focus:outline-none focus:bg-mainPink/[.9] font-medium rounded-lg text-m w-full sm:w-auto px-5 py-2.5 text-center dark:bg-mainPink dark:hover:mainPink/[.9] dark:focus:mainPink/[.9]"
              >
                Submit
              </button>
            )}
          </form>
          {lootbox ? (
            <div>
              <DepositAfterCreateModal
                lootbox={lootbox}
                showDepositNFTDialog={showDepositNFTDialog}
                setShowDepositNFTDialog={setShowDepositNFTDialog}
                bid={bid}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default Create
