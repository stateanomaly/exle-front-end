import React, { useEffect, useState, useContext } from 'react'
import { ergoBoxFromProxy, RustModule } from '@ergolabs/ergo-sdk'
import { WalletContext } from '../context/wallet'
import Cookies from 'js-cookie'
import { compiledWalletString } from 'helper/erg-converter'
import { Heading } from './generic'
const MESSAGE_COOKIE = 'YOROI_MESSAGE_COOKIE'

export default function WalletButton() {
  const [isRustModuleLoaded, setIsRustModuleLoaded] = useState(false)
  const [ergoWalletAddress, setErgoWalletAddress] = useState(null)
  const [loadingWallet, setLoadingWallet] = useState(false)

  useEffect(() => {
    RustModule.load().then(() => {
      console.log('rust module')
      setIsRustModuleLoaded(true)
      setErgoWalletAddress(localStorage.getItem('ergoWalletAddress'))
    })
  }, [])

  if (!isRustModuleLoaded) {
    console.log('not loading')
    return null
  }

  const connectYoroiWallet = () => {
    console.log('trying to connect')
    if (!window.ergo_request_read_access) {
      return Promise.reject(new Error('Yoroi not found'))
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

  const connectNautilusWallet = () => {
    console.log('trying to connect')
    if (!window.ergoConnector.nautilus) {
      return Promise.reject(new Error('Nautilus not found'))
    }

    return ergoConnector.nautilus.connect({ createErgoObject: false })
  }

  const disconnectYoroiWallet = () => {
    Cookies.remove(MESSAGE_COOKIE)
    setErgoWalletAddress(null)
  }

  const DynamicButton = () => {
    let config = {}

    if (ergoWalletAddress) {
      config = {
        clickHandler: disconnectYoroiWallet,
        label: compiledWalletString(ergoWalletAddress)
      }
    } else if (loadingWallet) {
      config = {
        clickHandler: () => {
          return Promise.resolve()
        },
        label: 'Loading...'
      }
    } else {
      config = {
        clickHandler: connectNautilusWallet,
        label: 'Connect Wallet'
      }
    }

    return (
      <button
        type="button"
        className="flex items-center justify-center rounded-full border border-body-color-2 py-[9px] px-8 text-base font-semibold text-body-color-2 transition-all hover:border-primary hover:bg-primary hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-blue-700 lg:px-4 xl:px-8"
        onClick={() => config.clickHandler().then(() => console.log('done'))}
      >
        {config.label}
      </button>
    )
  }
  return (
    <>
      <WalletContext.Provider value={ergoWalletAddress}>
        <DynamicButton />
      </WalletContext.Provider>
    </>
  )
}
