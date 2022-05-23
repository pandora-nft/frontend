import { Illustration } from "web3uikit"

interface NotFoundProps {
  info: string
}

export const NotFound = ({ info }: NotFoundProps) => {
  return (
    <div className="col-span-full flex flex-col items-center">
      <div className="flex flex-col justify-center items-center px-20 py-10">
        <Illustration width="100px" height="100px" logo="looking" />
        <h3 className="mt-10 text-xl text-gray-500 font-light">{info}</h3>
      </div>
    </div>
  )
}
