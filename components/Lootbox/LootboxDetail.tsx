import { convertToCountdown } from "utils"
import { ethers } from "ethers"

interface LootboxDetailProps {
  numItems: number
  ticketPrice: number
  ticketSold: number
  drawTimestamp: number
}

export const LootboxDetail: React.FC<LootboxDetailProps> = ({
  numItems,
  ticketPrice,
  ticketSold,
  drawTimestamp,
}) => {
  const createLabel = (topic: string, value: any) => {
    return (
      <div className="w-48 mr-5">
        <h3 className="font-medium">{value}</h3>
        <h3 className="font-bold">{topic}</h3>
      </div>
    )
  }
  return (
    <div className="flex flex-row justify-between pt-5 px-5">
      {createLabel("items", numItems)}
      {createLabel("ticket price", ethers.utils.formatEther(ticketPrice.toString()))}
      {createLabel("ticket sold", ticketSold)}
      {createLabel("time left", convertToCountdown(drawTimestamp))}
    </div>
  )
}
