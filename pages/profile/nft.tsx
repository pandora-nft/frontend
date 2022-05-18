import ProfileLayout from "layouts/profileLayout"
import { ReactElement } from "react"

const Nft = () => {
  return <>This is profile/nft</>
}

Nft.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout>{page}</ProfileLayout>
}

export default Nft
