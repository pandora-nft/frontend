import Router from "next/router"
import { useEffect, useState } from "react"
import { CryptoLogos, Illustration } from "web3uikit"
import { useChain, useMoralis } from "react-moralis"
import { FACTORY_ABI, FACTORY_ADDRESS, CHAINID_TO_DETAIL } from "contract"
import { ethers } from "ethers"
import { CreateForm } from "components/inputs/CreateForm"
import { chainType } from "web3uikit/dist/components/CryptoLogos/types"
import { shortenAddress } from "utils"
import { useTx } from "context/transaction"

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
  const { account, enableWeb3, isWeb3Enabled, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const [formData, setFormData] = useState(initialFormData)

  const { doTx, clearTx } = useTx()

  async function handleFormSumbit(e) {
    e.preventDefault()
    await deployLootbox()
  }
  const deployLootbox = async () => {
    const sendOptions = {
      contractAddress: FACTORY_ADDRESS[chain.chainId],
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
    }
    const isSuccess = await doTx(sendOptions)
    if (isSuccess) {
      setFormData(initialFormData)
    }
  }

  const onLootboxCreateListener = () => {
    const factory = new ethers.Contract(
      FACTORY_ADDRESS[chain.chainId],
      FACTORY_ABI,
      moralisProvider
    )

    factory.on("LootboxDeployed", (lootboxId, lootboxAddress, owner) => {
      const listened_bid = Number(lootboxId.toString())
      if (account?.toUpperCase() === owner?.toUpperCase()) {
        Router.push("/lootbox/" + listened_bid)
        clearTx()
      }
    })
  }

  useEffect(() => {
    if (isWeb3Enabled && chain) {
      onLootboxCreateListener()
    } else {
      enableWeb3()
    }
  }, [chain, isWeb3Enabled])

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
            <button
              type="submit"
              className="text-white pt-4 mt-4 bg-mainPink 
              hover:bg-mainPink/[.9] focus:ring-4 focus:outline-none 
              focus:bg-mainPink/[.9] font-medium rounded-lg text-m w-full 
              sm:w-auto px-5 py-2.5 text-center dark:bg-mainPink 
              dark:hover:mainPink/[.9] dark:focus:mainPink/[.9]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Create
