import { LootboxDetail } from "./LootboxDetail"
import { Lootbox } from "types"
import { shortenAddress } from "utils"
import { Illustration } from "web3uikit"

interface LootboxCardProps {
  lootbox: Lootbox
}

export const LootboxCard: React.FC<LootboxCardProps> = ({ lootbox }) => {
  const { id, name, address, ticketPrice, ticketSold, nfts, drawTimestamp } = lootbox

  const createImg = (src: string) => (
    <div className="rounded">
      <img alt="nft" className="rounded w-full h-48 md:h-24" src={src} />
    </div>
  )

  const showNFTs = () => {
    if (nfts.length === 0) {
      return (
        <div
          className="col-span-4
                        flex items-center"
        >
          <Illustration width="80px" height="80px" logo="looking" />
          <h3 className="text-lg text-gray-500 font-light">No deposited NFT yet</h3>
        </div>
      )
    } else if (nfts.length > 4) {
      return (
        <>
          {nfts.slice(0, 3).map((nft, index) => {
            return <div key={index}> {createImg(nft.imageURI)}</div>
          })}
          <div className="relative">
            <div className="rounded bg-black">
              <div className="opacity-50"> {createImg(nfts[3].imageURI)}</div>
            </div>

            <h2
              className="absolute top-1/2 left-1/2 transform 
            -translate-x-1/2 -translate-y-1/3 
            text-white font-medium text-sm"
            >
              +more
            </h2>
          </div>
        </>
      )
    } else {
      return (
        <>
          {nfts.map((nft, index) => {
            return <div key={index}>{createImg(nft.imageURI)}</div>
          })}
        </>
      )
    }
  }
  return (
    <div
      className="rounded border border-gray-800 shadow-xl w-full min-h-[330px]
                    pt-8 p-6 flex flex-col hover:scale-[101%] transition duration-500"
    >
      <h2 className="text-left text-2xl font-medium">
        #{id} {name}
      </h2>
      <h3 className="text-left font-medium mb-5">{shortenAddress(address)}</h3>

      <LootboxDetail
        numItems={nfts.length}
        ticketPrice={ticketPrice}
        ticketSold={ticketSold}
        drawTimestamp={drawTimestamp}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{showNFTs()}</div>
    </div>
  )
}
