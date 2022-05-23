import ProfileLayout from "layouts/profileLayout"
import { ReactElement, useEffect } from "react"
import Router from "next/router"

const Profile = () => {
  useEffect(() => {
    Router.push("/profile/lootbox")
  }, [])

  return <></>
}

Profile.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Profile
