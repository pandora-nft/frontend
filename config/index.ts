export const MORALIS_SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
  ? process.env.NEXT_PUBLIC_MORALIS_SERVER_URL
  : ""

export const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID
  ? process.env.NEXT_PUBLIC_MORALIS_APP_ID
  : ""

export const isMoralisEnvProvided =
  MORALIS_SERVER_URL.length > 0 && MORALIS_APP_ID.length > 0 ? true : false

export const RINKEBY_RPC_URL = process.env.NEXT_PUBLIC_RINKEBY_RPC_URL
  ? process.env.NEXT_PUBLIC_RINKEBY_RPC_URL
  : ""

export const BSCTESTNET_RPC_URL = process.env.NEXT_PUBLIC_BSCTESTNET_RPC_URL
  ? process.env.NEXT_PUBLIC_BSCTESTNET_RPC_URL
  : ""

export const MUMBAI_RPC_URL = process.env.NEXT_PUBLIC_MUMBAI_RPC_URL
  ? process.env.NEXT_PUBLIC_MUMBAI_RPC_URL
  : ""
