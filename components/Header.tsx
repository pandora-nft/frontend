import { ConnectButton } from "web3uikit"
import Link from "next/link"
import { useRouter } from "next/router"

export const Header = () => {
  const router = useRouter()

  const createNavLink = (label: string, endpoint: string) => {
    const activeStyle =
      router.pathname === endpoint ? "text-black" : "text-gray-500 hover:text-black"

    return (
      <Link
        className="flex items-center border border-blue-500"
        href={{ pathname: `${endpoint}` }}
        replace
      >
        <a className={`pt-5 pr-5 font-medium ${activeStyle}`}>{label}</a>
      </Link>
    )
  }
  return (
    <>
      <nav className="p-5 flex flex-row items-center justify-between border-gray-200">
        <div className="flex flex-row items-center justify-center">
          <img className="w-6 h-6" src={"/box.png"} alt="icon" />
          <div className="text-3xl font-bold pt-[2px] pl-2">
            <Link href={{ pathname: "/" }} replace>
              <a className="pt-5 pr-5 font-medium text-xl">Pandora</a>
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          {createNavLink("Marketplace", "/marketplace")}
          {createNavLink("Create", "/create")}
          {createNavLink("Lootbox", "/lootbox/0")}
          {createNavLink("Profile", "/profile")}
          {createNavLink("Roadmap", "/")}
          {createNavLink("Whitepaper", "/")}
        </div>

        <div className="py-2 px-4">
          <ConnectButton moralisAuth={true} signingMessage="Moralis Authentication" />
        </div>
      </nav>
    </>
  )
}
