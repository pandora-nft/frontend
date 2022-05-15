interface Props {
  text: string
}

export const Card: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <AnimateCard />
      <h3 className="mt-10 text-2xl font-medium italic">{text}</h3>
    </div>
  )
}

const AnimateCard = () => {
  return (
    <div className="relative group hover:scale-105 transition duration-500">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r 
      from-pink-500 to-white rounded-lg blur opacity-75 
      group-hover:opacity-100 transition duration-500"
      ></div>

      <div className="relative">
        <div className="rounded-xl w-96 h-100 mx-auto mt-10 bg-gradient-to-r p-[6px] from-[#e76edd] via-[#f5f9ff] to-[#212021]">
          <div className="flex flex-col justify-between h-full bg-black text-white rounded-lg p-2">
            {/* <Image
          layout="fill"
          className="rounded-xl border border-blue-400"
          src="/NFTs/1.png"
          alt="nft"
        /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
