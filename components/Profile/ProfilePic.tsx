import { shortenAddress } from "utils"
import { useMoralis } from "react-moralis"

export const ProfilePic = () => {
  const { account } = useMoralis()

  return (
    <div className="flex flex-col items-center justify-start">
      <img className="rounded-full" width={100} height={100} src="/NFTs/8.png" alt="profilePic" />
      <h4
        className="mt-4 p-2 text-sm flex flex-col 
        font-medium text-gray-500 rounded-xl"
      >
        {shortenAddress(account)}
      </h4>
    </div>
  )
}
