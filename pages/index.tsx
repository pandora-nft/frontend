import type { NextPage } from 'next';
import { Header } from 'components/Header';

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <div className="border border-red-500 p-4 mt-4">This is app</div>
    </div>
  );
};

export default Home;
