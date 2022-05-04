import React, { useEffect, useState, useContext } from 'react'
import { ergoBoxFromProxy, RustModule } from '@ergolabs/ergo-sdk'
import { WalletContext } from '../context/wallet'
import Cookies from 'js-cookie'
import { Heading } from './generic'
const MESSAGE_COOKIE = 'YOROI_MESSAGE_COOKIE'

export default function WalletButton() {
  const [isRustModuleLoaded, setIsRustModuleLoaded] = useState(false)
  const [ergoWalletAddress, setErgoWalletAddress] = useState(null)
  const [loadingWallet, setLoadingWallet] = useState(false)

  useEffect(() => {
    RustModule.load().then(() => setIsRustModuleLoaded(true))
    setErgoWalletAddress(localStorage.getItem('ergoWalletAddress'))
  }, [])
  if (!isRustModuleLoaded) {
    return null
  }

  const connectYoroiWallet = () => {
    if (!window.ergo_request_read_access) {
      return Promise.reject(new Error(WARNING_MESSAGE.YOROI))
    }

    return window.ergo_request_read_access().then(() => {
      // ergo
      //   .get_utxos()
      //   .then(bs => bs?.map(b => ergoBoxFromProxy(b)))
      //   .then(data => {
      //   })
      setLoadingWallet(true)
      ergo.get_used_addresses().then((data) => {
        setErgoWalletAddress(data[0])
        localStorage.setItem('ergoWalletAddress', data[0])
      })
      setLoadingWallet(false)
    })
  }

  const disconnectYoroiWallet = () => {
    Cookies.remove(MESSAGE_COOKIE)
    setErgoWalletAddress(null)
  }

  const getWalletButton = () => {
    if (loadingWallet === true) {
      return (
        <div
          type="button"
          className="bg-gray-800 mr-4 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
        >
          Loading...
        </div>
      )
    } else if (ergoWalletAddress === null) {
      return (
        <button
          type="button"
          className="bg-gray-800 mr-4 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={connectYoroiWallet}
        >
          Connect Wallet
        </button>
      )
    } else {
      let frontWalletString = ergoWalletAddress.slice(0, 4)
      let endWalletString = ergoWalletAddress.slice(-5)
      let compiledWalletString = frontWalletString + '...' + endWalletString
      return (
        <button
          type="button"
          className="bg-gray-800 mr-4 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={disconnectYoroiWallet}
        >
          {compiledWalletString}
        </button>
      )
    }
  }

  return (
    <>
      <WalletContext.Provider value={ergoWalletAddress}>
        {getWalletButton()}
      </WalletContext.Provider>
    </>
  )
}
