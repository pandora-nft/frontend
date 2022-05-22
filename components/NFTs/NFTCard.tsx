import React from "react"
import { NFT } from "types"

interface NFTCardProps {
  NFT: NFT
}

export const NFTCard: React.FC<NFTCardProps> = ({ NFT }) => {
  const { name, description, collectionName, tokenId, imageURI } = NFT

  return (

    <div className="grid grid-flow-row w-full h-full rounded border border-gray-400 cursor-pointer bg-gray-25 transform  hover:scale-[103%] transition duration-300">
      <img
        className="block object-cover object-center w-full h-full rounded-lg"
        src={imageURI || "error"}
        alt=""
      />
      <div className="pt-2 pl-2 border-t border-gray-400 text-left max-h-fit">
        <h5 className="break-words font-medium ">{name}</h5>
        <p className="text-gray-700 font-medium text-medium mb-2">
          {collectionName} #{tokenId}{" "}
        </p>
        <p className=" font-medium text-sm">
          {description?.length > 40 ? <>{description.substring(0, 40)}...</> : description}
        </p>
      </div>

      {/* <div className="w-full h-fit min-h-20 border-t border-gray-400 text-left pt-2 pl-2">
        <p className="break-words font-medium ">{name}</p>
        <p className="break-words font-normal text-sm ">
          {collectionName}#{tokenId}{" "}
        </p>
        {description ? (
          <div className=" font-medium text-sm">
            {description?.length > 40 ? <>{description.substring(0, 40)}...</> : description}
          </div>
        ) : (
          <></>
        )}
      </div> */}

      {/* <span>{imageURI} </span> */}
    </div>
  )
}
