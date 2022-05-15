// pages/lootbox/[bid]

import { useRouter } from "next/router"
import { LootboxCanvas } from "canvas"

//Todo: query onchain lootbox to display
//Todo: interact with blockchain from frontend
//Todo: multichain interaction???
const Bid = () => {
  const router = useRouter()

  return (
    <>
      <section>
        <LootboxCanvas />
        <div>Loot box index</div>
        <div>boxId: {router.query.bid}</div>
      </section>
    </>
  )
}
export default Bid
