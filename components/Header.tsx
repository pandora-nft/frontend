import { ConnectButton } from 'web3uikit';

export const Header = () => {
  return (
    <>
      <nav className="p-5 flex flex-row justify-between">
        <h1 className="py-4 px-4 font-bold text-3xl">Pandora</h1>
        <div className="flex flex-row justify-between">
          <div className="pt-5 pr-5">Home</div>
          <div className="pt-5 pr-5">Market</div>
          <div className="pt-5 pr-5">Whitepaper</div>
        </div>
        <div className="py-2 px-4">
          <ConnectButton moralisAuth={true} signingMessage="Moralis Authentication" />
        </div>
      </nav>
    </>
  );
};
