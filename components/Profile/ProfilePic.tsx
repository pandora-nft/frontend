import { shortenAddress } from "utils"
import { useMoralis } from "react-moralis"
import { Tooltip } from "web3uikit"
import { useState } from "react"


export const ProfilePic = () => {
  const { account } = useMoralis()
  const [isCopy, setIsCopy] = useState(false)

  return (
    <div className="flex flex-col items-center justify-start">
      <img className="rounded-full w-28 h-28" src="/NFTs/8.png" alt="profile-pic" />

      <div className="mt-6"></div>
      <Tooltip position="right" content={<h4>{isCopy ? "Copied" : "Copy"}</h4>}>
        <h4
          onMouseLeave={() => setIsCopy(false)}
          onClick={() => {
            navigator.clipboard.writeText(account)
            setIsCopy(true)
          }}
          className="p-2 border border-gray-200 text-sm flex flex-col 
        font-bold text-gray-500 rounded-xl cursor-pointer hover:bg-gray-100"
        >
          {shortenAddress(account)}
        </h4>
      </Tooltip>
    </div>
  )
}
