// pages/lootbox/[bid]
import { FACTORY_ADDRESS, FACTORY_ABI } from "contract"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useMoralis, useChain, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { useNFTsBalance } from "hooks"

//Todo: query onchain lootbox to display
//add buy ticket
//add refund
//add claim reward
const Bid = () => {
  const router = useRouter()
  const { enableWeb3, isWeb3Enabled, web3: moralisProvider } = useMoralis()
  const { chain } = useChain()
  const [name, setName] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [image, setImage] = useState<Array<string>>([])

  const { NFTBalances } = useNFTsBalance()

  const { runContractFunction: getName } = useWeb3Contract({
    contractAddress: chain ? FACTORY_ADDRESS[chain.networkId] : "",
    functionName: "getLootboxName",
    abi: FACTORY_ABI,
    params: {
      _lootboxId: router.query.bid,
    },
  })
  const addNFTHandler = (nft) => {
    setImage([...image, nft.image])
  }
  useEffect(() => {
    async function updateUI() {
      const contract = new ethers.Contract(
        chain ? FACTORY_ADDRESS[chain.networkId] : "",
        FACTORY_ABI,
        moralisProvider
      )
      const name = (await getName()) as string
      setName(name)
      const address = router.query.bid
        ? ((await contract.lootboxAddress(router.query.bid)) as string)
        : (ethers.constants.AddressZero as string)
      setAddress(address)
    }
    if (isWeb3Enabled) {
      updateUI()
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled, router.query.bid, chain])
  return (
    <>
      <section>
        <div>Loot box index</div>
        <div>boxId: {router.query.bid}</div>
        <div>LootBoxName: {name}</div>
        <div>LootBoxName: {address}</div>
        {NFTBalances ? (
          NFTBalances.result.map((nft, index) => {
            return (
              <div
                key={index}
                className="border-2 hover:shadow-xl cursor-pointer"
                onClick={() => addNFTHandler(nft)}
              >
                {index}
                <img src={nft?.image || "error"} alt="" style={{ height: "36px" }} />
                <span>{nft.name} </span>
                <span>{nft.token_address} </span>
              </div>
            )
          })
        ) : (
          <></>
        )}
        {image.map((item, i) => (
          <div
            key={i}
            className="rounded-xl w-36 h-36 mx-auto mt-16 mb-10 bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          >
            <div
              key={i}
              className="flex flex-col justify-between h-full bg-white text-white rounded-lg"
            >
              <div key={i} className="rounded-lg  h-full w-full relative cursor-pointer ">
                <div
                  key={i}
                  className="absolute inset-0 bg-red opacity-25 rounded-lg shadow-2xl"
                ></div>
                <div
                  key={i}
                  className="absolute inset-0 transform  hover:scale-90 transition duration-300"
                >
                  <div key={i} className="h-full w-full bg-white rounded-lg shadow-2xl">
                    <img key={i} className="w-full h-full rounded-lg" src={item} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
export default Bid
