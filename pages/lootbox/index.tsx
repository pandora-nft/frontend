// pages/lootbox

import { useState } from "react";
import Router, { useRouter } from "next/router";
import { LootboxCanvas, NFTShowcase } from "canvas";
import { ConnectButton } from "web3uikit";
import Link from "next/link";
import Image from "next/image";

const Lootbox = () => {
  const router = useRouter();

  return (
    <>
      <section>
        <LootboxCanvas />
        <div>Market place page</div>
      </section>
    </>
  );
};
export default Lootbox;
