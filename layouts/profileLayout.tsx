import { ProfileTabs } from "components/ProfileTabs"
import { ReactNode } from "react"

type ProfileLayoutProps = {
  children: ReactNode
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <>
      <div className="centered mt-10">
        <h2 className="font-medium mb-10">Profile Layout</h2>
        <div className="grid grid-cols-2 gap-10 border-black p-4"></div>
        <ProfileTabs />
        {children}
      </div>
    </>
  )
}

export default ProfileLayout
