// pages/lootbox/[bid]

import { useState } from "react";
import Router, { useRouter } from "next/router";
import { LootboxCanvas, NFTShowcase } from "canvas";
import { ConnectButton } from "web3uikit";
import Link from "next/link";
import Image from "next/image";

//Todo: query onchain lootbox to display
//Todo: interact with blockchain from frontend
//Todo: multichain interaction???
const Bid = () => {
  const router = useRouter();

  return (
    <>
      <section>
        <LootboxCanvas />
        <div>Loot box index</div>
        <div>boxId: {router.query.bid}</div>
      </section>
    </>
  );
};
export default Bid;
