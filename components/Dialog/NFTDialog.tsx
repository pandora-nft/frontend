import { Dispatch, SetStateAction } from "react"
import { NFT } from "types"
import { Modal } from "components"

interface Props {
  open: boolean
  currentNFT: NFT
  setCurrentNFT: Dispatch<SetStateAction<NFT>>
}

export const NFTDialog = ({ open, currentNFT, setCurrentNFT }: Props) => {
  const content = (
    <div className="text-left flex flex-col space-y-4 justify-between items-center">
      <img className="w-40" src={currentNFT?.imageURI} alt="image" />
      <div className="pt-5 w-100 font-medium">Address: {currentNFT?.address}</div>
      <div className="w-100 font-light">{currentNFT?.description} </div>
    </div>
  )
  return (
    <Modal
      open={open}
      onClose={() => setCurrentNFT(null)}
      title={currentNFT?.name}
      content={content}
    />
  )
}
