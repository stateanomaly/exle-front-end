import { from, throwError } from 'rxjs'

export const connectWallet = () => {
  if (!cardano.yoroi) {
    return throwError(() => Error('EXTENSION_NOT_FOUND'))
  }

  return from(window.ergo_request_read_access())
}
