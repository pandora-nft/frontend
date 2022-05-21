import { LootboxDetail } from "./LootboxDetail"
import { Lootbox } from "types"

interface LootboxCardProps {
  lootbox: Lootbox
}

export const LootboxCard: React.FC<LootboxCardProps> = ({ lootbox }) => {
  const { name, address, ticketPrice, ticketSold, nfts, drawTimestamp } = lootbox

  return (
    <div className="rounded border border-gray-800 shadow-xl p-10 flex flex-col hover:scale-[101%] transition duration-500">
      <h2 className="text-left font-medium"># {name}</h2>
      <h3 className="text-left font-medium mb-5">{address}</h3>

      <LootboxDetail
        numItems={nfts.length}
        ticketPrice={ticketPrice}
        ticketSold={ticketSold}
        drawTimestamp={drawTimestamp}
      />
      <div className="flex flex-row justify-between p-5">
        {nfts.map((nft, index) => {
          return (
            <div key={index} className="w-48 mr-5">
              <img className="rounded" src={nft.imageURI} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
