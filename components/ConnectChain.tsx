import { CryptoLogos, Illustration, Icon, Modal } from "web3uikit"
import { useChain, useMoralis } from "react-moralis"
import { Dispatch, SetStateAction } from "react"
import { SUPPORT_CHAINID, CHAINID_TO_DETAIL } from "contract"
import { chainType } from "web3uikit/dist/components/CryptoLogos/types"

interface ConnectChainProps {
  modalOpen: boolean
  setModalOpen: Dispatch<SetStateAction<boolean>>
}

export const ConnectChain = ({ modalOpen, setModalOpen }: ConnectChainProps) => {
  const { chain, switchNetwork } = useChain()
  const { logout } = useMoralis()

  const disconnect = () => {
    logout()
    setModalOpen(false)
  }

  const createChain = (chainId: string) => {
    const isActive =
      chain?.chainId === chainId
        ? "bg-black border-2 border-mainPink text-white"
        : "hover:bg-gray-300 cursor-pointer text-black "

    const { name, src } = CHAINID_TO_DETAIL[chainId]

    return (
      <div
        onClick={() => switchNetwork(chainId)}
        className={`${isActive} 
        rounded-xl p-4 m-2 flex flex-rows
        justify-start items-center h-20`}
      >
        <div className="w-[70px]">
          {src === "testnet" ? (
            <Illustration height="70px" width="70px" logo="comingSoon" />
          ) : (
            <div className="ml-[8px]">
              <CryptoLogos chain={src as chainType} size="50px" />
            </div>
          )}
        </div>

        <h3 className="ml-14 font-bold">{name}</h3>
      </div>
    )
  }

  const showConnectingChain = () => {
    if (!chain || !SUPPORT_CHAINID.includes(chain.chainId)) {
      return (
        <div className="flex flex-row items-center">
          <Icon fill="rgb(30,30,30)" size={28} svg="exclamation" />
          <h3 className="ml-2 font-bold">??</h3>
        </div>
      )
    }

    const { shortName, src } = CHAINID_TO_DETAIL[chain.chainId]

    return (
      <div
        onClick={() => {
          setModalOpen(!modalOpen)
        }}
        className="flex flex-row items-center"
      >
        {src === "testnet" ? (
          <Illustration height="40px" width="40px" logo="comingSoon" />
        ) : (
          <div className="ml-[8px]">
            <CryptoLogos chain={src as chainType} size="25px" />
          </div>
        )}

        <h3 className="ml-2 font-bold">{shortName}</h3>
      </div>
    )
  }

  return (
    <>
      {showConnectingChain()}

      <Modal
        width="650px"
        isVisible={modalOpen}
        title={
          <div style={{ display: "flex", gap: 10 }}>
            <Icon fill="rgb(30,30,30)" size={28} svg="network" />
            <h2 className="text-black font-medium">Switch Network</h2>
          </div>
        }
        hasFooter={false}
      >
        <div>
          {SUPPORT_CHAINID.map((chainId) => {
            return <div key={chainId}>{createChain(chainId)}</div>
          })}

          <div className="w-full text-center my-10">
            <h4 onClick={disconnect} className="cursor-pointer underline">
              Disconnect Wallet
            </h4>
          </div>
        </div>
      </Modal>
    </>
  )
}
