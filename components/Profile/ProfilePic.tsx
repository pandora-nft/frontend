import { shortenAddress } from "utils"
import { useMoralis } from "react-moralis"

export const ProfilePic = () => {
  const { account } = useMoralis()

  return (
    <div className="flex flex-col items-center justify-start">
      <img className="rounded-full w-28 h-28" src="/NFTs/8.png" alt="profile-pic" />
      <h4
        className="mt-4 p-2 text-sm flex flex-col 
        font-medium text-gray-500 rounded-xl"
      >
        {shortenAddress(account)}
      </h4>
    </div>
  )
}
