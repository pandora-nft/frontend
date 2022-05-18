// pages/lootbox/[bid]
import { useEffect } from "react"
import { useRouter } from "next/router"
import { useMoralis } from "react-moralis"
import { useLootbox } from "hooks"
import { LootboxCanvas } from "canvas"

//TODO viewNFTDialog: show NFT and metadata
//TODO claimNFTDialog: show ticket, and select ticket to claim,
//TODO Refund: show ticket, and select ticket to refund
interface Props {
  lootboxAddress: string
}

const Bid: React.FC<Props> = () => {
  const router = useRouter()
  const { enableWeb3, isWeb3Enabled } = useMoralis()
  const { fetchLootbox, lootbox, isLoading } = useLootbox()

  const onNFTClick = (nft) => {
    //TODO onOpenViewNFTDialog
    console.log(nft)
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      fetchLootbox("", Number(router.query.bid))
    } else {
      enableWeb3()
    }
  }, [router.query.bid, isWeb3Enabled])

  return (
    <>
      {isLoading ? (
        <div className="h-[30vh] flex flex-col items-center justify-between">
          <svg
            role="status"
            className="w-[20vh] h-[20vh] mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
      ) : (
        <div className="flex flex-row mx-8 mt-8">
          <div className="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] m-8">
            <div className="mx-8">ID: {router.query.bid}</div>
            <div className="h-30 w-auto motion-safe:animate-bounce">
              <LootboxCanvas />
            </div>
            <div className="text-sm mx-8">
              <div>Name: {lootbox.name}</div>

              <div>{`Draw time: ${new Date(lootbox.drawTimestamp * 1000).toUTCString()}`}</div>
              <div className="flex flex-row-reverse">
                <button className="mx-2">Buy Tickets</button>
                <button className="mx-2">Claim</button>
              </div>
            </div>
          </div>
          <div>
            <div>NFTs</div>
            <div className="grid grid-rows-3 grid-flow-col">
              {lootbox.nfts &&
                lootbox.nfts.map((nft, index) => {
                  return (
                    <div
                      key={index}
                      className="border-2 hover:shadow-xl cursor-pointer max-w-sm mt-2"
                      onClick={() => onNFTClick(nft)}
                    >
                      <img src={nft?.imageURI || "error"} alt="" className="w-20 h-auto" />
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default Bid
