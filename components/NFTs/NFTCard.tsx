import React from "react"
import { NFT } from "types"

interface NFTCardProps {
  NFT: NFT
}

export const NFTCard: React.FC<NFTCardProps> = ({ NFT }) => {
  const { name, description, collectionName, tokenId, imageURI } = NFT

  return (
    <div className="grid grid-flow-row min-h-64 rounded-[5px] border border-gray-300 cursor-pointer bg-gray-25 transform  hover:scale-[103%] transition duration-300">
      <img className="h-full rounded-t-[5px]" src={imageURI} alt="NFT" />
      <div className="w-full h-[100px] min-h-20 border-t border-gray-300 text-left pt-2 pl-2">
        <p className="font-normal text-gray-600 text-sm">
          {collectionName} #{tokenId}
        </p>
        <p className="font-medium text-black">{name}</p>
        <div className="font-medium text-sm">
          {description?.length > 40 ? <>{description.substring(0, 40)}...</> : description}
        </div>
      </div>
    </div>
  )
}
