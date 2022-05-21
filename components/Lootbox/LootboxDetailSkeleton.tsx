import { Skeleton } from "web3uikit"

export const LootboxDetailSkeleton = () => {
  const createLabelSkeleton = () => {
    return (
      <div className="w-48 mr-5">
        <Skeleton theme="text" />
        <Skeleton theme="text" />
      </div>
    )
  }
  return (
    <div className="flex flex-row justify-between pt-5 px-5">
      {createLabelSkeleton()}
      {createLabelSkeleton()}
      {createLabelSkeleton()}
      {createLabelSkeleton()}
    </div>
  )
}
