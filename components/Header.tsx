import { ConnectButton } from "web3uikit"
import { useMoralis } from "react-moralis"
import { useRouter } from "next/router"
import { useState } from "react"
import { ConnectChain } from "./ConnectChain"
import Link from "next/link"
import { SUPPORT_CHAINID } from "contract"
import { useChain } from "react-moralis"
import { useEffect } from "react"
import { useError } from "context/errors"

export const Header = () => {
  const router = useRouter()
  const { isAuthenticated } = useMoralis()
  const [modalOpen, setModalOpen] = useState(false)

  const { chain } = useChain()
  const { setError } = useError()

  useEffect(() => {
    if (chain) {
      if (!SUPPORT_CHAINID.includes(chain.chainId)) {
        setError(`${chain.name} is not supported.`)
        setTimeout(() => {
          setError("Please connect to the supported chains.")
        }, 1000)

        setModalOpen(true)
      }
    }
  }, [chain])

  const createNavLink = (label: string, endpoint: string) => {
    const activeStyle = router.pathname.startsWith(endpoint)
      ? "text-black border-b-2 border-mainPink"
      : "text-gray-500 hover:text-black"

    return (
      <Link
        className="flex items-center border border-blue-500"
        href={{ pathname: `${endpoint}` }}
        replace
      >
        <a className={`mr-5 font-medium ${activeStyle}`}>{label}</a>
      </Link>
    )
  }

  return (
    <>
      <nav className="p-5 flex flex-row items-center justify-between">
        <Link href={{ pathname: "/" }} replace>
          <a>
            <div className="mb-2 flex flex-row items-center border-mainPink justify-center">
              <img className="w-8 h-8" src={"/logo2.png"} alt="icon" />
              <h1 className="font-medium ml-2 mt-[13px] text-xl">Pandora</h1>
            </div>
          </a>
        </Link>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center justify-between mt-2">
            {createNavLink("Marketplace", "/marketplace")}
            {createNavLink("Create", "/create")}
            {/* {createNavLink("Lootbox", "/lootbox/0")} */}
            {createNavLink("Profile", "/profile")}
            {/* {createNavLink("Roadmap", "/")} */}
            {/* {createNavLink("Whitepaper", "/")} */}
          </div>

          <div className="flex flex-row py-2 px-4">
            {/* <Link href={{ pathname: "/profile" }} replace>
          <a className="pt-5 pr-5 font-medium text-xl">Pandora</a>
          <img className="cursor-pointer mt-1 w-8 h-8" alt="user" src="User.png" />
          </Link> */}

            {isAuthenticated ? (
              <div
                className="mr-2 rounded-[15px] pl-2 pr-4 flex items-center 
              bg-blue-50 hover:bg-gray-300 cursor-pointer"
              >
                <ConnectChain modalOpen={modalOpen} setModalOpen={setModalOpen} />
              </div>
            ) : null}

            <ConnectButton moralisAuth={true} signingMessage="Moralis Authentication" />
          </div>
        </div>
      </nav>
    </>
  )
}
