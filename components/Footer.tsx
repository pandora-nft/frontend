export const Footer = () => {
  const createNavLink = (label: string) => {
    return <div className="pt-5 pr-5 font-light text-gray-500">{label}</div>;
  };

  return (
    <div className="centered py-40">
      <div className="w-full h-[1px] border-t border-gray-200 mb-20"></div>
      <h1 className="text-gray-500 font-medium">Pandora</h1>
      <div className="flex flex-row justify-between">
        {createNavLink('Home')}
        {createNavLink('Marketplace')}
        {createNavLink('Roadmap')}
        {createNavLink('Whitepaper')}
      </div>
    </div>
  );
};
