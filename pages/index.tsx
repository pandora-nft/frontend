import type { NextPage } from 'next';
import { Header } from 'components/Header';
import { LootboxCanvas } from 'canvas';
import { LoadingIndicator } from 'components/LoadingIndicator';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <div className="centered">
        <div className="grid grid-cols-2">
          <div className="ml-24 mt-9">
            <h1 className="text-[180px] -mb-5 -ml-3">Pandora</h1>
            <h3 className="text-2xl">
              Decentralized NFT loot box. Gamify NFT buy-and-sell experiences to solve NFT market's
              illiquidity problems.
            </h3>
          </div>
          <div className="h-100">
            <LootboxCanvas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
