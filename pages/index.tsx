import type { NextPage } from 'next';
import Image from 'next/image';
import { Header } from 'components/Header';
import { LootboxCanvas, NFTShowcase } from 'canvas';
import { PresentationControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { useInView } from 'react-intersection-observer';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import 'animate.css/animate.min.css';

const Card = () => {
  return (
    <div>
      <div className="rounded-xl w-96 h-96 mx-auto mt-10 bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
        <div className="flex flex-col justify-between h-full bg-white text-white rounded-lg p-2">
          {/* <Image
          layout="fill"
          className="rounded-xl border border-blue-400"
          src="/NFTs/1.png"
          alt="nft"
        /> */}
        </div>
      </div>
      <h3 className="mt-5">1 Head of party can put any num of nft in the lootbox</h3>
    </div>
  );
};

const Home: NextPage = () => {
  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  // }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <>
        <div className="centered mt-12 mb-48">
          <div className="grid grid-cols-2 px-10 pt-10">
            <div className="mt-32 text-left">
              <div className="text-[18vh] font-medium -mb-20 -ml-3">Pandora</div>
              <h2 className="font-[200]">
                The decentralized NFT loot box gamifying trading experiences to solve NFT market
                illiquidity problems
              </h2>
            </div>
            <div className="h-100 ml-5">
              <NFTShowcase />
            </div>
          </div>
        </div>

        <AnimationOnScroll animateIn="animate__fadeInUp">
          <section className={``}>
            <div className="border border-red-500 grid grid-cols-3">
              <div className="mt-24 col-span-2">
                <h1 className="mb-4">Provably randomize lottery ticket</h1>
                <h2>Buy the ticket and receive PandoraNFT in return</h2>
                <h2>The more you buy the more chance you win</h2>
              </div>
              <Tilt className="col-span-1 ml-auto">
                <img className="h-110 rotate-12" src="/Ticket.png" alt="ticket" />
              </Tilt>
            </div>
          </section>
        </AnimationOnScroll>

        {/* <section className="mt-72 -mb-50">
          <h1>Now is your chance to win high-valuable NFTs</h1>
          <div className="w-full h-120 -py-100 border-red-400"><NFTShowcase /> </div>
        </section> */}

        <AnimationOnScroll animateIn="animate__fadeInLeft">
          <section className="">
            <h1>The next stage of NFT trading experiences</h1>
            <div className="grid grid-cols-3 gap-5">
              <Card />
              <Card />
              <Card />
            </div>
          </section>
        </AnimationOnScroll>

        {/* <section>
          <h1>Roadmap</h1>
        </section> */}
        {/* 
        <section>
          <h1>Available Now On</h1>
          <div className="pt-20 grid grid-cols-3 gap-10">
            <div className="flex flex-col items-center justify-center">
              <img className="h-48" src="/chain/Ethereum.png" />
              <h3 className="pt-4">Ethereum</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img className="h-48" src="/chain/BNB.png" />
              <h3 className="pt-4">Binance</h3>
            </div>

            <div className="ml-2 flex flex-col items-center justify-center">
              <img className="h-48" src="/chain/Polygon.png" />
              <h3 className="pt-4">Polygon</h3>
            </div>
          </div>
        </section>
        */}
      </>

      <AnimationOnScroll animateIn="animate__fadeInUp">
        <div className="h-100">
          <LootboxCanvas />
        </div>
      </AnimationOnScroll>
    </div>
  );
};

export default Home;
