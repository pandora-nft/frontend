import type { NextPage } from "next"
import { LootboxCanvas, NFTShowcase } from "canvas"
import Tilt from "react-parallax-tilt"
import { AnimationOnScroll } from "react-animation-on-scroll"
import "animate.css/animate.min.css"
import { Card } from "components"
import { useRouter } from "next/router"
const Home: NextPage = () => {
  const Router = useRouter()
  return (
    <div>
      <div className="centered px-20 mt-12 mb-48">
        <div className="grid grid-cols-2 px-10 pt-10">
          <div className="mt-32 text-left">
            <div className="text-[10rem] font-medium -mb-10 -ml-3">Pandora</div>
            <h2 className="font-[200]">
              The decentralized NFT loot box gamifying trading experiences to solve NFT market
              illiquidity problems
            </h2>
          </div>
          <div className="h-100 ml-32 motion-safe:animate-bounce">
            <LootboxCanvas />
          </div>
        </div>
        <div className="flex flex-row w-full px-20">
          <button
            onClick={() => Router.push("/marketplace")}
            className="mr-5 flex flex-row px-8 py-3 bg-mainPink text-white
          rounded-xl hover:shadow-2xl transition duration-300"
          >
            <h3 className="ml-2 mt-2">Go To Marketplace</h3>
          </button>
          <button
            onClick={() => Router.push("/create")}
            className="mr-5 flex flex-row px-8 py-3 bg-white border border-mainPink text-gray-800
          rounded-xl hover:bg- hover:shadow-2xl transition duration-300"
          >
            <h3 className="ml-2 mt-2">Create</h3>
          </button>
        </div>
      </div>

      <section className="centered">
        <AnimationOnScroll animateIn="animate__fadeInUp">
          <div className="grid grid-cols-3">
            <div className="mt-24 col-span-2 text-left">
              <h1 className="mb-4">Provable randomize lottery ticket</h1>
              <h2>Buy the ticket and win valuable NFT</h2>
              <h2 className="mb-4">or Create lootbox of your own NFT</h2>
              <h2>The more you BUY the more you WIN</h2>
            </div>
            <div className="motion-safe:animate-slowBounce">
              <Tilt className="col-span-1 ml-auto">
                <img className="h-100 rotate-12" src="/Ticket.png" alt="ticket" />
                {/* <div className="rotate-12"> */}
                {/* <Image width={300} height={500} src="/Ticket.png" alt="ticket" /> */}
                {/* </div> */}
              </Tilt>
            </div>
          </div>
        </AnimationOnScroll>
      </section>

      <section className="mt-24 mb-36 text-center justify-center items-center">
        <AnimationOnScroll animateIn="animate__fadeInRight">
          <h1>Now its your chance to win valuable NFTs</h1>
          <div className="w-full h-120 -py-100 border-red-400">
            <NFTShowcase />
          </div>
        </AnimationOnScroll>
      </section>

      <section className="centered">
        <AnimationOnScroll animateIn="animate__fadeInLeft">
          <h1>Core value</h1>
          <div className="grid grid-cols-2 gap-20 mt-10">
            <Card text="Solve illiquidity problems" />
            <Card text="Gamification experiences" />
          </div>
        </AnimationOnScroll>
      </section>

      <section className="mt-40 centered">
        <AnimationOnScroll animateIn="animate__fadeInUp">
          <h1 className="my-20 centered">{"What's Next"}</h1>
          <img
            className="object-contain w-full h-4/5"
            src="/Roadmap/roadmap.png"
            alt="PolygonChain"
          />
        </AnimationOnScroll>
      </section>

      <section className="centered">
        <AnimationOnScroll animateIn="animate__fadeInUp">
          <h1>Available Now On</h1>
          <div className="pt-20 grid grid-cols-3 gap-10">
            <div className="flex flex-col items-center justify-center">
              <img width={100} height={100} src="/chain/BNB.png" alt="BNBChain" />
              <h3 className="pt-4">Binance</h3>
            </div>

            <div className="ml-2 flex flex-col items-center justify-center">
              <img width={100} height={100} src="/chain/Polygon.png" alt="PolygonChain" />
              <h3 className="pt-4">Polygon</h3>
            </div>
            <div className="flex flex-col items-center justify-center">
              {/* // Please do not use Image from next/image since cannot static deploy */}
              <img width={100} height={100} src="/chain/Avalanche.png" alt="EthChain" />
              <h3 className="pt-4">Avalanche</h3>
            </div>
          </div>
        </AnimationOnScroll>
      </section>
    </div>
  )
}

export default Home
