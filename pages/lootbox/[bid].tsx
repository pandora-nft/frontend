// pages/lootbox/[bid]
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useChain, useMoralis } from "react-moralis"
import { useLootbox } from "hooks"

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

  const [image, setImage] = useState<Array<string>>([])

  const addNFTHandler = (nft) => {
    setImage([...image, nft.image])
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      // TODO: get lootboxAddress passed from Link or url
      fetchLootbox("", Number(router.query.bid))
    } else {
      enableWeb3()
    }
  }, [isWeb3Enabled])

  return (
    <>
      <section>
        <div>Pandora box ID: {router.query.bid}</div>
        <div>Name: {lootbox.name}</div>
        <div>Address: {lootbox.address}</div>
        {lootbox.nfts ? (
          lootbox.nfts.map((nft, index) => {
            return (
              <div
                key={index}
                className="border-2 hover:shadow-xl cursor-pointer"
                onClick={() => addNFTHandler(nft)}
              >
                {index}
                <img src={nft?.imageURI || "error"} alt="" style={{ height: "36px" }} />
                <span>{nft.tokenId} </span>
                <span>{nft.address} </span>
              </div>
            )
          })
        ) : (
          <></>
        )}
        {/* {image.map((item, i) => (
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
        ))} */}
      </section>
    </>
  )
}
export default Bid
