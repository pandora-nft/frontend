// pages/lootbox/[bid].js

import { useState } from "react";
import Router, { useRouter } from "next/router";

import { ConnectButton } from "web3uikit";
import Link from "next/link";
import Image from "next/image";
const Bid = () => {
  const router = useRouter();

  return (
    <>
      <div>boxId: {router.query.bid}</div>
    </>
  );
};
export default Bid;
