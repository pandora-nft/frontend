import { ConnectButton } from 'web3uikit';

export const Header = () => {
  return (
    <>
      <nav className="p-5 border-b-2 flex flex-row">
        <h1 className="py-4 px-4 font-bold text-3xl">Pandora</h1>
        <div className="ml-auto py-2 px-4">
          <ConnectButton moralisAuth={true} signingMessage="Moralis Authentication" />
        </div>
      </nav>
    </>
  );
};
