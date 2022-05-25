import "styles/globals.css"
import { ReactNode } from "react"
import { NextPage } from "next"
import type { AppProps } from "next/app"
import { MoralisProvider } from "react-moralis"
import { isMoralisEnvProvided, MORALIS_APP_ID, MORALIS_SERVER_URL } from "config"
import { Header, Footer } from "components"
import { NotificationProvider } from "web3uikit"
import { ErrorProvider, ErrorModal } from "context/errors"
import { TxModal, TxProvider } from "context/transaction"

type NextPageWithLayout = NextPage & {
  getLayout?: () => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MoralisProvider
      serverUrl={MORALIS_SERVER_URL}
      appId={MORALIS_APP_ID}
      initializeOnMount={isMoralisEnvProvided}
    >
      <NotificationProvider>
        <ErrorProvider>
          <TxProvider>
            <TxModal />
            <ErrorModal />
            <Header />
            {getLayout(<Component {...pageProps} />)}
            <Footer />
          </TxProvider>
        </ErrorProvider>
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
