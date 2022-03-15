import Cookies from 'js-cookie'
import { MESSAGE_COOKIE } from './common'

export const getNotification = () => {
  if (Cookies.get(MESSAGE_COOKIE)) {
    return undefined
  }

  Cookies.set(MESSAGE_COOKIE, 'true', { expires: 1 })
  return {
    message: 'Yoroi Wallet',
    description: 'Welcome to ErgoLend Yoroi'
  }
}
