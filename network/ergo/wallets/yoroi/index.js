import React from 'react'

import { connectWallet } from './connectWallet'
import { getAddresses } from './getAddresses'
import { getNotification } from './getNotification'
import { getUtxos } from './getUtxos'
import { onDisconnect } from './onDisconnect'

export const Yoroi = {
  name: 'Yoroi',
  experimental: false,
  extensionLink:
    'https://chrome.google.com/webstore/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb',
  connectWallet,
  getUtxos,
  getNotification,
  onDisconnect,
  getAddresses
}
