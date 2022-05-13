import { ConnectButton } from 'web3uikit';

export const Header = () => {
  const createNavLink = (label: string) => {
    return <div className="font-light text-lg pt-5 pr-5">{label}</div>;
  };
  return (
    <>
      <nav className="p-5 flex flex-row items-center justify-between border-gray-200">
        <div className="flex flex-row items-center justify-center">
          <img className="w-8 h-8" src={'box.png'} alt="icon" />
          <div className="text-3xl font-bold pt-[2px] pl-2">Pandora</div>
        </div>
        <div className="flex flex-row justify-between">
          {createNavLink('Home')}
          {createNavLink('Marketplace')}
          {createNavLink('Roadmap')}
          {createNavLink('Whitepaper')}
        </div>

        <div className="py-2 px-4">
          <ConnectButton moralisAuth={true} signingMessage="Moralis Authentication" />
        </div>
      </nav>
    </>
  );
};
