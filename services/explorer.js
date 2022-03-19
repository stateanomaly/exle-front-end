import { Explorer } from '@ergolabs/ergo-sdk'

import { ERGO_BASE_URL } from '../config/constants/env'

const explorer = new Explorer(ERGO_BASE_URL)

export { explorer }
