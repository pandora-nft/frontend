import { Skeleton } from "web3uikit"
import { LootboxDetailSkeleton } from "./LootboxDetailSkeleton"

export const LootboxCardSkeleton = () => {
  return (
    <div className="rounded border border-gray-300 shadow-xl p-10 flex flex-col hover:scale-[101%] transition duration-500">
      <Skeleton theme="text" />
      <Skeleton theme="text" />

      <LootboxDetailSkeleton />
      <div className="flex flex-row justify-between p-5">
        {[1, 2, 3, 4].map((_, index) => {
          return (
            <div key={index} className="w-48 mr-5">
              <Skeleton theme="image" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
