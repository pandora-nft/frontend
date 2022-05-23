import Link from "next/link"
import { useState } from "react"
import { useChain, useWeb3Contract, useMoralis } from "react-moralis"
import { useNFTsBalance, useLootbox } from "hooks"
import { FACTORY_ABI, FACTORY_ADDRESS } from "contract"
import { ethers } from "ethers"
import { Modal } from "components"
import { NFTCard } from "components/NFTs/NFTCard"

const initialFormData = {
  name: "",
  drawTimestamp: 86400, // 1 day
  ticketPrice: 0.001,
  minimumTicketRequired: 1,
  maxTicketPerWallet: 1,
}

const Create = () => {
  const { account } = useMoralis()
  const { chain } = useChain()
  const { fetchLootbox, lootbox } = useLootbox()
  const [formData, setFormData] = useState(initialFormData)
  const [image, setImage] = useState<Array<string>>([])
  const [isCreated, setIsCreated] = useState<boolean>(false)
  const { runContractFunction: deployLootbox } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.networkId] : "",
    functionName: "deployLootbox(string,uint256,uint256,uint256,uint256)",
    abi: FACTORY_ABI,
    params: {
      _name: formData.name,
      _drawTimestamp: Math.floor(Date.now() / 1000) + formData.drawTimestamp,
      _ticketPrice: ethers.utils.parseEther(formData.ticketPrice.toString()).toString(),
      _minimumTicketRequired: formData.minimumTicketRequired,
      _maxTicketPerWallet: formData.maxTicketPerWallet,
    },
  })
  const { runContractFunction: getAllLootbox } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.networkId] : "",
    functionName: "getAllLootboxes",
    abi: FACTORY_ABI,
    params: {},
  })
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage([...image, URL.createObjectURL(img)])
    }
  }

  async function handleFormSumbit(e) {
    e.preventDefault()
    const deploy_res: any = await deployLootbox()
    console.log(deploy_res)
    console.log("created box at ", deploy_res?.to)
    const allLootBox: any = await getAllLootbox()
    console.log(allLootBox)
    await fetchLootbox("", allLootBox?.length - 1)
    console.log("bid", allLootBox.length - 1, lootbox)

    setIsCreated(true)
    setFormData(initialFormData)
  }

  if (formData) console.log(formData)

  const DepositDialog = () => {
    const { NFTBalances } = useNFTsBalance()
    const content = (
      <div className="flex">
        <div className="container mx-auto max-w-4/5 min-w-sm pr-3">
          <h3>`Name` Lootbox </h3>
        </div>
        <div className="container w-fit pl-3 border-l ">
          <h3>NFTs Owned </h3>
          <div className="grid grid-cols-3 gap-2 pt-6">
            {NFTBalances ? (
              NFTBalances.result.map((nft, index) => {
                const NFT = {
                  name: nft?.metadata?.name,
                  collectionName: nft?.name,
                  description: "",
                  tokenId: nft?.token_id,
                  address: nft?.token_address,
                  imageURI: nft?.image,
                }
                return (
                  <div key={index}>
                    <NFTCard NFT={NFT} />
                  </div>
                )
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    )
    return (
      <Modal
        open={isCreated}
        setOpen={setIsCreated}
        title={"Deposit Your NFTs"}
        content={content}
      />
    )
  }

  return (
    <div className="w-0.8 p-16 grid justify-items-center ">
      <div className="grid pl-16 w-full justify-items-start ">
        <h2 className="text-[42px] font-bold">Create Single LootBox on Ethereum</h2>
      </div>

      {/* <div>{JSON.stringify(formData)}</div> */}
      <div className="grid pl-16 pt-8 justify-items-start rounded-lg  w-full ">
        <div className="h-24 lg:w-2/5 shadow-xl bg-gray-50">
          connected to {chain ? chain.name : "..."} chainId: {chain ? chain.networkId : "..."}
          <img className="w-6" src="/chain/Ethereum.png"></img>
          <span>address:{account}</span>
        </div>
      </div>

      {/* Form */}
      <div className="grid pl-16 pt-8 justify-items-start rounded-lg  w-full ">
        <div className="w-3/4">
          <form onSubmit={(e) => handleFormSumbit(e)} className="w-full max-w-lg">
            <label className="inline-block mb-2 text-[24px] font-bold">
              Upload Image (jpg,png,svg,jpeg)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-full border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7 ">
                  {image.length !== 0 ? (
                    <div>
                      <img className="w-36 h-36" src={image[image.length - 1]} />
                    </div>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="pt-1 text-m tracking-wider text-gray-400 group-hover:text-gray-600">
                        Select a photo
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  name="myImage"
                  onChange={(e) => {
                    handleImageChange(e)
                  }}
                  className="opacity-0"
                />
              </label>
            </div>

            <div className="grid xl:grid-cols-2 xl:gap-6 pt-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Name
                </label>
                <input
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  value={formData.name}
                  type="text"
                  name="floating_first_name"
                  id="floating_first_name"
                  className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            {/* <div className="grid-row xl:grid-cols-2 xl:gap-6 pt-6">
              <label
                htmlFor="message"
                className="block mb-4 text-m font-medium text-gray-900 dark:text-gray-400"
              >
                Description
              </label>
              <textarea
                id="message"
                className="block p-2.5 w-full text-m text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="add description"
              ></textarea>
            </div> */}
            <div className="grid pt-6 xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Ticket Price
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, ticketPrice: Number(e.target.value) })
                  }
                  value={formData.ticketPrice}
                  type="number"
                  step=".001"
                  name="floating_last_name"
                  id="floating_last_name"
                  className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <div className=" pr-5 pt-2 font-light font-sm text-gray-800">Service Fee 2%</div>
              </div>
            </div>
            <div className="grid pt-6 xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Minimum Ticket Required
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, minimumTicketRequired: Number(e.target.value) })
                  }
                  value={formData.minimumTicketRequired}
                  type="number"
                  min="0"
                  max="500"
                  className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            <div className="grid pt-6 xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Max ticket per wallet
                </label>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, maxTicketPerWallet: Number(e.target.value) })
                  }
                  value={formData.maxTicketPerWallet}
                  type="number"
                  min="0"
                  max="500"
                  className="block py-2.5 px-0 w-full text-m text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
              </div>
            </div>
            <div className="grid pt-6 xl:grid-cols-2 xl:gap-6">
              <div className="relative z-0 w-full pb-2 group">
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-900 dark:text-gray-400"
                >
                  Expiration Period
                </label>

                <div className="relative inline-flex">
                  <svg
                    className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 412 232"
                  >
                    <path
                      d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                      fill="#648299"
                      fillRule="nonzero"
                    />
                  </svg>
                  <select
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        drawTimestamp: Number(e.target.value),
                      })
                    }
                    value={formData.drawTimestamp}
                    className="border border-gray-300 rounded-md text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                    required
                  >
                    <option disabled>Choose expiration period</option>
                    <option value={1 * 60 * 60}>1 hours</option>
                    <option value={3 * 60 * 60}>3 hours</option>
                    <option value={6 * 60 * 60}>6 hours</option>
                    <option value={12 * 60 * 60}>12 hours</option>
                    <option value={24 * 60 * 60}>1 day</option>
                    <option value={72 * 60 * 60}>3 days</option>
                    <option value={168 * 60 * 60}>7 days</option>
                    <option value={336 * 60 * 60}>14 days</option>
                  </select>
                </div>
              </div>
            </div>
            <fieldset className="pt-4">
              <legend className="sr-only">Checkbox variants</legend>
              <div className="flex items-center mb-4">
                <input
                  id="checkbox-2"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
                <div>
                  <label
                    htmlFor="checkbox-2"
                    className="ml-2 text-m font-medium text-gray-900 dark:text-gray-300 "
                  >
                    I agree to the{" "}
                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
                      terms and conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex items-center ">
                <div>
                  <input
                    id="checkbox-3"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkbox-3"
                    className="ml-2 text-m font-medium text-gray-900 dark:text-gray-300"
                  >
                    I am 13 years or older
                  </label>
                </div>
              </div>
              <Link href={"/whitepaper"} replace>
                <a className=" pr-5 font-light text-gray-500">How it work</a>
              </Link>
            </fieldset>
            <div></div>
            <button
              type="submit"
              className="text-white pt-4 mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-m w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
          <button
            onClick={() => {
              setIsCreated(!isCreated)
            }}
            type="button"
            className="text-white pt-4 mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-m w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            open modal
          </button>
          {isCreated ? (
            <div>
              <DepositDialog />
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
