import type { NextPage } from "next"
import { LootboxCanvas, NFTShowcase } from "canvas"
import Tilt from "react-parallax-tilt"
import { AnimationOnScroll } from "react-animation-on-scroll"
import "animate.css/animate.min.css"
import { openInNewTab } from "utils"
import { Card } from "components"
import { useRouter } from "next/router"
import { Illustration } from "web3uikit"

const Home: NextPage = () => {
  const Router = useRouter()
  return (
    <div>
      <div className="centered px-20 mt-24 mb-96">
        <div className="grid grid-cols-2 px-10 pt-10">
          <div className="mt-10 text-left">
            <div className="text-[10rem] font-medium -mb-16 -ml-3">Pandora</div>
            <h2 className="font-[100]  border-red-500 w-110">
              The decentralized NFT loot box gamifying trading experiences to solve NFT market
              illiquidity problems
            </h2>

            <div className="flex flex-row pt-10 mr-20 w-120">
              <button
                onClick={() => Router.push("/marketplace")}
                className="mr-5 flex flex-row px-8 py-3 bg-mainPink text-white
          rounded-xl hover:shadow-2xl transition duration-300"
              >
                <h3 className="mt-2">Go To Marketplace</h3>
              </button>
              <button
                onClick={() => Router.push("/create")}
                className="mr-5 flex flex-row px-8 py-3 bg-white border border-mainPink text-gray-800
          rounded-xl hover:bg- hover:shadow-2xl transition duration-300"
              >
                <h3 className="mt-2">Create Lootbox</h3>
              </button>

              <h3 className="mt-4">or</h3>
              <button
                onClick={() =>
                  openInNewTab(
                    "https://drive.google.com/file/d/1mqk53FOcxMcnHYroZ66U4F7UR022xLob/view?usp=sharing"
                  )
                }
                className="ml-4 mt-2 underline"
              >
                <h3>Read whitepaper</h3>
              </button>
            </div>
          </div>
          <div className="h-100 ml-32 motion-safe:animate-bounce">
            <LootboxCanvas />
          </div>
        </div>
      </div>

      <section className="bg-black py-36">
        <div className="centered">
          <AnimationOnScroll animateOnce animateIn="animate__fadeInUp">
            <div className="text-white grid grid-cols-3">
              <div className="col-span-2 text-left">
                <h1 className="mb-4">Provable randomize lottery ticket</h1>
                <h2 className="italic">Buy the ticket and win the valuable NFT</h2>
                <h2 className="mb-4 italic">or Create a lootbox of your own NFT</h2>
                <h2 className="font-medium text-mainPink">
                  The more you BUY the more chance you WIN
                </h2>
              </div>
              <div className="motion-safe:animate-slowBounce">
                <Tilt className="col-span-1 pl-5 ml-auto">
                  <img className="h-100 rotate-12" src="/Ticket.png" alt="ticket" />
                </Tilt>
              </div>
            </div>
          </AnimationOnScroll>
        </div>
      </section>

      <section className="bg-white py-32">
        <AnimationOnScroll animateOnce animateIn="animate__fadeInLeft">
          <div className="centered">
            <h1 className="">Core Value</h1>

            <h2 className="italic mt-4">
              Decentralized drawing mechanisms using Chainlink VRF and Keepers
            </h2>
            <div className="grid grid-cols-3 gap-10 my-10">
              <Card text="Solving NFT Illiquidity" pictureURL="/NFTs/1.png" />
              <Card text="Gamifying Experience" pictureURL="/NFTs/2.png" />
              <Card text="Fair game of luck" pictureURL="/NFTs/9.png" />
            </div>
          </div>
        </AnimationOnScroll>
      </section>

      <section className="bg-black py-36">
        <div className="centered">
          <AnimationOnScroll animateOnce animateIn="animate__fadeInUp">
            <h1 className="text-white">The Pandora Tickets</h1>
            <h2 className="italic text-white mt-4">
              Ticket Buyers will receive the pandora ticket NFT
            </h2>
            <div className="text-white grid grid-cols-3 gap-10 my-10">
              <Tilt>
                <Card text="Normal Ticket" pictureURL="/Normal_Tickets.png" />
              </Tilt>
              <Tilt>
                <Card text="Winning Ticket" pictureURL="/Winning_Ticket.png" />
              </Tilt>
              <Tilt>
                <Card text="Refundable Ticket" pictureURL="/Refundable_Ticket.png" />
              </Tilt>
              <Tilt>
                <Card text="Refunded Ticket" pictureURL="/Refunded_Ticket.png" />
              </Tilt>
              <Tilt>
                <Card text="Claimed Ticket" pictureURL="/Claimed_Ticket.png" />
              </Tilt>
              <Tilt>
                <Card text="Expired Ticket" pictureURL="/Expired_Ticket.png" />
              </Tilt>
            </div>
          </AnimationOnScroll>
        </div>
      </section>

      <section className="py-36 text-center justify-center items-center">
        <AnimationOnScroll animateOnce animateIn="animate__fadeInRight">
          <h1>Now its your chance to win valuable NFTs</h1>
          <div className="w-full h-120 -py-100 border-red-400">
            <NFTShowcase />
          </div>
        </AnimationOnScroll>
      </section>

      <section className="py-28 bg-black">
        <AnimationOnScroll animateOnce animateIn="animate__fadeInUp">
          <div className="centered bg-black">
            <h1 className="text-white">Available Now On Testnet</h1>
            <div className="pt-20 grid grid-cols-3 gap-10">
              <div className="flex flex-col items-center justify-center">
                <Illustration logo="binance" />
              </div>

              <div className="flex flex-col items-center justify-center">
                <Illustration logo="polygon" />
              </div>
              <div className="flex flex-col items-center justify-center">
                <Illustration logo="avalanche" />
              </div>
            </div>
          </div>
        </AnimationOnScroll>
      </section>

      <section className="py-36 centered">
        <AnimationOnScroll animateOnce animateIn="animate__fadeInRight">
          <div className="">
            <h1>Roadmap</h1>
            <div className="flex items-center my-8">
              <img src="/roadmap/roadmap2.png" alt="roadmap" className="w-4/5 m-auto" />
            </div>
          </div>
        </AnimationOnScroll>
      </section>

      <section className="py-28 bg-black">
        <AnimationOnScroll animateOnce animateIn="animate__fadeInUp">
          <div className="centered">
            <h1 className="text-white mb-20">Powered by</h1>

            <div className="flex flex-row items-center ">
              <img className="w-24 mr-20" alt="sponsor" src="/sponsor/chainlinkwhite.png" />
              <img className="w-56 mr-20" alt="sponsor" src="/sponsor/moraliswhite.png" />
              <img className="w-24 mr-20" alt="sponsor" src="/sponsor/ipfswhite.png" />
              <img className="w-48 mr-20" alt="sponsor" src="/sponsor/thegraphwhite.png" />
              <img className="w-24" alt="sponsor" src="/sponsor/filecoinwhite.png" />
            </div>
          </div>
        </AnimationOnScroll>
      </section>
      {/* <section className="bg-white py-36"></section> */}
    </div>
  )
}

export default Home
