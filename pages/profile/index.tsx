import ProfileLayout from "layouts/profileLayout"
import { ReactElement } from "react"
import Link from "next/link"

const Profile = () => {
  return (
    <>
      <div className="centered mt-10">
        <h2 className="font-medium mb-10">Profile index</h2>
        <div className="grid grid-cols-2 gap-10 border-black p-4"></div>
        <Link href="/profile/nft">Go to profile/nft </Link>
        <Link href="/profile/lootbox">Go to profile/lootbox </Link>
      </div>
    </>
  )
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Profile
