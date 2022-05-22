import React from "react"
import { Skeleton } from "web3uikit"

export const NFTCardSkeleton = () => {
  return (
    <div
      className="grid grid-flow-row min-h-64 
    rounded-[5px] border border-gray-300"
    >
      <Skeleton height="280px" width="full" theme="image" />
      <div className="w-full h-[100px] min-h-20 border-t border-gray-300 text-left pt-2 pl-2">
        <Skeleton theme="text" height="20px" />
        <Skeleton theme="text" height="20px" />
        <Skeleton theme="text" height="20px" />
      </div>
    </div>
  )
}
