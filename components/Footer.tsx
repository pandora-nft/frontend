import Image from "next/image"

export const Footer = () => {
  const createNavLink = (label: string, link: string) => {
    return (
      <a href={`./${link}`} className="pt-5 pr-5 font-light text-gray-500">
        {label}
      </a>
    )
  }

  const createIcon = (logoName: string) => {
    return (
      <Image
        className="w-10 h-10 p-2 hover:opacity-50 cursor-pointer"
        src={`/logo/${logoName}.svg`}
        alt="logo"
      />
    )
  }

  return (
    <div className="centered mt-40 pb-20">
      <div className="w-3/4 h-[1px] border-t border-gray-300 mb-20"></div>
      <h2 className="text-black font-light">Pandora</h2>
      <div className="mt-5 flex flex-row justify-between">
        {createNavLink("Home", "")}
        {createNavLink("Marketplace", "")}
        {createNavLink("Create", "create")}
        {createNavLink("Roadmap", "")}
        {createNavLink("Whitepaper", "")}
      </div>
      <div className="mt-5 flex flex-row">
        {createIcon("twitter")}
        {createIcon("discord")}
        {createIcon("github")}
        {createIcon("youtube")}
        {createIcon("medium")}
        {createIcon("telegram")}
      </div>
    </div>
  )
}
