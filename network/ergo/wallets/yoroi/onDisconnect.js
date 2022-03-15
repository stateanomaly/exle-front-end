import Cookies from 'js-cookie'

import { MESSAGE_COOKIE } from './common'

export const onDisconnect = () => Cookies.remove(MESSAGE_COOKIE)
