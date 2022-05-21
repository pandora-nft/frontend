import { LootboxDetail } from "./LootboxDetail"
import { Lootbox } from "types"
import { shortenAddress } from "utils"

interface LootboxCardProps {
  lootbox: Lootbox
}

export const LootboxCard: React.FC<LootboxCardProps> = ({ lootbox }) => {
  const { id, name, address, ticketPrice, ticketSold, nfts, drawTimestamp } = lootbox

  const showNFTs = () => {
    if (nfts.length < 4) {
      return (
        <>
          {Array(4)
            .fill(null)
            .map((_, index) => {
              return (
                <img
                  key={index}
                  className="rounded w-full h-48 md:h-24"
                  alt="emptyNFT"
                  src="EmptyPic.png"
                />
              )
            })}
        </>
      )
    } else {
      return (
        <>
          {nfts.map((nft, index) => {
            return (
              <img
                key={index}
                alt="nft"
                className="rounded w-full h-48 md:h-24"
                src={nft.imageURI}
              />
            )
          })}
        </>
      )
    }
  }
  return (
    <div
      className="rounded border border-gray-800 shadow-xl w-full  
                    pt-10 p-5 flex flex-col hover:scale-[101%] transition duration-500"
    >
      <h2 className="text-left font-medium">
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
