import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { MoralisProvider } from 'react-moralis';
import { isMoralisEnvProvided, MORALIS_APP_ID, MORALIS_SERVER_URL } from 'config';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      serverUrl={MORALIS_SERVER_URL}
      appId={MORALIS_APP_ID}
      initializeOnMount={isMoralisEnvProvided}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
