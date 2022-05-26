import React from "react"
import { NFT } from "types"

interface NFTCardProps {
  NFT: NFT
}

export const NFTCard: React.FC<NFTCardProps> = ({ NFT }) => {
  const { name, description, collectionName, tokenId, imageURI } = NFT

  return (
    <div className="w-[300px] h-[400px] grid grid-flow-row rounded border border-gray-400 cursor-pointer bg-gray-25 transform  hover:scale-[103%] transition duration-300">
      <div>
        <img
          className="block object-cover object-center w-[300px] h-[300px] rounded-lg"
          src={imageURI}
          alt="nft"
        />
      </div>
      <div className="pt-2 pl-2 h-fit border-t border-gray-400 text-left max-h-fit">
        <h5 className="break-words font-medium ">{name}</h5>
        <p className="text-gray-700 font-medium text-medium mb-2">
          {collectionName} #{tokenId}{" "}
        </p>
        <p className="truncate font-medium text-sm">
          {description?.length > 40 ? <>{description.substring(0, 37) + "..."}</> : description}
        </p>
      </div>
    </div>
  )
}
