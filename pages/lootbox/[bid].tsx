// pages/lootbox/[bid]
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useMoralis } from "react-moralis"
import { useLootbox, useNFTsBalance } from "hooks"

//Todo: query onchain lootbox to display
//add buy ticket
//add refund
//add claim reward

interface Props {
  lootboxAddress: string
}

const Bid: React.FC<Props> = () => {
  const router = useRouter()
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { fetchLootbox, lootbox } = useLootbox()
  const { name, address } = lootbox
  const { NFTBalances } = useNFTsBalance()

  const [image, setImage] = useState<Array<string>>([])

  const addNFTHandler = (nft) => {
    setImage([...image, nft.image])
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      // fetchLootbox(lootboxAddress)
      // TODO: get lootboxAddress passed from Link or url
      fetchLootbox("0x382C6F730503Ec5846Af16081f75B68290a79A14")
    } else {
      enableWeb3()
    }
  }, [])

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
