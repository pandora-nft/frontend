import Link from "next/link"
import { useRouter } from "next/router"

export const ProfileTabs = () => {
  const router = useRouter()

  const createTabLink = (pathname: string, label: string) => {
    const activeStyle =
      router.pathname === pathname
        ? "text-black border-b-4 border-mainPink"
        : "text-gray-500 hover:text-gray-700 "

    return (
      <li className="mr-2">
        <Link
          href={{
            pathname,
          }}
        >
          <a className={`inline-block p-4 ${activeStyle}`}>{label}</a>
        </Link>
      </li>
    )
  }

  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center border-b border-gray-200">
        {createTabLink("/profile/nft", "NFT")}
        {createTabLink("/profile/lootbox", "Lootbox")}
        {createTabLink("/profile/ticket", "Ticket")}
      </ul>
    </>
  )
}
