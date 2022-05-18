import Link from "next/link"

export const ProfileTabs = () => {
  const createTabLink = (pathname: string, label: string) => {
    return (
      <li className="mr-2">
        <Link
          href={{
            pathname,
          }}
        >
          <a className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">
            {label}
          </a>
        </Link>
      </li>
    )
  }

  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {createTabLink("/profile/nft", "NFTs")}
        {createTabLink("/profile/lootbox", "Lootbox")}
      </ul>
    </>
  )
}
