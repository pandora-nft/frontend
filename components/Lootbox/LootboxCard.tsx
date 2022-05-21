import { LootboxDetail } from "./LootboxDetail"
import { Lootbox } from "types"

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
                <div key={index} className="w-48 mr-5">
                  <img className="rounded w-[110px] h-[100px]" src="EmptyPic.png" />
                </div>
              )
            })}
        </>
      )
    } else {
      return (
        <>
          {nfts.map((nft, index) => {
            return (
              <div key={index} className="w-48 mr-5">
                <img className="rounded" src={nft.imageURI} />
              </div>
            )
          })}
        </>
      )
    }
  }
  return (
    <div className="rounded border border-gray-800 shadow-xl h-[350px] p-10 flex flex-col hover:scale-[101%] transition duration-500">
      <h2 className="text-left font-medium">
        #{id} {name}
      </h2>
      <h3 className="text-left font-medium mb-5">{address}</h3>

      <LootboxDetail
        numItems={nfts.length}
        ticketPrice={ticketPrice}
        ticketSold={ticketSold}
        drawTimestamp={drawTimestamp}
      />
      <div className="flex flex-row justify-between p-5">{showNFTs()}</div>
    </div>
  )
}
