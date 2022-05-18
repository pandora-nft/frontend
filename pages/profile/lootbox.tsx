import ProfileLayout from "layouts/profileLayout"
import { ReactElement } from "react"

const Lootbox = () => {
  return <>This is profile/lootbox</>
}

Lootbox.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Lootbox
