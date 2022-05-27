interface Props {
  text: string
  pictureURL: string
}

export const Card: React.FC<Props> = ({ text, pictureURL }) => {
  return (
    <div>
      <div>
        <div className="relative group hover:scale-105  transition duration-500">
          <div
            className="absolute -inset-0.5 bg-gradient-to-r 
      from-pink-500 to-white rounded-lg blur opacity-75 
      group-hover:opacity-100 transition duration-500"
          ></div>

          <div className="relative ">
            <div className="rounded-xl w-fit h-fit mx-auto mt-10 bg-gradient-to-r p-[6px] from-[#e76edd] via-[#f5f9ff] to-[#212021]">
              <div className="flex flex-col justify-between h-full bg-black text-white rounded-lg p-2">
                <img className="h-72" src={pictureURL} alt="ticket" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="mt-10 text-xl font-medium italic">{text}</h3>
    </div>
  )
}
