import { Loading, Illustration } from "web3uikit"
import { Modal as CustomModal } from "components"
import { useTx } from "./useTx"
import { TX_ACTION } from "./TxContext"

const openInNewTab = (url: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer")
  if (newWindow) newWindow.opener = null
}

export const TxModal = () => {
  const { txState, clearTx } = useTx()
  const { hash, show, stage } = txState
  const url = `https://mumbai.polygonscan.com/tx/${hash}`

  const showText = () => {
    if (stage === TX_ACTION.INITIATED) {
      return (
        <div className="font-light mt-5 text-center">
          <h3>Your transaction is preparing.</h3>
          <h3>Please confirm the transaction!</h3>
        </div>
      )
    }

    if (stage === TX_ACTION.PENDING) {
      return (
        <div className="font-light mt-5 text-center">
          <h3>Your transaction is submitted on the blockchain.</h3>
          <h3> It should be mined shortly!</h3>
        </div>
      )
    }
  }

  const content = (
    <div className="flex flex-col items-center text-black w-100">
      <h3 className="p-4 text-xl font-medium">{stage}</h3>

      {[TX_ACTION.INITIATED, TX_ACTION.PENDING].includes(stage) && (
        <div className="m-12">
          <Loading size={40} spinnerColor="#E54090" />
        </div>
      )}

      {showText()}

      {[TX_ACTION.PENDING, TX_ACTION.SUCCESS].includes(stage) && (
        <div className="p-5 items-center text-center justify-center">
          {stage === TX_ACTION.SUCCESS && (
            <Illustration width={100} height={100} logo="confirmed" />
          )}

          <button className="pt-5 underline text-mainPink" onClick={() => openInNewTab(url)}>
            View on MumbaiScan
          </button>
        </div>
      )}
    </div>
  )
  return (
    <>
      <div className="z-40">
        {/* <Modal
          isVisible={show}
          // title={<h2 className="text-black font-medium">Transaction</h2>}

          onCloseButtonPressed={clearTx}
          onOk={clearTx}
          hasCancel={false}
          hasFooter={false}
          headerHasBottomBorder={false}
        >
          {content}
        </Modal> */}

        <CustomModal zIndex={40} open={show} onClose={() => clearTx()} content={content} />

        {/* <div className="opacity-50 fixed inset-0 z-30 bg-black"></div> */}
      </div>
    </>
  )
}
