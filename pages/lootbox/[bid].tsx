// pages/lootbox/[bid].js

import { useRouter } from "next/router";

const Bid = () => {
  const router = useRouter();

  return (
    <>
      <div>boxId: {router.query.bid}</div>
    </>
  );
};
export default Bid;
