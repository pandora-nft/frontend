import { ConnectButton } from "web3uikit"
import { useMoralis } from "react-moralis"
import { useRouter } from "next/router"
import { useState } from "react"
import { ConnectChain } from "./ConnectChain"
import Link from "next/link"

export const Header = () => {
  const router = useRouter()
  const { isAuthenticated } = useMoralis()
  const [modalOpen, setModalOpen] = useState(false)

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

        <div className="flex flex-row py-2 px-4">
          {/* <Link href={{ pathname: "/profile" }} replace>
          <a className="pt-5 pr-5 font-medium text-xl">Pandora</a>
          <img className="cursor-pointer mt-1 w-8 h-8" alt="user" src="User.png" />
          </Link> */}

          {isAuthenticated ? (
            <div
              className="rounded-[15px] pl-2 pr-4 flex items-center 
              bg-blue-50 hover:bg-gray-300 cursor-pointer"
            >
              <ConnectChain modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
          ) : null}

          <ConnectButton moralisAuth={true} signingMessage="Moralis Authentication" />
        </div>
      </nav>
    </>
  )
}
