import { useRouter } from "next/router"
import Link from "next/link"

export const Footer = () => {
  const router = useRouter()

  const createNavLink = (label: string, link: string) => {
    let isActive
    if (label === "Home") {
      isActive = router.pathname === link
    } else {
      isActive = router.pathname.startsWith(link)
    }
    const activeStyle = isActive
      ? "text-black font-light"
      : "font-light text-gray-500 hover:text-black"

    const scrollToTop = () => {
      if (isActive) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      } else {
        return
      }
    }

    return (
      <>
        {isActive ? (
          <button onClick={scrollToTop} className={activeStyle}>
            {label}
          </button>
        ) : (
          <Link href={link}>
            <a className={activeStyle}>{label}</a>
          </Link>
        )}
      </>
    )
  }

  const createIcon = (logoName: string) => {
    return (
      <img
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
      <div className="mt-5 flex flex-row justify-between w-1/4">
        {createNavLink("Home", "/")}
        {createNavLink("Marketplace", "/marketplace")}
        {createNavLink("Create", "/create")}
        {createNavLink("Profile", "/profile")}
        {/* {createNavLink("Roadmap", "")} */}
        {/* {createNavLink("Whitepaper", "")} */}
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
